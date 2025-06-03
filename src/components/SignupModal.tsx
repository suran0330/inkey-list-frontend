"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";

export default function SignupModal() {
  const { state, signup, closeSignupModal, openLoginModal } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password)
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    const success = await signup(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );

    if (!success) {
      setError("An account with this email already exists");
    } else {
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      setError("");
      setAcceptTerms(false);
    }
  };

  const handleClose = () => {
    closeSignupModal();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setError("");
    setAcceptTerms(false);
  };

  const switchToLogin = () => {
    closeSignupModal();
    openLoginModal();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={state.isSignupModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#1c1c22] font-lato">
            Join INKEY
          </DialogTitle>
          <p className="text-center text-[#747474] text-sm font-inter">
            Create your account and become an Insider
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-inter">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                className="w-full border-[#c1c0cb] focus:border-[#746cad]"
                disabled={state.isLoading}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className="w-full border-[#c1c0cb] focus:border-[#746cad]"
                disabled={state.isLoading}
              />
            </div>
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full border-[#c1c0cb] focus:border-[#746cad]"
              disabled={state.isLoading}
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className="w-full border-[#c1c0cb] focus:border-[#746cad] pr-12"
              disabled={state.isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#97979d] hover:text-[#1c1c22]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <div className="space-y-2">
              <p className="text-xs text-[#747474] font-inter">Password must contain:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : 'text-[#97979d]'}`}>
                  <Check className={`h-3 w-3 mr-1 ${passwordRequirements.length ? 'opacity-100' : 'opacity-30'}`} />
                  8+ characters
                </div>
                <div className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : 'text-[#97979d]'}`}>
                  <Check className={`h-3 w-3 mr-1 ${passwordRequirements.uppercase ? 'opacity-100' : 'opacity-30'}`} />
                  Uppercase letter
                </div>
                <div className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : 'text-[#97979d]'}`}>
                  <Check className={`h-3 w-3 mr-1 ${passwordRequirements.lowercase ? 'opacity-100' : 'opacity-30'}`} />
                  Lowercase letter
                </div>
                <div className={`flex items-center ${passwordRequirements.number ? 'text-green-600' : 'text-[#97979d]'}`}>
                  <Check className={`h-3 w-3 mr-1 ${passwordRequirements.number ? 'opacity-100' : 'opacity-30'}`} />
                  Number
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className="w-full border-[#c1c0cb] focus:border-[#746cad] pr-12"
              disabled={state.isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#97979d] hover:text-[#1c1c22]"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1"
              disabled={state.isLoading}
            />
            <label htmlFor="terms" className="text-xs text-[#747474] font-inter leading-relaxed">
              I agree to the{" "}
              <button type="button" className="text-[#746cad] hover:underline">
                Terms & Conditions
              </button>{" "}
              and{" "}
              <button type="button" className="text-[#746cad] hover:underline">
                Privacy Policy
              </button>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 font-medium"
            disabled={state.isLoading || !isPasswordValid || !acceptTerms}
          >
            {state.isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <div className="border-t border-[#c1c0cb] pt-4 text-center">
            <p className="text-[#747474] text-sm font-inter mb-3">
              Already have an account?
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={switchToLogin}
              className="w-full border-[#c1c0cb] text-[#747474] hover:text-[#1c1c22]"
              disabled={state.isLoading}
            >
              Sign In
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
