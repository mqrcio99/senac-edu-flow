import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, Star, BookOpen, Award, CheckCircle, ArrowLeft } from "lucide-react";
import webDevImage from "@/assets/course-web-dev.jpg";
import designImage from "@/assets/course-design.jpg";
import marketingImage from "@/assets/course-marketing.jpg";
import projectMgmtImage from "@/assets/course-project-management.jpg";
import dataAnalysisImage from "@/assets/course-data-analysis.jpg";
import englishImage from "@/assets/course-english.jpg";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, enroll } = useAuth();
  const { toast } = useToast();

  const coursesData = [
    {
      id: "1",
      title: "Desenvolvimento Web Full Stack",
      description: "Aprenda a criar aplicações web completas, do front-end ao back-end, com as tecnologias mais modernas do mercado.",
      duration: "320h",
      students: 1250,
      rating: 4.8,
      category: "Tecnologia",
      image: webDevImage,
      instructor: "Prof. Carlos Silva",
      level: "Intermediário",
      modules: [
        "HTML5 e CSS3 Avançado",
        "JavaScript e TypeScript",
        "React e Next.js",
        "Node.js e Express",
        "Banco de Dados SQL e NoSQL",
        "Deploy e DevOps"
      ],
      objectives: [
        "Criar interfaces modernas e responsivas",
        "Desenvolver APIs RESTful",
        "Trabalhar com bancos de dados",
        "Implementar autenticação e segurança",
        "Fazer deploy de aplicações"
      ]
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
      instructor: "Prof. Ana Costa",
      level: "Básico",
      modules: [
        "Fundamentos do Design",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Figma e Prototipagem",
        "UX Research",
        "UI Design Avançado"
      ],
      objectives: [
        "Dominar ferramentas profissionais",
        "Criar identidades visuais",
        "Desenvolver interfaces intuitivas",
        "Realizar pesquisas com usuários",
        "Criar protótipos interativos"
      ]
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
      instructor: "Prof. Roberto Lima",
      level: "Avançado",
      modules: [
        "Estratégias de Marketing Digital",
        "SEO e SEM",
        "Marketing de Conteúdo",
        "Redes Sociais",
        "Google Analytics",
        "E-mail Marketing"
      ],
      objectives: [
        "Criar estratégias de marketing eficazes",
        "Otimizar sites para mecanismos de busca",
        "Gerenciar campanhas pagas",
        "Analisar métricas e KPIs",
        "Criar conteúdo engajador"
      ]
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
      instructor: "Prof. Fernanda Souza",
      level: "Intermediário",
      modules: [
        "Introdução às Metodologias Ágeis",
        "Scrum Framework",
        "Kanban",
        "Ferramentas de Gestão",
        "Gestão de Equipes",
        "Certificação PMI-ACP"
      ],
      objectives: [
        "Implementar metodologias ágeis",
        "Gerenciar projetos com Scrum",
        "Utilizar Kanban efetivamente",
        "Liderar equipes ágeis",
        "Preparar para certificações"
      ]
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
      instructor: "Prof. Marcos Oliveira",
      level: "Intermediário",
      modules: [
        "Fundamentos de Análise de Dados",
        "SQL Avançado",
        "Python para Dados",
        "Power BI",
        "Tableau",
        "Machine Learning Básico"
      ],
      objectives: [
        "Manipular e analisar dados",
        "Criar dashboards interativos",
        "Automatizar análises com Python",
        "Aplicar estatística descritiva",
        "Apresentar insights estratégicos"
      ]
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
      instructor: "Prof. Patricia Johnson",
      level: "Intermediário",
      modules: [
        "Business English Fundamentals",
        "Comunicação Corporativa",
        "Apresentações em Inglês",
        "Negociações",
        "E-mails Profissionais",
        "Conversação Avançada"
      ],
      objectives: [
        "Comunicar-se fluentemente em inglês",
        "Fazer apresentações profissionais",
        "Escrever e-mails corporativos",
        "Participar de reuniões internacionais",
        "Negociar em inglês"
      ]
    },
  ];

  const course = coursesData.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Curso não encontrado</h1>
            <Button onClick={() => navigate("/cursos")}>Voltar para Cursos</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para se matricular em um curso.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const success = enroll(course.id, course.title);
    if (success) {
      toast({
        title: "Matrícula realizada!",
        description: `Você foi matriculado no curso ${course.title}.`,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Matrícula já existe",
        description: "Você já está matriculado neste curso.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 lg:pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative h-[400px] mb-12">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/cursos")}
                className="mb-4 text-white hover:bg-white/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Cursos
              </Button>
              <span className="inline-block px-4 py-2 bg-primary rounded-full text-white text-sm font-semibold mb-4">
                {course.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mb-6">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students} alunos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Nível: {course.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* O que você vai aprender */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    O que você vai aprender
                  </h2>
                  <ul className="space-y-3">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Conteúdo do Curso */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Conteúdo do Curso
                  </h2>
                  <div className="space-y-2">
                    {course.modules.map((module, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium">{module}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Instrutor */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Instrutor</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-xl font-bold">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{course.instructor}</h3>
                      <p className="text-muted-foreground">Instrutor do curso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Matrícula */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary mb-2">Gratuito</p>
                      <p className="text-sm text-muted-foreground">Curso 100% gratuito</p>
                    </div>
                    
                    <Button 
                      onClick={handleEnroll}
                      className="w-full btn-primary h-12 text-lg"
                    >
                      Matricular-se Agora
                    </Button>

                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duração</span>
                        <span className="font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Nível</span>
                        <span className="font-semibold">{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Alunos</span>
                        <span className="font-semibold">{course.students}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Avaliação</span>
                        <span className="font-semibold flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-2">Este curso inclui:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Certificado de conclusão
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Acesso vitalício
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Material didático completo
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Suporte com instrutor
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetails;
