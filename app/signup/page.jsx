"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Reusable password rule component
const PasswordCheck = ({ label, valid }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      {valid ? (
        <span className="text-green-600 font-bold">✔</span>
      ) : (
        <span className="text-red-500 font-bold">✘</span>
      )}
      <span className={valid ? "text-green-600" : "text-red-500"}>{label}</span>
    </div>
  );
};

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Password validation rules
  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    match: password && password === confirmPassword,
  };

  const allGood =
    passwordChecks.length &&
    passwordChecks.upper &&
    passwordChecks.number &&
    passwordChecks.special &&
    passwordChecks.match;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    if (!agreed) {
      setError("You must agree to the Terms of Use and Privacy Policy.");
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    if (!allGood) {
      setError("Password requirements not met.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
    // const callbackUrl = process.env.NODE_ENV === "production"
    //   ? `${window.location.origin}/dashboard`
    //   : "http://localhost:3000/dashboard";
    signIn("google", { callbackUrl, redirect: true });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        body { font-family: 'DM Sans', sans-serif; background: #F3EDE1; }
        .serif { font-family: 'Fraunces', serif; }
        input:focus { outline: none; box-shadow: 0 0 0 2px #5C6B5C44; border-color: #5C6B5C !important; }
        input[type="checkbox"]:focus { box-shadow: 0 0 0 2px #5C6B5C44; }
        .btn-main:hover { background: #3A4A3A; }
        .btn-google:hover { background: #EDE7DA; }
        .back-link:hover { color: #1C1F1A; }
        .link-sage:hover { color: #3A4A3A; }
      `}</style>

      <div className="min-h-screen bg-[#F3EDE1] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px]">
          {/* Back */}
          <Link
            href="/"
            className="back-link inline-flex items-center gap-1.5 text-sm text-[#7A7568] mb-6 no-underline transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          {/* Card */}
          <div className="bg-[#FDFAF5] border border-[#D6CFBF] rounded-2xl p-8 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#D6CFBF] flex-shrink-0">
                <img
                  src="/Mirai_logo.png"
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="serif text-[1.5rem] leading-tight tracking-tight text-[#1C1F1A]">
                  Join Mirai
                </h1>
                <p className="text-xs text-[#A09B92] mt-0.5">
                  Create your account
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 rounded-lg mb-5">
                {error}
              </div>
            )}

            {/* Demo warning */}
            <div className="bg-[#FBF4DC] border border-[#E8D98A] text-[#7A6A1A] text-xs px-3.5 py-2.5 rounded-lg mb-5 leading-relaxed">
              <span className="font-medium">Educational demo only</span> — do
              not use real passwords or personal information.
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="btn-google w-full bg-[#F3EDE1] border border-[#D6CFBF] text-[#1C1F1A] text-sm py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#D6CFBF] border-t-[#5C6B5C] rounded-full animate-spin" />
                  Signing up…
                </>
              ) : (
                <>
                  <img src="google-logo.png" alt="Google" className="w-4 h-4" />
                  Continue with Google
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#D6CFBF]" />
              <span className="text-xs text-[#A09B92]">
                or sign up with email
              </span>
              <div className="flex-1 h-px bg-[#D6CFBF]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1C1F1A] mb-1.5"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D6CFBF] rounded-lg text-sm text-[#1C1F1A] placeholder-[#C4BDB0] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#1C1F1A] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#1C1F1A] placeholder-[#C4BDB0] transition-all pr-10 ${
                      password.length === 0
                        ? "border-[#D6CFBF]"
                        : allGood
                          ? "border-[#5C6B5C]"
                          : "border-red-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A09B92] hover:text-[#5C6B5C] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#1C1F1A] mb-1.5"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#1C1F1A] placeholder-[#C4BDB0] transition-all pr-10 ${
                      confirmPassword.length === 0
                        ? "border-[#D6CFBF]"
                        : passwordChecks.match
                          ? "border-[#5C6B5C]"
                          : "border-red-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A09B92] hover:text-[#5C6B5C] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password checks */}
              {password.length > 0 && (
                <div className="bg-[#F3EDE1] border border-[#D6CFBF] rounded-lg px-3.5 py-3 space-y-1.5">
                  {[
                    {
                      label: "At least 8 characters",
                      valid: passwordChecks.length,
                    },
                    {
                      label: "One uppercase letter",
                      valid: passwordChecks.upper,
                    },
                    { label: "One number", valid: passwordChecks.number },
                    {
                      label: "One special character",
                      valid: passwordChecks.special,
                    },
                    { label: "Passwords match", valid: passwordChecks.match },
                  ].map(({ label, valid }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${valid ? "bg-[#5C6B5C] text-white" : "bg-[#D6CFBF] text-[#A09B92]"}`}
                      >
                        {valid ? "✓" : "·"}
                      </span>
                      <span
                        className={`text-xs transition-colors ${valid ? "text-[#3A4A3A]" : "text-[#A09B92]"}`}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Terms */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-0.5 rounded border-[#D6CFBF] accent-[#5C6B5C]"
                />
                <span className="text-xs text-[#7A7568] leading-relaxed">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="link-sage text-[#5C6B5C] transition-colors no-underline"
                  >
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy"
                    className="link-sage text-[#5C6B5C] transition-colors no-underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading || !agreed}
                className="btn-main w-full bg-[#1C1F1A] text-[#F3EDE1] text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#F3EDE1]/40 border-t-[#F3EDE1] rounded-full animate-spin" />
                    Creating account…
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* Login link */}
            <p className="text-center text-sm text-[#7A7568]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="link-sage text-[#4a534a] font-medium no-underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
