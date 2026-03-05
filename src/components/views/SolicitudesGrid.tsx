import { useState } from 'react';
import { solicitudes } from '@/data/mockData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { CommandBar } from '@/components/common/CommandBar';
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface SolicitudesGridProps {
  onSelectSolicitud: (id: string) => void;
}

type SortField = 'id' | 'fechaCreacion' | 'estado' | 'prioridad';
type SortDirection = 'asc' | 'desc';

export function SolicitudesGrid({ onSelectSolicitud }: SolicitudesGridProps) {
  const [sortField, setSortField] = useState<SortField>('fechaCreacion');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterMesa, setFilterMesa] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground/50" />;
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-3.5 h-3.5 text-accent" /> 
      : <ChevronDown className="w-3.5 h-3.5 text-accent" />;
  };

  const filteredSolicitudes = solicitudes.filter(sol => {
    if (filterEstado !== 'todos' && sol.estado !== filterEstado) return false;
    if (filterMesa !== 'todos' && sol.mesaTrabajo !== filterMesa) return false;
    if (searchTerm && !sol.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar>
        <Input 
          placeholder="Buscar por ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-48 h-8"
        />
      </CommandBar>

      {/* Filters Row */}
      <div className="px-4 py-3 bg-muted/50 border-b border-border flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Estado:</span>
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="w-40 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="initiated">Iniciado</SelectItem>
              <SelectItem value="review">En revisión</SelectItem>
              <SelectItem value="progress">En curso</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="success">Finalizado</SelectItem>
              <SelectItem value="failed">Sin resolución</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Mesa:</span>
          <Select value={filterMesa} onValueChange={setFilterMesa}>
            <SelectTrigger className="w-52 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas las mesas</SelectItem>
              <SelectItem value="Mesa de Atención Ciudadana">Atención Ciudadana</SelectItem>
              <SelectItem value="Mesa de Servicios Sociales">Servicios Sociales</SelectItem>
              <SelectItem value="Mesa Técnica">Mesa Técnica</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1" />
        <span className="text-sm text-muted-foreground">
          {filteredSolicitudes.length} registros
        </span>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-grid-header sticky top-0">
            <tr className="text-left text-sm">
              <th 
                className="px-4 py-3 font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-2">
                  ID Solicitud
                  <SortIcon field="id" />
                </div>
              </th>
              <th 
                className="px-4 py-3 font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('estado')}
              >
                <div className="flex items-center gap-2">
                  Estado
                  <SortIcon field="estado" />
                </div>
              </th>
              <th className="px-4 py-3 font-semibold">Mesa de Trabajo</th>
              <th className="px-4 py-3 font-semibold">Usuario Resolutor</th>
              <th 
                className="px-4 py-3 font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('prioridad')}
              >
                <div className="flex items-center gap-2">
                  Prioridad
                  <SortIcon field="prioridad" />
                </div>
              </th>
              <th className="px-4 py-3 font-semibold">Impacto</th>
              <th className="px-4 py-3 font-semibold">Categoría</th>
              <th 
                className="px-4 py-3 font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('fechaCreacion')}
              >
                <div className="flex items-center gap-2">
                  Fecha Creación
                  <SortIcon field="fechaCreacion" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSolicitudes.map((solicitud, index) => (
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
                <td className="px-4 py-3">{solicitud.usuarioResolutor}</td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={solicitud.prioridad} />
                </td>
                <td className="px-4 py-3 capitalize">{solicitud.impacto}</td>
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
