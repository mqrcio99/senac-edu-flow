import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTASection = () => {
  const benefits = [
    "Certificação reconhecida no mercado",
    "Suporte personalizado durante todo o curso",
    "Acesso vitalício ao material didático",
    "Aulas ao vivo e gravadas",
    "Comunidade ativa de alunos",
    "Plataforma intuitiva e moderna",
  ];

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Comece Sua Jornada Hoje
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Junte-se a milhares de alunos que já transformaram suas carreiras. 
              Matrículas abertas para novas turmas!
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button 
              size="lg" 
              className="btn-secondary text-lg gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              Matricule-se Agora
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Fale com um Consultor
            </Button>
          </div>

          {/* Trust badges */}
          <p className="text-primary-foreground/70 text-sm mt-8">
            ✓ Garantia de 7 dias • ✓ Certificado incluso • ✓ Suporte 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
