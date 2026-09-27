import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Ala de Testemunhos de Promotores (Testimonials)', () => {
  test('1. Seção #depoimentos renderiza corretamente com o promotor inicial', async ({ page }) => {
    await page.goto('/');

    const section = page.locator('#depoimentos');
    await expect(section).toBeVisible();

    const title = page.locator('#testimonials-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Quem indica o Supletivo Brasil');

    const spotlightName = page.locator('#spotlight-name');
    await expect(spotlightName).toHaveText('Camila Duarte');

    const spotlightEarnings = page.locator('#spotlight-earnings');
    await expect(spotlightEarnings).toContainText('R$ 2.400');

    const avatar = page.locator('#spotlight-img');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('src', '/images/testimonials/camila.jpg');
  });

  test('2. Troca interativa de promotor atualiza o spotlight dinamicamente', async ({ page }) => {
    await page.goto('/');

    // Clica no tab do segundo promotor (Júlio)
    const julioTab = page.locator('.promoter-tab[data-testimonial-idx="1"]');
    await expect(julioTab).toBeVisible();
    await julioTab.click();

    const spotlightName = page.locator('#spotlight-name');
    await expect(spotlightName).toHaveText('Júlio César Andrade');

    const spotlightEarnings = page.locator('#spotlight-earnings');
    await expect(spotlightEarnings).toContainText('R$ 3.800');

    const avatar = page.locator('#spotlight-img');
    await expect(avatar).toHaveAttribute('src', '/images/testimonials/julio.jpg');
  });

  test('3. CTA dentro do depoimento abre o modal de captação de promotores', async ({ page }) => {
    await page.goto('/');

    const cta = page.locator('#depoimentos a[data-cta="testimonials"]');
    await expect(cta).toBeVisible();
    await cta.click();

    const modal = page.locator('[data-promoter-capture-modal]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/is-active/);
  });

  test('4. Acessibilidade da ala de depoimentos (Axe-core WCAG 2A/AA)', async ({ page }) => {
    await page.goto('/');

    const axe = await new AxeBuilder({ page })
      .include('#depoimentos')
      .analyze();

    expect(axe.violations).toEqual([]);
  });
});
