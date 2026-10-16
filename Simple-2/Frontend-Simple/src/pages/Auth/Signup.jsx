import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/authApi.jsx";
import SignupForm from "../../components/auth/SignupForm.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await signupUser(formData);

      if (response.success) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
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
        error={error}
      />
      <p>
        Already have an account? <a onClick={handleLogin}>Login</a>
      </p>
    </div>
  );
};

export default Signup;
