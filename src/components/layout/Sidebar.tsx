import { cn } from '@/lib/utils';
import { 
  FileText, 
  User, 
  BarChart3, 
  Users, 
  Building2, 
  Link2,
  ChevronRight,
  TrendingUp,
  Target,
  AlertCircle,
  UserCheck,
  MapPin
} from 'lucide-react';

interface SidebarProps {
  activeArea: string;
  activeView: string;
  onViewChange: (view: string) => void;
}

const sidebarConfig: Record<string, { title: string; items: { id: string; label: string; icon: React.ElementType }[] }> = {
  operacion: {
    title: 'Operación',
    items: [
      { id: 'solicitudes', label: 'Solicitudes', icon: FileText },
      { id: 'mis-solicitudes', label: 'Mis Solicitudes', icon: User },
    ],
  },
  seguimiento: {
    title: 'Seguimiento',
    items: [
      { id: 'metricas-generales', label: 'Métricas Generales', icon: BarChart3 },
      { id: 'metricas-mesa', label: 'Por Mesa de Trabajo', icon: Building2 },
      { id: 'metricas-tipo', label: 'Por Tipo de Solicitud', icon: Target },
      { id: 'metricas-prioridad', label: 'Por Prioridad e Impacto', icon: AlertCircle },
      { id: 'metricas-resolutor', label: 'Por Resolutor', icon: UserCheck },
      { id: 'metricas-origen', label: 'Por Camaras/Municipios', icon: MapPin },
    ],
  },
  administracion: {
    title: 'Administración',
    items: [
      { id: 'usuarios', label: 'Usuarios', icon: Users },
      { id: 'mesas-trabajo', label: 'Mesas de Trabajo', icon: Building2 },
    ],
  },
};

export function Sidebar({ activeArea, activeView, onViewChange }: SidebarProps) {
  const config = sidebarConfig[activeArea];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Area Title */}
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {config.title}
        </h2>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-2">
        {config.items.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all",
                isActive
                  ? "bg-secondary text-secondary-foreground border-l-3 border-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Última actualización: hace 5 min</span>
        </div>
      </div>
    </aside>
  );
}
