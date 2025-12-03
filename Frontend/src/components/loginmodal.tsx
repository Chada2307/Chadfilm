import React, { ReactEventHandler, use } from "react";
import { Film } from "lucide-react";
import { loginRequest } from "../api/auth";
interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
    const [mode, setMode] = React.useState<"login" | "signup">("login");
    const isLogin = mode === "login";

    const[username, setUsername] = React.useState("");
    const[password, setPassword] = React.useState("");
    const[error, setError] = React.useState<string | null>(null);
    

    React.useEffect(() => {
        if(!open) {
            setMode("login");
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try{
            if(isLogin) {
                const res = await loginRequest(username,password);
                localStorage.setItem("auth_token", res.token);
                console.log("token :", res.token);
            }
            onClose();
        }catch(err :any ){
            setError(err.message ?? "cos jest nie wporzadku");
        }
    }


    if (!open) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/60 p-2 text-neutral-300 shadow-lg hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Close"
            >
                <span className="block h-4 w-4 leading-none">x</span>
            </button>

            <div 
                className="relative mx-4 w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950/95 px-10 py-10 text-neutral-100 shadow-2xl shadow-black/80"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Film className="h-8 w-8 text-yellow-400" />
                </div>

                <div className="text-center">
                    <h2 className="text-xl font-semibold tracking-tight">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="mt-1 text-xs text-neutral-400">
                        {isLogin 
                            ? "Sign in to continue your cinematic journey"
                            : "Join ChadFilm and start your cinematic journey"
                        }
                        
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

                    
                    {!isLogin && (
                        <div>
                            <label className="text-xs font-medium text-neutral-400">
                                Username
                            </label>
                        <div className="mt-1 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition focus-within:border-yellow-400/70 focus-within:bg-black/60 focus-within:ring-1 focus-within:ring-yellow-400/70">
                        <svg
                        className="h-4 w-4 flex-shrink-0 text-neutral-400"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        >
                        <path
                            fill="currentColor"
                            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-3.33 0-6 2-6 4.5V20h12v-1.5c0-2.5-2.67-4.5-6-4.5z"
                        />
                        </svg>
                            <input
                                type="input"
                                className="h-8 w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 outline-none border-none"
                                placeholder="Enter your username"
                            />
                        </div>    
                        </div>                        
                    )}

                    <div>
                        <label className="text-xs font-medium text-neutral-400">
                            Username
                        </label>
                        <div className="mt-1 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition focus-within:border-yellow-400/70 focus-within:bg-black/60 focus-within:ring-1 focus-within:ring-yellow-400/70">
                            <svg
                                className="h-4 w-4 flex-shrink-0 text-neutral-400"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                            <path
                                fill="currentColor"
                                d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.217l8 5.333 8-5.333V7l-8 5.333L4 7z"
                                />
                            </svg>
                            <input
                                type="Username"
                                className="h-8 w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 outline-none border-none"
                                placeholder="Enter your login"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-neutral-400">
                            Password
                        </label>
                        <div className="mt-1 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition focus-within:border-yellow-400/70 focus-within:bg-black/60 focus-within:ring-1 focus-within:ring-yellow-400/70">
                            <svg
                                className="h-4 w-4 flex-shrink-0 text-neutral-400"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill="currentColor"
                                    d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1zm-7-2a2 2 0 1 1 4 0v2h-4V7zm2 5a1.5 1.5 0 0 1 .5 2.914V17h-1v-2.086A1.5 1.5 0 0 1 12 12z"
                                />
                            </svg>
                            <input
                                type="password"
                                className="h-8 w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 outline-none border-none"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLogin ? (        
                    <div className="mt-1 flex items-center justify-between text-xs text-neutral-400">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-3.5 w-3.5 rounded border-neutral-500 bg-transparent text-yellow-400 focus:ring-yellow-400"
                            />
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="text-[0.7rem] font-medium text-neutral-400 hover:text-neutral-200"
                        >
                            Forgot Password?    
                        </button>    
                    </div>
                    ) : (
                        <p className="mt-1 text-[0.70rem] text-neutral-500">
                            By creating an account you agree to our{" "}
                            <span className="text-yellow-400">Terms of Service</span> and{" "}
                            <span className="text-yellow-400">Privacy Policy</span>.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-xl bg-yellow-400 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-yellow-400/40 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">
                            {isLogin ? "Sign in" : "Create account"}
                        </button>

    
                </form>

                <div className="mt-6 flex items-center gap-4 text-[0.7rem] text-neutral-500">
                    <span className="h-px flex-1 bg-neutral-800" />
                    <span>Or continue with</span>
                    <span className="h-px flex-1 bg-neutral-800" />
                </div>

                <div className="mt-4 flex gap-3">
                    <button
                        type="button"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-neutral-100 hover:bg-white/10">
                        <span className="rounded-full bg-white text-[0.7rem] font-bold leading-none text-neutral-900 px-1.5 py-0.5">
                            G
                        </span>
                        <span>Google</span>
                    </button>
                    <button
                        type ="button"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-neutral-100 hover:bg-white/10">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                                <span className="text-[0.6rem] text-white">A</span>
                            </span>
                            <span>Apple</span>    
                    </button>
                </div>
                <p className="mt-6 text-center text-xs text-neutral-500">
                    {isLogin ? (
                    <>    
                        Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        className="font-medium text-yellow-400 hover:text-yellow-300"
                        onClick={() => setMode("signup")}
                    >
                        Sign Up    
                    </button>  
                    </>
                    ) : (
                    <>
                        Already have an account?{" "}
                    <button
                        type="button"
                        className="font-medium text-yellow-400 hover:text-yellow-300"
                        onClick={() => setMode("login")}
                    >
                        Sign In    
                    </button>  
                    </>
                    )}
                    
                </p>
            </div>
        </div>
    );
};