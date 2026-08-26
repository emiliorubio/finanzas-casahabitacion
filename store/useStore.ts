import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export type Categoria = 'ingreso' | 'gasto';
export type Sede = 'santiago' | 'rancagua';

export interface Transaccion {
  id: string;
  sede: Sede;
  fecha: string; 
  mes: string;
  descripcion: string;
  monto: number;
  tipo: Categoria;
}

export interface Usuario {
  id: string;
  nombre: string;
  clave: string;
  sedesPermitidas: Sede[] | 'todas';
}

interface WalletState {
  usuarioActual: Usuario | null;
  sedeActiva: Sede | 'todos';
  mesActual: string;
  transacciones: Transaccion[];
  
  login: (nombre: string, clave: string) => boolean;
  logout: () => void;
  setSedeActiva: (sede: Sede | 'todos') => void;
  setMesActual: (mes: string) => void;
  cargarTransacciones: () => Promise<void>;
  agregarTransaccion: (transaccion: { fecha: string; mes: string; descripcion: string; monto: number; tipo: Categoria }) => Promise<void>;
  eliminarTransaccion: (id: string) => Promise<void>;
}

const usuariosDisponibles: Usuario[] = [
  { id: '1', nombre: 'Admin1', clave: '1234', sedesPermitidas: 'todas' },
  { id: '2', nombre: 'usuario Rancagua', clave: '4321', sedesPermitidas: ['rancagua'] },
];

export const useStore = create<WalletState>()(
  persist(
    (set, get) => ({
      usuarioActual: null,
      sedeActiva: 'todos',
      mesActual: 'agosto',
      transacciones: [],

      login: (nombre, clave) => {
        const usuarioEncontrado = usuariosDisponibles.find(
          (u) => u.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() && u.clave === clave
        );
        if (usuarioEncontrado) {
          const sedeInicial: Sede | 'todos' = usuarioEncontrado.sedesPermitidas === 'todas' ? 'todos' : usuarioEncontrado.sedesPermitidas[0];
          set({ usuarioActual: usuarioEncontrado, sedeActiva: sedeInicial });
          get().cargarTransacciones(); // Cargar datos al iniciar sesión
          return true;
        }
        return false;
      },

      logout: () => set({ usuarioActual: null, transacciones: [] }),

      setSedeActiva: (sede) => set({ sedeActiva: sede }),

      setMesActual: (mes) => set({ mesActual: mes }),

      cargarTransacciones: async () => {
        const { data, error } = await supabase
          .from('transacciones')
          .select('*')
          .order('fecha', { ascending: false });

        if (error) {
          console.error('Error al cargar transacciones:', error);
        } else if (data) {
          set({ transacciones: data as Transaccion[] });
        }
      },

      agregarTransaccion: async (nuevaT) => {
        const { usuarioActual, sedeActiva } = get();
        
        let sedeDestino: Sede = 'santiago';
        if (sedeActiva !== 'todos') {
          sedeDestino = sedeActiva as Sede;
        } else if (usuarioActual?.sedesPermitidas !== 'todas' && Array.isArray(usuarioActual?.sedesPermitidas)) {
          sedeDestino = usuarioActual.sedesPermitidas[0];
        }

        // Generador de ID único compatible con cualquier entorno
        const idUnico = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

        const transaccionParaGuardar = {
          id: idUnico,
          sede: sedeDestino,
          fecha: nuevaT.fecha,
          mes: nuevaT.mes,
          descripcion: nuevaT.descripcion,
          monto: nuevaT.monto,
          tipo: nuevaT.tipo,
        };

        const { error } = await supabase
          .from('transacciones')
          .insert([transaccionParaGuardar]);

        if (error) {
          console.error('Error al guardar en Supabase:', error);
          alert('Hubo un error al guardar la transacción en la base de datos.');
        } else {
          await get().cargarTransacciones();
        }
      },

      eliminarTransaccion: async (id) => {
        const { error } = await supabase
          .from('transacciones')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error al eliminar en Supabase:', error);
          alert('Hubo un error al eliminar la transacción de la base de datos.');
        } else {
          await get().cargarTransacciones();
        }
      },
    }),
    { name: 'erm-church-wallet' }
  )
);