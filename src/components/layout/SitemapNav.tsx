import { cn } from '@/lib/utils';

interface SitemapNavProps {
  activeArea: string;
  onAreaChange: (area: string) => void;
}

const areas = [
  { id: 'operacion', label: 'Operación' },
  { id: 'seguimiento', label: 'Seguimiento' },
  { id: 'administracion', label: 'Administración' },
];

export function SitemapNav({ activeArea, onAreaChange }: SitemapNavProps) {
  return (
    <nav className="h-10 bg-primary flex items-center px-4 border-b border-sidebar-border">
      <div className="flex items-center gap-1">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => onAreaChange(area.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-t-md transition-all",
              activeArea === area.id
                ? "bg-background text-foreground"
                : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {area.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
