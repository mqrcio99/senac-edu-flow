import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Users, Award, TrendingUp, GraduationCap } from "lucide-react";

const Dashboard = () => {
  const { user, getMyEnrollments } = useAuth();
  const navigate = useNavigate();
  const myEnrollments = getMyEnrollments();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  const stats = [
    { label: "Cursos Matriculados", value: myEnrollments.length.toString(), icon: BookOpen, color: "text-primary" },
    { label: "Turmas Ativas", value: myEnrollments.filter(e => e.status === 'active').length.toString(), icon: Users, color: "text-secondary" },
    { label: "Certificados", value: myEnrollments.filter(e => e.status === 'completed').length.toString(), icon: Award, color: "text-primary" },
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

          {/* My Enrollments */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-card-foreground">
                  Minhas Matrículas
                </h2>
                <p className="text-muted-foreground">
                  Acompanhe seus cursos matriculados
                </p>
              </div>
            </div>

            {myEnrollments.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">
                  Você ainda não está matriculado em nenhum curso.
                </p>
                <button
                  onClick={() => navigate("/cursos")}
                  className="text-primary hover:underline font-medium"
                >
                  Ver cursos disponíveis
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myEnrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">
                          {enrollment.courseName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Matriculado em: {enrollment.enrolledAt}
                        </p>
                        <Badge 
                          variant={enrollment.status === 'active' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {enrollment.status === 'active' ? 'Ativo' : 
                           enrollment.status === 'completed' ? 'Concluído' : 'Cancelado'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">67%</div>
                        <div className="text-xs text-muted-foreground">Progresso</div>
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
