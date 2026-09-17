import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const modeParam = params.get("mode");
  const { login, signup, user } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">(
    modeParam === "signup" ? "signup" : "login",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result =
      mode === "login"
        ? login(email, password)
        : signup(name, email, password);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSuccess(mode === "login" ? "Welcome back!" : "Account created!");
    window.setTimeout(() => navigate("/"), 700);
  };

  return (
    <main className="login">
      <div className="login__aurora" aria-hidden />
      <div className="login__grid" aria-hidden />

      <header className="login__top">
        <Link to="/" className="login__brand">
          YOURSKILLS
        </Link>
        <Link to="/" className="login__back">
          <ArrowLeft size={16} />
          Back home
        </Link>
      </header>

      <div className="login__shell">
        <motion.aside
          className="login__showcase"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="login__eyebrow">
            <Sparkles size={14} /> Learner access
          </p>
          <h1>
            Unlock your
            <br />
            <em>learning streak</em>
          </h1>
          <p>
            Sign in to track courses, place orders, and keep building future-ready skills with
            YourSkills.
          </p>
          <ul>
            <li>62+ programs across tech & sciences</li>
            <li>Cart, checkout, and progress in one place</li>
            <li>YourSkills Plus from ₹200/year</li>
          </ul>
        </motion.aside>

        <motion.section
          className="login__panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55 }}
        >
          <div className="login__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              className={mode === "login" ? "is-active" : ""}
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
            >
              Log In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              className={mode === "signup" ? "is-active" : ""}
              onClick={() => {
                setMode("signup");
                setError("");
                setSuccess("");
              }}
            >
              Sign Up
            </button>
          </div>

          {user && (
            <p className="login__signed">
              Signed in as <strong>{user.name}</strong> ({user.email})
            </p>
          )}

          <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className="login__hint">
            {mode === "login"
              ? "Enter your email and password to continue."
              : "Join YourSkills in under a minute."}
          </p>

          <form className="login__form" onSubmit={onSubmit} noValidate>
            {mode === "signup" && (
              <label>
                Full name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
            )}
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <div className="login__password">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  className="login__eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {error && <p className="login__error">{error}</p>}
            {success && <p className="login__success">{success}</p>}

            <button type="submit" className="btn btn--orange login__submit">
              {mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>

          <p className="login__switch">
            {mode === "login" ? (
              <>
                New here?{" "}
                <button type="button" onClick={() => setMode("signup")}>
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already learning with us?{" "}
                <button type="button" onClick={() => setMode("login")}>
                  Log in
                </button>
              </>
            )}
          </p>
        </motion.section>
      </div>
    </main>
  );
}
