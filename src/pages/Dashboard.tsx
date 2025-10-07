import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Cursos Matriculados", value: "3", icon: BookOpen, color: "text-primary" },
    { label: "Turmas Ativas", value: "2", icon: Users, color: "text-secondary" },
    { label: "Certificados", value: "5", icon: Award, color: "text-primary" },
    { label: "Progresso Médio", value: "67%", icon: TrendingUp, color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 lg:pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Meu Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Bem-vindo de volta! Acompanhe seu progresso e gerenciamento.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Coming Soon Message */}
          <Card className="p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">
                Dashboard em Desenvolvimento
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Estamos trabalhando para trazer funcionalidades completas de gestão acadêmica, 
                controle de frequência, notas e certificações. Em breve você terá acesso a:
              </p>
              <ul className="mt-6 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-2 w-2 bg-secondary rounded-full" />
                  Acompanhamento de frequência em tempo real
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-2 w-2 bg-secondary rounded-full" />
                  Visualização de notas e desempenho
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-2 w-2 bg-secondary rounded-full" />
                  Emissão automática de certificados
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-2 w-2 bg-secondary rounded-full" />
                  Gestão completa de matrículas
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
