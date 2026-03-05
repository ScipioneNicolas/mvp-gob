import { useState } from 'react';
import { mesasTrabajo, solicitudes, usuarios } from '@/data/mockData';
import { MesaTrabajo } from '@/types/solicitud';
import { CommandBar } from '@/components/common/CommandBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Users, FolderOpen, Plus, ArrowLeft, Pencil, Power, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

// Derive categories from solicitudes
const categoriasDisponibles = Array.from(new Set(solicitudes.map(s => s.categoria)));

// Get users with Resolutor role
const resolutores = usuarios.filter(u => u.roles.includes('Resolutor'));

export function MesasTrabajoView() {
  const [mesas, setMesas] = useState<MesaTrabajo[]>(mesasTrabajo);
  const [selectedMesa, setSelectedMesa] = useState<MesaTrabajo | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editNombre, setEditNombre] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');
  const [editCategorias, setEditCategorias] = useState<string[]>([]);
  const [editUsuarios, setEditUsuarios] = useState<string[]>([]);

  // Toggle status confirmation
  const [showToggleConfirm, setShowToggleConfirm] = useState(false);

  // Create modal state
  const [newNombre, setNewNombre] = useState('');
  const [newCategorias, setNewCategorias] = useState<string[]>([]);
  const [newUsuarios, setNewUsuarios] = useState<string[]>([]);

  const handleCreate = () => {
    if (!newNombre.trim()) return;
    const newMesa: MesaTrabajo = {
      id: `MT-${String(mesas.length + 1).padStart(3, '0')}`,
      nombre: newNombre.trim(),
      descripcion: '',
      estado: 'activa',
      usuarios: newUsuarios,
      categorias: newCategorias,
    };
    setMesas(prev => [...prev, newMesa]);
    setNewNombre('');
    setNewCategorias([]);
    setNewUsuarios([]);
    setShowCreateModal(false);
  };

  const startEditing = () => {
    if (!selectedMesa) return;
    setEditNombre(selectedMesa.nombre);
    setEditDescripcion(selectedMesa.descripcion);
    setEditCategorias([...selectedMesa.categorias]);
    setEditUsuarios([...selectedMesa.usuarios]);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveEditing = () => {
    if (!selectedMesa || !editNombre.trim()) return;
    const updated: MesaTrabajo = {
      ...selectedMesa,
      nombre: editNombre.trim(),
      descripcion: editDescripcion.trim(),
      categorias: editCategorias,
      usuarios: editUsuarios,
    };
    setMesas(prev => prev.map(m => m.id === updated.id ? updated : m));
    setSelectedMesa(updated);
    setIsEditing(false);
  };

  const handleToggleEstado = () => {
    if (!selectedMesa) return;
    const newEstado = selectedMesa.estado === 'activa' ? 'inactiva' : 'activa';
    const updated: MesaTrabajo = { ...selectedMesa, estado: newEstado };
    setMesas(prev => prev.map(m => m.id === updated.id ? updated : m));
    setSelectedMesa(updated);
    setShowToggleConfirm(false);
  };

  const toggleSelection = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  // Detail view — ficha/formulario style
  if (selectedMesa) {
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <CommandBar showNew={false} showExport={false}>
          <Button variant="ghost" size="sm" onClick={() => { setSelectedMesa(null); setIsEditing(false); }} className="mr-auto">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </CommandBar>
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                {isEditing ? (
                  <Input
                    value={editNombre}
                    onChange={e => setEditNombre(e.target.value)}
                    className="text-2xl font-bold h-auto py-1 mb-1"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-1">{selectedMesa.nombre}</h2>
                )}
                <p className="text-sm text-muted-foreground">{selectedMesa.id}</p>
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={cancelEditing}>Cancelar</Button>
                    <Button size="sm" onClick={saveEditing} disabled={!editNombre.trim()}>Guardar</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={startEditing}>
                      <Pencil className="w-4 h-4 mr-1" /> Editar
                    </Button>
                    <Button
                      variant={selectedMesa.estado === 'activa' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => setShowToggleConfirm(true)}
                    >
                      <Power className="w-4 h-4 mr-1" />
                      {selectedMesa.estado === 'activa' ? 'Inactivar' : 'Activar'}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Fields */}
            <div className="dashboard-card divide-y divide-border">
              {/* Estado */}
              <div className="flex items-center justify-between py-4 px-2">
                <Label className="text-muted-foreground font-medium">Estado</Label>
                <span className={cn(
                  "badge-status",
                  selectedMesa.estado === 'activa' ? 'badge-success' : 'badge-initiated'
                )}>
                  {selectedMesa.estado === 'activa' ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              {/* Descripción */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium block mb-1">Descripción</Label>
                {isEditing ? (
                  <Input
                    value={editDescripcion}
                    onChange={e => setEditDescripcion(e.target.value)}
                    placeholder="Descripción de la mesa..."
                  />
                ) : (
                  <p className="text-sm">{selectedMesa.descripcion || <span className="italic text-muted-foreground">Sin descripción</span>}</p>
                )}
              </div>

              {/* Usuarios Resolutores */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" />
                  Usuarios Resolutores ({isEditing ? editUsuarios.length : selectedMesa.usuarios.length})
                </Label>
                {isEditing ? (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between font-normal">
                          {editUsuarios.length > 0 ? `${editUsuarios.length} seleccionado(s)` : 'Seleccionar usuarios...'}
                          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-background border z-50" align="start">
                        <div className="flex flex-col gap-1 p-2 max-h-48 overflow-auto">
                          {resolutores.map(u => (
                            <label key={u.id} className="flex items-center gap-2 text-sm cursor-pointer rounded-sm px-2 py-1.5 hover:bg-accent">
                              <Checkbox
                                checked={editUsuarios.includes(u.nombre)}
                                onCheckedChange={() => toggleSelection(u.nombre, editUsuarios, setEditUsuarios)}
                              />
                              {u.nombre}
                            </label>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {editUsuarios.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {editUsuarios.map(u => (
                          <Badge key={u} variant="secondary" className="text-xs">{u}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMesa.usuarios.length > 0 ? (
                      selectedMesa.usuarios.map(u => (
                        <Badge key={u} variant="secondary" className="text-xs">{u}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Sin usuarios asignados</span>
                    )}
                  </div>
                )}
              </div>

              {/* Categorías Asociadas */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2 mb-2">
                  <FolderOpen className="w-4 h-4" />
                  Categorías Asociadas ({isEditing ? editCategorias.length : selectedMesa.categorias.length})
                </Label>
                {isEditing ? (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between font-normal">
                          {editCategorias.length > 0 ? `${editCategorias.length} seleccionada(s)` : 'Seleccionar categorías...'}
                          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-background border z-50" align="start">
                        <div className="flex flex-col gap-1 p-2 max-h-48 overflow-auto">
                          {categoriasDisponibles.map(cat => (
                            <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer rounded-sm px-2 py-1.5 hover:bg-accent">
                              <Checkbox
                                checked={editCategorias.includes(cat)}
                                onCheckedChange={() => toggleSelection(cat, editCategorias, setEditCategorias)}
                              />
                              {cat}
                            </label>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {editCategorias.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {editCategorias.map(c => (
                          <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMesa.categorias.length > 0 ? (
                      selectedMesa.categorias.map(c => (
                        <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Sin categorías asociadas</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirm toggle estado */}
        <AlertDialog open={showToggleConfirm} onOpenChange={setShowToggleConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {selectedMesa.estado === 'activa' ? 'Inactivar' : 'Activar'} Mesa de Trabajo
              </AlertDialogTitle>
              <AlertDialogDescription>
                ¿Está seguro que desea {selectedMesa.estado === 'activa' ? 'inactivar' : 'activar'} la mesa <strong>{selectedMesa.nombre}</strong>?
                {selectedMesa.estado === 'activa' && ' Las solicitudes asociadas no podrán ser asignadas a esta mesa mientras esté inactiva.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleToggleEstado}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Grid view
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar onNew={() => setShowCreateModal(true)}>
      </CommandBar>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {mesas.map((mesa, index) => (
            <div
              key={mesa.id}
              className="dashboard-card cursor-pointer hover:shadow-card-hover transition-shadow animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedMesa(mesa)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold">{mesa.nombre}</h3>
                    <span className={cn(
                      "badge-status",
                      mesa.estado === 'activa' ? 'badge-success' : 'badge-initiated'
                    )}>
                      {mesa.estado === 'activa' ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{mesa.descripcion}</p>
                </div>
                <span className="text-xs text-muted-foreground">{mesa.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Usuarios Resolutores ({mesa.usuarios.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mesa.usuarios.map(u => (
                      <Badge key={u} variant="secondary" className="text-xs">{u}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                    <FolderOpen className="w-4 h-4" />
                    <span>Categorías Asociadas ({mesa.categorias.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mesa.categorias.map(c => (
                      <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Crear Mesa */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nueva Mesa de Trabajo</DialogTitle>
            <DialogDescription>Complete los datos para crear una nueva mesa.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nombre de la Mesa</Label>
              <Input
                value={newNombre}
                onChange={e => setNewNombre(e.target.value)}
                placeholder="Ej: Mesa de Atención Ciudadana"
              />
            </div>

            <div className="space-y-2">
              <Label>Categorías Asociadas</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md max-h-40 overflow-auto">
                {categoriasDisponibles.map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={newCategorias.includes(cat)}
                      onCheckedChange={() => toggleSelection(cat, newCategorias, setNewCategorias)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Usuarios Resolutores (opcional)</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md max-h-40 overflow-auto">
                {resolutores.map(u => (
                  <label key={u.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={newUsuarios.includes(u.nombre)}
                      onCheckedChange={() => toggleSelection(u.nombre, newUsuarios, setNewUsuarios)}
                    />
                    {u.nombre}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate} disabled={!newNombre.trim()}>Crear Mesa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
