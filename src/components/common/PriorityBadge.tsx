import { cn } from '@/lib/utils';
import { Priority, PRIORITY_CONFIG } from '@/types/solicitud';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];
  
  return (
    <span className={cn('badge-status', config.className, className)}>
      {config.label}
    </span>
  );
}
