import webDevImage from "@/assets/course-web-dev.jpg";
import designImage from "@/assets/course-design.jpg";
import marketingImage from "@/assets/course-marketing.jpg";
import projectMgmtImage from "@/assets/course-project-management.jpg";
import dataAnalysisImage from "@/assets/course-data-analysis.jpg";
import englishImage from "@/assets/course-english.jpg";

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string | null;
  category: string;
  level: string;
  modality: string;
  duration_hours: number;
  price: number;
  rating: number;
  students_count: number;
  image_key: string | null;
  featured: boolean;
}

const imageMap: Record<string, string> = {
  "web-dev": webDevImage,
  design: designImage,
  marketing: marketingImage,
  "project-management": projectMgmtImage,
  "data-analysis": dataAnalysisImage,
  english: englishImage,
};

export const courseImage = (key: string | null | undefined) =>
  (key && imageMap[key]) || undefined;

export const formatPrice = (price: number) =>
  price === 0
    ? "Gratuito"
    : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

export const formatDuration = (hours: number) => `${hours}h`;