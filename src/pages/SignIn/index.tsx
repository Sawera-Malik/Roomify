import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerWithEmail, signInWithEmail, signInWithGoogle } from '../../services/authService';

function getAuthErrorMessage(error: unknown, action: 'login' | 'register') {
    const code = typeof error === 'object' && error !== null && 'code' in error
        ? String(error.code)
        : '';

    if (import.meta.env.DEV) {
        console.error(`Authentication ${action} failed`, error);
    }

    if (code === 'auth/invalid-credential' || code === 'auth/invalid-login-credentials' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        return 'Invalid email or password. Register first if you do not have an account.';
    }
    if (code === 'auth/email-already-in-use') return 'This email is already registered. Sign in instead.';
    if (code === 'auth/invalid-email') return 'Enter a valid email address.';
    if (code === 'auth/weak-password') return 'Password must be at least 6 characters.';
    if (code === 'auth/too-many-requests') return 'Too many attempts. Please wait and try again.';

    return action === 'login' ? 'Unable to sign in. Please try again.' : 'Unable to create your account. Please try again.';
}

function SignIn() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [remember, setRemember] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const login = async () => {
        setError('');
        try {
            await signInWithGoogle(remember);
            navigate('/home');
        } catch {
            setError('Google sign-in failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex bg-[#F7F5F0] dark:bg-[#1A1814]">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?w=900&h=1200&fit=crop&auto=format"
                    alt="Interior design inspiration"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#252525]/70 via-transparent to-[#B08D57]/20" />

                <div className="absolute bottom-12 left-10 right-10">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="1" y="5" width="12" height="8" rx="1" fill="#252525" />
                                <path d="M1 5L7 1L13 5" stroke="#252525" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="font-display text-xl font-semibold text-white">Roomify</span>
                    </div>
                    <blockquote className="font-display text-2xl font-medium text-white leading-snug mb-3">
                        "Your space is a canvas.<br />Let's paint it together."
                    </blockquote>
                    <p className="text-white/60 text-sm">Design. Customize. Bring it to life.</p>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-8 py-16">
                <div className="w-full max-w-md">
                    <button type="button" onClick={() => navigate('/home')} className="flex lg:hidden items-center gap-2 mb-10">
                        <div className="w-7 h-7 bg-[#252525] dark:bg-[#F7F5F0] rounded-md" />
                        <span className="font-display text-xl font-semibold text-[#252525] dark:text-[#F7F5F0]">Roomify</span>
                    </button>

                    <div className="mb-8">
                        <h1 className="font-display text-3xl font-medium text-[#252525] dark:text-[#F7F5F0] mb-1.5">
                            {mode === "login" ? "Welcome back" : "Create account"}
                        </h1>
                        <p className="text-sm text-[#777777]">
                            {mode === "login"
                                ? "Sign in to continue designing"
                                : "Start your design journey today"}
                        </p>
                    </div>

                    <div className="flex bg-[#E8E1D5] dark:bg-[#2E2B27] rounded-xl p-1 mb-7">
                        {(["login", "register"] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === m
                                        ? "bg-white dark:bg-[#252220] text-[#252525] dark:text-[#F7F5F0] shadow-sm"
                                        : "text-[#777777] hover:text-[#252525] dark:hover:text-[#F7F5F0]"
                                    }`}
                            >
                                {m === "login" ? "Sign In" : "Register"}
                            </button>
                        ))}
                    </div>

                    <button type="button" onClick={login} className="w-full flex items-center justify-center gap-3 py-3 border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm font-medium text-[#252525] dark:text-[#F7F5F0] hover:border-[#B08D57] transition-colors mb-5">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                            <path d="M3.964 10.705A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.705V4.963H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.037l3.007-2.332z" fill="#FBBC05" />
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.964L3.964 7.296C4.672 5.169 6.656 3.58 9 3.58z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative flex items-center gap-4 mb-5">
                        <div className="flex-1 h-px bg-[#E0D9CE] dark:bg-[#3A3530]" />
                        <span className="text-xs text-[#999390]">or</span>
                        <div className="flex-1 h-px bg-[#E0D9CE] dark:bg-[#3A3530]" />
                    </div>

                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        setError('');

                        if (mode === 'register') {
                            if (password.length < 6) {
                                setError('Password must be at least 6 characters.');
                                return;
                            }
                            if (password !== confirmPassword) {
                                setError('Passwords do not match.');
                                return;
                            }

                            try {
                                await registerWithEmail(email.trim(), password, remember);
                                navigate('/home');
                                return;
                            } catch (registrationError) {
                                setError(getAuthErrorMessage(registrationError, 'register'));
                                return;
                            }
                        }

                        try {
                            await signInWithEmail(email.trim(), password, remember);
                        } catch (loginError) {
                            setError(getAuthErrorMessage(loginError, 'login'));
                            return;
                        }

                        navigate('/home');
                    }} className="space-y-4">
                        {mode === "register" && (
                            <div>
                                <label className="block text-xs font-semibold text-[#777777] uppercase tracking-wider mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Sofia Andersson"
                                    className="w-full px-4 py-3 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0] placeholder:text-[#999390] focus:outline-none focus:border-[#B08D57] transition-colors"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-semibold text-[#777777] uppercase tracking-wider mb-1.5">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                className="w-full px-4 py-3 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0] placeholder:text-[#999390] focus:outline-none focus:border-[#B08D57] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#777777] uppercase tracking-wider mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0] placeholder:text-[#999390] focus:outline-none focus:border-[#B08D57] transition-colors pr-11"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#252525] dark:hover:text-[#F7F5F0] transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        {showPw
                                            ? <><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" /></>
                                            : <><path d="M1 1l14 14M6.6 6.7A2 2 0 009.3 9.4M3 3.5A13 13 0 001 8s3 5 7 5c1.5 0 2.9-.5 4-1.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M11.5 11.5A13 13 0 0015 8s-3-5-7-5c-.7 0-1.4.1-2 .3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>
                                        }
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {mode === "register" && (
                            <div>
                                <label className="block text-xs font-semibold text-[#777777] uppercase tracking-wider mb-1.5">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0] placeholder:text-[#999390] focus:outline-none focus:border-[#B08D57] transition-colors"
                                />
                            </div>
                        )}

                        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

                        {mode === "login" && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <button
                                        type="button"
                                        onClick={() => setRemember(!remember)}
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${remember ? "bg-[#B08D57] border-[#B08D57]" : "border-[#E0D9CE] dark:border-[#3A3530]"
                                            }`}
                                    >
                                        {remember && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    </button>
                                    <span className="text-xs text-[#777777]">Remember me</span>
                                </label>
                                <button type="button" className="text-xs text-[#B08D57] hover:underline">Forgot password?</button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-[#252525] dark:bg-[#F7F5F0] text-white dark:text-[#252525] font-semibold rounded-xl hover:bg-[#B08D57] dark:hover:bg-[#B08D57] dark:hover:text-white transition-colors mt-2"
                        >
                            {mode === "login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-xs text-[#777777] mt-6">
                        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setMode(mode === "login" ? "register" : "login")}
                            className="text-[#B08D57] font-medium hover:underline"
                        >
                            {mode === "login" ? "Register" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn