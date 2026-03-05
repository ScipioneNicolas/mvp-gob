import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gobiernoLogo from '@/assets/gobierno-logo.jpg';

export function AppHeader() {
  return <header className="h-14 bg-header flex items-center justify-between px-6 border-b border-sidebar-border">
      {/* Logo and App Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-header-foreground/20 rounded-md flex items-center justify-center">
          <span className="text-header-foreground font-bold text-sm">SS</span>
        </div>
        <div className="flex flex-col">
          <span className="text-header-foreground font-semibold text-sm leading-tight">Sistema de gestion de solicitudes - Back Office</span>
          <span className="text-header-foreground/70 text-xs leading-tight">Camara de comercio</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-header-foreground/50" />
          <Input placeholder="Buscar solicitudes, usuarios..." className="pl-9 bg-header-foreground/10 border-header-foreground/20 text-header-foreground placeholder:text-header-foreground/50 h-9" />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-header-foreground/80 hover:text-header-foreground hover:bg-header-foreground/10">
          
        </Button>
        <Button variant="ghost" size="icon" className="text-header-foreground/80 hover:text-header-foreground hover:bg-header-foreground/10">
          
        </Button>
        <Button variant="ghost" size="icon" className="text-header-foreground/80 hover:text-header-foreground hover:bg-header-foreground/10 relative">
          
          
        </Button>
        <div className="w-px h-6 bg-header-foreground/20 mx-2"></div>
        {/* Government Logo */}
        <img src={gobiernoLogo} alt="Gobierno de Córdoba" className="h-10 object-contain" />
        <div className="w-px h-6 bg-header-foreground/20 mx-2"></div>
        <Button variant="ghost" className="text-header-foreground/80 hover:text-header-foreground hover:bg-header-foreground/10 gap-2">
          <div className="w-7 h-7 rounded-full bg-header-foreground/20 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Admin</span>
        </Button>
      </div>
    </header>;
}