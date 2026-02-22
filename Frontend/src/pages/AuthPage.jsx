import { useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import FormField from "../components/FormField";
import FormRow from "../components/FormRow";
import AuthLayout from "../layouts/AuthLayout";
import { login, registerBusiness } from "../services/bizdeskService";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400";

export default function AuthPage() {
  const { setAuthData } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({
    businessSlug: "bizdesk-demo",
    email: "owner@bizdesk-demo.com",
    password: "Demo@123",
  });

  const [registerForm, setRegisterForm] = useState({
    businessName: "",
    industry: "salon",
    timezone: "Asia/Kolkata",
    currency: "INR",
    ownerName: "",
    ownerEmail: "",
    ownerPassword: "",
    ownerPhone: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data =
        mode === "login" ? await login(loginForm) : await registerBusiness(registerForm);
      setAuthData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-4 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-lg py-2 text-sm font-medium ${
            mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`rounded-lg py-2 text-sm font-medium ${
            mode === "register"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500"
          }`}
        >
          Register Business
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3">
        {mode === "login" ? (
          <>
            <FormField label="Business Slug">
              <input
                className={inputClass}
                value={loginForm.businessSlug}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, businessSlug: e.target.value }))
                }
                required
              />
            </FormField>
            <FormField label="Email">
              <input
                className={inputClass}
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </FormField>
            <FormField label="Password">
              <input
                className={inputClass}
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </FormField>
          </>
        ) : (
          <>
            <FormRow>
              <FormField label="Business Name">
                <input
                  className={inputClass}
                  value={registerForm.businessName}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({ ...prev, businessName: e.target.value }))
                  }
                  required
                />
              </FormField>
              <FormField label="Industry">
                <select
                  className={inputClass}
                  value={registerForm.industry}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({ ...prev, industry: e.target.value }))
                  }
                >
                  <option value="salon">Salon</option>
                  <option value="clinic">Clinic</option>
                  <option value="gym">Gym</option>
                  <option value="consultant">Consultant</option>
                  <option value="coaching">Coaching</option>
                  <option value="other">Other</option>
                </select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Owner Name">
                <input
                  className={inputClass}
                  value={registerForm.ownerName}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({ ...prev, ownerName: e.target.value }))
                  }
                  required
                />
              </FormField>
              <FormField label="Owner Email">
                <input
                  className={inputClass}
                  type="email"
                  value={registerForm.ownerEmail}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({ ...prev, ownerEmail: e.target.value }))
                  }
                  required
                />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Password">
                <input
                  className={inputClass}
                  type="password"
                  value={registerForm.ownerPassword}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({ ...prev, ownerPassword: e.target.value }))
                  }
                  required
                />
              </FormField>
              <FormField label="Phone">
                <input
                  className={inputClass}
                  value={registerForm.ownerPhone}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({ ...prev, ownerPhone: e.target.value }))
                  }
                />
              </FormField>
            </FormRow>
          </>
        )}

        <ErrorAlert message={error} />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Sign In"
            : "Create Business"}
        </button>
      </form>
    </AuthLayout>
  );
}
