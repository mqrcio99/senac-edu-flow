import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "@/components/home/CourseCard";
import { useCourses } from "@/hooks/useCourses";
import { quizQuestions, scoreQuiz, areaInfo, type Area } from "@/lib/quiz";
import { ArrowLeft, ArrowRight, Compass, RotateCcw, Sparkles } from "lucide-react";

const Quiz = () => {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const { data: courses, isLoading } = useCourses();

  const total = quizQuestions.length;
  const current = quizQuestions[step];
  const ranking = useMemo(() => scoreQuiz(answers), [answers]);

  const select = (index: number) => {
    setAnswers((prev) => ({ ...prev, [current.id]: index }));
    if (step + 1 < total) setStep(step + 1);
    else setFinished(true);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setFinished(false);
    setStarted(false);
  };

  const topAreas = ranking.slice(0, 3).map((r) => r.area) as Area[];
  const primary = topAreas[0];
  const recommended = (courses ?? [])
    .filter((c) => topAreas.includes(c.category as Area))
    .sort(
      (a, b) =>
        topAreas.indexOf(a.category as Area) - topAreas.indexOf(b.category as Area) ||
        b.students_count - a.students_count,
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <section className="bg-primary text-primary-foreground py-10 sm:py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 text-xs sm:text-sm font-semibold mb-4">
              <Compass className="h-4 w-4" /> Teste vocacional
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold mb-3">Qual curso combina com você?</h1>
            <p className="text-primary-foreground/80 text-sm sm:text-base">
              Responda {total} perguntas rápidas e descubra a área com mais a ver com o seu perfil — junto com os cursos recomendados.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            {!started && (
              <div className="card-institutional p-6 sm:p-10 text-center">
                <Sparkles className="h-10 w-10 text-secondary mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Leva menos de 2 minutos</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-6">
                  Não existe resposta certa ou errada. Escolha o que soa mais parecido com você.
                </p>
                <Button size="lg" className="btn-primary w-full sm:w-auto gap-2" onClick={() => setStarted(true)}>
                  Começar o quiz <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {started && !finished && (
              <div className="card-institutional p-5 sm:p-8">
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-2">
                  <span>Pergunta {step + 1} de {total}</span>
                  <span>{Math.round(((step) / total) * 100)}%</span>
                </div>
                <Progress value={(step / total) * 100} className="mb-6" />

                <h2 className="text-lg sm:text-2xl font-bold mb-5">{current.question}</h2>
                <div className="space-y-3">
                  {current.options.map((option, index) => {
                    const active = answers[current.id] === index;
                    return (
                      <button
                        key={option.label}
                        onClick={() => select(index)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-sm sm:text-base ${
                          active
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border hover:border-primary hover:bg-accent"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="ghost"
                    className="gap-2"
                    disabled={step === 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                  >
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </Button>
                  <Button variant="ghost" className="gap-2 text-muted-foreground" onClick={restart}>
                    <RotateCcw className="h-4 w-4" /> Recomeçar
                  </Button>
                </div>
              </div>
            )}

            {finished && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="card-institutional p-6 sm:p-10 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Sua área com mais afinidade é</p>
                  <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-3">{areaInfo[primary]?.title}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
                    {areaInfo[primary]?.description}
                  </p>
                </div>

                <div className="card-institutional p-5 sm:p-8">
                  <h3 className="font-semibold text-lg mb-4">Seu perfil por área</h3>
                  <div className="space-y-4">
                    {ranking.slice(0, 5).map((item) => (
                      <div key={item.area}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{item.area}</span>
                          <span className="text-muted-foreground">{item.percent}%</span>
                        </div>
                        <Progress value={item.percent} />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">Cursos recomendados para você</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {isLoading
                      ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[420px] rounded-xl" />)
                      : recommended.map((course) => <CourseCard key={course.id} course={course} />)}
                  </div>
                  {!isLoading && recommended.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      Ainda não temos um curso exato para esse perfil — veja o catálogo completo.
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="btn-primary gap-2 flex-1">
                    <Link to="/cursos">Ver todos os cursos <ArrowRight className="h-5 w-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 flex-1" onClick={restart}>
                    <RotateCcw className="h-4 w-4" /> Refazer o quiz
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
