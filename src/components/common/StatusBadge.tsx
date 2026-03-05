import { cn } from '@/lib/utils';
import { SolicitudStatus, STATUS_CONFIG } from '@/types/solicitud';

interface StatusBadgeProps {
  status: SolicitudStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  
  return (
    <span className={cn('badge-status', config.className, className)}>
      {config.label}
    </span>
  );
}
