import { describe, it, expect } from 'vitest';
import { formatPoloDisplayName } from '../../src/scripts/polo-formatter';

describe('formatPoloDisplayName', () => {
  it('formata slugs genéricos e de teste como Regional Autorizado', () => {
    expect(formatPoloDisplayName('polo1')).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('polo2')).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('polo_1')).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('hub-123')).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('polo_regional')).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('teste')).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('padrao')).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('12345')).toBe('Regional Autorizado');
  });

  it('formata UUIDs como Regional Credenciado', () => {
    expect(formatPoloDisplayName('019318b7-6f6a-73d2-8b9a-7c92bdfb32f9')).toBe('Regional Credenciado');
  });

  it('formata capitais e regiões metropolitanas mapeadas', () => {
    expect(formatPoloDisplayName('sp_centro')).toBe('São Paulo (Centro)');
    expect(formatPoloDisplayName('sp-centro')).toBe('São Paulo (Centro)');
    expect(formatPoloDisplayName('polo_sp_centro')).toBe('São Paulo (Centro)');
    expect(formatPoloDisplayName('rj_capital')).toBe('Rio de Janeiro (Capital)');
    expect(formatPoloDisplayName('bh')).toBe('Belo Horizonte');
    expect(formatPoloDisplayName('curitiba')).toBe('Curitiba');
    expect(formatPoloDisplayName('porto_alegre')).toBe('Porto Alegre');
    expect(formatPoloDisplayName('osasco')).toBe('Osasco');
    expect(formatPoloDisplayName('polo_osasco')).toBe('Osasco');
    expect(formatPoloDisplayName('campinas')).toBe('Campinas');
  });

  it('formata slugs desconhecidos em Title Case elegante respeitando preposições PT-BR', () => {
    expect(formatPoloDisplayName('juiz_de_fora')).toBe('Juiz de Fora');
    expect(formatPoloDisplayName('polo_campo_grande')).toBe('Campo Grande');
    expect(formatPoloDisplayName('vila-velha')).toBe('Vila Velha');
  });

  it('retorna fallback seguro para valores nulos ou vazios', () => {
    expect(formatPoloDisplayName(null)).toBe('Regional Autorizado');
    expect(formatPoloDisplayName(undefined)).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('')).toBe('Regional Autorizado');
    expect(formatPoloDisplayName('   ')).toBe('Regional Autorizado');
  });
});
