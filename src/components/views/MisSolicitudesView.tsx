import { solicitudes } from '@/data/mockData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { CommandBar } from '@/components/common/CommandBar';
import { cn } from '@/lib/utils';

interface MisSolicitudesViewProps {
  onSelectSolicitud: (id: string) => void;
}

export function MisSolicitudesView({ onSelectSolicitud }: MisSolicitudesViewProps) {
  // Filter to show only "my" solicitudes (assigned to María García as example)
  const misSolicitudes = solicitudes.filter(s => s.usuarioResolutor === 'María García');

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar showNew={false} />

      <div className="px-4 py-3 bg-secondary border-b border-border">
        <p className="text-sm text-secondary-foreground">
          Mostrando solicitudes asignadas a: <strong>María García</strong>
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-grid-header sticky top-0">
            <tr className="text-left text-sm">
              <th className="px-4 py-3 font-semibold">ID Solicitud</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 font-semibold">Mesa de Trabajo</th>
              <th className="px-4 py-3 font-semibold">Prioridad</th>
              <th className="px-4 py-3 font-semibold">Categoría</th>
              <th className="px-4 py-3 font-semibold">Fecha Creación</th>
            </tr>
          </thead>
          <tbody>
            {misSolicitudes.map((solicitud, index) => (
              <tr
                key={solicitud.id}
                onClick={() => onSelectSolicitud(solicitud.id)}
                className={cn(
                  "md-grid-row text-sm animate-slide-in cursor-pointer",
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/30'
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td className="px-4 py-3 font-medium text-accent">{solicitud.id}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={solicitud.estado} />
                </td>
                <td className="px-4 py-3">{solicitud.mesaTrabajo}</td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={solicitud.prioridad} />
                </td>
                <td className="px-4 py-3">{solicitud.categoria}</td>
                <td className="px-4 py-3 text-muted-foreground">{solicitud.fechaCreacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
