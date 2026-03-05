import { useState } from 'react';
import { usuarios as initialUsuarios, mesasTrabajo } from '@/data/mockData';
import { Usuario } from '@/types/solicitud';
import { CommandBar } from '@/components/common/CommandBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Mail, Shield, Building2, ArrowLeft, Pencil, Power, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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

const rolesDisponibles = ['Resolutor', 'Coordinador', 'Administrador', 'Supervisor'];
const mesasDisponibles = mesasTrabajo.map(m => m.nombre);

export function UsuariosView() {
  const [usuariosList, setUsuariosList] = useState<Usuario[]>(initialUsuarios);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editNombre, setEditNombre] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [editMesas, setEditMesas] = useState<string[]>([]);

  // Toggle status
  const [showToggleConfirm, setShowToggleConfirm] = useState(false);

  const startEditing = () => {
    if (!selectedUsuario) return;
    setEditNombre(selectedUsuario.nombre);
    setEditEmail(selectedUsuario.email);
    setEditRoles([...selectedUsuario.roles]);
    setEditMesas([...selectedUsuario.mesasTrabajo]);
    setIsEditing(true);
  };

  const cancelEditing = () => setIsEditing(false);

  const saveEditing = () => {
    if (!selectedUsuario || !editNombre.trim()) return;
    const updated: Usuario = {
      ...selectedUsuario,
      nombre: editNombre.trim(),
      email: editEmail.trim(),
      roles: editRoles,
      mesasTrabajo: editMesas,
    };
    setUsuariosList(prev => prev.map(u => u.id === updated.id ? updated : u));
    setSelectedUsuario(updated);
    setIsEditing(false);
  };

  const handleToggleEstado = () => {
    if (!selectedUsuario) return;
    const newEstado = selectedUsuario.estado === 'activo' ? 'inactivo' : 'activo';
    const updated: Usuario = { ...selectedUsuario, estado: newEstado };
    setUsuariosList(prev => prev.map(u => u.id === updated.id ? updated : u));
    setSelectedUsuario(updated);
    setShowToggleConfirm(false);
  };

  const toggleSelection = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  // Detail view
  if (selectedUsuario) {
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <CommandBar showNew={false} showExport={false}>
          <Button variant="ghost" size="sm" onClick={() => { setSelectedUsuario(null); setIsEditing(false); }} className="mr-auto">
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
                  <h2 className="text-2xl font-bold mb-1">{selectedUsuario.nombre}</h2>
                )}
                <p className="text-sm text-muted-foreground">{selectedUsuario.id}</p>
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
                      variant={selectedUsuario.estado === 'activo' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => setShowToggleConfirm(true)}
                    >
                      <Power className="w-4 h-4 mr-1" />
                      {selectedUsuario.estado === 'activo' ? 'Inactivar' : 'Activar'}
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
                  selectedUsuario.estado === 'activo' ? 'badge-success' : 'badge-initiated'
                )}>
                  {selectedUsuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </Label>
                {isEditing ? (
                  <Input
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className="max-w-xs"
                  />
                ) : (
                  <span className="text-sm">{selectedUsuario.email}</span>
                )}
              </div>

              {/* Roles */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4" /> Roles ({isEditing ? editRoles.length : selectedUsuario.roles.length})
                </Label>
                {isEditing ? (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between font-normal">
                          {editRoles.length > 0 ? `${editRoles.length} seleccionado(s)` : 'Seleccionar roles...'}
                          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-background border z-50" align="start">
                        <div className="flex flex-col gap-1 p-2 max-h-48 overflow-auto">
                          {rolesDisponibles.map(rol => (
                            <label key={rol} className="flex items-center gap-2 text-sm cursor-pointer rounded-sm px-2 py-1.5 hover:bg-accent">
                              <Checkbox
                                checked={editRoles.includes(rol)}
                                onCheckedChange={() => toggleSelection(rol, editRoles, setEditRoles)}
                              />
                              {rol}
                            </label>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {editRoles.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {editRoles.map(r => (
                          <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUsuario.roles.map(rol => (
                      <Badge key={rol} variant="secondary" className="text-xs">{rol}</Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Mesas de Trabajo */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4" /> Mesas de Trabajo ({isEditing ? editMesas.length : selectedUsuario.mesasTrabajo.length})
                </Label>
                {isEditing ? (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between font-normal">
                          {editMesas.length > 0 ? `${editMesas.length} seleccionada(s)` : 'Seleccionar mesas...'}
                          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-background border z-50" align="start">
                        <div className="flex flex-col gap-1 p-2 max-h-48 overflow-auto">
                          {mesasDisponibles.map(mesa => (
                            <label key={mesa} className="flex items-center gap-2 text-sm cursor-pointer rounded-sm px-2 py-1.5 hover:bg-accent">
                              <Checkbox
                                checked={editMesas.includes(mesa)}
                                onCheckedChange={() => toggleSelection(mesa, editMesas, setEditMesas)}
                              />
                              {mesa}
                            </label>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {editMesas.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {editMesas.map(m => (
                          <Badge key={m} variant="outline" className="text-xs">{m}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUsuario.mesasTrabajo.length > 0 ? (
                      selectedUsuario.mesasTrabajo.map(mesa => (
                        <Badge key={mesa} variant="outline" className="text-xs">{mesa}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Sin mesas asignadas</span>
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
                {selectedUsuario.estado === 'activo' ? 'Inactivar' : 'Activar'} Usuario
              </AlertDialogTitle>
              <AlertDialogDescription>
                ¿Está seguro que desea {selectedUsuario.estado === 'activo' ? 'inactivar' : 'activar'} al usuario <strong>{selectedUsuario.nombre}</strong>?
                {selectedUsuario.estado === 'activo' && ' El usuario no podrá acceder al sistema mientras esté inactivo.'}
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

  // Grid/table view
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar />

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-grid-header sticky top-0">
            <tr className="text-left text-sm">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Rol(es)</th>
              <th className="px-4 py-3 font-semibold">Mesas de Trabajo</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuariosList.map((usuario, index) => (
              <tr
                key={usuario.id}
                className={cn(
                  "md-grid-row text-sm animate-slide-in cursor-pointer",
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/30'
                )}
                style={{ animationDelay: `${index * 30}ms` }}
                onClick={() => setSelectedUsuario(usuario)}
              >
                <td className="px-4 py-3 font-medium text-accent">{usuario.id}</td>
                <td className="px-4 py-3 font-medium">{usuario.nombre}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {usuario.email}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {usuario.roles.map((rol) => (
                      <Badge key={rol} variant="secondary" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        {rol}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {usuario.mesasTrabajo.map((mesa) => (
                      <Badge key={mesa} variant="outline" className="text-xs">
                        <Building2 className="w-3 h-3 mr-1" />
                        {mesa}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "badge-status",
                    usuario.estado === 'activo' ? 'badge-success' : 'badge-initiated'
                  )}>
                    {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
