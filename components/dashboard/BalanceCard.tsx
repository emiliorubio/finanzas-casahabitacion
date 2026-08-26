'use client';

import { useStore } from '../../store/useStore';
import { formatearPesos } from '../../utils/formatters';

export default function BalanceCard() {
  const { transacciones, mesActual, sedeActiva } = useStore();

  // Filtrar por sede y mes
  const transaccionesFiltradas = transacciones.filter((t) => {
    const coincideSede = sedeActiva === 'todos' || t.sede === sedeActiva;
    const coincideMes = mesActual === 'todos' || t.mes === mesActual;
    return coincideSede && coincideMes;
  });

  const totalIngresos = transaccionesFiltradas
    .filter((t) => t.tipo === 'ingreso')
    .reduce((acc, curr) => acc + curr.monto, 0);

  const totalGastos = transaccionesFiltradas
    .filter((t) => t.tipo === 'gasto')
    .reduce((acc, curr) => acc + curr.monto, 0);

  const saldoTotal = totalIngresos - totalGastos;
  const labelSede = sedeActiva === 'todos' ? 'Consolidado General' : `Iglesia Habitación ${sedeActiva}`;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-3xl shadow-xl border border-gray-700 mt-2">
      <div className="text-center mb-6">
        <span className="text-orange-400 text-xs font-bold uppercase tracking-wider block mb-1">
          {labelSede} ({mesActual})
        </span>
        <h2 className="text-gray-400 text-xs uppercase tracking-widest mb-1">Saldo Disponible</h2>
        <p className="text-4xl font-extrabold tracking-tight text-orange-400">
          {formatearPesos(saldoTotal)}
        </p>
      </div>

      <div className="flex justify-between bg-white/5 rounded-2xl p-4 border border-white/10">
        <div className="text-center w-1/2 border-r border-white/10">
          <p className="text-gray-400 text-xs mb-1 font-medium">Ingresos</p>
          <p className="font-semibold text-lg text-green-400">{formatearPesos(totalIngresos)}</p>
        </div>
        <div className="text-center w-1/2">
          <p className="text-gray-400 text-xs mb-1 font-medium">Gastos</p>
          <p className="font-semibold text-lg text-red-400">{formatearPesos(totalGastos)}</p>
        </div>
      </div>
    </div>
  );
}