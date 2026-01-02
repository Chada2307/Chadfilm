import React, { ReactEventHandler, use, useEffect } from "react";
import { Film, User, Lock, X } from "lucide-react";
import { loginRequest } from "../api/auth";


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    switchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, switchToRegister }) => {

    const[username, setUsername] = React.useState("");
    const[password, setPassword] = React.useState("");
    const[error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        if(!open) {
            setError(null);
            setUsername("");
            setPassword("");
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try{
            const res = await loginRequest(username, password);
            localStorage.setItem("auth_token", res.token);
            if(res.user?.username){
                localStorage.setItem("user", res.user.username);
            } else {
                localStorage.setItem("user", username);
            }
            onClose();
            window.location.reload();
        } catch (err: any) {
            setError(err.message || "Blad logowania");
        }
    };

    if (!isOpen) return null;

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div className="relative mx-4 w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950/95 px-10 py-10 text-neutral-100 shadow-2xl shadow-black/80" onClick={(e) => e.stopPropagation()}>
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute right-6 top-6 rounded-full p-2 hover:bg-white/10 transition-all">
                    <X className="h-5 w-5 text-neutral-400" />
                </button>

                {/* Header */}
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Film className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Witaj ponownie</h2>
                    <p className="mt-1 text-xs text-neutral-400">Zaloguj się, aby kontynuować</p>
                </div>

                {/* Error */}
                {error && <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs text-center">{error}</div>}

                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-yellow-400/70 focus-within:ring-1 focus-within:ring-yellow-400/70 transition-all">
                            <User className="h-4 w-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Login"
                                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-600"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-yellow-400/70 focus-within:ring-1 focus-within:ring-yellow-400/70 transition-all">
                            <Lock className="h-4 w-4 text-neutral-400" />
                            <input
                                type="password"
                                placeholder="Hasło"
                                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-600"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full rounded-xl bg-yellow-400 py-2.5 text-sm font-bold text-neutral-900 hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                        Zaloguj się
                    </button>
                </form>

                {/* Footer / Switch */}
                <p className="mt-6 text-center text-xs text-neutral-500">
                    Nie masz konta?{" "}
                    <button onClick={switchToRegister} className="font-medium text-yellow-400 hover:text-yellow-300 hover:underline">
                        Zarejestruj się
                    </button>
                </p>
            </div>
        </div>
    );
};