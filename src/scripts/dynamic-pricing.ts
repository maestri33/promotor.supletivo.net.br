import { BACKEND_URL } from '../config';

export interface PromoterPricingData {
  pix: string;
  card: {
    installments: number;
    installment: string;
    total: string;
  };
  promo_pix?: string;
  promo_card?: {
    installments: number;
    installment: string;
    total: string;
  };
  has_discount?: boolean;
  promoter_name?: string | null;
  anchor_full?: string | null;
  commission_direct?: string | number;
  commission_bonus_flat?: string | number;
  commission_bonus_threshold?: number | string;
}

function formatBrl(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export async function initPromoterDynamicPricing(): Promise<void> {
  try {
    // 1. Resiliência idêntica à landing de captação supletivo.net.br:
    // Tenta a borda rápida (db-edge.v7m.live), com fallback para BACKEND_URL e backend.supletivo.net.br
    const endpoints = Array.from(
      new Set([
        'https://db-edge.v7m.live/api/v1/clients/pricing',
        `${BACKEND_URL}/api/v1/clients/pricing`,
        'https://backend.supletivo.net.br/api/v1/clients/pricing',
      ])
    );

    let data: PromoterPricingData | null = null;

    for (let i = 0; i < endpoints.length; i++) {
      try {
        const timeoutMs = i === 0 ? 1500 : 2500;
        const res = await fetch(endpoints[i], {
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (res.ok) {
          data = (await res.json()) as PromoterPricingData;
          break;
        }
      } catch {
        // Falha no endpoint atual, segue para o próximo fallback
      }
    }

    if (!data) return;

    // 2. Preço do curso divulgado pelo promotor
    // Sem travas artificiais duras: aceita qualquer valor finito > 0 (suporte a testes/sandbox)
    const activeCard = data.promo_card || data.card;
    const rawCardInstallment = activeCard?.installment ? Number(activeCard.installment) : NaN;
    const cardInstallments = activeCard?.installments || 12;
    const rawPixPrice = data.promo_pix ? Number(data.promo_pix) : (data.pix ? Number(data.pix) : NaN);

    if (Number.isFinite(rawCardInstallment) && rawCardInstallment > 0) {
      const cardFormatted = `${cardInstallments}x de ${formatBrl(rawCardInstallment)}`;
      document.querySelectorAll<HTMLElement>('[data-promoter-product-card]').forEach((el) => {
        el.textContent = cardFormatted;
      });
      document.querySelectorAll<HTMLElement>('[data-promoter-win-card]').forEach((el) => {
        el.textContent = cardFormatted;
      });
    }

    if (Number.isFinite(rawPixPrice) && rawPixPrice > 0) {
      const pixFormatted = `${formatBrl(rawPixPrice)} no Pix`;
      document.querySelectorAll<HTMLElement>('[data-promoter-product-pix]').forEach((el) => {
        el.textContent = pixFormatted;
      });
    }

    // 3. Comissões e Bônus
    // Sem travas duras (ex: commDirectNum >= 50, bonusFlatNum >= 100, threshold >= 5)
    let newDirect: number | undefined;
    let newBonus: number | undefined;
    let newThreshold: number | undefined;

    if (data.commission_direct !== undefined && data.commission_direct !== null) {
      const commDirectNum = Number(data.commission_direct);
      if (Number.isFinite(commDirectNum) && commDirectNum > 0) {
        newDirect = commDirectNum;
        const commDirectStr = formatBrl(commDirectNum);

        document.querySelectorAll<HTMLElement>('[data-promoter-commission-val]').forEach((el) => {
          el.textContent = commDirectStr;
        });
        document.querySelectorAll<HTMLElement>('[data-promoter-commission-direct]').forEach((el) => {
          el.textContent = commDirectStr;
        });
        document.querySelectorAll<HTMLElement>('[data-promoter-calc-unit]').forEach((el) => {
          el.textContent = commDirectStr;
        });
        document.querySelectorAll<HTMLElement>('[data-promoter-phone-balance]').forEach((el) => {
          el.textContent = formatNumber(commDirectNum * 2);
        });
        document.querySelectorAll<HTMLElement>('[data-promoter-phone-toast]').forEach((el) => {
          el.textContent = `+ ${commDirectStr}`;
        });
      }
    }

    if (data.commission_bonus_flat !== undefined && data.commission_bonus_flat !== null) {
      const bonusFlatNum = Number(data.commission_bonus_flat);
      if (Number.isFinite(bonusFlatNum) && bonusFlatNum > 0) {
        newBonus = bonusFlatNum;
        const bonusFlatStr = formatBrl(bonusFlatNum);
        document.querySelectorAll<HTMLElement>('[data-promoter-bonus-flat]').forEach((el) => {
          el.textContent = bonusFlatStr;
        });
      }
    }

    if (data.commission_bonus_threshold !== undefined && data.commission_bonus_threshold !== null) {
      const threshold = Number(data.commission_bonus_threshold);
      if (Number.isFinite(threshold) && threshold > 0) {
        newThreshold = Math.round(threshold);
        document.querySelectorAll<HTMLElement>('[data-promoter-bonus-rule]').forEach((el) => {
          el.textContent = `ao bater ${newThreshold} pagas na semana (1x)`;
        });
      }
    }

    // 4. Dispara evento para sincronizar calculadora interativa se houver atualização comercial
    if (newDirect !== undefined || newBonus !== undefined || newThreshold !== undefined) {
      window.dispatchEvent(
        new CustomEvent('pricing:update', {
          detail: {
            commissionDirect: newDirect,
            bonusFlat: newBonus,
            bonusThreshold: newThreshold,
          },
        })
      );
    }
  } catch {
    // API offline/dev: mantém valores de SSR sem travar
  }
}
