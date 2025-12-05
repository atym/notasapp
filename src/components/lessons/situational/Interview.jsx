import { Icons } from '../../Icons';

export const InterviewLesson = ({ onComplete }) => {
    const QUESTIONS = [
        { topic: "Nombre", tu: "¿Cómo te llamas?", ud: "¿Cómo se llama?", ans: "Me llamo... / Soy..." },
        { topic: "Apellido", tu: "¿Cómo te apellidas?", ud: "¿Cómo se apellida?", ans: "Me apellido..." },
        { topic: "Nacionalidad", tu: "¿De dónde eres?", ud: "¿De dónde es?", ans: "Soy de... / Soy..." },
        { topic: "Edad", tu: "¿Cuántos años tienes?", ud: "¿Cuántos años tiene?", ans: "Tengo ___ años" },
        { topic: "Profesión", tu: "¿A qué te dedicas?", ud: "¿A qué se dedica?", ans: "Soy..." },
        { topic: "Lenguas", tu: "¿Qué idioma hablas?", ud: "¿Qué idioma habla?", ans: "Hablo..." },
        { topic: "Domicilio", tu: "¿Dónde vives?", ud: "¿Dónde vive?", ans: "Vivo en..." },
        { topic: "Lugar de Trabajo", tu: "¿Dónde trabajas?", ud: "¿Dónde trabaja?", ans: "Trabajo en..." },
        { topic: "Teléfono", tu: "¿Tienes número de teléfono?", ud: "¿Tiene número de teléfono?", ans: "Sí, es el... / No" },
        { topic: "Correo", tu: "¿Tienes correo electrónico?", ud: "¿Tiene correo electrónico?", ans: "Sí, es el... / No" }
    ];

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div className="bg-gray-800 border border-cyan-500/30 p-4 rounded-xl">
                <div className="flex justify-between items-end border-b border-gray-700 pb-2 mb-4">
                    <h3 className="font-bold text-cyan-400 text-lg">Entrevista</h3>
                    <span className="text-xs text-gray-400 italic">Tú (Informal) vs Usted (Formal)</span>
                </div>
                
                <div className="space-y-4">
                    {QUESTIONS.map((item, i) => (
                        <div key={i} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.topic}</span>
                                <span className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/20">{item.ans}</span>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex gap-3 text-sm">
                                    <span className="text-gray-500 w-6 font-bold text-right shrink-0">Tú:</span>
                                    <span className="text-white">{item.tu}</span>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <span className="text-indigo-400 w-6 font-bold text-right shrink-0">Ud:</span>
                                    <span className="text-indigo-100">{item.ud}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 border border-green-500/30 p-4 rounded-xl">
                <h3 className="font-bold text-green-400 mb-3 text-lg flex items-center gap-2"><Icons.MapPin size={18}/> Detalles de Vivir</h3>
                <div className="space-y-3">
                    <div className="p-3 bg-gray-900 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Cerca / Lejos</p>
                        <p className="text-white">Vivo <span className="text-green-400 font-bold">cerca del</span> parque.</p>
                        <p className="text-white">Vivo <span className="text-red-400 font-bold">lejos de</span> la oficina.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-gray-500 text-xs">Calle</span>
                            <span className="text-white">La calle...</span>
                        </div>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-gray-500 text-xs">Barrio</span>
                            <span className="text-white">El barrio...</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 border border-purple-500/30 p-4 rounded-xl">
                <h3 className="font-bold text-purple-400 mb-3 text-lg">Correo Electrónico</h3>
                <div className="grid grid-cols-4 gap-2 text-center mb-3">
                    <div className="bg-gray-900 rounded p-2">
                        <div className="text-xl font-mono text-purple-400 mb-1">@</div>
                        <span className="text-[10px] text-gray-400 block leading-tight">arroba</span>
                    </div>
                    <div className="bg-gray-900 rounded p-2">
                        <div className="text-xl font-mono text-purple-400 mb-1">.</div>
                        <span className="text-[10px] text-gray-400 block leading-tight">punto</span>
                    </div>
                    <div className="bg-gray-900 rounded p-2">
                        <div className="text-xl font-mono text-purple-400 mb-1">_</div>
                        <span className="text-[10px] text-gray-400 block leading-tight">guion bajo</span>
                    </div>
                    <div className="bg-gray-900 rounded p-2">
                        <div className="text-xl font-mono text-purple-400 mb-1">-</div>
                        <span className="text-[10px] text-gray-400 block leading-tight">guion</span>
                    </div>
                </div>
                <div className="bg-gray-900 p-3 rounded text-center font-mono text-sm text-gray-300 break-all">
                    nombre<span className="text-purple-400">-</span>apellido<span className="text-purple-400">@</span>gmail<span className="text-purple-400">.</span>com
                </div>
            </div>

            <button onClick={onComplete} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl shadow-lg">Volver</button>
        </div>
    );
};