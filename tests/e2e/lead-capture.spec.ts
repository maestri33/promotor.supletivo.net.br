import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Captura Inteligente de Promotores (PromoterLeadCaptureModal)', () => {
  test('1. Abre o modal de captação ao clicar no CTA com campo de WhatsApp', async ({ page }) => {
    await page.goto('/');

    const heroCta = page.locator('a[data-cta="hero"]');
    await expect(heroCta).toBeVisible();
    await heroCta.click();

    const modal = page.locator('[data-promoter-capture-modal]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/is-active/);

    const inputPhone = page.locator('#promoter-input-phone');
    await expect(inputPhone).toBeVisible();
    await expect(inputPhone).toBeFocused();
  });

  test('2. Auto-avanço no 11º dígito de telefone e navegação via breadcrumb', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[data-cta="hero"]').click();

    const inputPhone = page.locator('#promoter-input-phone');
    await inputPhone.fill('11987654321');

    // Auto-avanço em ~200ms para o passo de CPF
    const inputCpf = page.locator('#promoter-input-cpf');
    await expect(inputCpf).toBeVisible({ timeout: 4000 });
    await expect(inputCpf).toBeFocused();

    // Breadcrumb ativo com o telefone formatado
    const chipPhone = page.locator('#chip-phone');
    await expect(chipPhone).toBeVisible();
    await expect(chipPhone).toContainText('(11) 98765-4321');

    // Clicar no breadcrumb volta para o telefone sem perder o valor
    await chipPhone.click();
    await expect(inputPhone).toBeVisible();
    await expect(inputPhone).toHaveValue('(11) 98765-4321');
  });

  test('3. Validação de CPF Módulo 11 atualiza a Credencial 3D e avança para e-mail', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[data-cta="hero"]').click();

    const inputPhone = page.locator('#promoter-input-phone');
    await inputPhone.fill('11987654321');

    const inputCpf = page.locator('#promoter-input-cpf');
    await expect(inputCpf).toBeVisible({ timeout: 4000 });

    // CPF válido (gerado pelo algoritmo Módulo 11)
    await inputCpf.fill('52998224725');

    // Credencial 3D é atualizada
    const credDoc = page.locator('#promoter-doc-preview');
    await expect(credDoc).toContainText('529.982.247-25');

    const statusText = page.locator('#promoter-status-text');
    await expect(statusText).toHaveText('CREDENCIAL AUTORIZADA');

    // Auto-avanço para o e-mail
    const inputEmail = page.locator('#promoter-input-email');
    await expect(inputEmail).toBeVisible({ timeout: 4000 });
    await expect(inputEmail).toBeFocused();
  });

  test('4. Detecção de CPF inválido mantém estado pendente sem avançar', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[data-cta="hero"]').click();

    await page.locator('#promoter-input-phone').fill('11987654321');
    const inputCpf = page.locator('#promoter-input-cpf');
    await expect(inputCpf).toBeVisible({ timeout: 4000 });

    // CPF com todos os dígitos iguais (inválido)
    await inputCpf.fill('11111111111');

    // O passo de e-mail não deve abrir
    const inputEmail = page.locator('#promoter-input-email');
    await expect(inputEmail).not.toBeVisible();
    await expect(page.locator('#promoter-status-text')).not.toHaveText('CREDENCIAL AUTORIZADA');
  });

  test('5. Chips rápidos de e-mail e persistência de cookie supletivo.session', async ({ page, context }) => {
    // Acessa com polo
    await page.goto('/?hub=polo_sul');

    await page.locator('a[data-cta="hero"]').click();
    await page.locator('#promoter-input-phone').fill('11987654321');

    const inputCpf = page.locator('#promoter-input-cpf');
    await expect(inputCpf).toBeVisible({ timeout: 4000 });
    await inputCpf.fill('52998224725');

    const inputEmail = page.locator('#promoter-input-email');
    await expect(inputEmail).toBeVisible({ timeout: 4000 });

    // Digita prefixo do e-mail e clica no chip @gmail.com
    await inputEmail.fill('promotor.parceiro');
    const chipGmail = page.locator('button.domain-chip[data-domain="gmail.com"]');
    await expect(chipGmail).toBeVisible();
    await chipGmail.click();

    await expect(inputEmail).toHaveValue('promotor.parceiro@gmail.com');

    // Aguarda processamento de submissão
    await page.waitForTimeout(600);

    // Valida cookie gravado
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'supletivo.session');
    expect(sessionCookie).toBeDefined();

    if (sessionCookie) {
      const payload = JSON.parse(decodeURIComponent(sessionCookie.value));
      expect(payload.phone).toBe('11987654321');
      expect(payload.cpf).toBe('52998224725');
      expect(payload.email).toBe('promotor.parceiro@gmail.com');
      expect(payload.role).toBe('promoter');
      expect(payload.hub).toBe('polo_sul');
    }
  });

  test('6. Acessibilidade do modal de promotores (Axe-core WCAG 2A/AA)', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[data-cta="hero"]').click();

    const modal = page.locator('[data-promoter-capture-modal]');
    await expect(modal).toBeVisible();

    const axe = await new AxeBuilder({ page })
      .include('[data-promoter-capture-modal]')
      .analyze();

    expect(axe.violations).toEqual([]);
  });
});
