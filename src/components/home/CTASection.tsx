import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  const benefits = [
    "Certificação reconhecida no mercado",
    "Suporte personalizado durante todo o curso",
    "Acesso vitalício ao material didático",
    "Aulas ao vivo e gravadas",
    "Comunidade ativa de alunos",
    "Plataforma intuitiva e moderna",
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6">
              Comece Sua Jornada Hoje
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 px-4">
              Junte-se a milhares de alunos que já transformaram suas carreiras. 
              Matrículas abertas para novas turmas!
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 text-left">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-secondary flex-shrink-0" />
                <span className="text-sm sm:text-base text-primary-foreground font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up">
            <Button 
              size="lg" 
              className="btn-secondary text-base sm:text-lg gap-2 shadow-xl hover:scale-105 transition-transform w-full sm:w-auto"
              onClick={() => navigate("/cursos")}
            >
              Matricule-se Agora
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base sm:text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
              onClick={() => {
                const footer = document.querySelector('footer');
                footer?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Fale com um Consultor
            </Button>
          </div>

          {/* Trust badges */}
          <p className="text-primary-foreground/70 text-xs sm:text-sm mt-6 sm:mt-8 px-4">
            ✓ Garantia de 7 dias • ✓ Certificado incluso • ✓ Suporte 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
