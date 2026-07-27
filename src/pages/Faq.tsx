import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqs = [
  { q: "Como faço minha matrícula?", a: "Crie sua conta gratuitamente, escolha o curso desejado no catálogo e clique em “Matricular-se Agora”. A matrícula aparece imediatamente na sua área do aluno." },
  { q: "Os cursos possuem certificado?", a: "Sim. Todos os cursos concluídos geram certificado digital reconhecido, disponível na sua área do aluno." },
  { q: "Quais são as formas de pagamento?", a: "Aceitamos cartão de crédito, boleto e PIX. Também há opções de parcelamento e bolsas de estudo para cursos selecionados." },
  { q: "Posso cancelar uma matrícula?", a: "Sim. No seu dashboard, basta clicar em “Cancelar” no curso desejado. Cancelamentos em até 7 dias têm reembolso integral." },
  { q: "Qual a diferença entre presencial, híbrido e online?", a: "Presencial acontece integralmente na unidade; híbrido combina encontros presenciais e aulas remotas; online é 100% a distância com suporte de tutoria." },
  { q: "Preciso de conhecimento prévio?", a: "Depende do curso. Cada página informa o nível (Iniciante, Intermediário ou Avançado) e os pré-requisitos recomendados." },
  { q: "Como acompanho meu progresso?", a: "Na área do aluno você visualiza suas matrículas, o percentual de progresso de cada curso e os certificados conquistados." },
];

const Faq = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 pt-24 lg:pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Perguntas Frequentes</h1>
          <p className="text-lg text-muted-foreground">Tire suas dúvidas sobre cursos, matrículas e certificados.</p>
        </header>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Não encontrou o que procurava?</p>
          <Button asChild><Link to="/contato">Fale com a gente</Link></Button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Faq;