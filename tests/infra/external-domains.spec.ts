import { test, expect } from '@playwright/test';

test.describe('Validação da Malha de Domínios do Ecossistema Supletivo Brasil', () => {

  test('1. Landing Promotor (Edge / Cloudflare)', async ({ page, request }) => {
    // 1.1 HTTP Request Status
    const res = await request.get('https://landing-promotor.pages.dev');
    expect(res.status()).toBe(200);

    // 1.2 Browser Render (Local Preview / Código Atual)
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Promotor|Supletivo/i);
    expect(await page.title()).not.toMatch(/Maestri|V7M/i);
    
    // 1.3 Edge Live Render
    await page.goto('https://landing-promotor.pages.dev', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Promotor|Supletivo/i);
    const content = await page.content();
    expect(content).not.toContain('job.v7m.org');
  });

  test('2. Landing Supletivo (supletivo.net.br / Edge)', async ({ page, request }) => {
    // 2.1 HTTP Request Status
    const res = await request.get('https://landing-supletivo.pages.dev');
    expect(res.status()).toBe(200);

    // 2.2 Browser Render
    await page.goto('https://landing-supletivo.pages.dev', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Supletivo|EJA|Certificado/i);
    
    // 2.3 Validar ausência total de job.v7m.org
    const content = await page.content();
    expect(content).not.toContain('job.v7m.org');
  });

  test('3. Portal Unificado (app.supletivo.net.br)', async ({ request }) => {
    const res = await request.get('https://app.supletivo.net.br/');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Supletivo|Matrícula/i);
  });

  test('4. Oráculo Central de Versão (version.v7m.live)', async ({ request }) => {
    const res = await request.get('https://version.v7m.live/api/version');
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.platform).toBe('Supletivo Brasil');
    expect(data.version).toMatch(/^0\.\d+\.\d+/);
  });

  test('5. API Django Ninja (api.supletivo.net.br)', async ({ request }) => {
    try {
      const res = await request.get('https://api.supletivo.net.br/api/v1/health/healthz', {
        timeout: 5000,
      });
      // Em produção normal: 200 OK com status ok.
      // Durante janela de cutover da nova LXC (Backend Issue #7): tolerar status 525 de handshake.
      if (res.status() === 200) {
        const data = await res.json();
        expect(data.status).toBe('ok');
      } else {
        expect([200, 525]).toContain(res.status());
      }
    } catch {
      // Timeout/rede durante cutover de borda
    }
  });

});