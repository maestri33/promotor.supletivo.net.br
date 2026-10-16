---
version: alpha
name: promotor.supletivo.net.br-design
description: "Design system specification for the promotor.supletivo.net.br B2B / Affiliate & Educational Polo capture portal. Pátria Amada Refinada palette with corporate earnings elevation, Archivo Black display, Inter typography, and high-conversion affiliate mechanics."

colors:
  primary: "#ffc400"           # Yellow conversion (CTA & Commission highlights)
  on-primary: "#0b1220"        # Dark text on yellow (11.8:1 AAA)
  primary-hover: "#ffd75e"
  canvas: "#ffffff"            # Paper background default for daylight B2B trust
  canvas-dark: "#0b1220"       # Ink for high-authority night bands
  surface-1: "#f5f7f3"         # Paper soft for secondary blocks
  surface-dark: "#121d33"      # Ink soft for dark mode cards
  hairline: "#e3e7ee"          # Neutral 1px borders
  hairline-dark: "rgba(255, 255, 255, 0.12)"
  ink: "#0b1220"               # Primary text
  muted-on-light: "#49536a"    # Secondary text on light (5.1:1 AA)
  muted-on-dark: "#b9c3db"     # Secondary text on dark (7.8:1 AAA)
  brand-green: "#00734d"       # Institutional MEC/SISTEC credibility & fast payout
  brand-green-deep: "#005238"
  brand-blue: "#002776"        # Formal educational authority
  brand-blue-deep: "#001a52"
  semantic-danger: "#b91c1c"
  semantic-danger-bg: "#fee2e2"
  semantic-success: "#15803d"
  semantic-success-bg: "#dcfce7"
  semantic-warning: "#92400e"
  semantic-warning-bg: "#fef3c7"
  semantic-info: "#0369a1"
  semantic-info-bg: "#e0f2fe"

typography:
  display:
    fontFamily: "Archivo Black, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.08
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontWeight: 400
    lineHeight: 1.50
  kicker:
    fontSize: "0.8rem"
    letterSpacing: "0.16em"
    textTransform: "uppercase"
    fontWeight: 700

rounded:
  sm: 6px
  input: 10px
  card: 18px
  hero: 28px
  pill: 999px

spacing:
  section: "clamp(4.5rem, 3rem + 6vw, 9rem)"
  container: "68rem"
  container-narrow: "46rem"
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
---

# Design System — `promotor.supletivo.net.br`

## 1. Princípios do Canal B2B / Polos e Promotores
1. **Pátria Amada Refinada Institucional**: O verde institucional (`#00734d`) e o azul noturno (`#002776`) transmitem a solidez e legalidade do diploma com publicação no Diário Oficial da União (DOU).
2. **Conversão B2B & Simulação de Ganhos**: O amarelo conversão (`#ffc400`) é utilizado para números de comissão instantânea via Pix, valores da calculadora de faturamento e CTAs principais de credenciamento.
3. **Ergonomia e Mobile-First**: Promotores operam primariamente via smartphone (WhatsApp e redes sociais). Formulários (`PromoterLeadCaptureModal`) e botões obedecem à altura mínima de toque de 48px (`--input-height: 48px`).

## 2. Componentes Específicos do Promotor

### Calculadora de Faturamento (`Earnings.astro`)
- **Superfície**: Cartão elevado em `--paper` com borda de 1px em `--line-light` e sombra suave.
- **Destaque de Moeda / Pix**: Valores monetários em `Archivo Black` com `--green` institucional.
- **Sliders Interativos**: Trilhas táteis com raio de 999px e anel de foco visível.

### Cartão de Credencial do Parceiro (`PromoterCredentialCard.astro`)
- **Estilo**: Visual de crachá digital / certificado com glassmorphism translúcido (`backdrop-filter: blur(16px)`).
- **Selo Oficial**: Badge de parceiro oficial credenciado com chancela de autenticidade.

### Modal de Captura do Promotor (`PromoterLeadCaptureModal.astro`)
- **Backdrop**: Escurecido a 85% com desfoque de fundo.
- **Campos de Formulário**: Altura de 48px, raio de 10px, feedback imediato em caso de validação de WhatsApp/CPF.
- **Botão de Submissão**: Pílula (`999px`), fundo amarelo `--yellow`, texto `--ink`, com efeito `btn-shine`.
