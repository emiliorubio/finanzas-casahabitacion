'use client';

import { useStore } from '../../store/useStore';
import { formatearPesos } from '../../utils/formatters';
import { ArrowDownRight, ArrowUpRight, MapPin, Trash2 } from 'lucide-react';

export default function TransactionList() {
  const { transacciones, mesActual, sedeActiva, eliminarTransaccion } = useStore();
  
  const transaccionesFiltradas = transacciones.filter((t) => {
    const coincideSede = sedeActiva === 'todos' || t.sede === sedeActiva;
    const coincideMes = mesActual === 'todos' || t.mes === mesActual;
    return coincideSede && coincideMes;
  });

  const transaccionesOrdenadas = [...transaccionesFiltradas].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return (
    <div className="mt-6 pb-20">
      <h3 className="text-gray-600 font-semibold text-sm mb-4 capitalize">
        Movimientos ({mesActual})
      </h3>
      
      <div className="flex flex-col gap-3">
        {transaccionesOrdenadas.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-4">No hay movimientos registrados.</p>
        ) : (
          transaccionesOrdenadas.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${t.tipo === 'ingreso' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                  {t.tipo === 'ingreso' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm capitalize">{t.descripcion}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{t.fecha}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-orange-600 font-medium capitalize">
                      <MapPin size={12} /> {t.sede}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <p className={`font-bold text-sm ${t.tipo === 'ingreso' ? 'text-green-600' : 'text-gray-800'}`}>
                  {t.tipo === 'ingreso' ? '+' : '-'}{formatearPesos(t.monto)}
                </p>
                
                {/* Botón de Eliminar */}
                <button
                  onClick={() => {
                    if (confirm(`¿Estás seguro de eliminar "${t.descripcion}"?`)) {
                      eliminarTransaccion(t.id);
                    }
                  }}
                  className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg transition-colors"
                  title="Eliminar movimiento"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}