import { CommandBar } from '@/components/common/CommandBar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { FileText, CheckCircle2 } from 'lucide-react';

const categoriaData = [
  { categoria: 'Trámites Personales', total: 312, cerradas: 267, abiertas: 45 },
  { categoria: 'Asistencia Social', total: 289, cerradas: 198, abiertas: 91 },
  { categoria: 'Consultas Generales', total: 234, cerradas: 212, abiertas: 22 },
  { categoria: 'Reclamos', total: 178, cerradas: 145, abiertas: 33 },
  { categoria: 'Permisos', total: 156, cerradas: 123, abiertas: 33 },
  { categoria: 'Infraestructura', total: 78, cerradas: 54, abiertas: 24 },
];

const estadoPorCategoria = [
  { categoria: 'Trámites Personales', iniciado: 12, revision: 15, curso: 10, pendiente: 8, finalizado: 267 },
  { categoria: 'Asistencia Social', iniciado: 25, revision: 32, curso: 22, pendiente: 12, finalizado: 198 },
  { categoria: 'Consultas Generales', iniciado: 5, revision: 8, curso: 6, pendiente: 3, finalizado: 212 },
  { categoria: 'Reclamos', iniciado: 8, revision: 12, curso: 8, pendiente: 5, finalizado: 145 },
  { categoria: 'Permisos', iniciado: 10, revision: 10, curso: 8, pendiente: 5, finalizado: 123 },
  { categoria: 'Infraestructura', iniciado: 6, revision: 8, curso: 6, pendiente: 4, finalizado: 54 },
];

const cierreData = [
  { name: 'Con éxito', value: 756, color: '#22C55E' },
  { name: 'Sin resolución', value: 63, color: '#EF4444' },
];

export function MetricasTipoView() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar showNew={false} showExport={false} />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Volume by Category */}
        <div className="dashboard-card">
          <h3 className="text-base font-semibold mb-4">Volumen por Categoría</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriaData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  dataKey="categoria" 
                  type="category" 
                  width={130}
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="cerradas" fill="hsl(var(--status-success))" name="Cerradas" radius={[0, 4, 4, 0]} />
                <Bar dataKey="abiertas" fill="hsl(var(--status-pending))" name="Abiertas" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Estado por Categoría */}
          <div className="dashboard-card">
            <h3 className="text-base font-semibold mb-4">Estados por Categoría</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={estadoPorCategoria}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="categoria" 
                    tick={{ fontSize: 9 }}
                    height={60}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="iniciado" stackId="a" fill="#9CA3AF" name="Iniciado" />
                  <Bar dataKey="revision" stackId="a" fill="#3B82F6" name="En revisión" />
                  <Bar dataKey="curso" stackId="a" fill="#06B6D4" name="En curso" />
                  <Bar dataKey="pendiente" stackId="a" fill="#EAB308" name="Pendiente" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Proporción de Cierres */}
          <div className="dashboard-card">
            <h3 className="text-base font-semibold mb-4">Proporción de Cierres</h3>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cierreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {cierreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 pr-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">92%</p>
                    <p className="text-xs text-muted-foreground">Éxito</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">8%</p>
                    <p className="text-xs text-muted-foreground">Sin resolver</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
