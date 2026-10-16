import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/authApi";
import type { LoginData } from "../../types";
import LoginForm from "../../components/Auth/LoginForm";
import { handleApiError } from "../../utils/errorHandler";

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(formData);

      if (response.success) {
        login(response.token, response.data);
        toast.success("Login successful!");

        // Redirect based on role
        if (response.data.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
      <p>
        Don't have an account? <a onClick={handleSignup}>Sign up</a>
      </p>
    </div>
  );
};

export default Login;
