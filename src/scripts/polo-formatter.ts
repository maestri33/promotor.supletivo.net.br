/**
 * Utilitário de formatação humana de polos e regionais (PT-BR).
 *
 * Transforma parâmetros brutos da URL (?hub= ou ?ref=), como 'polo1',
 * 'polo_regional', 'sp_centro', UUIDs ou slugs técnicos em referências
 * elegantes e humanas para exibição nos componentes visuais (FloatingHubAlert e Hero badge).
 *
 * O identificador técnico original permanece intacto no nível de dados
 * (cookies e URLs de destino do app).
 */

const KNOWN_HUBS: Record<string, string> = {
  // Regionais genéricos / placeholders
  polo: 'Regional Autorizado',
  hub: 'Regional Autorizado',
  regional: 'Regional Autorizado',
  polo_regional: 'Regional Autorizado',
  padrao: 'Regional Autorizado',
  default: 'Regional Autorizado',
  teste: 'Regional Autorizado',
  test: 'Regional Autorizado',

  // Capitais e Regiões Metropolitanas
  sp: 'São Paulo',
  sao_paulo: 'São Paulo',
  sp_capital: 'São Paulo (Capital)',
  sp_centro: 'São Paulo (Centro)',
  sao_paulo_centro: 'São Paulo (Centro)',
  sp_sul: 'Zona Sul',
  sp_norte: 'Zona Norte',
  sp_leste: 'Zona Leste',
  sp_oeste: 'Zona Oeste',
  zona_sul: 'Zona Sul',
  zona_norte: 'Zona Norte',
  zona_leste: 'Zona Leste',
  zona_oeste: 'Zona Oeste',

  rj: 'Rio de Janeiro',
  rio: 'Rio de Janeiro',
  rio_de_janeiro: 'Rio de Janeiro',
  rj_capital: 'Rio de Janeiro (Capital)',
  rj_centro: 'Rio de Janeiro (Centro)',

  mg: 'Minas Gerais',
  bh: 'Belo Horizonte',
  belo_horizonte: 'Belo Horizonte',

  pr: 'Curitiba',
  curitiba: 'Curitiba',

  rs: 'Porto Alegre',
  porto_alegre: 'Porto Alegre',

  ba: 'Salvador',
  salvador: 'Salvador',

  pe: 'Recife',
  recife: 'Recife',

  ce: 'Fortaleza',
  fortaleza: 'Fortaleza',

  df: 'Brasília',
  brasilia: 'Brasília',

  go: 'Goiânia',
  goiania: 'Goiânia',

  sc: 'Florianópolis',
  florianopolis: 'Florianópolis',

  es: 'Vitória',
  vitoria: 'Vitória',

  // Principais cidades com polos parceiros
  osasco: 'Osasco',
  campinas: 'Campinas',
  guarulhos: 'Guarulhos',
  santos: 'Santos',
  sbc: 'São Bernardo do Campo',
  sao_bernardo: 'São Bernardo do Campo',
  sao_bernardo_do_campo: 'São Bernardo do Campo',
  santo_andre: 'Santo André',
  ribeirao_preto: 'Ribeirão Preto',
  sorocaba: 'Sorocaba',
  sjc: 'São José dos Campos',
  sao_jose_dos_campos: 'São José dos Campos',
  niteroi: 'Niterói',
  duque_de_caxias: 'Duque de Caxias',
  nova_iguacu: 'Nova Iguaçu',
  sao_goncalo: 'São Gonçalo',
  contagem: 'Contagem',
  uberlandia: 'Uberlândia',
  juiz_de_fora: 'Juiz de Fora',
  maringa: 'Maringá',
  londrina: 'Londrina',
  joinville: 'Joinville',
  blumenau: 'Blumenau',
  caxias_do_sul: 'Caxias do Sul',
  pelotas: 'Pelotas',
  feira_de_santana: 'Feira de Santana',
};

const LOWER_PREPOSITIONS = new Set(['de', 'da', 'do', 'dos', 'das', 'e', 'em']);

/**
 * Formata um nome bruto ou identificador de polo em uma referência amigável em PT-BR.
 */
export function formatPoloDisplayName(raw: string | null | undefined): string {
  if (!raw || typeof raw !== 'string') {
    return 'Regional Autorizado';
  }

  const trimmed = raw.trim();
  if (!trimmed) {
    return 'Regional Autorizado';
  }

  // UUIDs e hashes técnicos (ex: 019318b7-6f6a-73d2-8b9a-7c92bdfb32f9)
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed)) {
    return 'Regional Credenciado';
  }

  // Identificadores sequenciais ou testes (ex: polo1, polo_1, hub123, 123)
  if (/^(?:polo|hub)[_-]?\d+$/i.test(trimmed) || /^\d+$/.test(trimmed)) {
    return 'Regional Autorizado';
  }

  // Normalização do slug: minúsculas e substituição de hífens por underline
  const normalizedKey = trimmed.toLowerCase().replace(/-/g, '_');

  // Mapeamento direto
  if (KNOWN_HUBS[normalizedKey]) {
    return KNOWN_HUBS[normalizedKey];
  }

  // Tenta remover prefixos comuns como polo_ ou hub_
  const strippedKey = normalizedKey.replace(/^(?:polo|hub)[_]/, '');
  if (KNOWN_HUBS[strippedKey]) {
    return KNOWN_HUBS[strippedKey];
  }

  // Formatação em Title Case respeitando regras de português
  const words = (strippedKey || normalizedKey).split('_').filter(Boolean);
  if (words.length === 0) {
    return 'Regional Autorizado';
  }

  const formattedWords = words.map((word, index) => {
    const lower = word.toLowerCase();
    if (index > 0 && LOWER_PREPOSITIONS.has(lower)) {
      return lower;
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });

  return formattedWords.join(' ');
}
