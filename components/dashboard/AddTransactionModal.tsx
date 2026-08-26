'use client';

import { useState } from 'react';
import { useStore, Categoria } from '../../store/useStore';
import { X, PlusCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({ isOpen, onClose }: Props) {
  const { agregarTransaccion, mesActual } = useStore();

  // Estados locales del formulario
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState<Categoria>('ingreso');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descripcion || !monto) return;

    // Extraemos el mes automáticamente de la fecha seleccionada (ej. "2026-08-15" -> mes)
    // O lo podemos mapear al mesActual activo. Para simplificar, usaremos el mesActual o extraeremos el mes.
    const mesesNombres = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const numeroMes = parseInt(fecha.split('-')[1], 10) - 1;
    const mesCalculado = mesesNombres[numeroMes] || mesActual;

    agregarTransaccion({
      id: Date.now().toString(),
      fecha,
      mes: mesCalculado,
      descripcion,
      monto: parseFloat(monto),
      tipo,
    });

    // Limpiar y cerrar
    setDescripcion('');
    setMonto('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Nuevo Movimiento</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Selector de Tipo (Ingreso / Gasto) */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setTipo('ingreso')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                tipo === 'ingreso' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500'
              }`}
            >
              Ingreso
            </button>
            <button
              type="button"
              onClick={() => setTipo('gasto')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                tipo === 'gasto' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500'
              }`}
            >
              Gasto
            </button>
          </div>

          {/* Monto */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Monto ($)</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ej. 15000"
              required
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-800 font-bold outline-none focus:border-green-500"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej. Sueldo, Supermercado..."
              required
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-800 outline-none focus:border-green-500"
            />
          </div>

          {/* Fecha */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-800 outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold mt-2 hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            Guardar Movimiento
          </button>
        </form>
      </div>
    </div>
  );
}