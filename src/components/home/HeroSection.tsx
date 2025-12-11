import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Educação de qualidade" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary rounded-full text-secondary-foreground text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              #MudandoAVida
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
              Transforme Seu Futuro com Educação de Excelência
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 leading-relaxed">
              Cursos profissionalizantes com certificação reconhecida. 
              Aprenda com os melhores e construa a carreira dos seus sonhos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in-up">
            <Button 
              size="lg" 
              className="btn-secondary text-base sm:text-lg gap-2 shadow-xl hover:scale-105 transition-transform w-full sm:w-auto"
              onClick={() => navigate("/cursos")}
            >
              Explorar Cursos
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base sm:text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
              onClick={() => {
                const coursesSection = document.querySelector('section.py-12');
                coursesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Saiba Mais
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 animate-fade-in">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="bg-secondary p-2 sm:p-3 rounded-lg">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary-foreground">50+</p>
                <p className="text-xs sm:text-sm text-primary-foreground/80">Cursos Ativos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="bg-secondary p-2 sm:p-3 rounded-lg">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary-foreground">5.000+</p>
                <p className="text-xs sm:text-sm text-primary-foreground/80">Alunos Formados</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="bg-secondary p-2 sm:p-3 rounded-lg">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary-foreground">95%</p>
                <p className="text-xs sm:text-sm text-primary-foreground/80">Satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
