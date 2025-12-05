import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Loader2, Volume2, Info } from 'lucide-react';

const NumbersLesson = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const collectionRef = collection(db, 'numbers');
        const q = query(collectionRef, orderBy('order'));
        const querySnapshot = await getDocs(q);
        const numbersList = querySnapshot.docs.map(doc => doc.data());
        setNumbers(numbersList);
      } catch (error) {
        console.error("Error fetching numbers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNumbers();
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="w-full text-gray-100 space-y-8 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white tracking-tight">Los números</h2>
        <p className="text-gray-400 text-xs font-medium">Del 0 al 19</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {numbers.map((item) => (
          <button
            key={item.order}
            onClick={() => speak(item.span)}
            className="group flex flex-col items-center justify-center text-center p-3 rounded-xl border border-gray-700/50 hover:bg-white/5 hover:border-indigo-500/50 transition-all active:scale-95 aspect-square"
          >
            <span className="text-4xl font-extrabold text-indigo-400 group-hover:text-indigo-300">
              {item.label}
            </span>
            <span className="mt-1 text-sm font-semibold text-white">{item.span}</span>
            <Volume2 className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
          </button>
        ))}
      </div>
      
      {/* Spacer */}
      <div className="py-4"></div>

      {/* Cheat Sheet Section */}
      <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 space-y-6">
          <h3 className="font-bold text-lg text-indigo-300 mb-2 flex items-center gap-2">
              🇪🇸 Spanish Numbers Cheat Sheet
          </h3>
          
          <div className="space-y-4 text-sm">

            <div>
                <h4 className="font-bold text-white">1. The "Memorize" Zone (0–15)</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside opacity-80 mt-1">
                    <li><b className="text-white">0–10:</b> Rote memorization (Uno, dos, tres...).</li>
                    <li><b className="text-white">11–15:</b> All end in <code className="text-pink-300 bg-black/30 px-1 rounded">-ce</code> (Once, doce, trece, catorce, quince).</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white">2. The One-Word Rule (16–29)</h4>
                 <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside opacity-80 mt-1">
                    <li><b className="text-white">16–19:</b> Starts with <code className="text-pink-300 bg-black/30 px-1 rounded">Dieci...</code> (Dieciséis).</li>
                    <li><b className="text-white">20–29:</b> Starts with <code className="text-pink-300 bg-black/30 px-1 rounded">Veinti...</code> (Veintiuno).</li>
                    <li>Note: Watch for accents on 16, 22, 23, 26.</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white">3. The Three-Word Rule (30–99)</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside opacity-80 mt-1">
                    <li>From 30 on, separate the words with <code className="text-pink-300 bg-black/30 px-1 rounded">y</code> (and).</li>
                    <li>Pattern: [Ten] <b className="text-white">y</b> [One] (Example: 34 = <i className="text-gray-300">Treinta y cuatro</i>).</li>
                    <li>The Tens: End in <code className="text-pink-300 bg-black/30 px-1 rounded">-enta</code> (Cuarenta, Cincuenta).</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white">4. The Hundreds (Gender & Irregulars)</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside opacity-80 mt-1">
                   <li>Hundreds change gender based on the noun (<b className="text-white">-os</b> for masc, <b className="text-white">-as</b> for fem).</li>
                   <li>Example: <i className="text-gray-300">Doscient<b className="text-white">as</b> casas</i>.</li>
                   <li className="pt-2 font-bold text-white">The 3 Irregulars (Memorize these!):</li>
                </ul>
                <div className="mt-2 overflow-x-auto">
                    <table className="min-w-full text-xs text-left">
                        <thead className="border-b border-gray-700">
                            <tr>
                                <th className="p-2">Number</th>
                                <th className="p-2">Spanish</th>
                                <th className="p-2">The Trick</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            <tr><td className="p-2">500</td><td className="p-2 text-fuchsia-300">Quinientos</td><td className="p-2">Starts with Q</td></tr>
                            <tr><td className="p-2">700</td><td className="p-2 text-fuchsia-300">Setecientos</td><td className="p-2">No 'i' (Not siete)</td></tr>
                            <tr><td className="p-2">900</td><td className="p-2 text-fuchsia-300">Novecientos</td><td className="p-2">No 'ue' (Not nueve)</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div>
                <h4 className="font-bold text-white">5. Three "Gotcha" Rules</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside opacity-80 mt-1">
                    <li><b className="text-white">Uno becomes Un:</b> Before a masculine noun. (Tengo <i className="text-gray-300">un</i> gato).</li>
                    <li><b className="text-white">100 vs 100+:</b> Exactly 100 is <b className="text-white">Cien</b>. 101+ becomes <b className="text-white">Ciento...</b> (Ciento dos).</li>
                    <li><b className="text-white">The Billion Trap:</b> 1,000,000,000 is <b className="text-white">Mil millones</b>. (In Spanish, <i className="text-gray-300">Un Billón</i> is a Trillion).</li>
                </ul>
            </div>

          </div>
      </div>
    </div>
  );
};

export default NumbersLesson;