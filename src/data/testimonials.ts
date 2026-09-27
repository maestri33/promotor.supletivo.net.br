export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  badge?: string;
  outcome?: string;
  src: string;
};

export const testimonialsPromotor: Testimonial[] = [
  {
    quote:
      "Comecei indicando duas colegas de trabalho que não tinham o ensino médio. Quando caiu o primeiro Pix de R$ 200 na sexta-feira às 18h em ponto, vi que o negócio era sério. Minha renda extra hoje paga o curso de inglês dos meus filhos e não precisei ser vendedora chata nem cobrar ninguém.",
    name: "Camila Duarte",
    designation: "31 anos · Recife - PE · Assistente & Mãe",
    badge: "Chave Pix Validada",
    outcome: "+R$ 2.400 / mês no Pix",
    src: "/images/testimonials/camila.jpg",
  },
  {
    quote:
      "No carro converso com muita gente que desabafa ter perdido promoção ou vaga em concurso por falta do diploma. Só mando meu link oficial pelo WhatsApp e mostro que é 100% legal com publicação em diário oficial. A comissão semanal cai limpa no meu Pix.",
    name: "Júlio César Andrade",
    designation: "45 anos · Belo Horizonte - MG · Motorista de App",
    badge: "Promotor Oficial",
    outcome: "+R$ 3.800 / mês no Pix",
    src: "/images/testimonials/julio.jpg",
  },
  {
    quote:
      "Tinha muito medo de golpe na internet. Mas quando vi que o cadastro é grátis, que a chave Pix precisa ser do meu próprio CPF validada no banco e que os alunos recebem diploma válido pelo CEE, confiei. Consegui zerar as faturas do cartão de crédito só com as indicações.",
    name: "Valéria Soares",
    designation: "38 anos · Campinas - SP · Recepcionista",
    badge: "Cadastro Verificado",
    outcome: "+R$ 1.900 / mês no Pix",
    src: "/images/testimonials/valeria.jpg",
  },
  {
    quote:
      "Sou o primeiro da minha família a entrar numa faculdade. Indicar o Supletivo Brasil virou missão: muitos amigos da academia tinham vergonha de não ter terminado a escola. Mostro como funciona pelo celular, a equipe do polo acompanha tudo e o Pix cai toda sexta.",
    name: "Lucas Fagundes",
    designation: "26 anos · Goiânia - GO · Estudante & Instrutor",
    badge: "Jovem Promotor",
    outcome: "+R$ 2.100 / mês no Pix",
    src: "/images/testimonials/lucas.jpg",
  },
  {
    quote:
      "No meu comércio todo mundo me conhece. Quando alguém diz que quer fazer um concurso ou prestar vestibular mas parou no fundamental, eu já passo o link no WhatsApp. Não preciso me preocupar com papelada nenhuma. O dinheiro cai pontualmente no Pix toda sexta.",
    name: "Dona Neide Ribeiro",
    designation: "52 anos · Salvador - BA · Comerciante de Bairro",
    badge: "Polo Regional",
    outcome: "+R$ 1.700 / mês no Pix",
    src: "/images/testimonials/neide.jpg",
  },
];
