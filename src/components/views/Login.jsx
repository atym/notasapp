import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="p-8 bg-gray-800 rounded-2xl shadow-lg text-center max-w-sm w-full border border-gray-700/50">
                <h1 className="text-3xl font-black bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-tight mb-4">
                    ¡Bienvenido de Nuevo!
                </h1>
                <p className="text-gray-400 mb-8">Inicia sesión para continuar tu viaje de aprendizaje.</p>
                <button
                    onClick={signInWithGoogle}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                    <FcGoogle size={24} />
                    <span>Iniciar sesión con Google</span>
                </button>
            </div>
        </div>
    );
};
