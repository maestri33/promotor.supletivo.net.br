import { describe, it, expect } from 'vitest';
import { testimonialsPromotor } from '../../src/data/testimonials';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Promoter Testimonials Data & Integrity', () => {
  it('contém pelo menos 5 depoimentos de promotores documentados', () => {
    expect(testimonialsPromotor.length).toBeGreaterThanOrEqual(5);
  });

  it('todos os depoimentos possuem campos obrigatórios íntegros e autênticos', () => {
    for (const item of testimonialsPromotor) {
      expect(item.id).toBeTruthy();
      expect(item.name.trim().length).toBeGreaterThan(3);
      expect(item.location).toContain('-');
      expect(item.occupation.trim().length).toBeGreaterThan(5);
      expect(item.earnings).toContain('R$');
      expect(item.quote.trim().length).toBeGreaterThan(60);
      expect(item.story.trim().length).toBeGreaterThan(20);
      expect(item.paidReferrals).toMatch(/\d+\s+matrículas/);
      expect(item.pixVerified).toBe(true);
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
});
