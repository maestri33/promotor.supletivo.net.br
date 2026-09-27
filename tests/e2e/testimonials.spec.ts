import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Ala de Testemunhos de Promotores (AnimatedTestimonials)', () => {
  test('1. Seção #depoimentos renderiza corretamente com o promotor inicial', async ({ page }) => {
    await page.goto('/');

    const section = page.locator('#depoimentos');
    await expect(section).toBeVisible();

    const title = page.locator('#testimonials-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Quem indica o supletivo');

    // Primeiro depoimento (Camila Duarte)
    const activeName = section.locator('h3');
    await expect(activeName).toContainText('Camila Duarte');

    const avatar = section.locator('img[alt="Foto de Camila Duarte"]');
    await expect(avatar).toBeVisible();
  });

  test('2. Troca interativa com botão de próximo avança para o próximo promotor', async ({ page }) => {
    await page.goto('/');

    const section = page.locator('#depoimentos');
    await section.scrollIntoViewIfNeeded();
    // Aguarda hidratação do componente client:visible do Astro
    await page.waitForTimeout(600);

    const nextButton = section.locator('button[aria-label="Próximo depoimento"]');
    await expect(nextButton).toBeVisible();

    // Clica no botão próximo
    await nextButton.click();

    // Deve avançar para Júlio César Andrade
    const activeName = section.locator('h3');
    await expect(activeName).toContainText('Júlio César Andrade', { timeout: 8000 });

    const avatar = section.locator('img[alt="Foto de Júlio César Andrade"]');
    await expect(avatar).toBeVisible();
  });

  test('3. Navegação reversa com botão anterior volta ao promotor anterior', async ({ page }) => {
    await page.goto('/');

    const section = page.locator('#depoimentos');
    await section.scrollIntoViewIfNeeded();
    // Aguarda hidratação do componente client:visible do Astro
    await page.waitForTimeout(600);

    const prevButton = section.locator('button[aria-label="Depoimento anterior"]');
    await expect(prevButton).toBeVisible();

    // Clica no botão anterior (deve ir para o último do array: Dona Neide Ribeiro)
    await prevButton.click();

    const activeName = section.locator('h3');
    await expect(activeName).toContainText('Dona Neide Ribeiro', { timeout: 8000 });
  });

  test('4. Acessibilidade da ala de depoimentos (Axe-core WCAG 2A/AA)', async ({ page }) => {
    await page.goto('/');

    const axe = await new AxeBuilder({ page })
      .include('#depoimentos')
      .analyze();

    expect(axe.violations).toEqual([]);
  });
});
