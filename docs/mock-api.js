(function () {
  const repo = (location.pathname || "").toLowerCase();
  const isGeo = repo.includes("geo");
  const isIkesaki = repo.includes("ikesaki");
  const nomePainel = isGeo ? "Geo" : isIkesaki ? "Ikesaki" : "Soneda";
  const dbName = isGeo ? "geo_dashboard_demo" : isIkesaki ? "ikesaki_dashboard_demo" : "soneda_dashboard_demo";

  const lojas = [
    { Cod_Loja: "1", Nome_Fantasia: "Centro" },
    { Cod_Loja: "2", Nome_Fantasia: "Shopping Norte" },
    { Cod_Loja: "3", Nome_Fantasia: "Shopping Sul" },
    { Cod_Loja: "4", Nome_Fantasia: "Outlet" },
    { Cod_Loja: "5", Nome_Fantasia: "E-commerce" }
  ];

  const categorias = [
    { CODBARRAS: "7891000000011", PRODUTO: "Shampoo Hidratante", CATEGORIA: "Cabelos", FAMILIA: "Tratamento Capilar" },
    { CODBARRAS: "7891000000028", PRODUTO: "Mascara Nutritiva", CATEGORIA: "Tratamento", FAMILIA: "Tratamento Capilar" },
    { CODBARRAS: "7891000000035", PRODUTO: "Coloracao 6.0", CATEGORIA: "Coloracao", FAMILIA: "Coloracao" },
    { CODBARRAS: "7891000000042", PRODUTO: "Finalizador Termico", CATEGORIA: "Finalizadores", FAMILIA: "Finalizacao" },
    { CODBARRAS: "7891000000059", PRODUTO: "Kit Manutencao", CATEGORIA: isIkesaki ? "Unhas" : "Acessorios", FAMILIA: isIkesaki ? "Manicure" : "Acessorios" }
  ];

  const meses = ["Jun", "Jul", "Ago"];
  const anos = ["2026"];
  const dias = ["2026-06-03", "2026-06-10", "2026-06-17", "2026-06-24", "2026-07-03", "2026-07-10", "2026-07-17", "2026-07-24", "2026-08-03", "2026-08-10", "2026-08-17", "2026-08-21"];

  const fator = isGeo ? 0.78 : isIkesaki ? 0.92 : 1;
  const porLoja = lojas.map((loja, idx) => ({
    loja: loja.Cod_Loja,
    nome: loja.Nome_Fantasia,
    qty: Math.round((3200 - idx * 310) * fator),
    valor: Math.round((218000 - idx * 18000) * fator)
  }));
  const porDia = dias.map((data, idx) => ({
    data,
    qty: Math.round((620 + (idx % 4) * 95 + idx * 12) * fator),
    valor: Math.round((42800 + (idx % 4) * 7100 + idx * 850) * fator)
  }));
  const porCat = categorias.map((cat, idx) => ({
    cat: cat.CATEGORIA,
    qty: Math.round((2850 - idx * 260) * fator),
    valor: Math.round((184000 - idx * 17000) * fator)
  }));
  const porFam = [...new Map(categorias.map(c => [c.FAMILIA, c])).values()].map((cat, idx) => ({
    fam: cat.FAMILIA,
    qty: Math.round((3350 - idx * 410) * fator),
    valor: Math.round((221000 - idx * 27000) * fator)
  }));
  const porProduto = categorias.map((cat, idx) => ({
    produto: cat.PRODUTO,
    nome: cat.PRODUTO,
    gtin: cat.CODBARRAS,
    qty: Math.round((1240 - idx * 115) * fator),
    valor: Math.round((76000 - idx * 6800) * fator)
  }));

  const estoqueLoja = porLoja.map((r, idx) => ({
    loja: r.loja,
    nome: r.nome,
    data: "2026-08-21",
    qty: Math.round((r.qty * 1.7) + idx * 240),
    valor: Math.round(r.valor * 0.62)
  }));
  const estoqueDia = dias.map((data, idx) => ({
    data,
    qty: Math.round((8100 + idx * 180 + (idx % 3) * 420) * fator),
    valor: Math.round((380000 + idx * 9800) * fator)
  }));
  const estoqueLojaDia = dias.flatMap((data, dIdx) => lojas.map((loja, lIdx) => ({
    data,
    loja: loja.Cod_Loja,
    nome: loja.Nome_Fantasia,
    qty: Math.round((1300 + dIdx * 45 + lIdx * 120) * fator)
  })));
  const estoqueProdutoDia = categorias.map((cat, idx) => ({
    data: "2026-08-21",
    produto: cat.PRODUTO,
    nome: cat.PRODUTO,
    gtin: cat.CODBARRAS,
    qty: Math.round((1480 - idx * 145) * fator)
  }));
  const estoqueCatDia = categorias.map((cat, idx) => ({
    data: "2026-08-21",
    cat: cat.CATEGORIA,
    qty: Math.round((2750 - idx * 230) * fator)
  }));

  const dadosBrutos = dias.flatMap((data, dIdx) => lojas.map((loja, lIdx) => {
    const cat = categorias[(dIdx + lIdx) % categorias.length];
    const qtd = Math.round((42 + dIdx * 3 + lIdx * 5) * fator);
    const valor = qtd * (58 + (lIdx * 7));
    return {
      Data: data,
      Ano: "2026",
      "Mês": meses[Math.min(2, Math.floor(dIdx / 4))],
      Mes: String(Math.min(8, 6 + Math.floor(dIdx / 4))),
      Loja: loja.Cod_Loja,
      "GTIN/PLU": cat.CODBARRAS,
      Produto: cat.PRODUTO,
      "Venda (Qtd)": qtd,
      "Venda (R$)": valor,
      "Estoque Diario": Math.round(qtd * 2.4)
    };
  }));

  function agregado() {
    return {
      por_loja: porLoja,
      por_dia: porDia,
      por_cat: porCat,
      por_fam: porFam,
      por_produto: porProduto,
      total: porDia.reduce((s, r) => s + r.qty, 0),
      total_valor: porDia.reduce((s, r) => s + r.valor, 0),
      total_lojas: lojas.length
    };
  }

  function estoque() {
    return {
      total: estoqueLoja.reduce((s, r) => s + r.qty, 0),
      total_lojas: lojas.length,
      data: "2026-08-21",
      por_loja: estoqueLoja,
      por_dia: estoqueDia,
      por_loja_dia: estoqueLojaDia,
      por_produto_dia: estoqueProdutoDia,
      por_cat_dia: estoqueCatDia,
      por_produto: estoqueProdutoDia,
      por_cat: estoqueCatDia
    };
  }

  function bodyFor(url, init) {
    const u = new URL(String(url), location.origin);
    const path = u.pathname;
    if (!path.startsWith("/api/")) return null;

    if (path === "/api/config") return { readOnly: true, ambiente: "portfolio", demo: true, cliente: nomePainel };
    if (path === "/api/health") return { ok: true, db: dbName, mongo: "mocked" };
    if (path === "/api/lojas-depara") return lojas;
    if (path === "/api/categorias-depara") return categorias;
    if (path === "/api/dados-brutos") return dadosBrutos;
    if (path === "/api/dados-tratados") return dadosBrutos;
    if (path === "/api/dashboard/filtros") return { anos, meses, lojas: lojas.map(l => l.Cod_Loja) };
    if (path === "/api/dashboard/categorias") return porCat.map(r => ({ _id: r.cat, total: r.qty, valor: r.valor }));
    if (path === "/api/dashboard/familias") return porFam.map(r => ({ _id: r.fam, total: r.qty, valor: r.valor }));
    if (path === "/api/dashboard/resumo" || path === "/api/dashboard/kpis") {
      const ag = agregado();
      return { total_vendido: ag.total, total_lojas: lojas.length, total_valor: ag.total_valor, cliente: nomePainel };
    }
    if (path === "/api/dashboard/agregados") return agregado();
    if (path === "/api/dashboard/estoque" || path === "/api/dashboard/estoque-resumo") return estoque();
    if (path === "/api/login" || path === "/api/admin/login") return { token: "portfolio-demo-token" };
    if (path === "/api/logout" || path === "/api/admin/logout") return { ok: true };
    if (path === "/api/solicitar-reset" || path === "/api/admin/solicitar-reset") return { ok: true, mensagem: "Demo: e-mail ficticio enviado." };
    if (path === "/api/admin/usuarios") return [{ _id: "u1", usuario: "analista.demo", email: "demo@portfolio.local" }];
    if (path === "/api/admin/admins") return [{ _id: "a1", usuario: "larissa.demo", email: "demo@portfolio.local", usuarioPai: true }];
    if (path === "/api/admin/templates") return [
      { filename: "modelo_dados_brutos.csv", tipo: "dados_brutos", total: 120 },
      { filename: "modelo_categorias_depara.xlsx", tipo: "categorias_depara", total: 5 },
      { filename: "modelo_lojas_depara.csv", tipo: "lojas_depara", total: 5 }
    ];
    if (path === "/api/admin/logs-importacao") return [
      { _id: "log1", tipo: "dados_brutos", arquivo: `dados_${nomePainel.toLowerCase()}_demo.csv`, usuario: "analista.demo", total: dadosBrutos.length, data: "2026-08-21T12:00:00.000Z" },
      { _id: "log2", tipo: "categorias_depara", arquivo: "categorias_demo.xlsx", usuario: "analista.demo", total: categorias.length, data: "2026-08-20T12:00:00.000Z" }
    ];
    if (path.startsWith("/api/importar/")) return { ok: true, inserido: dadosBrutos.length, ultimo: true, mensagem: "Demo estatica: importacao simulada com dados ficticios." };
    if (path.startsWith("/api/admin/") || path === "/api/cache/limpar" || path === "/api/importar/dados-brutos/cancelar") return { ok: true };
    if (path.startsWith("/api/templates/")) {
      return "Arquivo,Descricao\nmodelo_demo,Conteudo ficticio para portfolio\n";
    }
    return { ok: true, demo: true };
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = function (url, init = {}) {
    const body = bodyFor(url, init);
    if (body === null) return realFetch(url, init);
    const isText = typeof body === "string";
    return Promise.resolve(new Response(isText ? body : JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": isText ? "text/csv; charset=utf-8" : "application/json; charset=utf-8" }
    }));
  };

  class MockXHR {
    constructor() {
      this.headers = {};
      this.upload = {};
      this.readyState = 0;
      this.status = 0;
      this.responseText = "";
    }
    open(method, url) {
      this.method = method;
      this.url = url;
      this.readyState = 1;
    }
    setRequestHeader(key, value) {
      this.headers[key] = value;
    }
    send() {
      setTimeout(() => {
        if (typeof this.upload.onprogress === "function") this.upload.onprogress({ lengthComputable: true, loaded: 100, total: 100 });
        const body = bodyFor(this.url, { method: this.method }) || { ok: true };
        this.status = 200;
        this.readyState = 4;
        this.responseText = typeof body === "string" ? body : JSON.stringify(body);
        if (typeof this.onload === "function") this.onload();
        if (typeof this.onreadystatechange === "function") this.onreadystatechange();
      }, 350);
    }
    abort() {}
  }
  window.XMLHttpRequest = MockXHR;

  window.__PORTFOLIO_DEMO__ = true;
})();
