import { create } from "zustand";

import { authClient } from "@/lib/auth-client";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
}

interface AuthSession {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  user: AuthUser;
}

interface AuthState {
  user: AuthUser | null;
  session: AuthSession["session"] | null;
  isLoading: boolean;
  initialized: boolean;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession["session"] | null) => void;
  setLoading: (loading: boolean) => void;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  refreshSession: async () => {
    set({ isLoading: true });
    try {
      const { data } = await authClient.getSession();
      if (data) {
        set({
          user: data.user as AuthUser,
          session: data.session as AuthSession["session"],
          initialized: true,
        });
      } else {
        set({ user: null, session: null, initialized: true });
      }
    } catch {
      set({ user: null, session: null, initialized: true });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    await authClient.signOut();
    set({ user: null, session: null });
  },
}));
