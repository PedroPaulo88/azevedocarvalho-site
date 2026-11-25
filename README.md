# Site — Azevedo Carvalho Advocacia

Site estático: HTML e CSS escritos à mão, sem framework, sem build e sem
dependência externa além das fontes do Google. Publicado pelo Cloudflare
Pages — todo push no branch `main` vira deploy em cerca de um minuto.

Uma pasta por página, com `index.html` dentro, para que as URLs fiquem
limpas (`/atuacao/contratos/` em vez de `/contratos.html`).

## Como publicar um artigo novo

Quatro edições, todas pequenas e todas manuais. Não há banco de dados,
arquivo de índice nem script: o que está escrito no HTML é o que vai ao ar.

1. **Criar a página.** Duplique a pasta de um artigo existente, por
   exemplo `artigos/recebi-uma-notificacao-do-crm/`, renomeie com o
   endereço novo e troque o conteúdo. No `<head>`, ajuste o `<title>`, a
   meta `description` e o `<link rel="canonical">`, e também as metas
   `og:title`, `og:description`, `og:url`, `article:published_time` e
   `article:modified_time`. No bloco JSON-LD do fim da página, ajuste os
   endereços (`@id`, `url`), o `name` e a `description` da página, a
   trilha (`breadcrumb`) e, no `BlogPosting`, `headline`, `description`,
   `datePublished`, `dateModified`, `articleSection` e o autor (`#pedro-paulo`
   ou `#paulo-victor`). Troque a mensagem do WhatsApp para dizer de qual
   artigo o contato veio. Dentro do texto, coloque ao menos um link para a
   página de atuação relacionada. Ao final do texto,
   assine com nome e inscrição na OAB — a seção 7 do documento de
   construção exige.

2. **Listar em `/artigos/`.** Em `artigos/index.html`, acrescente um
   `<li>` no topo da `<ul class="areas">`, no mesmo formato do que já
   está lá: data, categoria, título e a primeira linha do texto.

3. **Atualizar a faixa da home.** Em `index.html`, na seção "Artigos
   recentes", acrescente o novo no topo da `<ul class="artigos-lista">`.
   Se já houver três, remova o mais antigo — a faixa mostra três.

4. **Somar ao `sitemap.xml`.** Um bloco `<url>` com o endereço e a data.
   Atualize também o `<lastmod>` de `/artigos/` e da home, que mudaram.

Qualquer outra página que tiver o conteúdo alterado deve ter o `<lastmod>`
atualizado no `sitemap.xml` com a data da alteração.

## SEO e medição

- **Dados estruturados.** Todas as páginas trazem um bloco JSON-LD com o
  mesmo nó do escritório (`#escritorio`) e o nó próprio da página
  (serviço, artigo, contato etc.). Os sócios têm nós `#paulo-victor` e
  `#pedro-paulo`. Se mudar telefone, e-mail ou Instagram, mude em todas.
- **Compartilhamento.** A imagem de prévia em links (WhatsApp, redes) é
  `imagens/og-azevedo-carvalho.png`, 1200×630.
- **Origem do contato.** Cada página tem mensagem própria no WhatsApp
  ("Vim pelo site, pela página de…"). A da home é a padrão, sem página.
- **Audiência.** Cloudflare Web Analytics, sem cookies, ativado no painel
  da Cloudflare. A política de privacidade descreve o uso.
- **Formulário de contato.** Na home e no fim das páginas de atuação.
  Não envia nada a servidor: `js/formulario.js` monta a mensagem e abre o
  WhatsApp para o visitante conferir e enviar. O `data-origem` do `<form>`
  diz de qual página veio, e cada página de atuação já deixa o assunto
  pré-selecionado. A política de privacidade descreve esse funcionamento.

Depois, commit e push. O Cloudflare publica sozinho.

## Cache

O `_headers` faz CSS e JS serem revalidados a cada visita. Sem isso, o
Cloudflare Pages os serve com 4 horas de cache enquanto o HTML vem sempre
fresco — e quem ja visitou o site fica com HTML novo e estilo velho ate o
cache vencer, o que na pratica quebra a pagina.

**Enquanto isso nao for feito, bump obrigatorio:** toda vez que `estilo.css`
ou `menu.js` mudarem, troque o `?v=` nas 13 paginas por uma data nova. Sem
isso, quem ja visitou o site fica com o estilo velho por ate 4 horas.

    sed -i "s/?v=[0-9]*/?v=$(date +%Y%m%d)/g" index.html */index.html */*/index.html

## Regras que valem para qualquer texto do site

O documento de construção (`site-azevedo-carvalho.md`, fora do
repositório de propósito) traz as restrições do Provimento 205/2021 do
CFOAB. As que mais pegam na hora de escrever um artigo:

- Nada de valor de honorário, forma de pagamento, desconto ou gratuidade.
- Nada de promessa ou sugestão de resultado.
- Nada de caso concreto do escritório, decisão obtida ou número de
  processos. O conteúdo é informativo e geral.
- Nada de depoimento, avaliação, nota, selo ou prêmio.
- A palavra "especialista" não se aplica aos advogados nem ao escritório.
- O rodapé de toda página leva os dois nomes com as inscrições na OAB.

## Identidade visual

Paleta, escala tipográfica e elementos gráficos estão na seção 2 do
documento de construção e nos comentários de `css/estilo.css`. Dois
pontos que já custaram retrabalho:

- **Ardósia não é usada em texto.** Sobre Papel ela mede 3,87:1, abaixo
  do mínimo de 4,5:1. Kickers, legendas e inscrições da OAB usam Azul.
- **Os únicos elementos gráficos são o filete e o losango.** Sem sombra,
  gradiente, canto arredondado em cartão ou ícone decorativo. Os ícones
  de WhatsApp, e-mail e Instagram são exceção consciente: identificam
  canais, não decoram.
