import { describe, expect, it } from 'vitest';
import {
  COMMISSION_DIRECT,
  BONUS_FLAT,
  BONUS_THRESHOLD,
  BONUS_REPEATS,
  bonusBlocks,
  weeklyEarnings,
  brl,
} from '../../src/config';

describe('Configurações Financeiras e Escada de Comissões', () => {
  it('garante os valores base padrão da organização', () => {
    expect(COMMISSION_DIRECT).toBe(100);
    expect(BONUS_FLAT).toBe(500);
    expect(BONUS_THRESHOLD).toBe(5);
  });

  describe('bonusBlocks()', () => {
    it('retorna 0 para quantidades abaixo do threshold (< 5)', () => {
      expect(bonusBlocks(0)).toBe(0);
      expect(bonusBlocks(1)).toBe(0);
      expect(bonusBlocks(4)).toBe(0);
    });

    it('retorna a quantidade correta de blocos de bônus no limiar e acima', () => {
      expect(bonusBlocks(5)).toBe(1);
      if (BONUS_REPEATS) {
        expect(bonusBlocks(9)).toBe(1);
        expect(bonusBlocks(10)).toBe(2);
        expect(bonusBlocks(15)).toBe(3);
        expect(bonusBlocks(20)).toBe(4);
      } else {
        expect(bonusBlocks(10)).toBe(1);
        expect(bonusBlocks(20)).toBe(1);
      }
    });

    it('trata entradas negativas de forma segura', () => {
      expect(bonusBlocks(-5)).toBe(0);
    });
  });

  describe('weeklyEarnings()', () => {
    it('calcula corretamente 0 indicações', () => {
      const res = weeklyEarnings(0);
      expect(res).toEqual({ direct: 0, bonus: 0, total: 0 });
    });

    it('calcula corretamente 1 indicação paga (R$ 100 direto, 0 bônus)', () => {
      const res = weeklyEarnings(1);
      expect(res.direct).toBe(100);
      expect(res.bonus).toBe(0);
      expect(res.total).toBe(100);
    });

    it('calcula 4 indicações pagas (R$ 400 direto, 0 bônus)', () => {
      const res = weeklyEarnings(4);
      expect(res.direct).toBe(400);
      expect(res.bonus).toBe(0);
      expect(res.total).toBe(400);
    });

    it('calcula 5 indicações pagas (R$ 500 direto + R$ 500 bônus = R$ 1.000)', () => {
      const res = weeklyEarnings(5);
      expect(res.direct).toBe(500);
      expect(res.bonus).toBe(500);
      expect(res.total).toBe(1000);
    });

    it('calcula 10 indicações pagas com bônus acumulativo ou único', () => {
      const res = weeklyEarnings(10);
      expect(res.direct).toBe(1000);
      if (BONUS_REPEATS) {
        expect(res.bonus).toBe(1000);
        expect(res.total).toBe(2000);
      } else {
        expect(res.bonus).toBe(500);
        expect(res.total).toBe(1500);
      }
    });

    it('trata números fracionários arredondando para baixo (indicações são inteiras)', () => {
      const res = weeklyEarnings(5.8);
      expect(res.direct).toBe(500);
      expect(res.bonus).toBe(500);
      expect(res.total).toBe(1000);
    });
  });

  describe('brl()', () => {
    it('formata valores monetários em formato BRL', () => {
      const formatted100 = brl(100);
      expect(formatted100).toMatch(/R\$\s*100/);

      const formatted1000 = brl(1000);
      expect(formatted1000).toMatch(/R\$\s*1\.000/);

      const formatted2500 = brl(2500);
      expect(formatted2500).toMatch(/R\$\s*2\.500/);
    });
  });
});
