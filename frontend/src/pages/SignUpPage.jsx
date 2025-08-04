import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!formData.password) {
      toast.error('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="avatar placeholder mb-4">
              <div className="bg-primary text-primary-content rounded-full w-16">
                <UserPlus size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-base-content">Create Account</h1>
            <p className="text-base-content/70 mt-2">Join us today and get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full pl-10"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={isSigningUp}
                />
                <User className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSigningUp}
                />
                <Mail className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  className="input input-bordered w-full pl-10 pr-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSigningUp}
                />
                <Lock className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-base-content/40 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSigningUp}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="input input-bordered w-full pl-10 pr-10"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isSigningUp}
                />
                <Lock className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-base-content/40 hover:text-base-content"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSigningUp}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Sign Up
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="divider">OR</div>
          
          <div className="text-center">
            <p className="text-base-content/70">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;