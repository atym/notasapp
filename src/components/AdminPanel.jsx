import { useState } from 'react';
import { AdminSeeder } from './AdminSeeder.jsx';
import { Icons } from './Icons.jsx';

export const AdminPanel = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 max-w-2xl mx-auto pb-24">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-4">
                <button onClick={onBack} className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Icons.ArrowLeft size={20} className="text-gray-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-red-500 flex items-center gap-2">
                        <Icons.Briefcase size={24} /> 
                        Panel de Control
                    </h1>
                    <p className="text-gray-400 text-sm">Gestión de bases de datos</p>
                </div>
            </div>

            {/* SECTION 1: AI GENERATOR (Placeholder for Phase 3) */}
            <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-indigo-500/30">
                <h2 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                    <Icons.BrainCircuit size={20} />
                    Generador de contenido con IA
                </h2>
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center bg-gray-900/50 hover:border-indigo-500 transition-colors cursor-pointer group">
                        <div className="mb-2 group-hover:scale-110 transition-transform duration-300">📸</div>
                        <p className="text-gray-400 text-sm group-hover:text-white">Subir notas del tutor (Imagen)</p>
                    </div>
                    <textarea 
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                        rows="3"
                        placeholder="O pega el texto de las notas aquí..."
                    ></textarea>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg opacity-50 cursor-not-allowed">
                    Generar y guardar (Próximamente)
                    </button>
                </div>
            </div>

            {/* SECTION 2: DATABASE SEEDERS */}
            <div className="bg-gray-800 rounded-xl p-6 border border-yellow-500/30">
                <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
                    <Icons.BriefcaseMedical size={20} />
                    Semillas de base de datos
                </h2>
                <p className="text-xs text-gray-400 mb-4">
                    Usa estos botones para enviar datos locales de <code>data.js</code> a Firestore.
                </p>
                {/* We reuse your existing Seeder component here */}
                <AdminSeeder />
            </div>
        </div>
    );
};