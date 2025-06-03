"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginModal() {
  const { state, login, closeLoginModal, openSignupModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
    } else {
      // Reset form
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  const handleClose = () => {
    closeLoginModal();
    setEmail("");
    setPassword("");
    setError("");
  };

  const switchToSignup = () => {
    closeLoginModal();
    openSignupModal();
  };

  return (
    <Dialog open={state.isLoginModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#1c1c22] font-lato">
            Welcome Back
          </DialogTitle>
          <p className="text-center text-[#747474] text-sm font-inter">
            Sign in to your INKEY account
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-inter">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-[#c1c0cb] focus:border-[#746cad]"
                disabled={state.isLoading}
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <Button
            type="submit"
            className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 font-medium"
            disabled={state.isLoading}
          >
            {state.isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-[#746cad] hover:text-[#aca4e9] text-sm font-inter"
            >
              Forgot your password?
            </button>
          </div>

          <div className="border-t border-[#c1c0cb] pt-4 text-center">
            <p className="text-[#747474] text-sm font-inter mb-3">
              Don't have an account?
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={switchToSignup}
              className="w-full border-[#c1c0cb] text-[#747474] hover:text-[#1c1c22]"
              disabled={state.isLoading}
            >
              Create Account
            </Button>
          </div>
        </form>

        {/* Demo credentials */}
        <div className="mt-4 p-3 bg-[#efeff0] rounded-lg">
          <p className="text-xs text-[#747474] font-inter text-center mb-2">
            <strong>Demo Account:</strong>
          </p>
          <p className="text-xs text-[#747474] font-inter text-center">
            Email: demo@example.com<br />
            Password: password
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
