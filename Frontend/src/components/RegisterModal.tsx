import React, { useEffect, useState } from "react";
import { Film, User, Mail, Lock, X } from "lucide-react";
import { registerRequest } from "../api/auth";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    switchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, switchToLogin }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setError(null);
            setSuccess(false);
            setUsername("");
            setEmail("");
            setPassword("");
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await registerRequest(username, email, password);
            setSuccess(true);
            setTimeout(() => {
                switchToLogin();
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Błąd rejestracji");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div className="relative mx-4 w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950/95 px-10 py-10 text-neutral-100 shadow-2xl shadow-black/80" onClick={(e) => e.stopPropagation()}>
                
                <button onClick={onClose} className="absolute right-6 top-6 rounded-full p-2 hover:bg-white/10 transition-all">
                    <X className="h-5 w-5 text-neutral-400" />
                </button>

                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Film className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Utwórz konto</h2>
                    <p className="mt-1 text-xs text-neutral-400">Dołącz do społeczności ChadFilm</p>
                </div>

                {error && <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs text-center">{error}</div>}
                
                {success ? (
                    <div className="mt-8 text-center">
                        <div className="text-green-400 text-lg font-bold mb-2">Sukces!</div>
                        <p className="text-neutral-400 text-sm">Konto utworzone. Przekierowywanie do logowania...</p>
                    </div>
                ) : (
                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-yellow-400/70 focus-within:ring-1 focus-within:ring-yellow-400/70 transition-all">
                            <User className="h-4 w-4 text-neutral-400" />
                            <input type="text" placeholder="Login" className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-600"
                                value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-yellow-400/70 focus-within:ring-1 focus-within:ring-yellow-400/70 transition-all">
                            <Mail className="h-4 w-4 text-neutral-400" />
                            <input type="email" placeholder="Email" className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-600"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        {/* Password */}
                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-yellow-400/70 focus-within:ring-1 focus-within:ring-yellow-400/70 transition-all">
                            <Lock className="h-4 w-4 text-neutral-400" />
                            <input type="password" placeholder="Hasło (min. 6 znaków)" className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-600"
                                value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                        </div>

                        <button type="submit" className="w-full rounded-xl bg-yellow-400 py-2.5 text-sm font-bold text-neutral-900 hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Zarejestruj się
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-xs text-neutral-500">
                    Masz już konto?{" "}
                    <button onClick={switchToLogin} className="font-medium text-yellow-400 hover:text-yellow-300 hover:underline">
                        Zaloguj się
                    </button>
                </p>
            </div>
        </div>
    );
};