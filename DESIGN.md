---
version: alpha
name: "Supletivo Brasil — Portal de Promotores (promotor.supletivo.net.br)"
description: "Identidade visual executiva para o Portal de Promotores e Afiliados do Supletivo Brasil. Combina autoridade institucional em preto/grafite profundo com acentos de prosperidade em dourado metálico, superfícies de papel aquecido e clareza para métricas de comissão, links de indicação e acompanhamento de matrículas."

colors:
  primary: "#d9b15a"
  primary-hover: "#f0d493"
  primary-deep: "#a87b2e"
  primary-ink: "#8a6526"
  canvas-dark: "#0b0b0c"
  surface-dark-1: "#141416"
  surface-dark-2: "#1d1d20"
  paper: "#ffffff"
  paper-soft: "#f5f4f1"
  hairline: "#e7e4dd"
  hairline-dark: "#2a2a2e"
  ink: "#0b0b0c"
  ink-muted: "#5c5c63"
  ink-on-dark: "#ffffff"
  ink-muted-on-dark: "#b4b4bb"
  semantic-danger: "#b91c1c"
  semantic-danger-bg: "#fee2e2"
  semantic-success: "#15803d"
  semantic-success-bg: "#dcfce7"
  semantic-warning: "#92400e"
  semantic-warning-bg: "#fef3c7"
  semantic-info: "#0369a1"
  semantic-info-bg: "#e0f2fe"

typography:
  hero:
    fontFamily: "Archivo Black"
    fontSize: "56px"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: -0.5px
  headline:
    fontFamily: "Archivo Black"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.15
  stat-number:
    fontFamily: "Archivo Black"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: 1.00
  card-title:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.30
  body:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.50
  caption:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.40
  button:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.20

rounded:
  sm: "6px"
  md: "10px"
  card: "16px"
  card-lg: "24px"
  pill: "999px"

spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "80px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.canvas-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary-dark:
    backgroundColor: "{colors.surface-dark-2}"
    textColor: "{colors.ink-on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  card-stat:
    backgroundColor: "{colors.surface-dark-1}"
    textColor: "{colors.ink-on-dark}"
    typography: "{typography.body}"
    rounded: "{rounded.card}"
    padding: "24px"
  card-white:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.card}"
    padding: "24px"
  badge-gold:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas-dark}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  badge-success:
    backgroundColor: "{colors.semantic-success-bg}"
    textColor: "{colors.semantic-success}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  input-text:
    backgroundColor: "{colors.surface-dark-2}"
    textColor: "{colors.ink-on-dark}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  commission-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
---

## Overview

O **Portal do Promotor** (`promotor.supletivo.net.br`) foi desenhado para transmitir **alta credibilidade, solidez corporativa e potencial de ganhos financeiros** para promotores, afiliados e parceiros comerciais do Supletivo Brasil.

Enquanto a landing page do estudante (`supletivo.net.br`) adota a estética da bandeira nacional com forte calor humano, o ecossistema de promotores utiliza uma direção visual **Dark Luxury & Executive FinTech**: telas cinematográficas escuras (`--canvas-dark: #0b0b0c`), cards em grafite acetinado (`--surface-dark-1: #141416`), tipografia expressiva de números em `Archivo Black` e acentos de conversão em **Dourado Metálico** (`{colors.primary}: #d9b15a`).

Ao mesmo tempo, suas variáveis CSS mapeiam diretamente para os tokens globais do Supletivo Brasil, permitindo compartilhamento de componentes sem quebras ou desalinhamentos.

## Colors

### Dourado Executivo (Símbolo de Conquista & Comissões)
- **Dourado Principal (`{colors.primary}` #d9b15a)**: Botões principais, gráficos de comissão e selos de nível de promotor (Bronze, Prata, Ouro). Texto sobre o dourado é **sempre `{colors.canvas-dark}` (#0b0b0c)**, garantindo contraste de **8.9:1** (WCAG AAA).
- **Dourado Hover (`{colors.primary-hover}` #f0d493)**: Estado iluminado de interação.
- **Dourado Profundo (`{colors.primary-deep}` #a87b2e)**: Bordas metálicas sutis.
- **Dourado para Superfície Clara (`{colors.primary-ink}` #8a6526)**: Contraste de **4.6:1** sobre branco/creme (WCAG AA).

### Superfícies Escuras (Chiaroscuro)
- **Canvas Dark (`{colors.canvas-dark}` #0b0b0c)**: Fundo principal do dashboard e do hero de recrutamento.
- **Surface Dark 1 (`{colors.surface-dark-1}` #141416)**: Painéis de métricas e gráficos de conversão.
- **Surface Dark 2 (`{colors.surface-dark-2}` #1d1d20)**: Cards flutuantes e campos de input.
- **Hairline Dark (`{colors.hairline-dark}` #2a2a2e)**: Divisórias sutis de 1px.

### Superfícies Claras (Documentos e Relatórios)
- **Paper (`{colors.paper}` #ffffff)**: Fatura de comissões, comprovantes e extrato detalhado.
- **Paper Soft (`{colors.paper-soft}` #f5f4f1)**: Cinza quente para tabelas e faturas.

## Typography

- **Display & Estatísticas**: `'Archivo Black', system-ui, sans-serif` (peso único 400).
  Usada em números de comissão acumulada (`{typography.stat-number}` 44px), metas batidas e títulos de alto impacto.
- **Interface & Métricas**: `'Inter', system-ui, -apple-system, sans-serif` (pesos 400, 600, 700).
  Tabelas financeiras, links de afiliados, extratos e relatórios de alunos matriculados.

## Layout

- **Largura Máxima do Painel**: `72rem` (1152px) para acomodar gráficos de conversão e painéis analíticos.
- **Espaçamento de Seções**: `clamp(3.5rem, 2rem + 5vw, 7rem)` para máxima densidade útil de dados sem poluição visual.
- **Mobile First para Gestão Rápida**: Promotores acompanham vendas em tempo real via celular; todos os links de afiliados e botões de compartilhamento WhatsApp possuem fácil acionamento via polegar.

## Elevation & Depth

1. **Nível 0**: Fundo liso em grafite `#0b0b0c`.
2. **Nível 1 (Cards Analíticos)**: Superfície `#141416` com borda de 1px `#2a2a2e`.
3. **Nível 2 (Cards de Destaque Financeiro)**: Superfície `#1d1d20` com borda sutil dourada e sombra suave.
4. **Nível 3 (Sheen Metálico)**: Gradiente sutil dourado aplicado em botões e badges de destaque.

## Shapes

- **Badges e Pílulas (`rounded.pill` / 999px)**: Identificadores de status de pagamento (Pendente, Pago, Liberado).
- **Cards de Métricas (`rounded.card` / 16px)**: Padrão ergonômico com cantos suavizados.
- **Inputs de Busca e Filtro (`rounded.md` / 10px)**: Entradas para consulta de alunos por CPF ou nome.

## Components

### 1. Card de Link de Indicação (Affiliate Link Box)
- Campo com o link único do promotor (`supletivo.net.br?ref=CODIGO`).
- Botão instantâneo de "Copiar Link" e botão direto de "Compartilhar no WhatsApp" com feedback tátil de cópia.

### 2. Painel de Comissões e Extrato
- Cards superiores com: Saldo Disponível para Saque, A Receber e Total Pago.
- Tabela com listagem de alunos indicados, data de pré-cadastro, status de pagamento e comissão creditada.

## Do's and Don’ts

### DO's
- **DO**: Use `{colors.canvas-dark}` para o texto sobre qualquer elemento dourado `{colors.primary}`.
- **DO**: Preserve a integridade dos parâmetros `ref` repassados ao portal de matrícula.
- **DO**: Mantenha o design responsivo para que o promotor possa consultar seu saldo pelo smartphone com total clareza.

### DON'Ts
- **DON'T**: Nunca use marcas descontinuadas como `v7m` ou `maestri.group` em nenhum componente, cabeçalho ou metadado.
- **DON'T**: Nunca utilize fontes de caligrafia extravagantes para valores monetários; utilize `Archivo Black` ou `Inter` tabular.
- **DON'T**: Nunca use tons dourados apagados com contraste inferior a 4.5:1 sobre fundos claros.
