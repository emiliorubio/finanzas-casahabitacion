'use client';

import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Lock, User, Church } from 'lucide-react';

export default function LoginScreen() {
  const { login } = useStore();
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exito = login(nombre, clave);
    if (!exito) {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-white">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 flex flex-col items-center">
        
        {/* Logo de la Iglesia */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-orange-500 shadow-md">
          <img src="/logo.jpeg" alt="Casa Habitación" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-xl font-bold tracking-tight text-center mb-1">Casa Habitación</h1>
        <p className="text-xs text-orange-400 font-medium mb-6 uppercase tracking-widest">Sistema Financiero</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                value={nombre}
                onChange={(e) => { setNombre(e.target.value); setError(false); }}
                placeholder="Ej. Contabilidad Santiago"
                required
                className="w-full bg-gray-900 border border-gray-700 p-3 pl-10 rounded-xl text-white outline-none focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Clave de Acceso</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="password"
                value={clave}
                onChange={(e) => { setClave(e.target.value); setError(false); }}
                placeholder="••••"
                required
                className="w-full bg-gray-900 border border-gray-700 p-3 pl-10 rounded-xl text-white outline-none focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center font-medium">Usuario o clave incorrectos.</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3.5 rounded-xl font-bold mt-2 hover:bg-orange-700 transition-colors shadow-lg"
          >
            Ingresar al Sistema
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Credenciales de prueba sugeridas:</p>
          <p className="text-gray-400 mt-1">Admin: <span className="text-orange-300">Admin1</span> / Clave: <span className="text-orange-300">1234</span></p>
          <p className="text-gray-400">Rancagua: <span className="text-orange-300">Rancagua</span> / Clave: <span className="text-orange-300">4321</span></p>
        </div>
      </div>
    </div>
  );
}