import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useCancelEnrollment, useMyEnrollments } from "@/hooks/useCourses";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Users, Award, TrendingUp, GraduationCap, Trash2 } from "lucide-react";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: enrollments, isLoading } = useMyEnrollments();
  const cancelEnrollment = useCancelEnrollment();

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const list = enrollments ?? [];
  const active = list.filter((e) => e.status === "active");
  const completed = list.filter((e) => e.status === "completed");
  const avgProgress = list.length
    ? Math.round(list.reduce((sum, e) => sum + e.progress, 0) / list.length)
    : 0;

  const stats = [
    { label: "Cursos Matriculados", value: list.length.toString(), icon: BookOpen, color: "text-primary" },
    { label: "Turmas Ativas", value: active.length.toString(), icon: Users, color: "text-secondary" },
    { label: "Certificados", value: completed.length.toString(), icon: Award, color: "text-primary" },
    { label: "Progresso Médio", value: `${avgProgress}%`, icon: TrendingUp, color: "text-secondary" },
  ];

  const handleCancel = async (id: string) => {
    try {
      await cancelEnrollment.mutateAsync(id);
      toast({ title: "Matrícula cancelada", description: "Você saiu deste curso." });
    } catch {
      toast({ title: "Erro", description: "Não foi possível cancelar.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 lg:pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-fade-in-up flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Meu Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Olá{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}! Acompanhe seu progresso.
              </p>
            </div>
            <Button asChild variant="outline"><Link to="/perfil">Editar perfil</Link></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
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

          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-card-foreground">Minhas Matrículas</h2>
                <p className="text-muted-foreground">Acompanhe seus cursos matriculados</p>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
              </div>
            ) : list.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">Você ainda não está matriculado em nenhum curso.</p>
                <Button onClick={() => navigate("/cursos")}>Ver cursos disponíveis</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {list.map((enrollment) => (
                  <Card key={enrollment.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1 min-w-[240px]">
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">
                          {enrollment.courses?.title ?? "Curso"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Matriculado em {new Date(enrollment.created_at).toLocaleDateString("pt-BR")}
                        </p>
                        <Badge variant={enrollment.status === "active" ? "default" : "secondary"}>
                          {enrollment.status === "active" ? "Ativo" : enrollment.status === "completed" ? "Concluído" : "Cancelado"}
                        </Badge>
                        <div className="mt-4 max-w-md">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progresso</span>
                            <span>{enrollment.progress}%</span>
                          </div>
                          <Progress value={enrollment.progress} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {enrollment.courses && (
                          <Button variant="outline" size="sm" onClick={() => navigate(`/cursos/${enrollment.courses!.slug}`)}>
                            Ver curso
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-destructive gap-1" onClick={() => handleCancel(enrollment.id)}>
                          <Trash2 className="h-4 w-4" /> Cancelar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;