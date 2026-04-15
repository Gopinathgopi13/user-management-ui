import React from "react";
import { Button, message } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../utilities/schema";
import CommonInput from "../../components/CommonInput";
import { loginService } from "../../services/api/auth.api";
import { setAuthSession } from "../../utilities/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { handleSubmit, handleBlur, handleChange, values, errors, touched, isSubmitting } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values: any) => {
    try {
      const response = await loginService({
        email: values.email,
        password: values.password,
      });

      if (response.data && response.status === 200) {
        const { accessToken, refreshToken, user } = response.data.data;

        setAuthSession({
          access_token: accessToken,
          refresh_token: refreshToken,
          user,
        });

        message.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      message.error(errorMsg);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-border-subtle rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6 transform group-hover:rotate-12 transition-transform duration-500">
            <LoginOutlined className="text-4xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-6">
          <CommonInput
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.email && errors.email
                ? errors.email
                : undefined
            }
            prefix={<UserOutlined className="text-text-secondary mr-2" />}
          />

          <CommonInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            isPassword
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.password && errors.password
                ? errors.password
                : undefined
            }
            prefix={<LockOutlined className="text-text-secondary mr-2" />}
          />

          <div className="flex items-center justify-end">
            <a
              href="#"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isSubmitting}
            className="h-12 bg-primary hover:bg-primary/90 border-none rounded-xl text-lg font-semibold shadow-lg shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
