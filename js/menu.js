/* Painel lateral do mobile e perguntas frequentes. Único script do site. */
(function () {
  var abrir  = document.querySelector(".abrir-menu");
  var fechar = document.querySelector(".fechar-menu");
  var painel = document.getElementById("painel");
  var veu    = document.querySelector(".veu");

  if (!abrir || !painel) return;

  function alterna(aberto) {
    painel.dataset.aberto = aberto ? "sim" : "nao";
    if (veu) veu.dataset.aberto = aberto ? "sim" : "nao";
    abrir.setAttribute("aria-expanded", aberto ? "true" : "false");
    painel.setAttribute("aria-hidden", aberto ? "false" : "true");
    document.body.style.overflow = aberto ? "hidden" : "";
    if (aberto) {
      if (fechar) fechar.focus();
    } else {
      abrir.focus();
    }
  }

  abrir.addEventListener("click", function () { alterna(true); });
  if (fechar) fechar.addEventListener("click", function () { alterna(false); });
  if (veu) veu.addEventListener("click", function () { alterna(false); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && painel.dataset.aberto === "sim") alterna(false);
  });
})();

/* Perguntas frequentes: uma aberta por vez. O atributo name dos <details>
   já faz isso nos navegadores atuais; isto cobre os antigos. */
(function () {
  var itens = document.querySelectorAll(".perguntas details");
  Array.prototype.forEach.call(itens, function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      Array.prototype.forEach.call(itens, function (o) {
        if (o !== d && o.open) o.open = false;
      });
    });
  });
})();
