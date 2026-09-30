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
  commission_direct?: string;
  commission_bonus_flat?: string;
  commission_bonus_threshold?: number;
}

function formatBrl(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export async function initPromoterDynamicPricing(): Promise<void> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/clients/pricing`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return;

    const data = (await res.json()) as PromoterPricingData;

    // 1. Preço do curso divulgado pelo promotor (ignora valores de teste de centavos/R$ 1 do sandbox)
    const rawCardInstallment = data.promo_card?.installment
      ? Number(data.promo_card.installment)
      : (data.card?.installment ? Number(data.card.installment) : 99);
    const rawPixPrice = data.promo_pix ? Number(data.promo_pix) : (data.pix ? Number(data.pix) : 999);
    const isCommercialCoursePrice =
      Number.isFinite(rawCardInstallment) && rawCardInstallment >= 10 && Number.isFinite(rawPixPrice) && rawPixPrice >= 100;

    const cardInstallment = isCommercialCoursePrice ? rawCardInstallment : 99;
    const cardInstallments = data.promo_card?.installments || data.card?.installments || 12;
    const pixPrice = isCommercialCoursePrice ? rawPixPrice : 999;

    const cardFormatted = `${cardInstallments}x de ${formatBrl(cardInstallment)}`;
    const pixFormatted = `${formatBrl(pixPrice)} no Pix`;

    document.querySelectorAll<HTMLElement>('[data-promoter-product-card]').forEach((el) => {
      el.textContent = cardFormatted;
    });
    document.querySelectorAll<HTMLElement>('[data-promoter-product-pix]').forEach((el) => {
      el.textContent = pixFormatted;
    });
    document.querySelectorAll<HTMLElement>('[data-promoter-win-card]').forEach((el) => {
      el.textContent = cardFormatted;
    });

    // 2. Comissões e Bônus (apenas valores comerciais >= R$ 50 / R$ 100 / lote >= 5)
    let newDirect: number | undefined;
    let newBonus: number | undefined;
    let newThreshold: number | undefined;

    if (data.commission_direct) {
      const commDirectNum = Number(data.commission_direct);
      if (Number.isFinite(commDirectNum) && commDirectNum >= 50) {
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
          el.textContent = String(Math.round(commDirectNum * 2));
        });
        document.querySelectorAll<HTMLElement>('[data-promoter-phone-toast]').forEach((el) => {
          el.textContent = `+ ${commDirectStr}`;
        });
      }
    }

    if (data.commission_bonus_flat) {
      const bonusFlatNum = Number(data.commission_bonus_flat);
      if (Number.isFinite(bonusFlatNum) && bonusFlatNum >= 100) {
        newBonus = bonusFlatNum;
        const bonusFlatStr = formatBrl(bonusFlatNum);
        document.querySelectorAll<HTMLElement>('[data-promoter-bonus-flat]').forEach((el) => {
          el.textContent = bonusFlatStr;
        });
      }
    }

    if (data.commission_bonus_threshold) {
      const threshold = Number(data.commission_bonus_threshold);
      if (Number.isFinite(threshold) && threshold >= 5) {
        newThreshold = threshold;
        document.querySelectorAll<HTMLElement>('[data-promoter-bonus-rule]').forEach((el) => {
          el.textContent = `ao bater ${threshold} pagas na semana (1x)`;
        });
      }
    }

    // Dispara evento para sincronizar calculadora interativa se houver atualização comercial
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
