import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super_admin";
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user && session.user.email) {
          // Fetch admin user details from admin_users table
          const { data: adminData, error } = await supabase
            .from("admin_users")
            .select("id, name, email, role")
            .eq("email", session.user.email)
            .single();

          if (adminData && !error) {
            setAdmin({
              id: adminData.id,
              name: adminData.name,
              email: adminData.email,
              role: adminData.role as "admin" | "super_admin",
            });
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: adminData } = await supabase
          .from("admin_users")
          .select("id, name, email, role")
          .eq("email", session.user.email)
          .single();

        if (adminData) {
          setAdmin({
            id: adminData.id,
            name: adminData.name,
            email: adminData.email,
            role: adminData.role as "admin" | "super_admin",
          });
        }
      } else {
        setAdmin(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Login error:", authError);
        return false;
      }

      if (authData.user) {
        // Fetch admin user details
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("id, name, email, role")
          .eq("email", authData.user.email)
          .single();

        if (adminError || !adminData) {
          console.error("Admin user not found");
          return false;
        }

        setAdmin({
          id: adminData.id,
          name: adminData.name,
          email: adminData.email,
          role: adminData.role as "admin" | "super_admin",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setAdmin(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
