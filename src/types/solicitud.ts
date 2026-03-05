export type SolicitudStatus = 
  | 'initiated'
  | 'review'
  | 'progress'
  | 'pending'
  | 'success'
  | 'failed';

export type Priority = 'alta' | 'media' | 'baja';
export type Impact = 'local' | 'regional' | 'provincial';

export interface Solicitud {
  id: string;
  estado: SolicitudStatus;
  mesaTrabajo: string;
  usuarioResolutor: string;
  prioridad: Priority;
  impacto: Impact;
  categoria: string;
  subcategoria: string;
  origenInstitucional: string;
  fechaCreacion: string;
  observaciones?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  roles: string[];
  mesasTrabajo: string[];
  estado: 'activo' | 'inactivo';
}

export interface MesaTrabajo {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'activa' | 'inactiva';
  usuarios: string[];
  categorias: string[];
}

export interface Documento {
  id: string;
  nombre: string;
  tipo: string;
  fechaSubida: string;
  tamaño: string;
}

export const STATUS_CONFIG: Record<SolicitudStatus, { label: string; className: string }> = {
  initiated: { label: 'Iniciado', className: 'badge-initiated' },
  review: { label: 'En revisión', className: 'badge-review' },
  progress: { label: 'En curso', className: 'badge-progress' },
  pending: { label: 'Pendiente de información', className: 'badge-pending' },
  success: { label: 'Finalizado con éxito', className: 'badge-success' },
  failed: { label: 'Sin resolución', className: 'badge-failed' },
};

export const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> = {
  alta: { label: 'Alta', className: 'priority-high' },
  media: { label: 'Media', className: 'priority-medium' },
  baja: { label: 'Baja', className: 'priority-low' },
};
