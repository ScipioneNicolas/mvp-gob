import { metricsData } from '@/data/mockData';
import { CommandBar } from '@/components/common/CommandBar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Building2, Clock, TrendingDown } from 'lucide-react';

const mesaDetailData = [
  { 
    mesa: 'Atención Ciudadana', 
    total: 523, 
    abiertas: 87, 
    cerradas: 436, 
    tiempoPromedio: '3.2 días',
    tendencia: '-12%'
  },
  { 
    mesa: 'Servicios Sociales', 
    total: 412, 
    abiertas: 134, 
    cerradas: 278, 
    tiempoPromedio: '5.8 días',
    tendencia: '+8%'
  },
  { 
    mesa: 'Mesa Técnica', 
    total: 312, 
    abiertas: 52, 
    cerradas: 260, 
    tiempoPromedio: '4.1 días',
    tendencia: '-5%'
  },
];

export function MetricasMesaView() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar showNew={false} showExport={false} />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Mesa Cards */}
        <div className="grid grid-cols-3 gap-4">
          {mesaDetailData.map((mesa) => (
            <div key={mesa.mesa} className="dashboard-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{mesa.mesa}</h3>
                  <p className="text-xs text-muted-foreground">{mesa.total} solicitudes totales</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Abiertas</p>
                  <p className="text-xl font-bold text-status-pending">{mesa.abiertas}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cerradas</p>
                  <p className="text-xl font-bold text-status-success">{mesa.cerradas}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{mesa.tiempoPromedio}</span>
                </div>
                <span className={`text-sm font-medium ${mesa.tendencia.startsWith('-') ? 'text-green-600' : 'text-red-500'}`}>
                  {mesa.tendencia}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="dashboard-card">
          <h3 className="text-base font-semibold mb-4">Comparativa por Mesa de Trabajo</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mesaDetailData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="mesa" 
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
                <Bar dataKey="abiertas" fill="hsl(var(--status-pending))" name="Abiertas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cerradas" fill="hsl(var(--status-success))" name="Cerradas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
