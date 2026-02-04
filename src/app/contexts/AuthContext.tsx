import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { User, AuthState } from "@/app/types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => void;
  signup: (userData: Omit<User, "id" | "createdAt">) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = (email: string, password: string) => {
    // Mock login - for demo purposes
    const mockUser: User = {
      id: "1",
      name: "Sarah Jane",
      email,
      businessType: "Makeup Artist",
      monthlyIncome: 25000,
      incomeRange: "Rs 21,000 – Rs 30,000",
      createdAt: new Date(),
    };

    setAuthState({
      isAuthenticated: true,
      user: mockUser,
    });
  };

  const signup = (userData: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };

    setAuthState({
      isAuthenticated: true,
      user: newUser,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  const updateProfile = (updates: Partial<User>) => {
    if (authState.user) {
      setAuthState({
        ...authState,
        user: {
          ...authState.user,
          ...updates,
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider",
    );
  }
  return context;
};