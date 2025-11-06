import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import webDevImage from "@/assets/course-web-dev.jpg";
import designImage from "@/assets/course-design.jpg";
import marketingImage from "@/assets/course-marketing.jpg";
import projectMgmtImage from "@/assets/course-project-management.jpg";
import dataAnalysisImage from "@/assets/course-data-analysis.jpg";
import englishImage from "@/assets/course-english.jpg";

const CoursesSection = () => {
  const navigate = useNavigate();
  
  const courses = [
    {
      id: "1",
      title: "Desenvolvimento Web Full Stack",
      description: "Aprenda a criar aplicações web completas, do front-end ao back-end, com as tecnologias mais modernas do mercado.",
      duration: "320h",
      students: 1250,
      rating: 4.8,
      category: "Tecnologia",
      image: webDevImage,
    },
    {
      id: "2",
      title: "Design Gráfico e UX/UI",
      description: "Domine as ferramentas e técnicas para criar designs incríveis e experiências de usuário memoráveis.",
      duration: "240h",
      students: 890,
      rating: 4.9,
      category: "Design",
      image: designImage,
    },
    {
      id: "3",
      title: "Marketing Digital Avançado",
      description: "Estratégias completas de marketing digital, SEO, redes sociais e análise de dados para impulsionar negócios.",
      duration: "180h",
      students: 1500,
      rating: 4.7,
      category: "Marketing",
      image: marketingImage,
    },
    {
      id: "4",
      title: "Gestão de Projetos Ágeis",
      description: "Metodologias ágeis, Scrum, Kanban e ferramentas essenciais para gerenciar projetos com eficiência.",
      duration: "160h",
      students: 720,
      rating: 4.8,
      category: "Gestão",
      image: projectMgmtImage,
    },
    {
      id: "5",
      title: "Análise de Dados e Business Intelligence",
      description: "Transforme dados em insights valiosos. Aprenda SQL, Python, visualização de dados e mais.",
      duration: "280h",
      students: 980,
      rating: 4.9,
      category: "Dados",
      image: dataAnalysisImage,
    },
    {
      id: "6",
      title: "Inglês para Negócios",
      description: "Desenvolva fluência em inglês focado no ambiente corporativo e comunicação profissional.",
      duration: "200h",
      students: 1100,
      rating: 4.6,
      category: "Idiomas",
      image: englishImage,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-secondary-light text-secondary rounded-full text-sm font-semibold mb-4">
            Nossos Cursos
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Explore Nosso Catálogo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cursos desenvolvidos por especialistas do mercado para impulsionar sua carreira
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2 group"
            onClick={() => navigate("/cursos")}
          >
            Ver Todos os Cursos
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
