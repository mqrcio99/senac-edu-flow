import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Desenvolvedora Full Stack",
      company: "Tech Solutions",
      image: testimonial1,
      text: "Os cursos transformaram completamente minha carreira. Hoje trabalho em uma das maiores empresas de tecnologia do país e devo muito ao conhecimento adquirido aqui.",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Designer UX/UI",
      company: "Creative Agency",
      image: testimonial2,
      text: "Professores incríveis, conteúdo atualizado e suporte excepcional. A plataforma me deu todas as ferramentas necessárias para me destacar no mercado.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-primary-light">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary-light text-secondary rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            #MudandoAVida
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Histórias de Sucesso
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Veja como nossos alunos transformaram suas carreiras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="card-institutional p-4 sm:p-6 lg:p-8 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-secondary flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-base sm:text-lg text-card-foreground truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </p>
                  <div className="flex gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-secondary/30 flex-shrink-0 hidden sm:block" />
              </div>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
