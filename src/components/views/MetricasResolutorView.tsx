import { usuarios } from '@/data/mockData';
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
import { User, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const resolutorData = [
  { 
    nombre: 'María García', 
    activas: 12, 
    enRevision: 4, 
    enCurso: 6, 
    pendientes: 2,
    resueltas: 156,
    tiempoPromedio: '2.8 días'
  },
  { 
    nombre: 'Carlos López', 
    activas: 18, 
    enRevision: 8, 
    enCurso: 7, 
    pendientes: 3,
    resueltas: 134,
    tiempoPromedio: '4.2 días'
  },
  { 
    nombre: 'Ana Rodríguez', 
    activas: 9, 
    enRevision: 3, 
    enCurso: 4, 
    pendientes: 2,
    resueltas: 98,
    tiempoPromedio: '3.1 días'
  },
  { 
    nombre: 'Pedro Martínez', 
    activas: 15, 
    enRevision: 6, 
    enCurso: 8, 
    pendientes: 1,
    resueltas: 187,
    tiempoPromedio: '2.5 días'
  },
  { 
    nombre: 'Laura Fernández', 
    activas: 7, 
    enRevision: 2, 
    enCurso: 3, 
    pendientes: 2,
    resueltas: 67,
    tiempoPromedio: '4.8 días'
  },
];

export function MetricasResolutorView() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar showNew={false} showExport={false} />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Resolutor Cards */}
        <div className="grid grid-cols-5 gap-4">
          {resolutorData.map((resolutor) => (
            <div key={resolutor.nombre} className="dashboard-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm truncate">{resolutor.nombre}</h3>
                  <p className="text-xs text-muted-foreground">{resolutor.activas} activas</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resueltas:</span>
                  <span className="font-medium text-status-success">{resolutor.resueltas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tiempo Prom:</span>
                  <span className="font-medium">{resolutor.tiempoPromedio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="dashboard-card">
          <h3 className="text-base font-semibold mb-4">Solicitudes Activas por Resolutor y Estado</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resolutorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="nombre" 
                  tick={{ fontSize: 11 }}
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
                <Bar dataKey="enRevision" stackId="a" fill="hsl(var(--status-review))" name="En revisión" />
                <Bar dataKey="enCurso" stackId="a" fill="hsl(var(--status-progress))" name="En curso" />
                <Bar dataKey="pendientes" stackId="a" fill="hsl(var(--status-pending))" name="Pendientes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Table */}
        <div className="dashboard-card">
          <h3 className="text-base font-semibold mb-4">Rendimiento por Resolutor</h3>
          <table className="w-full text-sm">
            <thead className="bg-grid-header">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Resolutor</th>
                <th className="px-4 py-3 text-center font-semibold">En Revisión</th>
                <th className="px-4 py-3 text-center font-semibold">En Curso</th>
                <th className="px-4 py-3 text-center font-semibold">Pendientes</th>
                <th className="px-4 py-3 text-center font-semibold">Total Activas</th>
                <th className="px-4 py-3 text-center font-semibold">Resueltas</th>
                <th className="px-4 py-3 text-center font-semibold">Tiempo Promedio</th>
              </tr>
            </thead>
            <tbody>
              {resolutorData.map((resolutor, index) => (
                <tr key={resolutor.nombre} className={index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                  <td className="px-4 py-3 font-medium">{resolutor.nombre}</td>
                  <td className="px-4 py-3 text-center">{resolutor.enRevision}</td>
                  <td className="px-4 py-3 text-center">{resolutor.enCurso}</td>
                  <td className="px-4 py-3 text-center">{resolutor.pendientes}</td>
                  <td className="px-4 py-3 text-center font-semibold">{resolutor.activas}</td>
                  <td className="px-4 py-3 text-center text-status-success font-semibold">{resolutor.resueltas}</td>
                  <td className="px-4 py-3 text-center">{resolutor.tiempoPromedio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
