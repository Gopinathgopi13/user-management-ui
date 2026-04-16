import React, { useState } from "react";
import { Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginSchema, forgotPasswordSchema, verifyOtpSchema } from "../../utilities/schema";
import CommonInput from "../../components/CommonInput";
import { loginService, forgotPasswordService, verifyOtpService } from "../../services/api/auth.api";
import { setAuthSession } from "../../utilities/auth";

type Step = "login" | "forgot" | "otp";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("login");
  const [forgotEmail, setForgotEmail] = useState("");

  // ── Login form ────────────────────────────────────────────────────────────
  const loginForm = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginService({ email: values.email, password: values.password });
        if (response.data && response.status === 200) {
          const { accessToken, refreshToken, user } = response.data.data;
          setAuthSession({ access_token: accessToken, refresh_token: refreshToken, user });
          message.success("Login successful");
          navigate("/dashboard");
        }
      } catch (error: any) {
        message.error(error.response?.data?.message || "Login failed. Please check your credentials.");
      }
    },
  });

  // ── Forgot password form ──────────────────────────────────────────────────
  const forgotForm = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        await forgotPasswordService({ email: values.email });
        setForgotEmail(values.email);
        message.success("OTP sent to your email");
        setStep("otp");
      } catch (error: any) {
        message.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
      }
    },
  });

  // ── OTP verification form ─────────────────────────────────────────────────
  const otpForm = useFormik({
    initialValues: { otp: "" },
    validationSchema: verifyOtpSchema,
    onSubmit: async (values) => {
      try {
        await verifyOtpService({ email: forgotEmail, otp: values.otp });
        message.success("OTP verified! Your new password has been sent to your email.");
        setStep("login");
        otpForm.resetForm();
        forgotForm.resetForm();
      } catch (error: any) {
        message.error(error.response?.data?.message || "Invalid or expired OTP.");
      }
    },
  });

  const goBack = () => {
    setStep(step === "otp" ? "forgot" : "login");
  };

  // ── Shared card wrapper ───────────────────────────────────────────────────
  const cardHeader = (icon: React.ReactNode, title: string, subtitle: string) => (
    <div className="flex flex-col items-center mb-10">
      <div className="w-20 h-20 bg-linear-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6 transform group-hover:rotate-12 transition-transform duration-500">
        {icon}
      </div>
      <h1 className="text-3xl font-bold text-text-primary mb-1">{title}</h1>
      <p className="text-sm text-text-secondary text-center">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-border-subtle rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group">

        {/* ── LOGIN STEP ── */}
        {step === "login" && (
          <>
            {cardHeader(
              <LoginOutlined className="text-4xl text-white" />,
              "Login",
              "Sign in to your account"
            )}
            <form onSubmit={loginForm.handleSubmit} className="relative space-y-6">
              <CommonInput
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                error={loginForm.touched.email && loginForm.errors.email ? loginForm.errors.email : undefined}
                prefix={<UserOutlined className="text-text-secondary mr-2" />}
              />

              <div className="flex flex-col gap-1.5">
                <CommonInput
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  isPassword
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  error={loginForm.touched.password && loginForm.errors.password ? loginForm.errors.password : undefined}
                  prefix={<LockOutlined className="text-text-secondary mr-2" />}
                />
                <button
                  type="button"
                  onClick={() => setStep("forgot")}
                  className="self-end text-xs text-primary hover:text-primary/80 font-medium transition-colors duration-200 mt-0.5 cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loginForm.isSubmitting}
                className="h-12 bg-primary hover:bg-primary/90 border-none rounded-xl text-lg font-semibold shadow-lg shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign In
              </Button>
            </form>
          </>
        )}

        {/* ── FORGOT PASSWORD STEP ── */}
        {step === "forgot" && (
          <>
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors duration-200 mb-6 cursor-pointer"
            >
              <ArrowLeftOutlined className="text-xs" /> Back to Login
            </button>

            {cardHeader(
              <MailOutlined className="text-4xl text-white" />,
              "Forgot Password",
              "Enter your email and we'll send you an OTP"
            )}

            <form onSubmit={forgotForm.handleSubmit} className="space-y-6">
              <CommonInput
                label="Email Address"
                name="email"
                placeholder="Enter your registered email"
                value={forgotForm.values.email}
                onChange={forgotForm.handleChange}
                onBlur={forgotForm.handleBlur}
                error={forgotForm.touched.email && forgotForm.errors.email ? forgotForm.errors.email : undefined}
                prefix={<MailOutlined className="text-text-secondary mr-2" />}
              />

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={forgotForm.isSubmitting}
                className="h-12 bg-primary hover:bg-primary/90 border-none rounded-xl text-lg font-semibold shadow-lg shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Send OTP
              </Button>
            </form>
          </>
        )}

        {/* ── OTP VERIFICATION STEP ── */}
        {step === "otp" && (
          <>
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors duration-200 mb-6 cursor-pointer"
            >
              <ArrowLeftOutlined className="text-xs" /> Change Email
            </button>

            {cardHeader(
              <SafetyCertificateOutlined className="text-4xl text-white" />,
              "Verify OTP",
              `Enter the 6-digit OTP sent to ${forgotEmail}`
            )}

            <form onSubmit={otpForm.handleSubmit} className="space-y-6">
              <CommonInput
                label="One-Time Password"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={otpForm.values.otp}
                onChange={otpForm.handleChange}
                onBlur={otpForm.handleBlur}
                error={otpForm.touched.otp && otpForm.errors.otp ? otpForm.errors.otp : undefined}
                prefix={<SafetyCertificateOutlined className="text-text-secondary mr-2" />}
                maxLength={6}
              />

              <p className="text-xs text-text-secondary text-center -mt-2">
                Didn't receive it?{" "}
                <button
                  type="button"
                  onClick={() => {
                    forgotPasswordService({ email: forgotEmail })
                      .then(() => message.success("OTP resent successfully"))
                      .catch(() => message.error("Failed to resend OTP"));
                  }}
                  className="text-primary hover:text-primary/80 font-medium cursor-pointer"
                >
                  Resend OTP
                </button>
              </p>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={otpForm.isSubmitting}
                className="h-12 bg-primary hover:bg-primary/90 border-none rounded-xl text-lg font-semibold shadow-lg shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Verify & Reset Password
              </Button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default Login;
