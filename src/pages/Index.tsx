import { useState } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { SitemapNav } from '@/components/layout/SitemapNav';
import { Sidebar } from '@/components/layout/Sidebar';
import { SolicitudesGrid } from '@/components/views/SolicitudesGrid';
import { SolicitudDetail } from '@/components/views/SolicitudDetail';
import { MisSolicitudesView } from '@/components/views/MisSolicitudesView';
import { MetricasGenerales } from '@/components/views/MetricasGenerales';
import { MetricasMesaView } from '@/components/views/MetricasMesaView';
import { MetricasTipoView } from '@/components/views/MetricasTipoView';
import { MetricasPrioridadView } from '@/components/views/MetricasPrioridadView';
import { MetricasResolutorView } from '@/components/views/MetricasResolutorView';
import { MetricasOrigenView } from '@/components/views/MetricasOrigenView';
import { UsuariosView } from '@/components/views/UsuariosView';
import { MesasTrabajoView } from '@/components/views/MesasTrabajoView';


const Index = () => {
  const [activeArea, setActiveArea] = useState('operacion');
  const [activeView, setActiveView] = useState('solicitudes');
  const [selectedSolicitud, setSelectedSolicitud] = useState<string | null>(null);

  const handleAreaChange = (area: string) => {
    setActiveArea(area);
    setSelectedSolicitud(null);
    // Set default view for each area
    if (area === 'operacion') setActiveView('solicitudes');
    if (area === 'seguimiento') setActiveView('metricas-generales');
    if (area === 'administracion') setActiveView('usuarios');
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedSolicitud(null);
  };

  const renderContent = () => {
    // If a solicitud is selected, show its detail
    if (selectedSolicitud) {
      return (
        <SolicitudDetail 
          solicitudId={selectedSolicitud} 
          onBack={() => setSelectedSolicitud(null)} 
        />
      );
    }

    // Otherwise, show the appropriate view
    switch (activeView) {
      // Operación
      case 'solicitudes':
        return <SolicitudesGrid onSelectSolicitud={setSelectedSolicitud} />;
      case 'mis-solicitudes':
        return <MisSolicitudesView onSelectSolicitud={setSelectedSolicitud} />;
      
      // Seguimiento
      case 'metricas-generales':
        return <MetricasGenerales />;
      case 'metricas-mesa':
        return <MetricasMesaView />;
      case 'metricas-tipo':
        return <MetricasTipoView />;
      case 'metricas-prioridad':
        return <MetricasPrioridadView />;
      case 'metricas-resolutor':
        return <MetricasResolutorView />;
      case 'metricas-origen':
        return <MetricasOrigenView />;
      
      // Administración
      case 'usuarios':
        return <UsuariosView />;
      case 'mesas-trabajo':
        return <MesasTrabajoView />;
      
      default:
        return <SolicitudesGrid onSelectSolicitud={setSelectedSolicitud} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <AppHeader />
      
      {/* Sitemap Navigation */}
      <SitemapNav activeArea={activeArea} onAreaChange={handleAreaChange} />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          activeArea={activeArea} 
          activeView={activeView}
          onViewChange={handleViewChange}
        />
        
        {/* Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-muted/30">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
