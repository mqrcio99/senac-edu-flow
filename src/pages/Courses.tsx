import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/home/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter } from "lucide-react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, enroll } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEnroll = (courseId: string, courseName: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para se matricular em um curso.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const success = enroll(courseId, courseName);
    if (success) {
      toast({
        title: "Matrícula realizada!",
        description: `Você foi matriculado no curso ${courseName}.`,
      });
    } else {
      toast({
        title: "Matrícula já existe",
        description: "Você já está matriculado neste curso.",
        variant: "destructive",
      });
    }
  };

  const allCourses = [
    {
      id: "1",
      title: "Desenvolvimento Web Full Stack",
      description: "Aprenda a criar aplicações web completas, do front-end ao back-end, com as tecnologias mais modernas do mercado.",
      duration: "320h",
      students: 1250,
      rating: 4.8,
      category: "Tecnologia",
    },
    {
      id: "2",
      title: "Design Gráfico e UX/UI",
      description: "Domine as ferramentas e técnicas para criar designs incríveis e experiências de usuário memoráveis.",
      duration: "240h",
      students: 890,
      rating: 4.9,
      category: "Design",
    },
    {
      id: "3",
      title: "Marketing Digital Avançado",
      description: "Estratégias completas de marketing digital, SEO, redes sociais e análise de dados para impulsionar negócios.",
      duration: "180h",
      students: 1500,
      rating: 4.7,
      category: "Marketing",
    },
    {
      id: "4",
      title: "Gestão de Projetos Ágeis",
      description: "Metodologias ágeis, Scrum, Kanban e ferramentas essenciais para gerenciar projetos com eficiência.",
      duration: "160h",
      students: 720,
      rating: 4.8,
      category: "Gestão",
    },
    {
      id: "5",
      title: "Análise de Dados e Business Intelligence",
      description: "Transforme dados em insights valiosos. Aprenda SQL, Python, visualização de dados e mais.",
      duration: "280h",
      students: 980,
      rating: 4.9,
      category: "Dados",
    },
    {
      id: "6",
      title: "Inglês para Negócios",
      description: "Desenvolva fluência em inglês focado no ambiente corporativo e comunicação profissional.",
      duration: "200h",
      students: 1100,
      rating: 4.6,
      category: "Idiomas",
    },
  ];

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 lg:pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Catálogo de Cursos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossa seleção completa de cursos profissionalizantes
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar cursos..." 
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 h-12">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id} 
                className="animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard {...course} />
                <Button 
                  onClick={() => handleEnroll(course.id, course.title)}
                  className="mt-4 w-full btn-secondary"
                >
                  Matricular-se
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
