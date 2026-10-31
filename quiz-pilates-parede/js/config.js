/* =========================================================
   CONFIGURAÇÕES GERAIS DO QUIZ
   Edite aqui o link do checkout, timer, etc.
   ========================================================= */
window.QUIZ_CONFIG = {
  // Link do seu checkout. Todos os botões "Testar agora" / "Quero Testar Agora"
  // da página final apontam para este link.
  checkoutUrl: "https://pay.kirvano.com/64f4ebc4-d22c-466a-864d-1d7140dd4cc6",

  // Abre o checkout em nova aba? (true/false)
  checkoutNewTab: false,

  // Timer de escassez na página final (em minutos)
  timerMinutes: 10,

  // Quantidade inicial de "ofertas disponíveis" mostrada nas notificações
  initialSpots: 8,

  // Notificações de prova social que aparecem na página final
  socialProof: {
    enabled: true,
    firstDelayMs: 6000,   // tempo até a primeira notificação
    intervalMs: 14000,    // intervalo entre notificações
    names: ["Juliana", "Marta R.", "Cláudia", "Bia Ferraz", "Patrícia", "Renata", "Simone", "Ana Paula"],
    sources: ["Instagram", "Quiz", "WhatsApp", "Facebook"]
  },

  // Tela de carregamento com depoimentos (duração total em ms)
  loadingTestimonialsMs: 7000,

  // Tela de carregamento com 3 barras (duração de cada barra em ms)
  loadingBarMs: 1800,

  // Salva o progresso do usuário no navegador (localStorage)
  persistAnswers: true
};
