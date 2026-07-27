import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";

const CoursesSection = () => {
  const navigate = useNavigate();
  const { data: courses, isLoading } = useCourses();

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary-light text-secondary rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Nossos Cursos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Explore Nosso Catálogo
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Cursos desenvolvidos por especialistas do mercado para impulsionar sua carreira
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[420px] rounded-xl" />)
            : (courses ?? []).slice(0, 6).map((course, index) => (
                <div key={course.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CourseCard course={course} />
                </div>
              ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="gap-2 group w-full sm:w-auto" onClick={() => navigate("/cursos")}>
            Ver Todos os Cursos
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;