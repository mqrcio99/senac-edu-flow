import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  category: string;
  image?: string;
}

const CourseCard = ({ 
  id,
  title, 
  description, 
  duration, 
  students, 
  rating, 
  category,
  image 
}: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/cursos/${id}`)}
      className="card-institutional overflow-hidden group cursor-pointer"
    >
      {/* Image/Category Header */}
      <div className="h-36 sm:h-44 md:h-48 relative overflow-hidden">
        {image ? (
          <>
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-3 sm:p-4">
              <span className="text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/90 rounded-full">{category}</span>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl font-bold z-10">{category}</span>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-card-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-secondary text-secondary" />
            <span>{rating}</span>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/cursos/${id}`);
          }}
          className="w-full btn-primary group-hover:shadow-lg transition-all text-sm sm:text-base"
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
