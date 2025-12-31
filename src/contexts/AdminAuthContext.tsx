import { createContext, useContext, useState, ReactNode } from "react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super_admin";
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Mock admin credentials for testing (will be replaced with Supabase)
const MOCK_ADMINS = [
  { id: "1", name: "Admin User", email: "admin@elegant.ae", password: "admin123", role: "admin" as const },
  { id: "2", name: "Super Admin", email: "super@elegant.ae", password: "super123", role: "super_admin" as const },
];

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const stored = sessionStorage.getItem("admin_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const foundAdmin = MOCK_ADMINS.find(
      (a) => a.email === email && a.password === password
    );
    
    if (foundAdmin) {
      const { password: _, ...adminData } = foundAdmin;
      setAdmin(adminData);
      sessionStorage.setItem("admin_user", JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    sessionStorage.removeItem("admin_user");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
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
