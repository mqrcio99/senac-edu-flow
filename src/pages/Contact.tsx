import { useState } from "react";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(3, { message: "Informe seu nome" }).max(100),
  email: z.string().trim().email({ message: "E-mail inválido" }).max(255),
  subject: z.string().trim().min(3, { message: "Informe o assunto" }).max(150),
  message: z.string().trim().min(10, { message: "A mensagem deve ter ao menos 10 caracteres" }).max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Verifique os dados", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSending(false);
    if (error) {
      toast({ title: "Erro ao enviar", description: "Tente novamente em instantes.", variant: "destructive" });
      return;
    }
    toast({ title: "Mensagem enviada!", description: "Nossa equipe responde em até 1 dia útil." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const info = [
    { icon: Mail, label: "E-mail", value: "contato@sistemaeducacional.com.br" },
    { icon: Phone, label: "Telefone", value: "(51) 3000-0000" },
    { icon: MapPin, label: "Endereço", value: "Av. Principal, 1000 — Porto Alegre, RS" },
    { icon: Clock, label: "Atendimento", value: "Seg a Sex, das 8h às 20h" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 lg:pt-32 pb-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Fale Conosco</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dúvidas sobre cursos, matrículas ou parcerias? Envie sua mensagem.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" maxLength={100} value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" maxLength={255} value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" maxLength={150} value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Sobre o que deseja falar?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" rows={6} maxLength={1000} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Escreva sua mensagem..." />
                    <p className="text-xs text-muted-foreground text-right">{form.message.length}/1000</p>
                  </div>
                  <Button type="submit" className="btn-primary w-full sm:w-auto" disabled={sending}>
                    {sending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Enviar mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {info.map((item) => (
                <Card key={item.label}>
                  <CardContent className="pt-6 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium break-words">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;