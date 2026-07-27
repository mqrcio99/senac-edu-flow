import { Button } from "@/components/ui/button";
import { Clock, Users, Star, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Course, courseImage, formatDuration, formatPrice } from "@/lib/courses";

const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();
  const image = courseImage(course.image_key);

  return (
    <article
      onClick={() => navigate(`/cursos/${course.slug}`)}
      className="card-institutional overflow-hidden group cursor-pointer h-full flex flex-col"
    >
      <div className="h-36 sm:h-44 md:h-48 relative overflow-hidden">
        {image ? (
          <>
            <img
              src={image}
              alt={`Curso de ${course.title}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-3 sm:p-4">
              <span className="text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/90 rounded-full">
                {course.category}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary-hover flex flex-col items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary-foreground/80" />
            <span className="text-primary-foreground text-lg sm:text-xl font-bold">{course.category}</span>
          </div>
        )}
        {course.featured && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-card-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{formatDuration(course.duration_hours)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{course.students_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-secondary text-secondary" />
            <span>{course.rating}</span>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{course.modality} · {course.level}</span>
            <span className="font-bold text-primary">{formatPrice(course.price)}</span>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cursos/${course.slug}`);
            }}
            className="w-full btn-primary group-hover:shadow-lg transition-all text-sm sm:text-base"
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;