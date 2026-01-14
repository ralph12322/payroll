'use client';
import React, { useState, useEffect, use } from 'react';
import { CheckCircle, Users, TrendingUp, Shield, ChevronRight, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PayrollLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rerout = () => {
    router.push('/signlog')
  }

  const goProfile = () => {
    router.push('/profile')
  }

  useEffect(() => {
    const role = localStorage.getItem("role");
    if(role){
      setIsLogin(true)
    }
  },[])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-neutral-200' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-neutral-900">
              PayFlow
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">Features</a>
              <a href="#pricing" className="text-neutral-600 hover:text-neutral-900 transition-colors">Pricing</a>
              <a href="#about" className="text-neutral-600 hover:text-neutral-900 transition-colors">About</a>
              {isLogin ? '' :<button onClick={rerout} className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors">Login</button>}
              {isLogin ? <div onClick={goProfile}className="w-10 h-10 bg-neutral-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                            AP
                        </div> : <button onClick={rerout} className="px-6 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors">
                Get Started
              </button>} 
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#features" className="block text-neutral-600 hover:text-neutral-900 transition-colors">Features</a>
              <a href="#pricing" className="block text-neutral-600 hover:text-neutral-900 transition-colors">Pricing</a>
              <a href="#about" className="block text-neutral-600 hover:text-neutral-900 transition-colors">About</a>
              <button className="block w-full text-left text-neutral-600 hover:text-neutral-900 transition-colors">Login</button>
              <button className="block w-full px-6 py-2 bg-neutral-900 text-white rounded-lg font-medium">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full text-sm text-white mb-8">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Trusted by 500+ accounting firms
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-neutral-900">
              Payroll Made Simple
            </h1>

            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              The modern B2B payroll system designed for accounting firms. Process payroll in minutes, not hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="px-8 py-4 bg-neutral-900 text-white rounded-lg font-medium text-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 group">
                Start Free Trial
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-900 rounded-lg font-medium text-lg hover:border-neutral-300 transition-colors">
                Watch Demo
              </button>
            </div>

            {/* Hero Image/Dashboard Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-transparent to-transparent z-10"></div>
              <div className="relative bg-white border-2 border-neutral-200 rounded-2xl p-8 shadow-xl">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                    <div className="text-sm text-neutral-500 mb-1">Total Payroll</div>
                    <div className="text-2xl font-bold text-neutral-900">₱1.2M</div>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                    <div className="text-sm text-neutral-500 mb-1">Employees</div>
                    <div className="text-2xl font-bold text-neutral-900">247</div>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                    <div className="text-sm text-neutral-500 mb-1">Processing</div>
                    <div className="text-2xl font-bold text-neutral-900">98%</div>
                  </div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-neutral-700 font-medium">Recent Payroll Runs</span>
                    <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded-full">All Approved</span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-neutral-900 rounded-full"></div>
                          <span className="text-sm text-neutral-700">Payroll Run #{i}</span>
                        </div>
                        <CheckCircle size={16} className="text-neutral-900" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
              Everything you need to run payroll
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Powerful features designed for accounting firms managing multiple clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: <Users size={32} />,
                title: "Multi-Client Management",
                description: "Manage payroll for unlimited clients from a single dashboard. Switch between companies seamlessly."
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Automated Calculations",
                description: "Government deductions, taxes, and net pay calculated automatically with 99.9% accuracy."
              },
              {
                icon: <Shield size={32} />,
                title: "Approval Workflows",
                description: "Built-in approval system. Clients review and approve before disbursement."
              },
              {
                icon: <CheckCircle size={32} />,
                title: "Compliance Ready",
                description: "Stay compliant with local tax laws. Automatic updates for regulatory changes."
              },
              {
                icon: <Users size={32} />,
                title: "Bank Integration",
                description: "Direct integration with major banks for instant payroll disbursement."
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Real-time Reports",
                description: "Generate payroll reports, tax summaries, and audit trails instantly."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-neutral-50 border-2 border-neutral-200 rounded-2xl hover:border-neutral-900 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-neutral-900 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-neutral-900 rounded-3xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Accounting Firms" },
                { value: "50K+", label: "Employees Paid" },
                { value: "₱2.5B", label: "Processed Monthly" },
                { value: "99.9%", label: "Uptime" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Choose the plan that fits your firm's size
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "₱2,999",
                period: "/month",
                features: ["Up to 5 clients", "100 employees", "Basic reports", "Email support"],
                highlight: false
              },
              {
                name: "Professional",
                price: "₱7,999",
                period: "/month",
                features: ["Up to 20 clients", "500 employees", "Advanced reports", "Priority support", "Bank integration"],
                highlight: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                features: ["Unlimited clients", "Unlimited employees", "Custom integrations", "Dedicated manager", "SLA guarantee"],
                highlight: false
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 ${plan.highlight
                    ? 'bg-neutral-900 border-neutral-900 scale-105'
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                {plan.highlight && (
                  <div className="text-center mb-4">
                    <span className="px-3 py-1 bg-white text-neutral-900 text-xs rounded-full font-medium">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-4 ${plan.highlight ? 'text-white' : 'text-neutral-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-5xl font-bold ${plan.highlight ? 'text-white' : 'text-neutral-900'}`}>
                      {plan.price}
                    </span>
                    <span className={plan.highlight ? 'text-neutral-400' : 'text-neutral-600'}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3">
                      <CheckCircle size={20} className={plan.highlight ? 'text-white' : 'text-neutral-900'} />
                      <span className={plan.highlight ? 'text-neutral-300' : 'text-neutral-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-medium transition-all ${plan.highlight
                    ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-neutral-900 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to transform your payroll process?
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Join hundreds of accounting firms saving time and reducing errors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-neutral-900 rounded-lg font-medium text-lg hover:bg-neutral-100 transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium text-lg hover:bg-white/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-neutral-900 mb-4">
                PayFlow
              </div>
              <p className="text-neutral-600 text-sm">
                Modern payroll system for accounting firms
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-neutral-900">Product</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-neutral-900">Company</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-neutral-900">Support</h4>
              <ul className="space-y-2 text-neutral-600 text-sm">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">API Docs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-8 text-center text-neutral-600 text-sm">
            © 2024 PayFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}