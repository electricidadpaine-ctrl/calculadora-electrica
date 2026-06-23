import React, { useState, useEffect } from 'react';
import { Power, Send, HelpCircle, ArrowRight } from 'lucide-react';
import { calculateCurrent } from '../data';
import { CalculationHistoryItem } from '../types';

interface PowerCurrentCalculatorProps {
  onAddToHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  onSyncToVoltageDrop: (calculatedCurrent: number) => void;
}

export default function PowerCurrentCalculator({ 
  onAddToHistory, 
  onSyncToVoltageDrop 
}: PowerCurrentCalculatorProps) {
  // Input states
  const [sistema, setSistema] = useState<'monofasico' | 'trifasico'>('monofasico');
  const [potenciaTotal, setPotenciaTotal] = useState<string>('3000');
  const [potenciaUnidad, setPotenciaUnidad] = useState<'W' | 'kW'>('W');
  const [cosPhi, setCosPhi] = useState<string>('1.0'); // default resistive load

  // Output state
  const [corrienteResultante, setCorrienteResultante] = useState<number>(13.63);

  // Trigger calculations on state updates
  useEffect(() => {
    let wattsValue = parseFloat(potenciaTotal) || 0;
    if (potenciaUnidad === 'kW') {
      wattsValue = wattsValue * 1000;
    }

    const powerFactor = parseFloat(cosPhi) || 1.0;

    const currentA = calculateCurrent({
      tipoRed: sistema,
      potenciaTotal: wattsValue,
      cosPhi: powerFactor
    });

    setCorrienteResultante(currentA);
  }, [sistema, potenciaTotal, potenciaUnidad, cosPhi]);

  // Handle syncing to Voltage Drop and adding to audit log
  const handleTransferAndSave = () => {
    let wattsValue = parseFloat(potenciaTotal) || 0;
    if (potenciaUnidad === 'kW') {
      wattsValue = wattsValue * 1000;
    }
    const powerFactor = parseFloat(cosPhi) || 1.0;

    // Save to history
    onAddToHistory({
      type: 'ley_watt',
      title: `Conversor Potencia - ${potenciaTotal} ${potenciaUnidad} (${sistema === 'monofasico' ? '220V' : '380V'})`,
      inputs: {
        tipoRed: sistema,
        potenciaTotal: wattsValue,
        cosPhi: powerFactor
      },
      results: {
        corrienteResultanteA: corrienteResultante
      }
    });

    // Transfer value
    onSyncToVoltageDrop(corrienteResultante);
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl border border-outline-variant/60 calculation-card flex flex-col justify-between font-sans shadow-xs">
      <div>
        {/* Header Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-primary/5 p-3.5 rounded-lg text-primary shadow-2xs">
            <Power className="w-6 h-6 text-primary" fill="currentColor" />
          </div>
          <div>
            <h3 className="font-headline text-lg md:text-xl font-bold text-primary tracking-tight">
              Potencia y Corriente
            </h3>
            <p className="text-on-surface-variant text-xs font-semibold">
              Conversor Ley de Watt
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          
          {/* Sistema selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide">
              Sistema / Voltaje
            </label>
            <select 
              value={sistema}
              onChange={(e) => setSistema(e.target.value as 'monofasico' | 'trifasico')}
              className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring text-on-surface text-sm transition-all focus:bg-white cursor-pointer"
            >
              <option value="monofasico">Monofásico (220V)</option>
              <option value="trifasico">Trifásico (380V)</option>
            </select>
          </div>

          {/* Potencia value and units selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide flex justify-between">
              <span>Potencia Total</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPotenciaUnidad('W')}
                  className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                    potenciaUnidad === 'W' 
                      ? 'bg-primary text-white' 
                      : 'bg-surface border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  Watts (W)
                </button>
                <button
                  type="button"
                  onClick={() => setPotenciaUnidad('kW')}
                  className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                    potenciaUnidad === 'kW' 
                      ? 'bg-primary text-white' 
                      : 'bg-surface border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  kiloWatts (kW)
                </button>
              </div>
            </label>
            
            <div className="relative">
              <input 
                value={potenciaTotal}
                onChange={(e) => setPotenciaTotal(e.target.value)}
                placeholder={potenciaUnidad === 'W' ? "3000" : "3.0"}
                type="number"
                min="1"
                className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring pr-12 text-sm transition-all focus:bg-white"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xs">
                {potenciaUnidad}
              </span>
            </div>
          </div>

          {/* Factor de Potencia (cos phi) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide flex items-center gap-1">
              <span>Factor de Potencia (cos φ)</span>
              <HelpCircle className="w-3.5 h-3.5 text-on-surface-variant/70 cursor-help" title="Un valor de 1.0 significa carga 100% resistiva. Motores inductivos suelen fluctuar entre 0.8 y 0.9." />
            </label>
            <select
              value={cosPhi}
              onChange={(e) => setCosPhi(e.target.value)}
              className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring text-on-surface text-sm transition-all focus:bg-white cursor-pointer"
            >
              <option value="1.0">1.0 (Carga puramente resistiva / Calefactores)</option>
              <option value="0.93">0.93 (Instalación comercial promedio)</option>
              <option value="0.90">0.90 (Sistemas con motores de alta eficiencia)</option>
              <option value="0.85">0.85 (Instalaciones inductivas habituales SEC)</option>
              <option value="0.80">0.80 (Motores pequeños / Bombas de agua)</option>
            </select>
          </div>

          {/* Result Area */}
          <div className="p-4 bg-surface-container rounded-lg text-center transition-all duration-300 hover:bg-surface-container-high/80 hover:shadow-inner cursor-default">
            <p className="text-on-surface-variant font-bold text-[11px] tracking-wider uppercase mb-1">
              Corriente Resultante
            </p>
            <p className="text-3xl font-extrabold text-secondary tracking-tight">
              {corrienteResultante} <span className="text-lg font-semibold">A</span>
            </p>
          </div>

          {/* Transfer Synchronization Button */}
          {corrienteResultante > 0 && (
            <button
              onClick={handleTransferAndSave}
              type="button"
              className="w-full text-xs font-semibold text-primary hover:text-white bg-primary/5 hover:bg-primary border border-primary/20 hover:border-primary py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-all outline-none cursor-pointer"
              title="Copia este amperaje en el calculador de pérdidas izquierdo"
            >
              <span>Usar Amperaje en Caída de Tensión</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

        </div>
      </div>

      <div className="mt-6">
        <p className="text-[10px] text-on-surface-variant/80 italic text-center leading-relaxed">
          * Se calcula mediante la Ley de Watt. Para sistemas trifásicos se utiliza divisor térmico balanceado de línea con factor multiplicador de 1.732 (√3).
        </p>
      </div>
    </section>
  );
}
