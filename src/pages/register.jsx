import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert("Password dan confirm password tidak sama");
    return;
  }

  try {
    await api.post("/auth/register", {
      username: form.username,
      email: form.email,
      password: form.password,
    });

    alert("Register berhasil");
    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Register gagal");
  }
};


  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-6 antialiased"
      style={{
        background:
          "linear-gradient(135deg, #edf2f7 0%, #e2e8f0 50%, #cbd5e1 100%)",
        fontFamily:
          "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* WRAPPER UTAMA */}
      <div
        className="flex overflow-hidden w-full"
        style={{
          maxWidth: "1000px",
          minHeight: "630px",
          borderRadius: "28px",
          boxShadow: "0 24px 80px rgba(15,23,42,0.25)",
          background: "#ffffff",
        }}
      >
        {/* Area Form & Logo */}
        <div
          className="flex flex-col justify-between"
          style={{
            width: "40%",
            padding: "24px 24px",
            background: "#f8fafc",
            borderRight: "1px solid rgba(148, 163, 184, 0.1)",
          }}
        >
          {/* Logo PROBIT */}
          <div
            className="flex items-center"
            style={{ gap: "10px", paddingLeft: "4px" }}
          >
            <img
              src="/logo.png"
              alt="Probit Logo"
              style={{
                width: "32px",
                height: "32px",
                objectFit: "contain",
                borderRadius: "6px",
              }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: "22px",
                color: "#0f172a",
                letterSpacing: "-0.8px",
              }}
            >
              Probit
            </span>
          </div>

          {/* CARD FORM */}
          <div
            className="w-full flex flex-col justify-center"
            style={{
              background: "rgba(226, 232, 240, 0.65)",
              borderRadius: "24px",
              padding: "20px 20px",
              border: "1px solid rgba(148, 163, 184, 0.35)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "inset 0 1px 2px rgba(255,255,255,0.6), 0 12px 30px rgba(15,23,42,0.08)",
              marginTop: "12px",
              marginBottom: "12px",
            }}
          >
            {/* Header */}
            <h2
              style={{
                fontWeight: 800,
                fontSize: "22px",
                color: "#0f172a",
                lineHeight: 1.2,
                marginBottom: "4px",
                letterSpacing: "-0.5px",
                textTransform: "capitalize",
              }}
            >
              Create an account
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#475569",
                fontWeight: 500,
                marginBottom: "14px",
                lineHeight: 1.4,
              }}
            >
              Start your journey to optimal equilibrium today.
            </p>

            {/* Social Buttons */}
            <div className="flex" style={{ gap: "10px", marginBottom: "12px" }}>
              <button
                className="flex-1 flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: "#ea4335",
                    fontWeight: 900,
                    fontSize: "15px",
                  }}
                >
                  G
                </span>{" "}
                Google
              </button>
              <button
                className="flex-1 flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.45.06 2.44.75 3.28.78 1.25-.26 2.44-1 3.77-.87 1.61.12 2.82.78 3.62 1.96-3.31 2.02-2.56 6.16.48 7.25-.53 1.41-1.25 2.8-3.15 3.76zM12.03 7.25C11.84 5.02 13.59 3.18 15.62 3c.28 2.56-2.3 4.42-3.59 4.25z" />
                </svg>
                Apple
              </button>
            </div>

            {/* Divider */}
            <div
              className="flex items-center"
              style={{ gap: "10px", marginBottom: "12px" }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(148,163,184,0.4)",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  padding: "0 2px",
                  fontWeight: 500,
                }}
              >
                Or register with email
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(148,163,184,0.4)",
                }}
              />
            </div>

            {/* Username */}
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "4px",
                  paddingLeft: "2px",
                }}
              >
                Username
              </label>

              <div className="relative flex items-center">
                <User
                  className="absolute"
                  style={{
                    left: "12px",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                />

                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your username"
                  style={{
                    width: "100%",
                    paddingLeft: "36px",
                    paddingRight: "16px",
                    paddingTop: "9px",
                    paddingBottom: "9px",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #cbd5e1",
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "4px",
                  paddingLeft: "2px",
                }}
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail
                  className="absolute"
                  style={{
                    left: "12px",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="name@example.com"
                  style={{
                    width: "100%",
                    paddingLeft: "36px",
                    paddingRight: "16px",
                    paddingTop: "9px",
                    paddingBottom: "9px",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #cbd5e1",
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "4px",
                  paddingLeft: "2px",
                }}
              >
                Password
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute"
                  style={{
                    left: "12px",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    paddingLeft: "36px",
                    paddingRight: "40px",
                    paddingTop: "9px",
                    paddingBottom: "9px",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #cbd5e1",
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute flex items-center"
                  style={{
                    right: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: 0,
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <Eye style={{ width: "16px", height: "16px" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "4px",
                  paddingLeft: "2px",
                }}
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute"
                  style={{
                    left: "12px",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    paddingLeft: "36px",
                    paddingRight: "40px",
                    paddingTop: "9px",
                    paddingBottom: "9px",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #cbd5e1",
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute flex items-center"
                  style={{
                    right: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: 0,
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <Eye style={{ width: "16px", height: "16px" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div
              className="flex items-start"
              style={{ gap: "8px", marginBottom: "14px" }}
            >
              <input
                type="checkbox"
                id="terms"
                style={{
                  marginTop: "2px",
                  width: "14px",
                  height: "14px",
                  accentColor: "#22c55e",
                  flexShrink: 0,
                }}
              />
              <label
                htmlFor="terms"
                style={{ fontSize: "11px", color: "#475569", lineHeight: 1.4 }}
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  style={{
                    color: "#16a34a",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  style={{
                    color: "#16a34a",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  Privacy
                </Link>
                .
              </label>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              style={{
                width: "100%",
                background: "linear-gradient(135deg,#22c55e,#16a34a)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "12px",
                padding: "10px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                marginBottom: "12px",
                letterSpacing: "0.4px",
                fontFamily: "inherit",
                boxShadow: "0 6px 12px rgba(22,163,74,0.25)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg,#16a34a,#15803d)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg,#22c55e,#16a34a)")
              }
            >
              Register
            </button>

            {/* Footer */}
            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#475569",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#16a34a",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative overflow-hidden" style={{ width: "60%" }}>
          <img
            src="/ui_login.png"
            alt="Healthy lifestyle"
            className="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.2) 100%)",
            }}
          />

          {/* Quote Card */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              right: "28px",
              background: "rgba(34,197,94,0.85)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              padding: "18px 20px",
              width: "240px",
              color: "#f9fafb",
              boxShadow: "0 10px 30px rgba(15,23,42,0.3)",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                lineHeight: 1.6,
                fontWeight: 500,
                margin: 0,
              }}
            >
              "Motivasi adalah apa yang membuat Anda memulai. Kebiasaan adalah
              apa yang membuat Anda terus maju."
            </p>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 700,
                marginTop: "10px",
                textAlign: "right",
                color: "#052e16",
              }}
            >
              — Jim Rohn
            </span>
          </div>

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "28px",
              left: "28px",
              background: "rgba(15,23,42,0.3)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              padding: "12px 18px",
              color: "#e5e7eb",
              border: "1px solid rgba(148,163,184,0.5)",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: 700, margin: 0 }}>
              🥗 Track your nutrition
            </p>
            <p
              style={{
                fontSize: "11px",
                margin: 0,
                opacity: 0.9,
                marginTop: "3px",
              }}
            >
              Stay balanced every day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
