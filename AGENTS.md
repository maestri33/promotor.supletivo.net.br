# AI & Engineering Guidelines — `promotor.supletivo.net.br`

> **DIRETIVA DE HERANÇA**: As diretrizes gerais de governança, arquitetura e engenharia do ecossistema estão centralizadas em **[`supletivo.net.br/AGENTS.md`](../supletivo.net.br/AGENTS.md)** e o Design System canônico em **[`supletivo.net.br/DESIGN.md`](../supletivo.net.br/DESIGN.md)**.
> Todo agente que operar neste repositório DEVE seguir rigorosamente este documento e as instruções abaixo.

---

## 1. Missão do Repositório e Modelo de Negócio
- **Público-Alvo**: Consultores educacionais, promotores, afiliados, coordenadores de polo e líderes comunitários que buscam gerar renda extra indicando o EJA Oficial.
- **Regra de Ouro da Plataforma**:
  - **O aluno NÃO estuda com a gente.** A nossa plataforma é o motor de captação, pagamento, conferência de documentos e afiliação.
  - Ao matricular e conferir a documentação, o aluno é **oficialmente redirecionado para o Ambiente Virtual da instituição parceira credenciada**, que é responsável pelas aulas, tutores e certificação.
- **Regra de Pagamento de Comissão**:
  - A comissão do promotor (R$ 100 por matrícula + bônus de escala de R$ 500 a cada 5 pagas na semana) é liberada na **confirmação do pagamento da matrícula**, e NÃO na conclusão do curso.
  - O fechamento e repasse são pontuais: **toda sexta-feira, às 18h, via Pix** no CPF cadastrado.
- **Conformidade Regulatória e Jurídica**:
  - **Proibido overclaim de "Reconhecido diretamente pelo MEC / SISTEC"** para EJA Fundamental e Médio.
  - Conforme a LDB (Lei nº 9.394/96), o EJA é autorizado pelos **Conselhos Estaduais de Educação (CEE)** e Secretarias de Estado.
  - Todo selo ou texto deve usar a chancela legal correta: *"Validade Nacional (Amparo LDB 9.394/96) · Escola Credenciada no CEE"*.

---

## 2. Marca, Destinos e Linguagem
- **Marca Oficial**: **Supletivo Brasil** / **Supletivo.net.br**.
  - **Proibido expor `V7M` ou `maestri.group` em textos voltados ao usuário final** (a V7M atua apenas nos dados jurídicos de rodapé e termos como fornecedora de tecnologia e operadora de pagamentos).
- **Destino dos CTAs e Links**:
  - O destino canônico é exclusivamente **`https://app.supletivo.net.br`** (nunca usar domínios legados como `app.maestri.group`).
- **Linguagem**:
  - **Interface (100% PT-BR)**: Tom de oportunidade real, respeito profissional e autoridade institucional. Evitar infantilizações como *"treininho rápido"* — usar *"Capacitação rápida online"*.
  - **Código (100% Inglês)**: Variáveis, funções, componentes e mensagens de commit.

---

## 3. Diretrizes de Design e Ergonomia de Interface
- **Alinhamento com `supletivo.net.br/DESIGN.md`**:
  - Todos os elementos devem respeitar os tokens de cores, elevação e tipografia do sistema (`Archivo Black` para display/números de ganho, `Inter` para leitura/UI).
- **Ergonomia Touch Mobile (Obrigatória)**:
  - **Alvo mínimo de toque: 48px** (`min-height: 48px`, `min-width: 48px`) em todos os botões, links de navegação mobile, presets de calculadora e chips de filtro.
  - Regra CSS obrigatória no reset global: `-webkit-tap-highlight-color: transparent;` para eliminar flash cinza de clique em celulares.
- **Scripts e Animações (Anti-Leak)**:
  - **Zero vazamento de eventos**: Proibido registrar listeners de `window` (`pointermove`, `scroll`, `resize`) dentro de loops `forEach` de elementos. Use um único listener global passivo.
  - **Kill-Switch**: Respeitar integralmente `@media (prefers-reduced-motion: reduce)` e desativar cálculos 3D pesados em dispositivos touch (`pointer: coarse`).

---

## 4. Governança e Soberania
- **Soberania do Usuário**: Apenas o usuário valida, homologa ou aprova código, layout e entregas. Testes e linters são verificações técnicas básicas.
- **Versionamento SemVer**: Toda alteração entregue deve incrementar a versão no `package.json` e citar a versão no commit conforme o Oráculo Central (`version.v7m.live`).
- **Issue de Referência**: Todas as melhorias e correções mapeadas na auditoria estão registradas na **[Issue #3](https://github.com/maestri33/promotor.supletivo.net.br/issues/3)**.
