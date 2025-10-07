import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-secondary p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <span className="font-bold text-lg">Sistema Educacional</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Transformando vidas através da educação de qualidade. 
              Oferecemos cursos profissionalizantes com certificação reconhecida.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cursos" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Catálogo de Cursos
                </Link>
              </li>
              <li>
                <Link to="/turmas" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Turmas Disponíveis
                </Link>
              </li>
              <li>
                <Link to="/matriculas" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Como se Matricular
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Área do Aluno
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sobre" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/politica" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/acessibilidade" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Acessibilidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">contato@sistemaeducacional.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">(51) 3000-0000</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">Porto Alegre, RS - Brasil</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-lg hover:bg-secondary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-lg hover:bg-secondary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-lg hover:bg-secondary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-lg hover:bg-secondary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {currentYear} Sistema Educacional. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
