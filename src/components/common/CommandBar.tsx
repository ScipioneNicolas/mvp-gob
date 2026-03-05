import { Plus, RefreshCw, Download, Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommandBarProps {
  onNew?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  showNew?: boolean;
  showExport?: boolean;
  title?: string;
  children?: React.ReactNode;
}

export function CommandBar({
  onNew,
  onRefresh,
  onExport,
  showNew = true,
  showExport = true,
  title,
  children
}: CommandBarProps) {
  return (
    <div className="command-bar">
      {showNew &&
      <button onClick={onNew} className="command-btn command-btn-primary">
          <Plus className="w-4 h-4" />
          <span>Nuevo</span>
        </button>
      }
      
      



      
      {showExport




      }

      <div className="flex-1" />

      {children}

      




      <button className="command-btn">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>);

}