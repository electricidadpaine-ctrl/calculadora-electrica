import React from 'react';
import { History, Trash2, ArrowUpRight, Copy, Layers, Power, Info, Clock, AlertCircle } from 'lucide-react';
import { CalculationHistoryItem } from '../types';

interface HistoryLogProps {
  logs: CalculationHistoryItem[];
  onDeleteLog: (id: string) => void;
  onClearLogs: () => void;
  onReloadInputs: (log: CalculationHistoryItem) => void;
}

export default function HistoryLog({ 
  logs, 
  onDeleteLog, 
  onClearLogs, 
  onReloadInputs 
}: HistoryLogProps) {
  
  return (
    <div className="space-y-6 font-sans">
      
      {/* List Header */}
      <div className="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-headline font-bold text-primary text-lg flex items-center gap-2">
            <History className="w-5 h-5 text-secondary" />
            <span>Historial de Cálculos Recientes</span>
          </h3>
          <p className="text-xs text-on-surface-variant">
            Historial temporal guardado automáticamente en el navegador para auditorías rápidas
          </p>
        </div>

        {logs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 bg-red-50 border border-red-200 hover:border-red-600 py-2 px-3 rounded flex items-center gap-1.5 transition-all outline-none cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Borrar Todo</span>
          </button>
        )}
      </div>

      {/* Logs Render Container */}
      {logs.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-outline-variant/60 text-center space-y-4">
          <div className="bg-surface-container-low p-4 rounded-full inline-block shadow-2xs">
            <History className="w-8 h-8 text-outline animate-spin-slow" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h4 className="font-headline font-bold text-primary text-sm">El historial se encuentra vacío</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Realice cálculos en el panel de <b>Calculadoras</b> y los resultados se guardarán de forma permanente aquí para que pueda utilizarlos, compararlos o transformarlos en informes técnicos imprimibles.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {logs.map((log) => {
            const isCaida = log.type === 'caida_tension';
            return (
              <div 
                key={log.id} 
                className="bg-white rounded-xl border border-outline-variant/60 shadow-xs p-5 hover:border-primary/35 transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top stamp */}
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded tracking-wide uppercase flex items-center gap-1 ${
                      isCaida 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {isCaida ? <Layers className="w-3 h-3" /> : <Power className="w-3 h-3" />}
                      <span>{isCaida ? 'Caída RIC 03' : 'Ley de Watt'}</span>
                    </span>
                    
                    <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{log.timestamp}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-headline font-bold text-primary text-sm mb-3">
                    {log.title}
                  </h4>

                  {/* Technical Inputs Parameters Details */}
                  <div className="bg-surface p-3 rounded-lg border border-outline-variant/40 text-xs mb-4 grid grid-cols-2 gap-x-4 gap-y-2 font-medium">
                    {isCaida ? (
                      <>
                        <div className="text-on-surface-variant">Largo Tramo: <span className="font-bold text-on-surface">{log.inputs.largoTramo} m</span></div>
                        <div className="text-on-surface-variant">Corriente: <span className="font-bold text-on-surface">{log.inputs.cargaCorriente} A</span></div>
                        <div className="text-on-surface-variant">Material: <span className="font-bold text-on-surface uppercase">{log.inputs.material}</span></div>
                        <div className="text-on-surface-variant">Sección Conductor: <span className="font-bold text-on-surface">{log.inputs.seccionConductor} mm²</span></div>
                      </>
                    ) : (
                      <>
                        <div className="text-on-surface-variant">Red: <span className="font-bold text-on-surface uppercase">{log.inputs.tipoRed}</span></div>
                        <div className="text-on-surface-variant">Potencia Total: <span className="font-bold text-on-surface">{log.inputs.potenciaTotal} W</span></div>
                        <div className="text-on-surface-variant italic col-span-2 text-[10px]">Factor de Potencia cos φ: {log.inputs.cosPhi}</div>
                      </>
                    )}
                  </div>

                  {/* Calculated Output Results summary */}
                  <div className="p-3 bg-surface-container/70 rounded-lg border border-outline-variant/30 text-xs flex justify-between items-center mb-4">
                    <span className="font-semibold text-primary">Resultado Calculado:</span>
                    {isCaida ? (
                      <div className="text-right">
                        <p className="font-bold text-primary text-sm">
                          {log.results.caidaEstimadaV} V ({log.results.porcentajePerdida}%)
                        </p>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded leading-none inline-block ${
                          log.results.cumpleNormativa
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {log.results.cumpleNormativa ? 'CUMPLE' : 'RECHAZADO'}
                        </span>
                      </div>
                    ) : (
                      <p className="font-bold text-secondary text-sm">
                        {log.results.corrienteResultanteA} A
                      </p>
                    )}
                  </div>

                </div>

                {/* Bottom actions panel */}
                <div className="flex gap-2.5 pt-3 border-t border-outline-variant/30">
                  <button
                    onClick={() => onReloadInputs(log)}
                    className="flex-1 text-xs font-bold text-primary hover:text-white bg-primary/5 hover:bg-primary border border-primary/20 hover:border-primary py-2 px-3 rounded flex items-center justify-center gap-1 transition-all outline-none cursor-pointer"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Cargar Parámetros</span>
                  </button>
                  <button
                    onClick={() => onDeleteLog(log.id)}
                    className="text-xs text-on-surface-variant hover:text-red-600 p-2 hover:bg-red-50 rounded border border-outline-variant/30 hover:border-red-200 transition-all outline-none cursor-pointer"
                    title="Eliminar de historial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Caution alert message */}
      <div className="flex items-start gap-2 text-on-surface-variant text-xs bg-surface-container-low p-4 rounded-lg border-l-4 border-outline transition-all hover:bg-surface-container shadow-2xs">
        <AlertCircle className="w-5 h-5 text-outline flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-primary">Nota de Almacenamiento:</p>
          <p className="leading-relaxed text-[11px]">
            La información se almacena localmente de forma segura en las llaves criptográficas del dispositivo. No enviamos datos de sus proyectos ni credenciales de clientes a servidores externos, garantizando confidencialidad industrial.
          </p>
        </div>
      </div>

    </div>
  );
}
