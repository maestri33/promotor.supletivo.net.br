/**
 * validators.ts — Utilitários de validação e formatação para captura de leads e promotores
 * Funções puras e testáveis: Telefone, CPF (Módulo 11) e E-mail.
 */

/** Valida telefone brasileiro com DDD e nono dígito (11 dígitos numéricos) */
export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  // DDDs válidos de 11 a 99
  const ddd = parseInt(digits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return false;
  // Nono dígito deve ser 9 para celular
  if (digits[2] !== '9') return false;
  // Rejeita sequências repetidas (ex.: 11999999999 até pode ocorrer, mas rejeita todos iguais)
  if (/^(\d)\1{10}$/.test(digits)) return false;
  return true;
}

/** Formata telefone no padrão (DD) 9XXXX-XXXX */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Valida CPF através do algoritmo oficial de Módulo 11 da Receita Federal */
export function validateCPF(rawCpf: string): boolean {
  if (!rawCpf) return false;
  const cpf = rawCpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  const dv1 = remainder >= 10 ? 0 : remainder;
  if (dv1 !== parseInt(cpf.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  const dv2 = remainder >= 10 ? 0 : remainder;
  return dv2 === parseInt(cpf.charAt(10), 10);
}

/** Formata CPF no padrão XXX.XXX.XXX-XX */
export function formatCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/** Valida formato de e-mail */
export function isEmailFormatValid(email: string): boolean {
  const clean = email.trim();
  if (!clean || clean.length < 5 || clean.length > 254) return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(clean);
}

/** Autocompleta o e-mail anexando o domínio do chip */
export function completeEmailWithDomain(currentValue: string, domain: string): string {
  const clean = currentValue.trim();
  const atIndex = clean.indexOf('@');
  const user = atIndex > 0 ? clean.slice(0, atIndex) : clean;
  if (!user) return '';
  const cleanDomain = domain.startsWith('@') ? domain.slice(1) : domain;
  return `${user}@${cleanDomain}`;
}
