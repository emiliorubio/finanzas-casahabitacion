'use client';

import { useStore } from '../../store/useStore';

export default function ChurchSelector() {
  const { sedeActiva, setSedeActiva, usuarioActual } = useStore();

  if (!usuarioActual) return null;

  const esAdminTotal = usuarioActual.sedesPermitidas === 'todas';

  return (
    <div className="flex bg-gray-200 p-1 rounded-full mb-4">
      {esAdminTotal && (
        <button
          onClick={() => setSedeActiva('todos')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all capitalize ${
            sedeActiva === 'todos' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-600'
          }`}
        >
          Ambas Iglesias
        </button>
      )}
      {(esAdminTotal || (Array.isArray(usuarioActual.sedesPermitidas) && usuarioActual.sedesPermitidas.includes('santiago'))) && (
        <button
          onClick={() => setSedeActiva('santiago')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all capitalize ${
            sedeActiva === 'santiago' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-600'
          }`}
        >
          Santiago
        </button>
      )}
      {(esAdminTotal || (Array.isArray(usuarioActual.sedesPermitidas) && usuarioActual.sedesPermitidas.includes('rancagua'))) && (
        <button
          onClick={() => setSedeActiva('rancagua')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all capitalize ${
            sedeActiva === 'rancagua' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-600'
          }`}
        >
          Rancagua
        </button>
      )}
    </div>
  );
}