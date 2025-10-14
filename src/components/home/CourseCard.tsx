import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  category: string;
  image?: string;
}

const CourseCard = ({ 
  title, 
  description, 
  duration, 
  students, 
  rating, 
  category,
  image 
}: CourseCardProps) => {
  return (
    <div className="card-institutional overflow-hidden group cursor-pointer">
      {/* Image/Category Header */}
      <div className="h-48 relative overflow-hidden">
        {image ? (
          <>
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-4">
              <span className="text-white text-sm font-semibold px-3 py-1 bg-primary/90 rounded-full">{category}</span>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
              <span className="text-white text-xl font-bold z-10">{category}</span>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span>{rating}</span>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full btn-primary group-hover:shadow-lg transition-all">
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
