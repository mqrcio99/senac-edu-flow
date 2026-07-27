import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/home/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useCourses } from "@/hooks/useCourses";
import { Search, SlidersHorizontal, X } from "lucide-react";

const Courses = () => {
  const { data: courses, isLoading } = useCourses();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [modality, setModality] = useState("all");
  const [sort, setSort] = useState("popular");

  const categories = useMemo(
    () => Array.from(new Set((courses ?? []).map((c) => c.category))).sort(),
    [courses]
  );
  const levels = useMemo(
    () => Array.from(new Set((courses ?? []).map((c) => c.level))).sort(),
    [courses]
  );
  const modalities = useMemo(
    () => Array.from(new Set((courses ?? []).map((c) => c.modality))).sort(),
    [courses]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = (courses ?? []).filter((c) => {
      const matchesTerm =
        !term ||
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term);
      return (
        matchesTerm &&
        (category === "all" || c.category === category) &&
        (level === "all" || c.level === level) &&
        (modality === "all" || c.modality === modality)
      );
    });

    const sorted = [...list];
    if (sort === "popular") sorted.sort((a, b) => b.students_count - a.students_count);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "duration") sorted.sort((a, b) => a.duration_hours - b.duration_hours);
    return sorted;
  }, [courses, search, category, level, modality, sort]);

  const hasFilters = search || category !== "all" || level !== "all" || modality !== "all";

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setLevel("all");
    setModality("all");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 lg:pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Catálogo de Cursos</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossa seleção completa de cursos profissionalizantes
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por curso, área ou palavra-chave..."
                className="pl-10 h-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Buscar cursos"
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger aria-label="Categoria"><SelectValue placeholder="Categoria" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger aria-label="Nível"><SelectValue placeholder="Nível" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os níveis</SelectItem>
                  {levels.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={modality} onValueChange={setModality}>
                <SelectTrigger aria-label="Modalidade"><SelectValue placeholder="Modalidade" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as modalidades</SelectItem>
                  {modalities.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger aria-label="Ordenar"><SelectValue placeholder="Ordenar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Mais populares</SelectItem>
                  <SelectItem value="rating">Melhor avaliados</SelectItem>
                  <SelectItem value="price-asc">Menor preço</SelectItem>
                  <SelectItem value="price-desc">Maior preço</SelectItem>
                  <SelectItem value="duration">Menor duração</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {isLoading ? "Carregando..." : `${filtered.length} curso(s) encontrado(s)`}
              </span>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="h-4 w-4" /> Limpar filtros
                </Button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[420px] rounded-xl" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">Nenhum curso encontrado com esses filtros.</p>
              <Button onClick={clearFilters}>Limpar filtros</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((course, index) => (
                <div key={course.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;