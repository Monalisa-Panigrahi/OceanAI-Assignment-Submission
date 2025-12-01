import React, { useState, useEffect } from 'react';
import { FileText, Presentation, Plus, Edit, Download, ThumbsUp, ThumbsDown, Sparkles, Trash2, ArrowUp, ArrowDown, Save, LogOut, User, Moon, Sun } from 'lucide-react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const API_BASE = 'https://infini-ai-doc-platform-1.onrender.com/api';

// Theme Toggle Component
const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

// Utility function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });
  
  if (!response.ok) {
    let message = 'API request failed';
    try {
      const error = await response.json();
      message = error.error || JSON.stringify(error);
    } catch {
      const text = await response.text();
      message = text;
    }
    throw new Error(message);
  }

  try {
    return await response.json();
  } catch {
    const text = await response.text();
    throw new Error(text);
  }
};

// Auth Component with Enhanced Styling
const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            email: formData.email, 
            password: formData.password, 
            name: `${formData.firstName} ${formData.lastName}` 
          };
      
      const token = localStorage.getItem('token');
      const response = await fetch(`https://infini-ai-doc-platform-1.onrender.com/api${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-500/40 to-purple-500/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/25 to-rose-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles with Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, ${0.3 + Math.random() * 0.4})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Enhanced Branding */}
          <div className="hidden lg:block space-y-8 px-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 text-transparent bg-clip-text">infini</span>
              </div>
              
              <h1 className="text-6xl font-bold text-white leading-tight">
                Transform Ideas<br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
                  Into Reality
                </span>
              </h1>
              
              <p className="text-slate-300 text-xl leading-relaxed">
                Harness the power of AI to create stunning documents and presentations in seconds.
              </p>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-indigo-400/50 hover:bg-white/15 transition-all duration-300 group cursor-pointer shadow-xl">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform">99%</div>
                <div className="text-sm text-slate-300 font-medium">Satisfaction Rate</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 hover:bg-white/15 transition-all duration-300 group cursor-pointer shadow-xl">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-sm text-slate-300 font-medium">AI Availability</div>
              </div>
            </div>

            {/* Enhanced Testimonial */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-indigo-400/30 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-white font-bold text-lg">Kajal Meshram</div>
                    <div className="text-indigo-300 text-sm">Product Manager</div>
                  </div>
                </div>
                <p className="text-slate-200 italic leading-relaxed">"This tool has revolutionized our document creation process. What used to take hours now takes minutes!"</p>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20">
              <div className="mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text mb-3">
                  {isLogin ? 'Welcome back!' : 'Join Us Today'}
                </h2>
                <p className="text-slate-400 text-lg">
                  {isLogin ? 'Sign in to continue your journey' : 'Create your account in seconds'}
                </p>
              </div>

              {/* Enhanced Toggle */}
              <div className="flex gap-2 mb-8 bg-slate-800/70 p-2 rounded-2xl backdrop-blur-sm">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  className={`flex-1 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    isLogin 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                  className={`flex-1 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                      <label className="text-xs text-slate-400 mb-2 block uppercase tracking-wider font-semibold">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className="w-full bg-slate-800/70 border border-slate-600/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all backdrop-blur-sm"
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-xs text-slate-400 mb-2 block uppercase tracking-wider font-semibold">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          className="w-full bg-slate-800/70 border border-slate-600/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all backdrop-blur-sm"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="group">
                  <label className="text-xs text-slate-400 mb-2 block uppercase tracking-wider font-semibold">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-slate-800/70 border border-slate-600/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-xs text-slate-400 mb-2 block uppercase tracking-wider font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-slate-800/70 border border-slate-600/50 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                      Forgot password?
                    </button>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-5 py-4 animate-shake backdrop-blur-sm">
                    <p className="text-red-300 text-sm font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.02] flex items-center justify-center gap-3 group text-lg"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {!isLogin && (
                <p className="text-xs text-slate-500 mt-6 text-center">
                  By signing up, you agree to our{' '}
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    Privacy Policy
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(15px);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );

// Dashboard Component with Modern Design
const Dashboard = ({ user, theme, setTheme, onLogout, onSelectProject, onNewProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await apiCall('/projects');
      setProjects(data.projects);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm('Delete this project?')) return;
    
    try {
      await apiCall(`/projects/${projectId}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      console.error('Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">infini</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
            </div>

            <ThemeToggle theme={theme} setTheme={setTheme} />

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 font-medium hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Manage and create your AI-powered documents</p>
          </div>
          <button
            onClick={onNewProject}
            className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 font-semibold text-lg"
          >
            <Plus className="w-6 h-6" />
            New Project
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-indigo-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-16 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No projects yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Start your journey by creating your first AI-powered document</p>
            <button
              onClick={onNewProject}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-indigo-500/30 font-semibold text-lg hover:scale-105"
            >
              <Plus className="w-6 h-6" />
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {project.document_type === 'docx' ? (
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <FileText className="w-7 h-7 text-white" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Presentation className="w-7 h-7 text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {toTitleCase(project.title)}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {project.document_type === 'docx' ? 'Word Document' : 'PowerPoint'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">{project.topic}</p>
                  
                  <button
                    onClick={() => onSelectProject(project)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Open Project
                  </button>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Updated {new Date(project.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Configuration Component with Enhanced Design
const ProjectConfig = ({ onComplete, onBack }) => {
  const [docType, setDocType] = useState('docx');
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState(['Introduction', 'Main Content', 'Conclusion']);
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  const addSection = () => {
    setOutline([...outline, `Section ${outline.length + 1}`]);
  };

  const removeSection = (index) => {
    setOutline(outline.filter((_, i) => i !== index));
  };

  const updateSection = (index, value) => {
    const newOutline = [...outline];
    newOutline[index] = value;
    setOutline(newOutline);
  };

  const moveSection = (index, direction) => {
    if (direction === 'up' && index > 0) {
      const newOutline = [...outline];
      [newOutline[index - 1], newOutline[index]] = [newOutline[index], newOutline[index - 1]];
      setOutline(newOutline);
    } else if (direction === 'down' && index < outline.length - 1) {
      const newOutline = [...outline];
      [newOutline[index], newOutline[index + 1]] = [newOutline[index + 1], newOutline[index]];
      setOutline(newOutline);
    }
  };

  const generateAIOutline = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic first');
      return;
    }

    setAiGenerating(true);
    try {
      const data = await apiCall('/ai/suggest-outline', {
        method: 'POST',
        body: JSON.stringify({ topic, document_type: docType })
      });
      setOutline(data.outline);
    } catch (err) {
      console.error('Failed to generate outline: ' + err.message);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleCreate = async () => {
    if (!topic.trim() || outline.length === 0) {
      alert('Please provide a topic and at least one section');
      return;
    }

    setLoading(true);
    try {
      const data = await apiCall('/projects', {
        method: 'POST',
        body: JSON.stringify({
          document_type: docType,
          title: topic.substring(0, 100),
          topic,
          outline
        })
      });
      onComplete(data.project);
    } catch (err) {
      console.error('Failed to create project: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <button
          onClick={onBack}
          className="mb-8 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-2 text-lg font-medium transition-all duration-300 hover:gap-4"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-3">Create New Project</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Configure your AI-powered document</p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                Document Type
              </label>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setDocType('docx')}
                  className={`group p-8 border-2 rounded-2xl transition-all duration-300 ${
                    docType === 'docx'
                      ? 'border-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 shadow-xl scale-105'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:shadow-lg hover:scale-102'
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">Word Document</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">.docx format</div>
                </button>
                <button
                  onClick={() => setDocType('pptx')}
                  className={`group p-8 border-2 rounded-2xl transition-all duration-300 ${
                    docType === 'pptx'
                      ? 'border-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 shadow-xl scale-105'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:shadow-lg hover:scale-102'
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Presentation className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">PowerPoint</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">.pptx format</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                Topic / Main Prompt
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., A comprehensive market analysis of the EV industry in 2025..."
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                rows="4"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  {docType === 'docx' ? 'Document Outline' : 'Slide Titles'}
                </label>
                <button
                  onClick={generateAIOutline}
                  disabled={aiGenerating || !topic.trim()}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  {aiGenerating ? 'Generating...' : 'AI Suggest'}
                </button>
              </div>

              <div className="space-y-3">
                {outline.map((section, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveSection(index, 'up')}
                        disabled={index === 0}
                        className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveSection(index, 'down')}
                        disabled={index === outline.length - 1}
                        className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={section}
                      onChange={(e) => updateSection(index, e.target.value)}
                      className="flex-1 px-5 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => removeSection(index)}
                      className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addSection}
                className="mt-4 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 py-4 rounded-xl hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium"
              >
                + Add {docType === 'docx' ? 'Section' : 'Slide'}
              </button>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={onBack}
                className="flex-1 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold text-lg hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {loading ? 'Creating...' : 'Create & Generate Content'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Card Component with Modern Design
const SectionCard = ({ section, index, onRefine, onLike, onComment }) => {
  const [refinePrompt, setRefinePrompt] = useState('');
  const [comment, setComment] = useState(section.comment || '');
  const [isRefining, setIsRefining] = useState(false);

  const handleRefine = async () => {
    if (!refinePrompt.trim()) return;
    
    setIsRefining(true);
    await onRefine(section.id, refinePrompt);
    setRefinePrompt('');
    setIsRefining(false);
  };

  const handleCommentSave = () => {
    onComment(comment);
  };

  return (
    <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200/50 dark:border-gray-700/50 hover:scale-102">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onLike(section.liked === true ? null : true)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                section.liked === true
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400 shadow-lg scale-110'
                  : 'text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-110'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
            <button
              onClick={() => onLike(section.liked === false ? null : false)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                section.liked === false
                  ? 'bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 text-red-600 dark:text-red-400 shadow-lg scale-110'
                  : 'text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110'
              }`}
            >
              <ThumbsDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 mb-6 whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed border border-gray-200 dark:border-gray-700 shadow-inner">
          {section.content || 'Generating content, Please Wait...'}
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              placeholder="e.g., Make this more formal, Add bullet points, Shorten to 100 words..."
              className="flex-1 px-5 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && handleRefine()}
            />
            <button
              onClick={handleRefine}
              disabled={isRefining || !refinePrompt.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isRefining ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Refining...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Refine
                </>
              )}
            </button>
          </div>

          <div className="flex gap-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add notes or comments about this section..."
              className="flex-1 px-5 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              rows="2"
            />
            <button
              onClick={handleCommentSave}
              className="px-5 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Editor Component with Enhanced Design
const Editor = ({ project, theme, setTheme, onBack }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadSections();
  }, [project.id]);

  const loadSections = async () => {
    try {
      const data = await apiCall(`/projects/${project.id}/sections`);
      setSections(data.sections);
      
      if (data.sections.length === 0 || data.sections.every(s => !s.content)) {
        await generateAllContent();
      }
    } catch (err) {
      console.error('Failed to load sections:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateAllContent = async () => {
    setGenerating(true);
    try {
      const data = await apiCall(`/projects/${project.id}/generate`, {
        method: 'POST'
      });
      setSections(data.sections);
    } catch (err) {
      console.error("Generate error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const refineSection = async (sectionId, prompt) => {
    try {
      const data = await apiCall(`/sections/${sectionId}/refine`, {
        method: 'POST',
        body: JSON.stringify({ prompt })
      });
      
      setSections(sections.map(s => 
        s.id === sectionId ? { ...s, content: data.content } : s
      ));
    } catch (err) {
      console.error('Failed to refine: ' + err.message);
    }
  };

  const updateFeedback = async (sectionId, liked) => {
    try {
      await apiCall(`/sections/${sectionId}/feedback`, {
        method: 'POST',
        body: JSON.stringify({ liked })
      });
      
      setSections(sections.map(s => 
        s.id === sectionId ? { ...s, liked } : s
      ));
    } catch (err) {
      console.error('Failed to update feedback:', err);
    }
  };

  const updateComment = async (sectionId, comment) => {
    try {
      await apiCall(`/sections/${sectionId}/comment`, {
        method: 'POST',
        body: JSON.stringify({ comment })
      });
      
      setSections(sections.map(s => 
        s.id === sectionId ? { ...s, comment } : s
      ));
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  const exportDocument = async () => {
    setExporting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/projects/${project.id}/export`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.title}.${project.document_type}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export: ' + err.message);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
            <Sparkles className="w-10 h-10 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading project...</p>
        </div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          <Sparkles className="w-20 h-20 text-indigo-600 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Generating Content with AI
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">This may take a moment...</p>
          <div className="mt-8 flex gap-2 justify-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-2 text-lg font-semibold transition-all duration-300 hover:gap-4"
            >
              ← Back
            </button>

            <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {project.document_type === 'docx'
                  ? 'Word Document'
                  : 'PowerPoint Presentation'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <button
              onClick={exportDocument}
              disabled={exporting}
              className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Download className="w-5 h-5" />
              {exporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      </nav>

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              index={index}
              onRefine={refineSection}
              onLike={(liked) => updateFeedback(section.id, liked)}
              onComment={(comment) => updateComment(section.id, comment)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('auth');
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('auth');
    setSelectedProject(null);
  };

  const handleNewProject = () => {
    setCurrentView('config');
  };

  const handleProjectCreated = (project) => {
    setSelectedProject(project);
    setCurrentView('editor');
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setCurrentView('editor');
  };

  const handleBackToDashboard = () => {
    setSelectedProject(null);
    setCurrentView('dashboard');
  };

  if (currentView === 'auth') {
    return <AuthForm onLogin={handleLogin} />;
  }

  if (currentView === 'dashboard') {
    return (
      <Dashboard
        user={user}
        theme={theme}
        setTheme={setTheme}
        onLogout={handleLogout}
        onSelectProject={handleSelectProject}
        onNewProject={handleNewProject}
      />
    );
  }

  if (currentView === 'config') {
    return (
      <ProjectConfig
        onComplete={handleProjectCreated}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'editor' && selectedProject) {
    return (
      <Editor
        project={selectedProject}
        theme={theme}
        setTheme={setTheme}
        onBack={handleBackToDashboard}
      />
    );
  }

  return null;
};

export default App;