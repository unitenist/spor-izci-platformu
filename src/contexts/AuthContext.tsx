
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  { id: '1', name: 'Test User', email: 'test@example.com', password: 'password123' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('sportApp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    setIsLoading(false);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('sportApp_user', JSON.stringify(userWithoutPassword));
      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz!",
      });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Giriş başarısız",
        description: "E-posta veya şifre hatalı",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Kayıt başarısız",
        description: "Bu e-posta adresi zaten kullanılıyor",
      });
      return false;
    }
    
    // In a real app, we would create a user in the database
    // For demo, we'll create a new user object
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
    };
    
    setUser(newUser);
    localStorage.setItem('sportApp_user', JSON.stringify(newUser));
    
    setIsLoading(false);
    toast({
      title: "Kayıt başarılı",
      description: "Hesabınız oluşturuldu!",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportApp_user');
    toast({
      title: "Çıkış yapıldı",
      description: "Tekrar görüşmek üzere!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
