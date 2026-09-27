export interface Testimonial {
  id: string;
  name: string;
  location: string;
  occupation: string;
  earnings: string;
  earningsHighlight: string;
  timeActive: string;
  paidReferrals: string;
  quote: string;
  story: string;
  src: string;
  avatarAlt: string;
  pixVerified: boolean;
}

export const testimonialsPromotor: Testimonial[] = [
  {
    id: 'camila',
    name: 'Camila Duarte',
    location: 'Recife - PE',
    occupation: 'Assistente Administrativa & Mãe',
    earnings: 'R$ 2.400 / mês',
    earningsHighlight: 'Pix toda sexta às 18h',
    timeActive: '5 meses ativa',
    paidReferrals: '24 matrículas pagas',
    quote:
      'Comecei indicando duas colegas de trabalho que não tinham o ensino médio. Quando caiu o primeiro Pix de R$ 200 na sexta-feira às 18h em ponto, vi que o negócio era sério. Minha renda extra hoje paga o curso de inglês dos meus filhos e não precisei ser vendedora chata nem cobrar ninguém.',
    story: 'Compartilha o link no WhatsApp nos intervalos do trabalho e em grupos de família.',
    src: '/images/testimonials/camila.jpg',
    avatarAlt: 'Foto de Camila Duarte, promotora do Supletivo Brasil em Recife',
    pixVerified: true,
  },
  {
    id: 'julio',
    name: 'Júlio César Andrade',
    location: 'Belo Horizonte - MG',
    occupation: 'Motorista Autônomo & Líder Comunitário',
    earnings: 'R$ 3.800 / mês',
    earningsHighlight: 'Bônus de produção semanal',
    timeActive: '7 meses ativo',
    paidReferrals: '38 matrículas pagas',
    quote:
      'No carro converso com muita gente que desabafa ter perdido promoção ou vaga em concurso por falta do diploma. Só mando meu link oficial pelo WhatsApp e mostro que é 100% legal com publicação em diário oficial. A comissão semanal cai limpa no meu Pix.',
    story: 'Transformou suas viagens diárias e rede de contatos no bairro em um canal sólido de renda.',
    src: '/images/testimonials/julio.jpg',
    avatarAlt: 'Foto de Júlio César Andrade, promotor do Supletivo Brasil em Belo Horizonte',
    pixVerified: true,
  },
  {
    id: 'valeria',
    name: 'Valéria Soares',
    location: 'Campinas - SP',
    occupation: 'Recepcionista em Clínica Odontológica',
    earnings: 'R$ 1.900 / mês',
    earningsHighlight: 'Quitação de dívidas',
    timeActive: '4 meses ativa',
    paidReferrals: '19 matrículas pagas',
    quote:
      'Tinha muito medo de golpe na internet. Mas quando vi que o cadastro é grátis, que a chave Pix precisa ser do meu próprio CPF validada no banco e que os alunos recebem diploma válido pelo CEE, confiei. Consegui zerar as faturas do cartão de crédito só com as indicações.',
    story: 'Indica para pacientes, amigos de congregação e conhecidos que buscam recolocação.',
    src: '/images/testimonials/valeria.jpg',
    avatarAlt: 'Foto de Valéria Soares, promotora do Supletivo Brasil em Campinas',
    pixVerified: true,
  },
  {
    id: 'lucas',
    name: 'Lucas Fagundes',
    location: 'Goiânia - GO',
    occupation: 'Estudante de Ed. Física & Instrutor',
    earnings: 'R$ 2.100 / mês',
    earningsHighlight: 'Custeia a faculdade',
    timeActive: '3 meses ativo',
    paidReferrals: '21 matrículas pagas',
    quote:
      'Sou o primeiro da minha família a entrar numa faculdade. Indicar o Supletivo Brasil virou missão: muitos amigos da academia tinham vergonha de não ter terminado a escola. Mostro como funciona pelo celular, a equipe do polo acompanha tudo e o Pix cai toda sexta.',
    story: 'Usa as redes sociais e grupos de treino para apoiar jovens que precisam concluir os estudos.',
    src: '/images/testimonials/lucas.jpg',
    avatarAlt: 'Foto de Lucas Fagundes, promotor do Supletivo Brasil em Goiânia',
    pixVerified: true,
  },
  {
    id: 'neide',
    name: 'Dona Neide Ribeiro',
    location: 'Salvador - BA',
    occupation: 'Comerciante & Confeiteira de Bairro',
    earnings: 'R$ 1.700 / mês',
    earningsHighlight: 'Reforço fixo na renda',
    timeActive: '6 meses ativa',
    paidReferrals: '17 matrículas pagas',
    quote:
      'No meu comércio todo mundo me conhece. Quando alguém diz que quer fazer um concurso ou prestar vestibular mas parou no fundamental, eu já passo o link no WhatsApp. Não preciso me preocupar com papelada nenhuma. O dinheiro cai pontualmente no Pix toda sexta.',
    story: 'Ponto de referência no bairro para quem quer retomar os estudos com credibilidade.',
    src: '/images/testimonials/neide.jpg',
    avatarAlt: 'Foto de Dona Neide Ribeiro, promotora do Supletivo Brasil em Salvador',
    pixVerified: true,
  },
];
