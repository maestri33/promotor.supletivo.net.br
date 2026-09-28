import { test, expect } from '@playwright/test';

test.describe('Validação Comparativa no Navegador: promotor.supletivo.net.br vs supletivo.net.br', () => {

  test('1. Paridade de Tokens do Design System Pátria Amada Refinada (:root)', async ({ page }) => {
    // 1.1 Coleta tokens em promotor (local preview / app sob teste)
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const promotorTokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        green: style.getPropertyValue('--green').trim().toLowerCase(),
        yellow: style.getPropertyValue('--yellow').trim().toLowerCase(),
        blue: style.getPropertyValue('--blue').trim().toLowerCase(),
        ink: style.getPropertyValue('--ink').trim().toLowerCase(),
        paper: style.getPropertyValue('--paper').trim().toLowerCase(),
      };
    });

    // 1.2 Coleta tokens no supletivo.net.br (referência canônica)
    await page.goto('https://supletivo.net.br', { waitUntil: 'domcontentloaded' });
    const supletivoTokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        green: style.getPropertyValue('--green').trim().toLowerCase(),
        yellow: style.getPropertyValue('--yellow').trim().toLowerCase(),
        blue: style.getPropertyValue('--blue').trim().toLowerCase(),
        ink: style.getPropertyValue('--ink').trim().toLowerCase(),
        paper: style.getPropertyValue('--paper').trim().toLowerCase(),
      };
    });

    const normalizeHex = (hex: string) => (hex === '#fff' ? '#ffffff' : hex);

    // 1.3 Assegura que ambos possuem os mesmos valores canônicos
    expect(normalizeHex(promotorTokens.green)).toBe('#00734d');
    expect(normalizeHex(supletivoTokens.green)).toBe('#00734d');
    expect(normalizeHex(promotorTokens.green)).toBe(normalizeHex(supletivoTokens.green));

    expect(normalizeHex(promotorTokens.yellow)).toBe('#ffc400');
    expect(normalizeHex(supletivoTokens.yellow)).toBe('#ffc400');
    expect(normalizeHex(promotorTokens.yellow)).toBe(normalizeHex(supletivoTokens.yellow));

    expect(normalizeHex(promotorTokens.blue)).toBe('#002776');
    expect(normalizeHex(supletivoTokens.blue)).toBe('#002776');
    expect(normalizeHex(promotorTokens.blue)).toBe(normalizeHex(supletivoTokens.blue));

    expect(normalizeHex(promotorTokens.ink)).toBe('#0b1220');
    expect(normalizeHex(supletivoTokens.ink)).toBe('#0b1220');
    expect(normalizeHex(promotorTokens.ink)).toBe(normalizeHex(supletivoTokens.ink));

    expect(normalizeHex(promotorTokens.paper)).toBe('#ffffff');
    expect(normalizeHex(supletivoTokens.paper)).toBe('#ffffff');
    expect(normalizeHex(promotorTokens.paper)).toBe(normalizeHex(supletivoTokens.paper));
  });

  test('2. Paridade de Botões de Ação Primária (.btn)', async ({ page }) => {
    // 2.1 Botão do Promotor
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const promotorBtn = page.locator('.btn').first();
    await expect(promotorBtn).toBeVisible();

    const promotorBtnStyles = await promotorBtn.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        fontWeight: cs.fontWeight,
        textDecoration: cs.textDecorationLine,
      };
    });

    // 2.2 Botão do Supletivo (Referência)
    await page.goto('https://supletivo.net.br', { waitUntil: 'domcontentloaded' });
    const supletivoBtn = page.locator('.btn').first();
    await expect(supletivoBtn).toBeVisible();

    const supletivoBtnStyles = await supletivoBtn.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        fontWeight: cs.fontWeight,
        textDecoration: cs.textDecorationLine,
      };
    });

    // 2.3 Comparação e Paridade Rigorosa
    // Fundo Amarelo Conversão: rgb(255, 196, 0)
    expect(promotorBtnStyles.backgroundColor).toBe('rgb(255, 196, 0)');
    expect(supletivoBtnStyles.backgroundColor).toBe('rgb(255, 196, 0)');
    expect(promotorBtnStyles.backgroundColor).toBe(supletivoBtnStyles.backgroundColor);

    // Texto Ink de Alto Contraste: rgb(11, 18, 32)
    expect(promotorBtnStyles.color).toBe('rgb(11, 18, 32)');
    expect(supletivoBtnStyles.color).toBe('rgb(11, 18, 32)');
    expect(promotorBtnStyles.color).toBe(supletivoBtnStyles.color);

    // Tipografia em negrito
    expect(parseInt(promotorBtnStyles.fontWeight, 10)).toBeGreaterThanOrEqual(700);
    expect(parseInt(supletivoBtnStyles.fontWeight, 10)).toBeGreaterThanOrEqual(700);
  });

  test('3. Paridade Estrutural do Cabeçalho (Header Sticky & Glass)', async ({ page }) => {
    // 3.1 Promotor Header
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const promotorHeader = page.locator('header').first();
    await expect(promotorHeader).toBeVisible();

    const promotorHeaderPos = await promotorHeader.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        position: cs.position,
        zIndex: cs.zIndex,
        hasBackdrop: cs.backdropFilter !== 'none' || cs.webkitBackdropFilter !== 'none',
      };
    });

    // 3.2 Supletivo Header
    await page.goto('https://supletivo.net.br', { waitUntil: 'domcontentloaded' });
    const supletivoHeader = page.locator('header').first();
    await expect(supletivoHeader).toBeVisible();

    const supletivoHeaderPos = await supletivoHeader.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        position: cs.position,
        zIndex: cs.zIndex,
        hasBackdrop: cs.backdropFilter !== 'none' || cs.webkitBackdropFilter !== 'none',
      };
    });

    // Ambos devem ser sticky no topo
    expect(promotorHeaderPos.position).toBe('sticky');
    expect(supletivoHeaderPos.position).toBe('sticky');
    expect(promotorHeaderPos.hasBackdrop).toBe(true);
    expect(supletivoHeaderPos.hasBackdrop).toBe(true);
  });

  test('4. Paridade Tipográfica (Font Families)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const promotorBodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);

    await page.goto('https://supletivo.net.br', { waitUntil: 'domcontentloaded' });
    const supletivoBodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);

    // Ambos usam Inter como fonte principal do corpo
    expect(promotorBodyFont.toLowerCase()).toContain('inter');
    expect(supletivoBodyFont.toLowerCase()).toContain('inter');
  });

  test('5. Paridade do Rodapé Institucional (Footer & Bandeira Tricolor)', async ({ page }) => {
    // 5.1 Promotor Footer
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const promotorFlag = page.locator('.footer-flag');
    await expect(promotorFlag).toBeAttached();

    // 5.2 Supletivo Footer
    await page.goto('https://supletivo.net.br', { waitUntil: 'domcontentloaded' });
    const supletivoFlag = page.locator('.footer-flag');
    await expect(supletivoFlag).toBeAttached();
  });

  test('6. Captura de Screenshots Comparativos no Navegador', async ({ page }) => {
    // 6.1 Screenshot Promotor (Hero)
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    const promotorHero = page.locator('#hero');
    await expect(promotorHero).toBeVisible();
    await promotorHero.screenshot({ path: 'test-results/comparison-hero-promotor.png' });

    // 6.2 Screenshot Supletivo (Hero)
    await page.goto('https://supletivo.net.br', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    const supletivoHero = page.locator('#hero');
    await expect(supletivoHero).toBeVisible();
    await supletivoHero.screenshot({ path: 'test-results/comparison-hero-supletivo.png' });
  });

});
