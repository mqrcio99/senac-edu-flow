import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    cpf: "",
    phone: ""
  });
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) {
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!",
        });
        navigate("/");
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    } else {
      if (!formData.name || !formData.cpf || !formData.phone) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos.",
          variant: "destructive",
        });
        return;
      }

      const success = register(formData);
      if (success) {
        toast({
          title: "Cadastro realizado!",
          description: "Sua conta foi criada com sucesso.",
        });
        navigate("/");
      } else {
        toast({
          title: "Erro no cadastro",
          description: "Email ou CPF já cadastrado.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-secondary p-4">
      <Card className="w-full max-w-md p-8 glass-effect animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            {isLogin ? (
              <LogIn className="h-8 w-8 text-primary-foreground" />
            ) : (
              <UserPlus className="h-8 w-8 text-primary-foreground" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isLogin ? "Bem-vindo de volta" : "Criar conta"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Entre com suas credenciais" : "Preencha seus dados para cadastro"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  required={!isLogin}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full btn-primary">
            {isLogin ? "Entrar" : "Cadastrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Demo: admin@senac.com / admin123
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Auth;
