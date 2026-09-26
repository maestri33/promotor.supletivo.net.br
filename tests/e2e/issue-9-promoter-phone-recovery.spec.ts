import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Issue #9 - Fluxo Seguro de Troca de Número por CPF no Onboarding de Promotores', () => {
  test('1. Exibe o card de decisão bifurcada ao detectar CPF existente com número de telefone diferente', async ({ page }) => {
    // Intercepta a verificação no backend simulando promotor com WhatsApp cadastrado diferente
    await page.route('**/api/v1/collaborators/auth/check', async (route) => {
      const request = route.request();
      const postData = JSON.parse(request.postData() || '{}');

      // Se for checagem apenas por telefone novo, retorna não encontrado
      if (postData.phone && !postData.cpf) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ found: false }),
        });
        return;
      }

      // Se for checagem por CPF, retorna que já existe com outro telefone
      if (postData.cpf) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            found: true,
            masked_phone: '(11) •••••-9999',
            external_id: 'mock-external-id-123',
          }),
        });
        return;
      }

      await route.continue();
    });

    await page.goto('/');

    // Abre o modal de promotor
    const heroCta = page.locator('a[data-cta="hero"]');
    await heroCta.click();

    const modal = page.locator('[data-promoter-capture-modal]');
    await expect(modal).toBeVisible();

    // Passo 1: Digita novo telefone
    const inputPhone = page.locator('#promoter-input-phone');
    await inputPhone.fill('11987654321');

    // Passo 2: Avança para CPF
    const inputCpf = page.locator('#promoter-input-cpf');
    await expect(inputCpf).toBeVisible({ timeout: 4000 });

    // Digita CPF válido
    await inputCpf.fill('52998224725');

    // Passo 3: Detecta CPF em outro telefone e exibe o card de decisão bifurcada
    const stepExisting = page.locator('#step-existing');
    await expect(stepExisting).toBeVisible({ timeout: 4000 });

    const maskedPhone = page.locator('#existing-phone-masked');
    await expect(maskedPhone).toContainText('(11) •••••-9999');

    // Verifica presença dos dois botões de decisão
    const normalLoginBtn = page.locator('#btn-existing-normal-login');
    const swapPhoneBtn = page.locator('#btn-existing-swap-phone');

    await expect(normalLoginBtn).toBeVisible();
    await expect(swapPhoneBtn).toBeVisible();

    // Valida touch targets >= 48px
    const normalBox = await normalLoginBtn.boundingBox();
    const swapBox = await swapPhoneBtn.boundingBox();

    expect(normalBox?.height).toBeGreaterThanOrEqual(48);
    expect(swapBox?.height).toBeGreaterThanOrEqual(48);
  });

  test('2. Clicar em "Troquei de número de WhatsApp" redireciona para fluxo seguro de recuperação com parâmetros e cookie', async ({ page, context }) => {
    await page.route('**/api/v1/collaborators/auth/check', async (route) => {
      const postData = JSON.parse(route.request().postData() || '{}');
      if (postData.cpf) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            found: true,
            masked_phone: '(21) •••••-3333',
            external_id: 'mock-ext-recovery',
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ found: false }),
        });
      }
    });

    await page.goto('/?ref=POLO_CAMPINAS');
    await page.locator('a[data-cta="hero"]').click();

    await page.locator('#promoter-input-phone').fill('11977778888');
    const inputCpf = page.locator('#promoter-input-cpf');
    await expect(inputCpf).toBeVisible({ timeout: 4000 });
    await inputCpf.fill('52998224725');

    const swapPhoneBtn = page.locator('#btn-existing-swap-phone');
    await expect(swapPhoneBtn).toBeVisible({ timeout: 4000 });

    // Monitora a navegação acionada pelo clique
    const [request] = await Promise.all([
      page.waitForRequest((req) => req.url().includes('/autenticacao/recuperar-numero')),
      swapPhoneBtn.click(),
    ]);

    const url = new URL(request.url());
    expect(url.searchParams.get('cpf')).toBe('52998224725');
    expect(url.searchParams.get('novo_telefone')).toBe('11977778888');
    expect(url.searchParams.get('role')).toBe('promotor');
    expect(url.searchParams.get('ref')).toBe('POLO_CAMPINAS');

    // Valida persistência do cookie
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'supletivo.session');
    expect(sessionCookie).toBeDefined();

    if (sessionCookie) {
      const payload = JSON.parse(decodeURIComponent(sessionCookie.value));
      expect(payload.cpf).toBe('52998224725');
      expect(payload.phone).toBe('11977778888');
      expect(payload.role).toBe('promoter');
      expect(payload.ref).toBe('POLO_CAMPINAS');
    }
  });

  test('3. Clicar em "Sim, este sou eu!" redireciona para login normal no OTP', async ({ page }) => {
    await page.route('**/api/v1/collaborators/auth/check', async (route) => {
      const postData = JSON.parse(route.request().postData() || '{}');
      if (postData.cpf) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            found: true,
            masked_phone: '(31) •••••-7777',
            external_id: 'mock-ext-login-normal',
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ found: false }),
        });
      }
    });

    await page.goto('/');
    await page.locator('a[data-cta="hero"]').click();

    await page.locator('#promoter-input-phone').fill('11988889999');
    const inputCpf = page.locator('#promoter-input-cpf');
    await expect(inputCpf).toBeVisible({ timeout: 4000 });
    await inputCpf.fill('52998224725');

    const normalLoginBtn = page.locator('#btn-existing-normal-login');
    await expect(normalLoginBtn).toBeVisible({ timeout: 4000 });

    const [request] = await Promise.all([
      page.waitForRequest((req) => req.url().includes('/autenticacao/otp')),
      normalLoginBtn.click(),
    ]);

    const url = new URL(request.url());
    expect(url.searchParams.get('id')).toBe('mock-ext-login-normal');
    expect(url.searchParams.get('cpf')).toBe('52998224725');
    expect(url.searchParams.get('role')).toBe('promotor');
  });

  test('4. Acessibilidade WCAG 2.1 AA no card de decisão existente', async ({ page }) => {
    await page.route('**/api/v1/collaborators/auth/check', async (route) => {
      const postData = JSON.parse(route.request().postData() || '{}');
      if (postData.cpf) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            found: true,
            masked_phone: '(11) •••••-9999',
            external_id: 'mock-external-id-a11y',
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ found: false }),
        });
      }
    });

    await page.goto('/');
    await page.locator('a[data-cta="hero"]').click();

    await page.locator('#promoter-input-phone').fill('11987654321');
    const inputCpf = page.locator('#promoter-input-cpf');
    await expect(inputCpf).toBeVisible({ timeout: 4000 });
    await inputCpf.fill('52998224725');

    await expect(page.locator('#step-existing')).toBeVisible({ timeout: 4000 });

    const axe = await new AxeBuilder({ page })
      .include('#step-existing')
      .analyze();

    expect(axe.violations).toEqual([]);
  });
});
