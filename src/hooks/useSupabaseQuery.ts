import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Hook for fetching courses
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

// Hook for fetching all courses (admin)
export const useCoursesAdmin = () => {
  return useQuery({
    queryKey: ["courses-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

// Hook for fetching batches
export const useBatches = () => {
  return useQuery({
    queryKey: ["batches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("batches")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};

// Hook for fetching students
export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

// Hook for fetching enquiries
export const useEnquiries = () => {
  return useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

// Hook for fetching announcements
export const useAnnouncements = (activeOnly = true) => {
  return useQuery({
    queryKey: ["announcements", activeOnly],
    queryFn: async () => {
      let query = supabase.from("announcements").select("*");
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      const { data, error } = await query.order("display_order", {
        ascending: true,
      });

      if (error) throw error;
      return data || [];
    },
  });
};

// Hook for adding a course
export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCourse: any) => {
      const { data, error } = await supabase
        .from("courses")
        .insert([newCourse])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses-admin"] });
    },
  });
};

// Hook for updating a course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: any;
    }) => {
      const { data, error } = await supabase
        .from("courses")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses-admin"] });
    },
  });
};

// Hook for deleting a course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses-admin"] });
    },
  });
};

// Hook for adding a batch
export const useAddBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBatch: any) => {
      const { data, error } = await supabase
        .from("batches")
        .insert([newBatch])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
  });
};

// Hook for updating a batch
export const useUpdateBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: any;
    }) => {
      const { data, error } = await supabase
        .from("batches")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
  });
};

// Hook for deleting a batch
export const useDeleteBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("batches").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
  });
};

// Hook for updating enquiry status
export const useUpdateEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: any;
    }) => {
      const { data, error } = await supabase
        .from("enquiries")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
};

// Hook for adding/updating announcement
export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: any;
    }) => {
      const { data, error } = await supabase
        .from("announcements")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

// Hook for adding announcement
export const useAddAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newAnnouncement: any) => {
      const { data, error } = await supabase
        .from("announcements")
        .insert([newAnnouncement])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

// Hook for deleting announcement
export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

// Hook for creating enquiry
export const useCreateEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newEnquiry: any) => {
      const { data, error } = await supabase
        .from("enquiries")
        .insert([newEnquiry])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
};

// Hook for dashboard stats
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [courses, batches, students, enquiries] = await Promise.all([
        supabase.from("courses").select("id", { count: "exact" }),
        supabase
          .from("batches")
          .select("id", { count: "exact" })
          .eq("status", "active"),
        supabase.from("students").select("id", { count: "exact" }),
        supabase
          .from("enquiries")
          .select("id", { count: "exact" })
          .eq("status", "pending"),
      ]);

      return {
        totalCourses: courses.count || 0,
        activeBatches: batches.count || 0,
        totalStudents: students.count || 0,
        pendingEnquiries: enquiries.count || 0,
        revenueThisMonth: 450000,
        studentsEnrolledThisMonth: 350,
      };
    },
  });
};
