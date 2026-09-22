import { describe, expect, it } from 'vitest';
import {
  validatePhone,
  formatPhone,
  validateCPF,
  formatCPF,
  isEmailFormatValid,
  completeEmailWithDomain,
} from '../../src/utils/validators';

describe('Validadores de Lead & Promotor (src/utils/validators.ts)', () => {
  describe('validatePhone() & formatPhone()', () => {
    it('aceita celulares válidos de 11 dígitos com 9 no início', () => {
      expect(validatePhone('11987654321')).toBe(true);
      expect(validatePhone('(43) 99664-8750')).toBe(true);
      expect(validatePhone('21999990001')).toBe(true);
    });

    it('rejeita números inválidos ou com menos de 11 dígitos', () => {
      expect(validatePhone('1187654321')).toBe(false); // 10 dígitos (fixo)
      expect(validatePhone('11787654321')).toBe(false); // não inicia com 9
      expect(validatePhone('05987654321')).toBe(false); // DDD inválido
      expect(validatePhone('11111111111')).toBe(false); // todos iguais
    });

    it('formata telefone corretamente', () => {
      expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
      expect(formatPhone('43996648750')).toBe('(43) 99664-8750');
    });
  });

  describe('validateCPF() & formatCPF()', () => {
    it('valida CPFs matematicamente válidos pelo Módulo 11', () => {
      expect(validateCPF('52998224725')).toBe(true);
      expect(validateCPF('529.982.247-25')).toBe(true);
      expect(validateCPF('12345678900')).toBe(false); // dígito incorreto
    });

    it('rejeita sequências de dígitos repetidos', () => {
      expect(validateCPF('00000000000')).toBe(false);
      expect(validateCPF('11111111111')).toBe(false);
      expect(validateCPF('99999999999')).toBe(false);
    });

    it('formata CPF corretamente', () => {
      expect(formatCPF('52998224725')).toBe('529.982.247-25');
    });
  });

  describe('isEmailFormatValid() & completeEmailWithDomain()', () => {
    it('valida formatos corretos de e-mail', () => {
      expect(isEmailFormatValid('promotor@supletivo.net.br')).toBe(true);
      expect(isEmailFormatValid('teste.parceiro+1@gmail.com')).toBe(true);
      expect(isEmailFormatValid('invalido')).toBe(false);
      expect(isEmailFormatValid('teste@')).toBe(false);
      expect(isEmailFormatValid('@dominio.com')).toBe(false);
    });

    it('autocompleta o e-mail anexando o domínio do chip', () => {
      expect(completeEmailWithDomain('promotor', 'gmail.com')).toBe('promotor@gmail.com');
      expect(completeEmailWithDomain('promotor@errado', 'hotmail.com')).toBe('promotor@hotmail.com');
      expect(completeEmailWithDomain('promotor', '@outlook.com')).toBe('promotor@outlook.com');
    });
  });
});
