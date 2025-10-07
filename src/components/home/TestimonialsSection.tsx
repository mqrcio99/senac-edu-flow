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
    <section className="py-16 lg:py-24 bg-primary-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-secondary-light text-secondary rounded-full text-sm font-semibold mb-4">
            #MudandoAVida
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Histórias de Sucesso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja como nossos alunos transformaram suas carreiras
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="card-institutional p-8 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-secondary"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-card-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <Quote className="h-8 w-8 text-secondary/30 flex-shrink-0" />
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
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
