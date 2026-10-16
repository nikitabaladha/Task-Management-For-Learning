import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser } from "../../api/authApi";
import type { SignupData } from "../../types";
import SignupForm from "../../components/Auth/SignupForm";
import { handleApiError } from "../../utils/errorHandler";

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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
      const response = await signupUser(formData);

      if (response.success) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <SignupForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
      <p>
        Already have an account? <a onClick={handleLogin}>Login</a>
      </p>
    </div>
  );
};

export default Signup;
