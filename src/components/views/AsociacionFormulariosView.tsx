import { CommandBar } from '@/components/common/CommandBar';
import { cn } from '@/lib/utils';
import { Link2 } from 'lucide-react';

const asociaciones = [
  { id: 'ASOC-001', formulario: 'Consulta General', mesa: 'Mesa de Atención Ciudadana', estado: 'activa' },
  { id: 'ASOC-002', formulario: 'Reclamo', mesa: 'Mesa de Atención Ciudadana', estado: 'activa' },
  { id: 'ASOC-003', formulario: 'Solicitud de Información', mesa: 'Mesa de Atención Ciudadana', estado: 'activa' },
  { id: 'ASOC-004', formulario: 'Solicitud de Subsidio', mesa: 'Mesa de Servicios Sociales', estado: 'activa' },
  { id: 'ASOC-005', formulario: 'Programa Alimentario', mesa: 'Mesa de Servicios Sociales', estado: 'activa' },
  { id: 'ASOC-006', formulario: 'Asistencia Habitacional', mesa: 'Mesa de Servicios Sociales', estado: 'inactiva' },
  { id: 'ASOC-007', formulario: 'Permiso de Obra', mesa: 'Mesa Técnica', estado: 'activa' },
  { id: 'ASOC-008', formulario: 'Habilitación Comercial', mesa: 'Mesa Técnica', estado: 'activa' },
  { id: 'ASOC-009', formulario: 'Inspección', mesa: 'Mesa Técnica', estado: 'activa' },
];

export function AsociacionFormulariosView() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar />

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-grid-header sticky top-0">
            <tr className="text-left text-sm">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Formulario de Origen</th>
              <th className="px-4 py-3 font-semibold">Mesa de Trabajo Asignada</th>
              <th className="px-4 py-3 font-semibold">Estado de Asociación</th>
            </tr>
          </thead>
          <tbody>
            {asociaciones.map((asoc, index) => (
              <tr
                key={asoc.id}
                className={cn(
                  "md-grid-row text-sm animate-slide-in cursor-pointer",
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/30'
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td className="px-4 py-3 font-medium text-accent">{asoc.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-muted-foreground" />
                    {asoc.formulario}
                  </div>
                </td>
                <td className="px-4 py-3">{asoc.mesa}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "badge-status",
                    asoc.estado === 'activa' ? 'badge-success' : 'badge-initiated'
                  )}>
                    {asoc.estado === 'activa' ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
