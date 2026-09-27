import { describe, it, expect } from 'vitest';
import { testimonialsPromotor } from '../../src/data/testimonials';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Testimonials Promotor — Compliance & Integrity', () => {
  it('contém pelo menos 5 depoimentos de promotores documentados', () => {
    expect(testimonialsPromotor.length).toBeGreaterThanOrEqual(5);
  });

  it('todos os depoimentos possuem campos obrigatórios íntegros e autênticos', () => {
    for (const item of testimonialsPromotor) {
      expect(item.name.trim().length).toBeGreaterThan(3);
      expect(item.designation.trim().length).toBeGreaterThan(5);
      expect(item.designation).toContain('-');
      expect(item.quote.trim().length).toBeGreaterThan(60);
      expect(item.src).toMatch(/^(\/images\/testimonials\/|https:\/\/)/);
      if (item.outcome) {
        expect(item.outcome).toContain('Pix');
      }
    }
  });

  it('todos os arquivos de imagem dos avatares existem fisicamente em public/', () => {
    const publicDir = path.resolve(__dirname, '../../public');
    for (const item of testimonialsPromotor) {
      expect(item.src.startsWith('/images/testimonials/')).toBe(true);
      const relativePath = item.src.replace(/^\//, '');
      const fullPath = path.join(publicDir, relativePath);
      expect(fs.existsSync(fullPath)).toBe(true);
      const stats = fs.statSync(fullPath);
      expect(stats.size).toBeGreaterThan(10_000); // Garante que a imagem é válida (>10KB)
    }
  });

  it('respeita diretrizes regulatórias e termos proibidos', () => {
    const prohibitedTerms = [
      'fique rico',
      'dinheiro fácil',
      'pirâmide',
      'sem trabalhar',
      'comprar diploma',
    ];

    for (const t of testimonialsPromotor) {
      const fullText = `${t.name} ${t.designation} ${t.quote}`.toLowerCase();
      for (const term of prohibitedTerms) {
        expect(fullText).not.toContain(term.toLowerCase());
      }
    }
  });
});
