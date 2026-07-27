import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Course } from "@/lib/courses";

export const useCourses = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: async (): Promise<Course[]> => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("students_count", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Course[];
    },
  });

export const useCourse = (slug?: string) =>
  useQuery({
    queryKey: ["course", slug],
    enabled: !!slug,
    queryFn: async (): Promise<Course | null> => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as Course) ?? null;
    },
  });

export interface EnrollmentWithCourse {
  id: string;
  status: string;
  progress: number;
  created_at: string;
  course_id: string;
  courses: Course | null;
}

export const useMyEnrollments = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["enrollments", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<EnrollmentWithCourse[]> => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("id, status, progress, created_at, course_id, courses(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as EnrollmentWithCourse[];
    },
  });
};

export const useEnroll = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error("not-authenticated");
      const { error } = await supabase
        .from("enrollments")
        .insert({ user_id: user.id, course_id: courseId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};

export const useCancelEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (enrollmentId: string) => {
      const { error } = await supabase.from("enrollments").delete().eq("id", enrollmentId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};