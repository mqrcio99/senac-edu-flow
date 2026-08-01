export type Area =
  | "Tecnologia" | "Dados" | "Design" | "Marketing"
  | "Gestão" | "Saúde" | "Gastronomia" | "Idiomas";

export interface QuizOption {
  label: string;
  scores: Partial<Record<Area, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "O que mais te dá energia no dia a dia?",
    options: [
      { label: "Resolver problemas lógicos e construir coisas", scores: { Tecnologia: 3, Dados: 2 } },
      { label: "Criar algo visual e bonito", scores: { Design: 3, Marketing: 1 } },
      { label: "Cuidar e ajudar pessoas", scores: { Saúde: 3, Gastronomia: 1 } },
      { label: "Organizar equipes e processos", scores: { Gestão: 3, Marketing: 1 } },
    ],
  },
  {
    id: "q2",
    question: "Escolha a tarefa que você faria de graça num fim de semana:",
    options: [
      { label: "Montar um site ou app do zero", scores: { Tecnologia: 3 } },
      { label: "Editar fotos e criar posts", scores: { Design: 2, Marketing: 2 } },
      { label: "Cozinhar um jantar completo", scores: { Gastronomia: 3 } },
      { label: "Assistir séries em outro idioma sem legenda", scores: { Idiomas: 3 } },
    ],
  },
  {
    id: "q3",
    question: "Diante de uma planilha gigante, você:",
    options: [
      { label: "Adora achar padrões e montar gráficos", scores: { Dados: 3, Gestão: 1 } },
      { label: "Automatiza tudo com código", scores: { Tecnologia: 3, Dados: 1 } },
      { label: "Transforma em uma apresentação bonita", scores: { Design: 2, Marketing: 2 } },
      { label: "Prefere distância — gosto mesmo é de gente", scores: { Saúde: 2, Idiomas: 1, Gastronomia: 1 } },
    ],
  },
  {
    id: "q4",
    question: "Qual elogio te deixaria mais feliz?",
    options: [
      { label: "\"Você tem um ótimo olhar estético\"", scores: { Design: 3 } },
      { label: "\"Você salvou a situação, foi muito cuidadoso\"", scores: { Saúde: 3 } },
      { label: "\"Sua análise mudou nossa decisão\"", scores: { Dados: 3, Gestão: 1 } },
      { label: "\"Sua campanha bombou\"", scores: { Marketing: 3 } },
    ],
  },
  {
    id: "q5",
    question: "Como você prefere trabalhar?",
    options: [
      { label: "Focado, com fones e um computador", scores: { Tecnologia: 2, Dados: 2 } },
      { label: "Em movimento, mão na massa", scores: { Gastronomia: 2, Saúde: 2 } },
      { label: "Liderando e conectando pessoas", scores: { Gestão: 3, Marketing: 1 } },
      { label: "Conversando com clientes do mundo todo", scores: { Idiomas: 3, Marketing: 1 } },
    ],
  },
  {
    id: "q6",
    question: "Qual objetivo está mais perto do seu momento?",
    options: [
      { label: "Mudar de carreira para a área de tecnologia", scores: { Tecnologia: 3, Dados: 1 } },
      { label: "Empreender com algo meu", scores: { Gastronomia: 2, Marketing: 2, Gestão: 1 } },
      { label: "Ser promovido no trabalho atual", scores: { Gestão: 2, Dados: 1, Idiomas: 1 } },
      { label: "Entrar rápido no mercado com uma profissão prática", scores: { Saúde: 3, Gastronomia: 1 } },
    ],
  },
  {
    id: "q7",
    question: "Que tipo de problema te fascina?",
    options: [
      { label: "\"Por que os números caíram esse mês?\"", scores: { Dados: 3, Marketing: 1 } },
      { label: "\"Como deixar isso mais fácil de usar?\"", scores: { Design: 3, Tecnologia: 1 } },
      { label: "\"Como fazer o time entregar no prazo?\"", scores: { Gestão: 3 } },
      { label: "\"Como essa pessoa pode ficar melhor?\"", scores: { Saúde: 3 } },
    ],
  },
  {
    id: "q8",
    question: "Daqui a 2 anos, você se imagina:",
    options: [
      { label: "Programando em uma empresa de tecnologia", scores: { Tecnologia: 3 } },
      { label: "Com um portfólio criativo e clientes próprios", scores: { Design: 2, Marketing: 2 } },
      { label: "Atuando em hospital ou clínica", scores: { Saúde: 3 } },
      { label: "Trabalhando com pessoas de outros países", scores: { Idiomas: 3, Gestão: 1 } },
    ],
  },
];

export const areaInfo: Record<Area, { title: string; description: string }> = {
  Tecnologia: { title: "Tecnologia", description: "Você gosta de construir soluções, entender como as coisas funcionam por dentro e resolver problemas com lógica. Programação é o seu caminho natural." },
  Dados: { title: "Dados", description: "Você tem perfil analítico: enxerga padrões, gosta de evidências e de transformar números em decisões." },
  Design: { title: "Design", description: "Seu forte é o olhar visual e a empatia com quem usa. Estética e experiência caminham juntas no seu perfil." },
  Marketing: { title: "Marketing", description: "Você entende de comunicação, comportamento e resultado. Gosta de criar, testar e ver o impacto acontecer." },
  Gestão: { title: "Gestão", description: "Organização, liderança e visão de processo são suas marcas. Você faz o time andar junto." },
  Saúde: { title: "Saúde", description: "Cuidar de pessoas é o que te move. Você combina técnica com sensibilidade humana." },
  Gastronomia: { title: "Gastronomia", description: "Você é mão na massa, criativo e gosta de ver o resultado saindo pronto na frente dos olhos." },
  Idiomas: { title: "Idiomas", description: "Comunicação é o seu diferencial. Aprender outra língua abre portas diretas na sua carreira." },
};

export const scoreQuiz = (answers: Record<string, number>) => {
  const totals: Record<string, number> = {};
  quizQuestions.forEach((q) => {
    const idx = answers[q.id];
    if (idx === undefined) return;
    Object.entries(q.options[idx].scores).forEach(([area, value]) => {
      totals[area] = (totals[area] ?? 0) + (value ?? 0);
    });
  });
  const max = Math.max(1, ...Object.values(totals));
  return Object.entries(totals)
    .map(([area, score]) => ({ area: area as Area, score, percent: Math.round((score / max) * 100) }))
    .sort((a, b) => b.score - a.score);
};
