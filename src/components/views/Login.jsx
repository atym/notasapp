import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

// Get allowed emails from environment variable, split by comma, or default to an empty array
const allowedEmails = (import.meta.env.VITE_ALLOWED_EMAILS || '').split(',');

export const Login = () => {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const userEmail = result.user.email;

            // Only proceed if the user's email is available
            if (userEmail) {
                // If the whitelist is populated and the user's email is not in it, deny access
                if (allowedEmails.length > 0 && !allowedEmails.includes(userEmail)) {
                    await signOut(auth);
                    alert("Lo sentimos, no tienes autorización para acceder a esta aplicación.");
                }
            } else {
                // If the email is not available, which is unusual for Google Sign-In
                await signOut(auth);
                alert("No se pudo obtener tu dirección de email de Google. No es posible iniciar sesión.");
            }
        } catch (error) {
            console.error("Error during sign-in process:", error);
            if (error.code !== 'auth/popup-closed-by-user') {
                alert("Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
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
