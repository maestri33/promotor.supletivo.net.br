import { test, expect } from '@playwright/test';

test.describe('Conformidade Regulatória, CRO e Ergonomia Mobile (Issue #3 & #5)', () => {

  test('1. Validação de Copy Anti-Atrito no Passo 3', async ({ page }) => {
    await page.goto('/');

    // Passo 3 deve conter explicitamente a copy da matrícula confirmada
    const step3 = page.locator('.step-card h3').nth(2);
    await expect(step3).toBeVisible();
    await expect(step3).toHaveText('Matrícula confirmada, Pix na sua conta');

    // Não deve conter a copy ambígua legada
    const content = await page.content();
    expect(content).not.toContain('Ela conclui, você recebe no Pix');
  });

  test('2. Ausência de Overclaim Regulatório MEC/SISTEC e Presença de LDB 9.394/96 e CEE', async ({ page }) => {
    await page.goto('/');

    const content = await page.content();

    // Proibido overclaim de MEC ou SISTEC para EJA
    expect(content).not.toMatch(/Reconhecido pelo MEC e SISTEC/i);
    expect(content).not.toMatch(/MEC · SISTEC/i);

    // Obrigatório amparo legal LDB 9.394/96 e CEE
    expect(content).toMatch(/LDB\s*9\.394\/96/i);
    expect(content).toMatch(/CEE/i);

    // Selo oficial deve ter role="img" e aria-label adequado
    const badge = page.locator('svg[aria-label*="LDB 9.394/96"]');
    await expect(badge.first()).toBeVisible();
  });

  test('3. Ergonomia Touch >= 48px em Viewport Mobile Estreito (360x640)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/');

    // 3.1 Presets da Calculadora
    const presets = page.locator('[data-calc-preset]');
    const count = await presets.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const box = await presets.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(47.5); // tolerância subpixel
      expect(box!.width).toBeGreaterThanOrEqual(47.5);
    }

    // 3.2 FAQ Chips
    const chips = page.locator('.faq-chip');
    const chipCount = await chips.count();
    for (let i = 0; i < chipCount; i++) {
      const box = await chips.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(47.5);
    }

    // 3.3 Botão Flutuante Voltar ao Topo (.btt)
    await page.evaluate(() => window.scrollTo(0, 1500));
    const btt = page.locator('.btt.is-visible');
    await btt.waitFor({ state: 'visible', timeout: 5000 });
    const bttBox = await btt.boundingBox();
    expect(bttBox).not.toBeNull();
    expect(bttBox!.height).toBeGreaterThanOrEqual(47.5);
    expect(bttBox!.width).toBeGreaterThanOrEqual(47.5);

    // 3.4 Sticky CTA Botão
    const stickyBtn = page.locator('.sticky-btn');
    const stickyBox = await stickyBtn.boundingBox();
    if (stickyBox) {
      expect(stickyBox.height).toBeGreaterThanOrEqual(47.5);
    }
  });

  test('4. Ergonomia Touch em Viewport Mobile Médio (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mainBtn = page.locator('.btn[data-cta="hero"]');
    const btnBox = await mainBtn.boundingBox();
    expect(btnBox).not.toBeNull();
    expect(btnBox!.height).toBeGreaterThanOrEqual(47.5);
  });

  test('5. Transparência do Preço do Aluno na Seção de Produto', async ({ page }) => {
    await page.goto('/');

    const productSection = page.locator('#produto');
    await expect(productSection).toBeVisible();

    const text = await productSection.textContent();
    expect(text).toContain('12x de R$ 99');
    expect(text).toContain('R$ 999 no Pix');
  });

});
