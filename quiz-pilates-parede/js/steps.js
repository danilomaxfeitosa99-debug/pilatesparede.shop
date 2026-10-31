/* =========================================================
   ETAPAS DO QUIZ
   - A ordem do array define a ordem das telas.
   - Para reordenar, basta mover o bloco de uma etapa.
   - Para remover uma etapa, apague o bloco (ou comente).
   - Textos aceitam HTML simples. Use <span class="accent">texto</span>
     para destacar palavras na cor roxa.
   - "key" é o nome usado para guardar a resposta (ex.: nome, email).
   ========================================================= */
window.QUIZ_STEPS = [

  /* 1. Apresentação */
  {
    type: "info",
    title: "Você tá a um passo de <span class=\"accent\">transformar</span> o seu corpo com um método <span class=\"accent\">simples</span> e sem <span class=\"accent\">enrolação</span>.",
    image: "assets/img/intro.png",
    imageRounded: true,
    text: "O Pilates de Parede foi feito pra mulheres que cansaram de dietas malucas e academias cheias. Em casa, com poucos minutos por dia, você vai <b>secar</b> a barriga, <b>levantar</b> o <b>bumbum</b> e recuperar sua energia. Pronta pra começar?",
    button: "Continuar"
  },

  /* 2. Carrossel antes/depois */
  {
    type: "info",
    title: "Em apenas 15 minutos por dia, elas conquistaram o corpo que você também pode ter!",
    carousel: [
      { img: "assets/img/antes-depois-01.png", caption: "Gisele, 46 anos - 49 dias do desafio" },
      { img: "assets/img/antes-depois-02.png", caption: "Silvía, 46 anos - 55 dias do desafio" },
      { img: "assets/img/antes-depois-03.png", caption: "Simone, 45 anos - 40 dias do desafio" },
      { img: "assets/img/antes-depois-04.png", caption: "Karina, 39 anos - 29 dias do desafio" },
      { img: "assets/img/antes-depois-05.png", caption: "Flávia, 43 anos - 32 dias do desafio" },
      { img: "assets/img/antes-depois-06.png", caption: "Julia, 44 anos - 69 dias do desafio" },
      { img: "assets/img/antes-depois-07.png", caption: "Luciana, 45 anos - 51 dias do desafio" },
      { img: "assets/img/antes-depois-08.png", caption: "Ana Paula, 41 anos - 37 dias do desafio" },
      { img: "assets/img/antes-depois-09.png", caption: "Marina, 44 anos - 37 dias do desafio" },
      { img: "assets/img/antes-depois-10.png", caption: "Aline, 43 anos - 40 dias do desafio" }
    ],
    image: "assets/img/beneficios.png",
    button: "Continuar"
  },

  /* 3. Objetivo */
  {
    type: "single",
    key: "objetivo",
    title: "Qual desses objetivos você mais quer conquistar com o <span class=\"accent\">Pilates de Parede</span>?",
    options: [
      { title: "Perder peso", desc: "Quer derreter a gordura de forma rápida e sem perder tempo? Nosso método é ideal pra queimar as calorias extras enquanto fortalece o corpo." },
      { title: "Desenvolver flexibilidade", desc: "Quer deixar seu corpo mais flexível e ágil? Esse é o segredo para sentir-se livre e sem dores." },
      { title: "Reduzir o stress e a ansiedade", desc: "Precisa de um alívio do estresse do dia a dia? Nosso treino vai liberar a tensão e deixar você leve como uma pluma." },
      { title: "Melhorar a postura", desc: "Está na hora de alinhar a coluna e dar adeus às dores que você tem carregado. O Pilates de Parede vai melhorar sua postura e confiança." },
      { title: "Todas as opções acima" }
    ]
  },

  /* 4. Tipo de corpo */
  {
    type: "single",
    key: "corpo",
    title: "Como você descreveria seu corpo agora?",
    subtitle: "Essa escolha vai nos ajudar a criar o melhor plano de treino pra você!",
    options: [
      { title: "Magra", img: "assets/img/corpo-magra.png", desc: "Já é esbelta, mas pode <b>definir mais</b>, empinar o bumbum e firmar o abdômen com o Pilates de Parede." },
      { title: "Média", img: "assets/img/corpo-media.png", desc: "Tem uma boa base e agora pode <b>evoluir rápido</b>, secando e destacando ainda mais suas formas." },
      { title: "Gordinha", img: "assets/img/corpo-gordinha.png", desc: "Está com alguns quilinhos a mais, mas com o Pilates de Parede pode <b>emagrecer, reduzir medidas e voltar a se sentir bem no espelho</b>." },
      { title: "Acima do peso", img: "assets/img/corpo-acima.png", desc: "A hora é agora! Um método simples para <b>emagrecer com saúde, reduzir medidas e transformar o corpo de verdade</b>." }
    ]
  },

  /* 5. Resultado desejado */
  {
    type: "single",
    key: "resultado",
    title: "Qual resultado você mais quer conquistar com o Pilates de Parede?",
    options: [
      { title: "Emagrecer e secar a barriga → Perder medidas e voltar a se sentir leve." },
      { title: "Modelar curvas e empinar o bumbum → Deixar o corpo mais desenhado e bonito." },
      { title: "Ganhar força e resistência → Fortalecer músculos sem academia." },
      { title: "Melhorar flexibilidade e postura → Se movimentar com mais liberdade e menos dores." },
      { title: "Tudo isso junto! → Emagrecer, modelar, ganhar força e se sentir renovada." }
    ]
  },

  /* 6. Situação de peso (múltipla escolha) */
  {
    type: "multi",
    key: "situacao_peso",
    title: "E quando o assunto é peso… qual dessas situações parece mais com você?",
    subtitle: "Pode selecionar mais de uma opção se quiser",
    options: [
      { title: "🤔 Engordo fácil mas demoro pra perder" },
      { title: "👉 Às vezes seca, às vezes volta… meu corpo muda o tempo todo." },
      { title: "💪 Ganhar e perder peso é rápido pra mim" },
      { title: "👉 Mesmo tentando, quase não vejo resultado na balança ou nos músculos." },
      { title: "🙂 Tenho dificuldade pra ganhar massa ou peso" }
    ],
    button: "Continuar"
  },

  /* 7. Parte do corpo (múltipla escolha com imagem) */
  {
    type: "multi",
    key: "parte_corpo",
    title: "Qual parte do corpo mais incomoda você hoje?",
    options: [
      { title: "Barriga", img: "assets/img/parte-barriga.png" },
      { title: "Glúteos", img: "assets/img/parte-gluteos.png" },
      { title: "Pernas", img: "assets/img/parte-pernas.png" },
      { title: "Peitos", img: "assets/img/parte-peitos.png" }
    ],
    button: "Continuar"
  },

  /* 8. Frequência de treino */
  {
    type: "single",
    key: "frequencia",
    title: "Com que frequência você costuma treinar hoje?",
    options: [
      { title: "Quase todos os dias", desc: "Você já tem disciplina, e com o Pilates de Parede vai ver resultados ainda mais rápidos." },
      { title: "Algumas vezes na semana", desc: "Tá no caminho certo! Agora é só usar o treino certo pra acelerar sua evolução." },
      { title: "De vez em quando", desc: "Sem pressão: o Pilates de Parede é leve e vai ajudar você a criar uma rotina de verdade." },
      { title: "Nunca", desc: "Não tem problema! Esse desafio é perfeito pra começar do zero, sem precisar de academia ou equipamentos caros." }
    ]
  },

  /* 9. Tipo de treino */
  {
    type: "single",
    key: "tipo_treino",
    title: "Você prefere treinos curtos e práticos ou gosta de algo mais puxado?",
    options: [
      { title: "😎 Treinos rápidos e práticos" },
      { title: "💪 Treinos mais longos e desafiadores" }
    ]
  },

  /* 10. O que atrapalha */
  {
    type: "single",
    key: "obstaculo",
    title: "O que mais atrapalha você na hora de começar um treino?",
    options: [
      { title: "⏰ Falta de tempo" },
      { title: "😓 Falta de motivação" },
      { title: "🤷‍♀️ Não sei por onde começar" }
    ]
  },

  /* 11. Promessa */
  {
    type: "info",
    title: "Com o Pilates de Parede, você vai <span class=\"accent\">secar</span> a barriga, <span class=\"accent\">empinar</span> o bumbum e <span class=\"accent\">transformar</span> seu corpo com exercícios rápidos que dá pra fazer em casa.",
    button: "Avançar para meu desafio!",
    note: "Mais <b>energia</b>, <b>postura</b> melhor e <b>resultados</b> visíveis sem gastar horas na academia."
  },

  /* 12. Peso atual (slider) */
  {
    type: "weight",
    key: "peso_atual",
    intro: "Essas informações são importantes para montar o treino ideal pra você, adaptado ao seu corpo e aos seus objetivos.",
    title: "Qual seu peso atualmente?",
    min: 40,
    max: 250,
    initial: 70,
    button: "Continuar"
  },

  /* 13. Peso desejado */
  {
    type: "input",
    key: "peso_desejado",
    inputType: "number",
    title: "Qual é o peso que você gostaria de atingir?",
    placeholder: "Digite seu objetivo de peso ideal",
    button: "Continuar",
    notes: [
      "✅ Seu plano será feito sob medida para o corpo e peso que você deseja.",
      "De acordo com especialistas, perder até 4 kg por mês é saudável, seguro e ajuda a reduzir riscos como diabetes tipo 2 e problemas cardíacos."
    ]
  },

  /* 14. Idade */
  {
    type: "single",
    key: "idade",
    layout: "grid",
    title: "Qual sua idade?",
    options: [
      { title: "18 a 29 anos" },
      { title: "30 a 39 anos" },
      { title: "40 a 49 anos" },
      { title: "+50 anos" }
    ],
    note: "✅ Pedimos sua idade para ajustar o plano ao seu momento atual."
  },

  /* 15. Evento especial */
  {
    type: "single",
    key: "evento",
    title: "Você tem algum evento especial chegando?",
    subtitle: "Se preparar para um momento importante pode ser o empurrão que faltava para conquistar o corpo que você deseja.",
    options: [
      { title: "Férias / Viagem especial ✈️" },
      { title: "Casamento (meu ou de alguém próximo) 💍" },
      { title: "Aniversário / Nova idade 🎂" },
      { title: "Encontro ou ocasião social 👗" },
      { title: "Saúde e bem-estar ❤️" },
      { title: "Nenhum evento específico" }
    ]
  },

  /* 16. Carregando com depoimentos (avança sozinho) */
  {
    type: "loadingTestimonials",
    text: "Nas últimas semanas, nossas alunas perderam em média <span class=\"accent\">14 kg</span> com o Pilates de Parede. E o melhor: sem academia lotada, sem gastar com aparelhos e sem sofrimento",
    label: "Preparando seu plano exclusivo...",
    testimonials: [
      { name: "Cláudia Ribeiro", handle: "@claudiaribeirolima", text: "Estou com 52 anos e sofria muito com dores no joelho. Os exercícios foram leves, consegui emagrecer 6 kg e ainda melhorei minha disposição no dia a dia." },
      { name: "Patrícia Soares", handle: "@patriciasalvves", text: "Tenho 44 anos e nunca gostei de academia. Em casa, com o Pilates de Parede, já perdi 10 kg em 3 meses e meu corpo está mais firme do que nunca" },
      { name: "Adriana Martins", handle: "@adrianamartins76", text: "Estou com 49 anos, e sempre tive dificuldade em manter a motivação. O método é tão prático que já faz parte da minha rotina. Eliminei 7 kg e meu bumbum está empinado de novo!" },
      { name: "Maria Fernanda Alves", handle: "@mariafernanda.alves", text: "Tenho 47 anos e já tinha tentado várias coisas sem sucesso. Com o Pilates de Parede, perdi 8 kg em 2 meses e voltei a usar roupas que estavam guardadas há anos!" }
    ]
  },

  /* 17. Análise do perfil */
  {
    type: "info",
    align: "left",
    title: "✨ Analisando o seu perfil, vimos que você pode eliminar <span class=\"accent\">3 kg na 1ª semana</span> e até <span class=\"accent\">10 kg em 28 dias</span> com o Pilates de Parede.",
    text: "Um método simples, sem academia e sem sofrimento, que já transformou a vida de milhares de mulheres.<br><br>👉 <b>Em menos de 1 mês, você já vai sentir a diferença no espelho e nas roupas!</b>",
    html: "<h3 class=\"subheading\">🔥 Seu Protocolo Exclusivo de 28 Dias está quase pronto!</h3>" +
          "<p>Em apenas 4 semanas, você vai sentir e ver seu corpo mudando de verdade:</p>" +
          "<p>✨ <b>Semana 1:</b> O corpo começa a queimar gordura acumulada, você já sente mais leveza e disposição no dia a dia.</p>" +
          "<p>✨ <b>Semana 2:</b> Barriga mais seca, cintura afinando e glúteos começando a empinar sem esforço.</p>" +
          "<p>✨ <b>Semana 3:</b> Gordura diminuindo de forma visível, corpo mais firme, postura elegante e autoestima lá em cima.</p>" +
          "<p>✨ <b>Semana 4:</b> Transformação completa – medidas reduzidas, músculos tonificados e um corpo mais bonito, saudável e cheio de energia!</p>",
    button: "Continuar"
  },

  /* 18. Dias por semana */
  {
    type: "single",
    key: "dias_semana",
    title: "Quantos dias por semana você gostaria de treinar?",
    subtitle: "Escolha o que combina melhor com sua rotina, o Pilates de Parede se adapta a você!",
    options: [
      { title: "⏰ 3 a 4 dias" },
      { title: "🔥 5 a 6 dias" },
      { title: "😊 Só 2 dias por semana" },
      { title: "💃 Não sei, quero algo fácil" }
    ]
  },

  /* 19. Nome */
  {
    type: "input",
    key: "nome",
    inputType: "text",
    title: "Digite seu nome para que possamos montar um plano de exercícios totalmente personalizado para você",
    label: "Nome",
    placeholder: "Digite seu nome...",
    button: "Continuar"
  },

  /* 21. Carregando com 3 barras */
  {
    type: "loadingBars",
    bars: [
      "✅ Definindo seus objetivos personalizados...",
      "🥗 Montando sua estratégia para queimar...",
      "💪 Selecionando os treinos certos para você..."
    ],
    headline: "Mais de <span class=\"accent\">70 mil</span> brasileiras já escolheram o Pilates de Parede para transformar o corpo sem academia",
    button: "Continuar"
  },

  /* 22. Página final (oferta) */
  {
    type: "final",
    headline: "🚨 Atenção, <span class=\"accent\">{{nome}}</span>!<br>Essa é a sua chance única.",
    intro: [
      "Por ter chegado até aqui e respondido ao nosso quiz, você ganhou um <b>desconto exclusivo de 50%</b> no Pilates de Parede. 🎉",
      "👉 Mas atenção: <b>esse desconto só é válido nesta página e expira assim que você sair daqui</b>. Se você fechar, perde para sempre essa condição especial."
    ],
    heroImage: "assets/img/agora-objetivo.png",
    highlight: {
      title: "⚡ Em apenas 3 semanas seu corpo já começa a mudar!",
      text: "Diga adeus à gordura abdominal, fortaleça e empine o bumbum, e conquiste um corpo mais firme e definido em casa, dedicando só <b>10 minutos por dia</b>."
    },
    receiveTitle: "O que você vai receber:",
    receiveItems: [
      "✅ Treinos rápidos, práticos e 100% em casa",
      "✅ Aulas passo a passo, já organizadas para cada dia",
      "✅ Plano de emagrecimento acelerado, sem dietas malucas",
      "✅ Receitas fáceis e deliciosas que ajudam a perder peso",
      "✅ Suporte exclusivo e acompanhamento próximo",
      "✅ Resultados visíveis já em 21 dias",
      "✅ Transformação real do corpo e da autoestima"
    ],
    access: {
      title: "📩 Como você vai receber seu acesso?",
      paragraphs: [
        "Assim que finalizar seu cadastro, você receberá <b>um e-mail imediato</b> com seu login exclusivo para a Área de Alunas.",
        "Lá dentro, tudo já estará organizado: <b>aulas passo a passo, separadas por dia da semana</b>.",
        "👉 Basta apertar o Play e começar sua transformação!"
      ]
    },
    price: {
      badge: "Últimas vagas com esse valor",
      installments: "3x",
      installmentValue: "R$ 13,88",
      discountLabel: "10% off",
      total: "37,90",
      totalSuffix: "à vista",
      note: "Pagamento único, sem mensalidade!"
    },
    bonuses: [
      { label: "Bônus 1:", title: "Cardápio Saudável:", desc: "100 Receitas Práticas e Deliciosas", from: "R$47,00" },
      { label: "Bônus 2:", title: "Calma Instantânea:", desc: "7 Minutos para Relaxar", from: "R$69,00" }
    ],
    offerImage: "assets/img/oferta-3790.png",
    ctaText: "Testar agora",
    raffle: {
      lines: [
        "🔥 <b>SORTEIO EXCLUSIVO:</b>",
        "<b>Ligação e Acompanhamento VIP</b> 🔥",
        "Ao garantir seu acesso hoje, você já entra automaticamente no sorteio para:",
        "📞 <b>Receber uma ligação imediata</b> com seu treino personalizado.",
        "👑 <b>Entrar no Grupo VIP individual</b> com nosso time de especialistas.",
        "<span class=\"accent\">E no acompanhamento você terá:</span>"
      ],
      items: [
        "✅ Metas feitas sob medida para você.",
        "✅ Dicas e truques secretos que aceleram os resultados.",
        "✅ Suporte exclusivo para conquistar até <b>20kg a menos em apenas 21 dias</b>!"
      ]
    },
    testimonials: [
      { img: "assets/img/avatar-renata.png", name: "Renata Castro, 42 anos", handle: "@renatacastro_bh", text: "Sempre odiei academia lotada, mas com o Pilates de Parede em casa consegui mudar meu corpo. Em menos de 1 mês sequei a cintura, empinei o bumbum e ganhei energia até pra brincar com meus filhos." },
      { img: "assets/img/avatar-claudia.png", name: "Cláudia Nogueira, 51 anos", handle: "@claudia.nogueira_santos", text: "Achei que depois dos 50 seria impossível emagrecer, mas em 3 semanas já perdi 6kg com o Pilates de Parede. Minha barriga desinchou, minhas roupas voltaram a servir e estou muito mais confiante." },
      { img: "assets/img/avatar-carolina.png", name: "Carolina Duarte, 38 anos – Personal Trainer", handle: "@carolduartefit", text: "Sou personal há mais de 10 anos e confesso que fiquei curiosa com o Pilates de Parede. Comprei para testar e me surpreendi: os treinos são simples, eficientes e realmente dão resultado. Gostei tanto que já estou passando os exercícios para minhas alunas — e elas estão amando!" },
      { img: "assets/img/avatar-juliana.png", name: "Juliana, 53 anos", handle: "@julacerdanascim_", text: "Em apenas 21 dias eliminei 7kg com o Pilates de Parede. Não passei fome, não fiz dieta maluca e já sinto meu corpo mais firme, com o bumbum empinado de novo. Estou apaixonada pelos resultados!" },
      { img: "assets/img/avatar-fernanda.png", name: "Fernanda Ribeiro, 44 anos", handle: "@fernandaribeiroO", text: "Eu queria perder gordura abdominal e tonificar. Com o Pilates de Parede, consegui diminuir a barriga e deixar o corpo mais forte em 21 dias. Funcionou demais!" },
      { img: "assets/img/avatar-adriana.png", name: "Adriana Lopes, 47 anos", handle: "@adrianalopessouza", text: "Sempre me achei acima do peso e já tinha tentado de tudo. Academia nunca foi pra mim, e dieta maluca só me deixava frustrada. Com o Pilates de Parede foi diferente: em poucas semanas comecei a ver minha barriga diminuindo e minhas roupas servindo melhor. Pela primeira vez, sinto que estou no caminho certo sem sofrimento." }
    ],
    resultsTitle: "<b>Olha o resultado que algumas alunas conquistaram em poucas semanas</b> 👇👇",
    resultsImages: [
      "assets/img/resultado-01.png",
      "assets/img/resultado-02.png",
      "assets/img/resultado-03.png",
      "assets/img/resultado-04.png",
      "assets/img/resultado-05.png"
    ],
    benefitsTitle: "💪 Benefícios que você vai conquistar:",
    benefits: [
      "🔥 <b>Perda de peso acelerada</b> → elimine até 5kg em 28 dias sem dietas malucas.",
      "💃 <b>Barriga mais seca e cintura afinada</b> → veja as roupas voltarem a servir.",
      "🍑 <b>Bumbum empinado e firme</b> → tonifique glúteos sem aparelhos caros.",
      "💪 <b>Fortalecimento muscular</b> → pernas, abdômen e braços mais definidos.",
      "✨ <b>Mais disposição e energia</b> → sinta-se ativa e animada todos os dias.",
      "🧘 <b>Melhora nas dores e postura</b> → exercícios leves que aliviam coluna e articulações.",
      "🕒 <b>Treinos rápidos e práticos</b> → apenas 10 minutos por dia no conforto da sua casa.",
      "🎯 <b>Resultados progressivos e duradouros</b> → continue evoluindo sem sofrer."
    ],
    priceArgument: [
      "🔥 <b>Menos de R$1 por dia para transformar seu corpo inteiro!</b>",
      "👉 O valor de uma pizza que some em minutos pode ser o investimento que muda sua saúde, sua autoestima e o jeito que você se olha no espelho para sempre."
    ],
    ctaText2: "Quero Testar Agora",
    guaranteeImage: "assets/img/garantia.png",
    faq: [
      { q: "🔹 O método é seguro para quem nunca treinou antes?", a: "Sim! Todos os exercícios são de <b>baixo impacto</b>, fáceis de executar e adaptáveis para qualquer idade ou nível de condicionamento. Você vai conseguir acompanhar mesmo sendo iniciante total." },
      { q: "🔹 Funciona para quem tem diástase?", a: "Sim! O Pilates de Parede é <b>recomendado por especialistas</b> para quem tem diástase, justamente por ser leve e eficaz. Muitas alunas nessa condição já tiveram ótimos resultados." },
      { q: "🔹 Preciso ter experiência com exercícios ou academia?", a: "De jeito nenhum! O programa foi criado para <b>mulheres comuns</b>, sem rotina de treino. Você aprende cada movimento passo a passo, sem precisar de equipamentos ou experiência prévia." },
      { q: "🔹 Quanto tempo por dia preciso para ver resultados?", a: "Com apenas <b>10 minutos por dia</b>, você já começa a notar diferença em poucas semanas. Nosso método é rápido, prático e cabe na rotina mais corrida." },
      { q: "🔹 E se não funcionar para mim?", a: "Você tem <b>90 dias de garantia total</b>. Se seguir o plano direitinho e mesmo assim não ver resultados visíveis, devolvemos 100% do seu dinheiro. Zero risco pra você." },
      { q: "🔹 Meus dados estão seguros?", a: "Sim. Todo o processo de pagamento é feito em <b>ambiente protegido com criptografia SSL</b>, o mesmo usado pelos maiores bancos. Seus dados jamais serão vendidos ou compartilhados." },
      { q: "🔹 Por quanto tempo terei acesso ao programa?", a: "O acesso é <b>vitalício</b>. Depois de garantir sua vaga, o programa é seu para sempre." },
      { q: "🔹 Como vou receber meu acesso?", a: "Você receberá seu acesso direto no <b>E-mail e WhatsApp</b>, imediatamente após a confirmação do pagamento. Tudo simples e rápido." }
    ]
  }
];
