import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type ContactSetting = {
  id: string;
  label: string;
  value: string;
  type: 'phone' | 'email' | 'link' | 'whatsapp' | 'instagram' | 'linkedin' | 'facebook' | 'twitter' | 'youtube';
  is_visible: boolean;
  created_at?: string;
};

// Fetch all contact settings
export const useContactSettings = () => {
  return useQuery({
    queryKey: ["contact-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_settings")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return (data as ContactSetting[]) || [];
    },
  });
};

// Add a new contact setting
export const useAddContactSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSetting: Omit<ContactSetting, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("contact_settings")
        .insert([newSetting])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-settings"] });
    },
  });
};

// Update a contact setting
export const useUpdateContactSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<ContactSetting>;
    }) => {
      const { data, error } = await supabase
        .from("contact_settings")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-settings"] });
    },
  });
};

// Delete a contact setting
export const useDeleteContactSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_settings")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-settings"] });
    },
  });
};
