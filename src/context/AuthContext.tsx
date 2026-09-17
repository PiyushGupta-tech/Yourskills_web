import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  signup: (
    name: string,
    email: string,
    password: string,
  ) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

type StoredAccount = AuthUser & { password: string };

const AuthContext = createContext<AuthContextValue | null>(null);
const USER_KEY = "yourskills-user-v1";
const ACCOUNTS_KEY = "yourskills-accounts-v1";

function loadAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    typeof window === "undefined" ? null : loadUser(),
  );

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const login = useCallback((email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !password) {
      return { ok: false as const, error: "Enter email and password." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return { ok: false as const, error: "Enter a valid email address." };
    }
    if (password.length < 6) {
      return { ok: false as const, error: "Password must be at least 6 characters." };
    }

    const accounts = loadAccounts();
    const match = accounts.find((a) => a.email === normalized);

    if (!match) {
      // Demo-friendly: create session for first-time login with valid credentials
      const demoUser: AuthUser = {
        name: normalized.split("@")[0] || "Learner",
        email: normalized,
      };
      const next = [...accounts, { ...demoUser, password }];
      saveAccounts(next);
      setUser(demoUser);
      return { ok: true as const };
    }

    if (match.password !== password) {
      return { ok: false as const, error: "Incorrect password. Try again." };
    }

    setUser({ name: match.name, email: match.email });
    return { ok: true as const };
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const trimmedName = name.trim();
    const normalized = email.trim().toLowerCase();
    if (!trimmedName || !normalized || !password) {
      return { ok: false as const, error: "Fill name, email, and password." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return { ok: false as const, error: "Enter a valid email address." };
    }
    if (password.length < 6) {
      return { ok: false as const, error: "Password must be at least 6 characters." };
    }

    const accounts = loadAccounts();
    if (accounts.some((a) => a.email === normalized)) {
      return { ok: false as const, error: "An account with this email already exists. Log in instead." };
    }

    const nextUser: AuthUser = { name: trimmedName, email: normalized };
    saveAccounts([...accounts, { ...nextUser, password }]);
    setUser(nextUser);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, login, signup, logout }),
    [user, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
