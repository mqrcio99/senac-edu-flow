import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useCourse, useEnroll, useMyEnrollments } from "@/hooks/useCourses";
import { courseImage, formatDuration, formatPrice } from "@/lib/courses";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, Star, BookOpen, Award, CheckCircle, ArrowLeft, MapPin } from "lucide-react";

const CourseDetails = () => {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: course, isLoading } = useCourse(slug);
  const { data: enrollments } = useMyEnrollments();
  const enroll = useEnroll();

  const alreadyEnrolled = !!enrollments?.some((e) => e.course_id === course?.id);

  const handleEnroll = async () => {
    if (!user) {
      toast({ title: "Login necessário", description: "Faça login para se matricular.", variant: "destructive" });
      navigate("/auth");
      return;
    }
    if (!course) return;
    try {
      await enroll.mutateAsync(course.id);
      toast({ title: "Matrícula realizada!", description: `Você foi matriculado em ${course.title}.` });
      navigate("/dashboard");
    } catch {
      toast({ title: "Não foi possível matricular", description: "Você já está matriculado neste curso.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 lg:pt-32 container mx-auto px-4 space-y-6">
          <Skeleton className="h-72 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </main>
        <Footer />
      </div>
    );
  }

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

  const image = courseImage(course.image_key);
  const modules = [
    "Boas-vindas e ambientação",
    "Fundamentos teóricos da área",
    "Ferramentas e práticas essenciais",
    "Estudos de caso do mercado",
    "Projeto prático orientado",
    "Avaliação final e certificação",
  ];
  const objectives = [
    "Dominar os conceitos centrais da área",
    "Aplicar as técnicas em projetos reais",
    "Construir portfólio profissional",
    "Preparar-se para o mercado de trabalho",
    "Obter certificado reconhecido",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 lg:pt-32 pb-16">
        <div className="relative h-[400px] mb-12 bg-gradient-to-br from-primary to-primary-hover">
          {image && <img src={image} alt={`Curso de ${course.title}`} className="w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <Button variant="ghost" onClick={() => navigate("/cursos")} className="mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Cursos
              </Button>
              <span className="inline-block px-4 py-2 bg-primary rounded-full text-primary-foreground text-sm font-semibold mb-4">
                {course.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 max-w-3xl mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2"><Clock className="h-5 w-5" />{formatDuration(course.duration_hours)}</div>
                <div className="flex items-center gap-2"><Users className="h-5 w-5" />{course.students_count} alunos</div>
                <div className="flex items-center gap-2"><Star className="h-5 w-5 fill-secondary text-secondary" />{course.rating}</div>
                <div className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Nível: {course.level}</div>
                <div className="flex items-center gap-2"><MapPin className="h-5 w-5" />{course.modality}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Sobre o curso</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.long_description || course.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    O que você vai aprender
                  </h2>
                  <ul className="space-y-3">
                    {objectives.map((objective) => (
                      <li key={objective} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Conteúdo programático
                  </h2>
                  <div className="space-y-2">
                    {modules.map((module, index) => (
                      <div key={module} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
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
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary mb-2">{formatPrice(course.price)}</p>
                      <p className="text-sm text-muted-foreground">Parcelamento disponível</p>
                    </div>

                    <Button
                      onClick={handleEnroll}
                      disabled={alreadyEnrolled || enroll.isPending}
                      className="w-full btn-primary h-12 text-lg"
                    >
                      {alreadyEnrolled ? "Você já está matriculado" : "Matricular-se Agora"}
                    </Button>

                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duração</span>
                        <span className="font-semibold">{formatDuration(course.duration_hours)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Nível</span>
                        <span className="font-semibold">{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Modalidade</span>
                        <span className="font-semibold">{course.modality}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Alunos</span>
                        <span className="font-semibold">{course.students_count}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-2">Este curso inclui:</h3>
                      <ul className="space-y-2 text-sm">
                        {["Certificado de conclusão", "Material didático completo", "Suporte com instrutor", "Acesso à plataforma do aluno"].map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            {item}
                          </li>
                        ))}
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