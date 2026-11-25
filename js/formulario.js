/* Formulário de contato: monta, no próprio navegador, a mensagem que o
   visitante confere e envia pelo WhatsApp. Nada é enviado a servidor nem
   guardado pelo site. */
(function () {
  var formularios = document.querySelectorAll("form.form-contato");
  if (!formularios.length) return;

  function dataBr(iso) {
    var p = (iso || "").split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : "";
  }

  Array.prototype.forEach.call(formularios, function (f) {
    var numero = f.getAttribute("data-numero");
    var origem = f.getAttribute("data-origem");
    var assunto = f.elements["assunto"];
    var blocoData = f.querySelector(".campo--data");
    var rotuloData = f.querySelector(".campo--data label");
    var previa = f.querySelector(".previa-texto");

    function tipoPrazo() {
      if (assunto.value === "Notificação do CRM") return "a notificação";
      if (assunto.value === "Ação judicial") return "a citação";
      return "";
    }

    function valor(nome) {
      var c = f.elements[nome];
      return c ? c.value.trim() : "";
    }

    function monta() {
      var linhas = ["Olá. Vim pelo site, " + origem + "."];
      if (valor("nome")) linhas.push("Nome: " + valor("nome"));
      var sou = valor("perfil");
      if (sou) {
        linhas.push("Sou: " + sou + (valor("especialidade") ? ", " + valor("especialidade") : ""));
      } else if (valor("especialidade")) {
        linhas.push("Especialidade: " + valor("especialidade"));
      }
      if (valor("estado")) linhas.push("Estado: " + valor("estado"));
      if (valor("assunto")) linhas.push("Assunto: " + valor("assunto"));
      var prazo = tipoPrazo();
      if (prazo && valor("data")) linhas.push("Recebi " + prazo + " em: " + dataBr(valor("data")));
      if (valor("mensagem")) linhas.push("", valor("mensagem"));
      return linhas.join("\n");
    }

    function atualiza() {
      var prazo = tipoPrazo();
      blocoData.hidden = !prazo;
      if (prazo) rotuloData.textContent = "Data em que recebeu " + prazo;
      previa.textContent = monta();
    }

    f.addEventListener("input", atualiza);
    f.addEventListener("change", atualiza);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (f.reportValidity && !f.reportValidity()) return;
      var url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(monta());
      // Sem "noopener" no window.open: com ele o retorno é sempre null e não
      // daria para saber se a janela foi bloqueada.
      var janela = window.open(url, "_blank");
      if (janela) janela.opener = null;
      else window.location.href = url;
    });

    atualiza();
  });
})();
