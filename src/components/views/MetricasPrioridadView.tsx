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
  ScatterChart,
  Scatter,
  ZAxis,
  Legend
} from 'recharts';
import { AlertTriangle, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

const prioridadData = [
  { prioridad: 'Alta', cantidad: 312, color: '#EF4444' },
  { prioridad: 'Media', cantidad: 589, color: '#EAB308' },
  { prioridad: 'Baja', cantidad: 346, color: '#22C55E' },
];

const impactoData = [
  { impacto: 'Provincial', cantidad: 245, color: '#3B82F6' },
  { impacto: 'Regional', cantidad: 478, color: '#06B6D4' },
  { impacto: 'Local', cantidad: 524, color: '#9CA3AF' },
];

const cruceData = [
  { prioridad: 'Alta', impacto: 'Provincial', cantidad: 89, x: 3, y: 3 },
  { prioridad: 'Alta', impacto: 'Regional', cantidad: 134, x: 3, y: 2 },
  { prioridad: 'Alta', impacto: 'Local', cantidad: 89, x: 3, y: 1 },
  { prioridad: 'Media', impacto: 'Provincial', cantidad: 98, x: 2, y: 3 },
  { prioridad: 'Media', impacto: 'Regional', cantidad: 267, x: 2, y: 2 },
  { prioridad: 'Media', impacto: 'Local', cantidad: 224, x: 2, y: 1 },
  { prioridad: 'Baja', impacto: 'Provincial', cantidad: 58, x: 1, y: 3 },
  { prioridad: 'Baja', impacto: 'Regional', cantidad: 77, x: 1, y: 2 },
  { prioridad: 'Baja', impacto: 'Local', cantidad: 211, x: 1, y: 1 },
];

export function MetricasPrioridadView() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar showNew={false} showExport={false} />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="dashboard-card border-l-4 border-red-500">
            <div className="flex items-center gap-3">
              <ArrowUp className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Prioridad Alta</p>
                <p className="text-2xl font-bold">{prioridadData[0].cantidad}</p>
                <p className="text-xs text-muted-foreground">25% del total</p>
              </div>
            </div>
          </div>
          <div className="dashboard-card border-l-4 border-yellow-500">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Prioridad Media</p>
                <p className="text-2xl font-bold">{prioridadData[1].cantidad}</p>
                <p className="text-xs text-muted-foreground">47% del total</p>
              </div>
            </div>
          </div>
          <div className="dashboard-card border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <ArrowDown className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Prioridad Baja</p>
                <p className="text-2xl font-bold">{prioridadData[2].cantidad}</p>
                <p className="text-xs text-muted-foreground">28% del total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Prioridad Pie */}
          <div className="dashboard-card">
            <h3 className="text-base font-semibold mb-4">Distribución por Prioridad</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prioridadData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="cantidad"
                    nameKey="prioridad"
                  >
                    {prioridadData.map((entry, index) => (
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
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Impacto Bar */}
          <div className="dashboard-card">
            <h3 className="text-base font-semibold mb-4">Distribución por Impacto</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactoData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    dataKey="impacto" 
                    type="category" 
                    width={80}
                    tick={{ fontSize: 12 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="cantidad" radius={[0, 4, 4, 0]}>
                    {impactoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cruce Matrix */}
        <div className="dashboard-card">
          <h3 className="text-base font-semibold mb-4">Matriz Prioridad / Impacto</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div></div>
            <div className="py-2 text-sm font-medium text-muted-foreground">Local</div>
            <div className="py-2 text-sm font-medium text-muted-foreground">Regional</div>
            <div className="py-2 text-sm font-medium text-muted-foreground">Provincial</div>
            
            <div className="py-4 text-sm font-medium text-muted-foreground flex items-center justify-end pr-4">Alta</div>
            <div className="py-4 bg-red-100 rounded-lg font-bold text-red-700">89</div>
            <div className="py-4 bg-red-200 rounded-lg font-bold text-red-800">134</div>
            <div className="py-4 bg-red-300 rounded-lg font-bold text-red-900">89</div>
            
            <div className="py-4 text-sm font-medium text-muted-foreground flex items-center justify-end pr-4">Media</div>
            <div className="py-4 bg-yellow-100 rounded-lg font-bold text-yellow-700">224</div>
            <div className="py-4 bg-yellow-200 rounded-lg font-bold text-yellow-800">267</div>
            <div className="py-4 bg-yellow-300 rounded-lg font-bold text-yellow-900">98</div>
            
            <div className="py-4 text-sm font-medium text-muted-foreground flex items-center justify-end pr-4">Baja</div>
            <div className="py-4 bg-green-100 rounded-lg font-bold text-green-700">211</div>
            <div className="py-4 bg-green-200 rounded-lg font-bold text-green-800">77</div>
            <div className="py-4 bg-green-300 rounded-lg font-bold text-green-900">58</div>
          </div>
        </div>
      </div>
    </div>
  );
}
