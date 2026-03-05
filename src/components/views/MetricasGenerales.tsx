import { metricsData } from '@/data/mockData';
import { CommandBar } from '@/components/common/CommandBar';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
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
  LineChart,
  Line,
  Legend
} from 'recharts';

export function MetricasGenerales() {
  const porcentajeCerradas = Math.round((metricsData.cerradas / metricsData.totalSolicitudes) * 100);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar showNew={false} showExport={false} />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="dashboard-label">Total Solicitudes</p>
                <p className="dashboard-metric">{metricsData.totalSolicitudes.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="dashboard-label">Solicitudes Abiertas</p>
                <p className="dashboard-metric">{metricsData.abiertas}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="dashboard-label">Solicitudes Cerradas</p>
                <p className="dashboard-metric">{metricsData.cerradas}</p>
                <p className="text-xs text-green-600 mt-1">
                  {porcentajeCerradas}% del total
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="dashboard-label">Tiempo Promedio</p>
                <p className="dashboard-metric">{metricsData.tiempoPromedioResolucion}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Distribution by Status */}
          <div className="dashboard-card">
            <h3 className="text-base font-semibold mb-4">Distribución por Estado</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metricsData.porEstado}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="cantidad"
                    nameKey="estado"
                    label={({ estado, percent }) => `${estado} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {metricsData.porEstado.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Cantidad']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Evolution Chart */}
          <div className="dashboard-card">
            <h3 className="text-base font-semibold mb-4">Evolución Temporal</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metricsData.evolucionMensual}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="mes" 
                    tick={{ fontSize: 12 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
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
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="ingresadas" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name="Ingresadas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resueltas" 
                    stroke="hsl(var(--status-success))" 
                    strokeWidth={2}
                    name="Resueltas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart - Por Mesa */}
        <div className="dashboard-card">
          <h3 className="text-base font-semibold mb-4">Solicitudes por Mesa de Trabajo</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsData.porMesa} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  dataKey="mesa" 
                  type="category" 
                  width={150}
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
                <Legend />
                <Bar dataKey="cantidad" fill="hsl(var(--accent))" name="Total" radius={[0, 4, 4, 0]} />
                <Bar dataKey="backlog" fill="hsl(var(--status-pending))" name="Backlog" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
