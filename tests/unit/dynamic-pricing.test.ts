import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { initPromoterDynamicPricing } from '../../src/scripts/dynamic-pricing';

describe('initPromoterDynamicPricing', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-promoter-product-card>12x de R$ 99</div>
      <div data-promoter-win-card>12x de R$ 99</div>
      <div data-promoter-product-pix>R$ 999 no Pix</div>
      <div data-promoter-commission-val>R$ 100</div>
      <div data-promoter-commission-direct>R$ 100</div>
      <div data-promoter-calc-unit>R$ 100</div>
      <div data-promoter-phone-balance>200</div>
      <div data-promoter-phone-toast>+ R$ 100</div>
      <div data-promoter-bonus-flat>R$ 500</div>
      <div data-promoter-bonus-rule>ao bater 5 pagas na semana (1x)</div>
    `;
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('atualiza o DOM e dispara pricing:update com dados da borda rápida', async () => {
    const mockData = {
      pix: '1650.00',
      card: { installments: 12, installment: '137.50', total: '1650.00' },
      promo_pix: '999.00',
      promo_card: { installments: 12, installment: '99.00', total: '1188.00' },
      commission_direct: '100.00',
      commission_bonus_flat: '500.00',
      commission_bonus_threshold: 5,
    };

    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('db-edge.v7m.live')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        });
      }
      return Promise.reject(new Error('Fallback not needed'));
    });
    vi.stubGlobal('fetch', fetchMock);

    let eventDetail: any = null;
    window.addEventListener('pricing:update', (e: any) => {
      eventDetail = e.detail;
    });

    await initPromoterDynamicPricing();

    expect(fetchMock).toHaveBeenCalled();
    expect(document.querySelector('[data-promoter-product-card]')?.textContent).toMatch(/12x de R\$\s*99/);
    expect(document.querySelector('[data-promoter-win-card]')?.textContent).toMatch(/12x de R\$\s*99/);
    expect(document.querySelector('[data-promoter-product-pix]')?.textContent).toMatch(/R\$\s*999 no Pix/);
    expect(document.querySelector('[data-promoter-commission-val]')?.textContent).toMatch(/R\$\s*100/);
    expect(document.querySelector('[data-promoter-commission-direct]')?.textContent).toMatch(/R\$\s*100/);
    expect(document.querySelector('[data-promoter-calc-unit]')?.textContent).toMatch(/R\$\s*100/);
    expect(document.querySelector('[data-promoter-phone-balance]')?.textContent).toBe('200');
    expect(document.querySelector('[data-promoter-phone-toast]')?.textContent).toMatch(/\+\s*R\$\s*100/);
    expect(document.querySelector('[data-promoter-bonus-flat]')?.textContent).toMatch(/R\$\s*500/);
    expect(document.querySelector('[data-promoter-bonus-rule]')?.textContent).toBe('ao bater 5 pagas na semana (1x)');

    expect(eventDetail).toEqual({
      commissionDirect: 100,
      bonusFlat: 500,
      bonusThreshold: 5,
    });
  });

  it('faz fallback para os endpoints secundários quando a borda rápida falha', async () => {
    const mockData = {
      promo_pix: '850.00',
      promo_card: { installments: 10, installment: '85.00', total: '850.00' },
      commission_direct: '75.00',
      commission_bonus_flat: '400.00',
      commission_bonus_threshold: 4,
    };

    const calledUrls: string[] = [];
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      calledUrls.push(url);
      if (url.includes('db-edge.v7m.live')) {
        return Promise.reject(new Error('Edge offline'));
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    await initPromoterDynamicPricing();

    expect(calledUrls[0]).toContain('db-edge.v7m.live');
    expect(calledUrls.length).toBeGreaterThanOrEqual(2);
    expect(document.querySelector('[data-promoter-commission-val]')?.textContent).toMatch(/R\$\s*75/);
    expect(document.querySelector('[data-promoter-product-card]')?.textContent).toMatch(/10x de R\$\s*85/);
  });

  it('aceita valores de sandbox/testes pequenos sem travas artificiais duras', async () => {
    const testSandboxData = {
      promo_pix: '1.34',
      promo_card: { installments: 12, installment: '6.00', total: '72.00' },
      commission_direct: '10.00',
      commission_bonus_flat: '50.00',
      commission_bonus_threshold: 3,
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(testSandboxData),
      })
    );

    let eventDetail: any = null;
    window.addEventListener('pricing:update', (e: any) => {
      eventDetail = e.detail;
    });

    await initPromoterDynamicPricing();

    // Pix de R$ 1,34 formatado fielmente com centavos
    expect(document.querySelector('[data-promoter-product-pix]')?.textContent).toMatch(/R\$\s*1,34 no Pix/);
    // Cartão de R$ 6 formatado sem centavos
    expect(document.querySelector('[data-promoter-product-card]')?.textContent).toMatch(/12x de R\$\s*6/);
    expect(document.querySelector('[data-promoter-win-card]')?.textContent).toMatch(/12x de R\$\s*6/);
    // Comissão direta de R$ 10
    expect(document.querySelector('[data-promoter-commission-val]')?.textContent).toMatch(/R\$\s*10/);
    expect(document.querySelector('[data-promoter-commission-direct]')?.textContent).toMatch(/R\$\s*10/);
    expect(document.querySelector('[data-promoter-calc-unit]')?.textContent).toMatch(/R\$\s*10/);
    // Saldo do celular (2 * 10 = 20)
    expect(document.querySelector('[data-promoter-phone-balance]')?.textContent).toBe('20');
    // Toast do celular (+ R$ 10)
    expect(document.querySelector('[data-promoter-phone-toast]')?.textContent).toMatch(/\+\s*R\$\s*10/);
    // Bônus flat de R$ 50
    expect(document.querySelector('[data-promoter-bonus-flat]')?.textContent).toMatch(/R\$\s*50/);
    // Meta de 3 pagas
    expect(document.querySelector('[data-promoter-bonus-rule]')?.textContent).toBe('ao bater 3 pagas na semana (1x)');

    expect(eventDetail).toEqual({
      commissionDirect: 10,
      bonusFlat: 50,
      bonusThreshold: 3,
    });
  });
});
