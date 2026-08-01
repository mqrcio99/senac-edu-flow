import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Cursos", path: "/cursos" },
    { name: "Quiz", path: "/quiz" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
    { name: "FAQ", path: "/faq" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const displayName = profile?.name?.trim() || user?.email?.split("@")[0] || "Aluno";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 lg:h-7 lg:w-7 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg lg:text-xl text-primary hidden sm:block">Senac</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(item.path) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="ghost" size="sm" className="gap-2">
                  <Link to="/dashboard"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
                </Button>
                <Link to="/perfil" className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full hover:bg-accent transition-colors">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium max-w-[120px] truncate">{displayName}</span>
                </Link>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/auth")} variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Login
                </Button>
                <Button onClick={() => navigate("/auth")} size="sm" className="btn-secondary gap-2">
                  Matricule-se
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {[...navItems, ...(user ? [{ name: "Dashboard", path: "/dashboard" }, { name: "Meu perfil", path: "/perfil" }] : [])].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(item.path) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                {user ? (
                  <>
                    <div className="p-3 bg-muted rounded-lg mb-2">
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => { setIsMenuOpen(false); navigate("/auth"); }} variant="outline" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Login
                    </Button>
                    <Button onClick={() => { setIsMenuOpen(false); navigate("/auth"); }} className="w-full btn-secondary">
                      Matricule-se
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;