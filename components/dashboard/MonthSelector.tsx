'use client';

import { useStore } from '../../store/useStore';

export default function MonthSelector() {
  const { mesActual, setMesActual } = useStore();
  
  const meses = [
    { id: 'todos', label: 'Histórico Total' },
    { id: 'agosto', label: 'Agosto' },
    { id: 'septiembre', label: 'Septiembre' },
    { id: 'octubre', label: 'Octubre' },
    { id: 'noviembre', label: 'Noviembre' },
    { id: 'diciembre', label: 'Diciembre' },
  ];

  return (
    <select 
      value={mesActual}
      onChange={(e) => setMesActual(e.target.value)}
      className="bg-gray-100 border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-full font-medium outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
    >
      {meses.map((m) => (
        <option key={m.id} value={m.id}>
          {m.label}
        </option>
      ))}
    </select>
  );
}