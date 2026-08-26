'use client';

import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import LoginScreen from '../components/auth/LoginScreen';
import BalanceCard from '../components/dashboard/BalanceCard';
import MonthSelector from '../components/dashboard/MonthSelector';
import ChurchSelector from '../components/dashboard/ChurchSelector';
import TransactionList from '../components/dashboard/TransactionList';
import AddTransactionModal from '../components/dashboard/AddTransactionModal';
import { Plus, LogOut } from 'lucide-react';

export default function Home() {
  const { usuarioActual, logout, cargarTransacciones } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    cargarTransacciones();
  }, [cargarTransacciones]);

  // Si no ha iniciado sesión, mostramos la pantalla de clave
  if (!usuarioActual) {
    return <LoginScreen />;
  }

  return (
    <main className="p-5 flex-1 overflow-y-auto bg-gray-50 h-full relative flex flex-col">
      {/* Header con Logo y Botón de Salida */}
      <header className="py-2 flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-orange-500 shadow-sm">
            <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800 leading-tight">Casa Habitación</h1>
            <p className="text-[10px] text-gray-500 font-medium">Hola, {usuarioActual.nombre}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <MonthSelector />
          <button 
            onClick={logout} 
            title="Cerrar Sesión"
            className="p-2 text-gray-400 hover:text-red-500 rounded-full bg-gray-100 transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Selector de Iglesias (Santiago / Rancagua / Ambas) */}
      <ChurchSelector />
      
      <BalanceCard />
      
      <TransactionList />

      {/* Botón flotante para registrar ingresos o gastos */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 transition-transform active:scale-95 flex items-center justify-center z-40"
      >
        <Plus size={24} />
      </button>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}