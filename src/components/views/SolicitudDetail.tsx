import { useState } from 'react';
import { solicitudes, documentos } from '@/data/mockData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { SolicitudStatus } from '@/types/solicitud';
import { 
  ArrowLeft, 
  Save, 
  MoreHorizontal,
  FileText,
  Eye,
  Download,
  Upload,
  Calendar,
  Building2,
  User,
  RefreshCw,
  ArrowRightLeft,
  UserCog
} from 'lucide-react';

interface SolicitudDetailProps {
  solicitudId: string;
  onBack: () => void;
}

export function SolicitudDetail({ solicitudId, onBack }: SolicitudDetailProps) {
  const solicitud = solicitudes.find(s => s.id === solicitudId);
  
  // Modal states
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showMesaModal, setShowMesaModal] = useState(false);
  
  // Form states for modals
  const [newStatus, setNewStatus] = useState<SolicitudStatus | ''>('');
  const [statusObservation, setStatusObservation] = useState('');
  const [newResolutor, setNewResolutor] = useState('');
  const [newMesa, setNewMesa] = useState('');
  const [mesaComment, setMesaComment] = useState('');

  if (!solicitud) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Solicitud no encontrada</p>
      </div>
    );
  }

  const handleStatusChange = () => {
    // Handle status change logic here
    console.log('Changing status to:', newStatus, 'with observation:', statusObservation);
    setShowStatusModal(false);
    setNewStatus('');
    setStatusObservation('');
  };

  const handleAssignResolutor = () => {
    // Handle assignment logic here
    console.log('Assigning to:', newResolutor);
    setShowAssignModal(false);
    setNewResolutor('');
  };

  const handleMesaChange = () => {
    // Handle mesa change logic here
    console.log('Changing mesa to:', newMesa, 'with comment:', mesaComment);
    setShowMesaModal(false);
    setNewMesa('');
    setMesaComment('');
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Command Bar */}
      <div className="command-bar">
        <button onClick={onBack} className="command-btn">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>
        <button className="command-btn command-btn-primary">
          <Save className="w-4 h-4" />
          <span>Guardar</span>
        </button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <button onClick={() => setShowStatusModal(true)} className="command-btn">
          <RefreshCw className="w-4 h-4" />
          <span>Cambiar estado</span>
        </button>
        <button onClick={() => setShowAssignModal(true)} className="command-btn">
          <UserCog className="w-4 h-4" />
          <span>Asignar / Reasignar resolutor</span>
        </button>
        <button onClick={() => setShowMesaModal(true)} className="command-btn">
          <ArrowRightLeft className="w-4 h-4" />
          <span>Cambiar Mesa de Trabajo</span>
        </button>
        
        <div className="flex-1" />
        <button className="command-btn">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Single View Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        
        {/* BLOQUE 1 – ENCABEZADO DEL TICKET */}
        <div className="form-section">
          <h3 className="form-section-title flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Encabezado del Ticket
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">ID de Solicitud</Label>
              <div className="text-lg font-bold text-accent">{solicitud.id}</div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Estado Actual</Label>
              <div className="pt-1">
                <StatusBadge status={solicitud.estado} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Fecha de Creación</Label>
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{solicitud.fechaCreacion}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 2 – ASIGNACIÓN Y CONTEXTO OPERATIVO */}
        <div className="form-section border-l-4 border-l-accent">
          <h3 className="form-section-title flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent" />
            Asignación y Contexto Operativo
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Mesa de Trabajo Actual</Label>
              <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <Building2 className="w-4 h-4 text-accent" />
                <span className="font-medium">{solicitud.mesaTrabajo}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Usuario Resolutor / Agente Asignado</Label>
              <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <User className="w-4 h-4 text-accent" />
                <span className="font-medium">{solicitud.usuarioResolutor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Estado Actual</Label>
              <div className="p-3 bg-secondary/50 rounded-lg">
                <StatusBadge status={solicitud.estado} />
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 3 – DATOS DEL TRÁMITE */}
        <div className="form-section">
          <h3 className="form-section-title">Datos del Trámite</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Categoría</Label>
              <Input value={solicitud.categoria} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Subcategoría</Label>
              <Input value={solicitud.subcategoria} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Origen Institucional</Label>
              <Input value={solicitud.origenInstitucional} disabled className="bg-muted" />
            </div>
          </div>
        </div>

        {/* BLOQUE 4 – CAMPOS OPERATIVOS */}
        <div className="form-section">
          <h3 className="form-section-title">Campos Operativos</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Prioridad</Label>
              <div className="pt-1">
                <PriorityBadge priority={solicitud.prioridad} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Impacto Estimado</Label>
              <div className="capitalize font-medium p-3 bg-muted rounded-lg">{solicitud.impacto}</div>
            </div>
            <div></div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Observación Interna</Label>
              <Textarea 
                placeholder="Ingrese observaciones internas sobre esta solicitud..."
                defaultValue={solicitud.observaciones}
                rows={3}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Respuesta de Resolutor</Label>
              <Textarea 
                placeholder="Respuesta proporcionada al cerrar el ticket..."
                defaultValue=""
                rows={3}
                className="resize-none"
                disabled
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 5 – DOCUMENTACIÓN */}
        <div className="form-section">
          <div className="flex items-center justify-between mb-4">
            <h3 className="form-section-title mb-0 pb-0 border-0 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Documentación
            </h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              Adjuntar documento
            </Button>
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-grid-header">
                <tr className="text-left text-sm">
                  <th className="px-4 py-3 font-semibold">Documento</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Fecha de Subida</th>
                  <th className="px-4 py-3 font-semibold">Tamaño</th>
                  <th className="px-4 py-3 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {documentos.map((doc, index) => (
                  <tr key={doc.id} className={`border-t border-border ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">{doc.nombre}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{doc.tipo}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{doc.fechaSubida}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{doc.tamaño}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 text-xs">
                          <Eye className="w-3.5 h-3.5" />
                          Ver
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 text-xs">
                          <Download className="w-3.5 h-3.5" />
                          Descargar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL: Cambiar Estado */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <RefreshCw className="w-5 h-5 text-accent" />
              Cambiar Estado
            </DialogTitle>
            <DialogDescription>
              Seleccione el nuevo estado para la solicitud <span className="font-semibold text-foreground">{solicitud.id}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nuevo Estado</Label>
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as SolicitudStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un estado..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initiated">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Iniciado
                    </div>
                  </SelectItem>
                  <SelectItem value="review">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      En revisión
                    </div>
                  </SelectItem>
                  <SelectItem value="progress">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      En curso
                    </div>
                  </SelectItem>
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Pendiente de información
                    </div>
                  </SelectItem>
                  <SelectItem value="success">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Finalizado con éxito
                    </div>
                  </SelectItem>
                  <SelectItem value="failed">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Sin resolución
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Respuesta del Resolutor <span className="text-muted-foreground text-xs">(opcional)</span></Label>
              <Textarea 
                placeholder="Ingrese la respuesta del resolutor..."
                value={statusObservation}
                onChange={(e) => setStatusObservation(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleStatusChange} disabled={!newStatus} className="bg-primary">
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Asignar / Reasignar Resolutor */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <UserCog className="w-5 h-5 text-accent" />
              Asignar / Reasignar Resolutor
            </DialogTitle>
            <DialogDescription>
              Asigne un usuario resolutor para la solicitud <span className="font-semibold text-foreground">{solicitud.id}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-3 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Mesa de Trabajo Actual:</span>
                <span className="font-medium">{solicitud.mesaTrabajo}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Usuario Resolutor</Label>
              <Select value={newResolutor} onValueChange={setNewResolutor}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un usuario..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="María García">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      María García
                    </div>
                  </SelectItem>
                  <SelectItem value="Carlos López">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Carlos López
                    </div>
                  </SelectItem>
                  <SelectItem value="Ana Rodríguez">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Ana Rodríguez
                    </div>
                  </SelectItem>
                  <SelectItem value="Pedro Martínez">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Pedro Martínez
                    </div>
                  </SelectItem>
                  <SelectItem value="Laura Fernández">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Laura Fernández
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAssignResolutor} disabled={!newResolutor} className="bg-primary">
              Asignar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Cambiar Mesa de Trabajo */}
      <Dialog open={showMesaModal} onOpenChange={setShowMesaModal}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <ArrowRightLeft className="w-5 h-5 text-accent" />
              Cambiar Mesa de Trabajo
            </DialogTitle>
            <DialogDescription>
              Reasigne la solicitud <span className="font-semibold text-foreground">{solicitud.id}</span> a otra mesa de trabajo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-3 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Mesa Actual:</span>
                <span className="font-medium">{solicitud.mesaTrabajo}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Nueva Mesa de Trabajo</Label>
              <Select value={newMesa} onValueChange={setNewMesa}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una mesa..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mesa de Atención Ciudadana">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Mesa de Atención Ciudadana
                    </div>
                  </SelectItem>
                  <SelectItem value="Mesa de Servicios Sociales">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Mesa de Servicios Sociales
                    </div>
                  </SelectItem>
                  <SelectItem value="Mesa Técnica">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Mesa Técnica
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Comentario Interno <span className="text-muted-foreground text-xs">(opcional)</span></Label>
              <Textarea 
                placeholder="Ingrese un comentario sobre el cambio de mesa..."
                value={mesaComment}
                onChange={(e) => setMesaComment(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMesaModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleMesaChange} disabled={!newMesa} className="bg-primary">
              Confirmar cambio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
