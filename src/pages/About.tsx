import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, HeartHandshake, Users, Award, Building2 } from "lucide-react";

const About = () => {
  const values = [
    { icon: Target, title: "Missão", text: "Educar para o trabalho em atividades de comércio de bens, serviços e turismo, promovendo desenvolvimento profissional e cidadania." },
    { icon: Eye, title: "Visão", text: "Ser referência nacional em educação profissional, reconhecida pela excelência e pela conexão real com o mercado." },
    { icon: HeartHandshake, title: "Valores", text: "Ética, respeito às pessoas, inovação, responsabilidade social e compromisso com resultados." },
  ];

  const numbers = [
    { icon: Users, value: "8.500+", label: "Alunos formados" },
    { icon: Award, value: "120+", label: "Cursos ativos" },
    { icon: Building2, value: "12", label: "Unidades" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 lg:pt-32 pb-16">
        <div className="container mx-auto px-4">
          <header className="text-center max-w-3xl mx-auto mb-14 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-secondary-light text-secondary rounded-full text-sm font-semibold mb-4">
              Institucional
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Sobre Nós</h1>
            <p className="text-lg text-muted-foreground">
              Há mais de sete décadas transformando vidas por meio da educação profissional de qualidade,
              conectando pessoas às oportunidades reais do mercado de trabalho.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {values.map((item) => (
              <Card key={item.title} className="h-full">
                <CardContent className="pt-6">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="bg-muted/40 rounded-2xl p-8 sm:p-12 mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {numbers.map((n) => (
                <div key={n.label}>
                  <n.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold text-foreground">{n.value}</p>
                  <p className="text-muted-foreground text-sm">{n.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Nossa história</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nascemos com o propósito de qualificar profissionais para o comércio e os serviços.
              Ao longo dos anos ampliamos nossa atuação para tecnologia, saúde, gastronomia, design e gestão,
              sempre com metodologia prática, laboratórios equipados e professores atuantes no mercado.
              Hoje seguimos com o mesmo compromisso: preparar pessoas para o trabalho e para a vida.
            </p>
            <Button asChild size="lg"><Link to="/cursos">Conheça nossos cursos</Link></Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;