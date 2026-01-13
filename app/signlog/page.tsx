'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building2, ChevronRight } from 'lucide-react';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

export default function AuthPages() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        role: 'accountant'
    });
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userSignup = {
            email: formData.email,
            password: formData.password,
            name: formData.fullName,
            role: formData.role
        };

        const userLogin = {
            email: formData.email,
            password: formData.password
        }

        if (isLogin) {
            try {
                const res = await fetch('api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userLogin })
                })

                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.message || "Login Failed")
                } else {
                    toast.success(data.message)
                    if (data.role === 'client') {
                        router.push('/client')
                    }
                    else if (data.role === 'accountant'){
                        router.push('/accountant')
                    }
                }
            } catch (error) {

            }

        }
        else {
            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userSignup })
                });

                const data = await res.json();
                console.log(data);

                if (!res.ok) {
                    toast.error(data.message || 'Signup failed');
                } else {
                    toast.success(data.message);
                    setIsLogin(true)
                }
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong');
            }
        }

    };


    return (
        <div className="min-h-screen bg-neutral-50 flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-neutral-900">PayFlow</h1>
                        <p className="text-neutral-600 mt-2">
                            {isLogin ? 'Welcome back' : 'Create your account'}
                        </p>
                    </div>

                    {/* Toggle Login/Signup */}
                    <div className="flex gap-2 mb-8 bg-neutral-100 p-1 rounded-lg">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${isLogin
                                ? 'bg-white text-neutral-900 shadow-sm'
                                : 'text-neutral-600 hover:text-neutral-900'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${!isLogin
                                ? 'bg-white text-neutral-900 shadow-sm'
                                : 'text-neutral-600 hover:text-neutral-900'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Signup Only - Full Name */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        required={!isLogin}
                                        className="w-full pl-11 pr-4 py-3 bg-white border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Signup Only - Role Selection */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    I am a
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                    className="w-full px-4 py-3 bg-white border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="accountant">Accountant/Accounting Firm</option>
                                    <option value="client">Business Owner/Client</option>
                                    <option value="employee">Employee</option>
                                </select>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="you@company.com"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-11 pr-11 py-3 bg-white border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Signup Only - Confirm Password */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        required={!isLogin}
                                        className="w-full pl-11 pr-4 py-3 bg-white border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Login Only - Forgot Password */}
                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 border-2 border-neutral-300 rounded"
                                    />
                                    <span className="text-sm text-neutral-600">Remember me</span>
                                </label>
                                <a href="#" className="text-sm text-neutral-900 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group"
                        >
                            {isLogin ? 'Login' : 'Create Account'}
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Signup Only - Terms */}
                        {!isLogin && (
                            <p className="text-xs text-neutral-600 text-center">
                                By signing up, you agree to our{' '}
                                <a href="#" className="text-neutral-900 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-neutral-900 hover:underline">
                                    Privacy Policy
                                </a>
                            </p>
                        )}
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-neutral-50 text-neutral-600">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="py-3 px-4 bg-white border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 hover:border-neutral-300 transition-colors flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button className="py-3 px-4 bg-white border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 hover:border-neutral-300 transition-colors flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            GitHub
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side - Info Panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-neutral-900 text-white p-12 flex-col justify-between">
                <div>
                    <h2 className="text-4xl font-bold mb-6">
                        {isLogin
                            ? 'Process payroll in minutes, not hours'
                            : 'Join 500+ accounting firms'
                        }
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed mb-12">
                        {isLogin
                            ? 'Streamline your payroll workflow with automated calculations, approval workflows, and real-time reporting.'
                            : 'Start processing payroll for your clients with our modern, intuitive platform designed specifically for accounting professionals.'
                        }
                    </p>

                    {/* Features List */}
                    <div className="space-y-6">
                        {[
                            'Automated tax calculations',
                            'Multi-client management',
                            'Built-in approval workflows',
                            'Bank integration for instant disbursement'
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <ChevronRight size={20} />
                                </div>
                                <div>
                                    <p className="text-neutral-200">{feature}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
                    <div>
                        <div className="text-3xl font-bold mb-1">500+</div>
                        <div className="text-neutral-400 text-sm">Firms</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold mb-1">50K+</div>
                        <div className="text-neutral-400 text-sm">Employees</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold mb-1">₱2.5B</div>
                        <div className="text-neutral-400 text-sm">Monthly</div>
                    </div>
                </div>
            </div>
        </div>
    );
}