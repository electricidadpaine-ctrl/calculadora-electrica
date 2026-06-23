import React, { useState, useEffect } from 'react';
import { Bolt, HelpCircle, RefreshCw, Layers, Sparkles } from 'lucide-react';
import { CONDUCTORS, calculateVoltageDrop } from '../data';
import { CalculationHistoryItem } from '../types';

interface VoltageDropCalculatorProps {
  onAddToHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  syncCurrentValue?: number; // incoming synced current from Ley de Watt
  onClearSync: () => void;
}

export default function VoltageDropCalculator({ 
  onAddToHistory, 
  syncCurrentValue,
  onClearSync
}: VoltageDropCalculatorProps) {
  // Field values
  const [tipoRed, setTipoRed] = useState<'monofasico' | 'trifasico'>('monofasico');
  const [cargaCorriente, setCargaCorriente] = useState<string>('20');
  const [largoTramo, setLargoTramo] = useState<string>('30');
  const [seccionConductor, setSeccionConductor] = useState<number>(2.5); // Default 2.5 mm² (14 AWG)
  const [material, setMaterial] = useState<'cobre' | 'aluminio'>('cobre');
  const [limiteMaximo, setLimiteMaximo] = useState<number>(3); // 3% for Alimentadores, 5% for Circuitos finales

  // Interactive animation states
  const [loading, setLoading] = useState(false);
  const [resultsActive, setResultsActive] = useState(true);
  
  // Real-time calculated states
  const [currentResults, setCurrentResults] = useState({
    caidaV: 4.25,
    porcentaje: 1.93,
    cumple: true
  });

  // Calculate immediately or on click
  const runCalculation = (isFormChange = false) => {
    const currentA = parseFloat(cargaCorriente) || 0;
    const lengthM = parseFloat(largoTramo) || 0;
    
    const { caidaV, porcentaje } = calculateVoltageDrop({
      tipoRed,
      cargaCorriente: currentA,
      largoTramo: lengthM,
      seccionConductor,
      material
    });

    const cumple = porcentaje <= limiteMaximo;

    if (!isFormChange) {
      setLoading(true);
      setResultsActive(false);
      
      setTimeout(() => {
        setLoading(false);
        setCurrentResults({ caidaV, porcentaje, cumple });
        setResultsActive(true);

        // Add this calculation to session history
        const selectedConductor = CONDUCTORS.find(c => c.value === seccionConductor);
        onAddToHistory({
          type: 'caida_tension',
          title: `Caída de Tensión - Conductor ${selectedConductor?.label} (${selectedConductor?.awg})`,
          inputs: {
            tipoRed,
            cargaCorriente: currentA,
            largoTramo: lengthM,
            seccionConductor,
            material,
            limiteMaximo
          },
          results: {
            caidaEstimadaV: caidaV,
            porcentajePerdida: porcentaje,
            cumpleNormativa: cumple
          }
        });
      }, 700);
    } else {
      // Background updating on inputs so it stays reactive but quiet
      setCurrentResults({ caidaV, porcentaje, cumple });
    }
  };

  // Sync current value if passed from Ley de Watt option
  useEffect(() => {
    if (syncCurrentValue !== undefined && syncCurrentValue > 0) {
      setCargaCorriente(String(syncCurrentValue));
      // Re-trigger calculation automatically in real time
      const lengthM = parseFloat(largoTramo) || 0;
      const { caidaV, porcentaje } = calculateVoltageDrop({
        tipoRed,
        cargaCorriente: syncCurrentValue,
        largoTramo: lengthM,
        seccionConductor,
        material
      });
      setCurrentResults({
        caidaV,
        porcentaje,
        cumple: porcentaje <= limiteMaximo
      });
      onClearSync();
    }
  }, [syncCurrentValue]);

  // Handle live updates
  const handleInputChange = () => {
    // Perform background live calculate without spinner so state makes sense
    const currentA = parseFloat(cargaCorriente) || 0;
    const lengthM = parseFloat(largoTramo) || 0;
    
    const { caidaV, porcentaje } = calculateVoltageDrop({
      tipoRed,
      cargaCorriente: currentA,
      largoTramo: lengthM,
      seccionConductor,
      material
    });

    setCurrentResults({
      caidaV,
      porcentaje,
      cumple: porcentaje <= limiteMaximo
    });
  };

  useEffect(() => {
    handleInputChange();
  }, [tipoRed, seccionConductor, material, limiteMaximo, cargaCorriente, largoTramo]);

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl border border-outline-variant/60 calculation-card relative overflow-hidden flex flex-col justify-between font-sans shadow-xs">
      <div>
        {/* Header Block */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-secondary-container p-3.5 rounded-lg text-on-secondary-container shadow-xs">
              <Bolt className="w-6 h-6 text-primary" fill="currentColor" />
            </div>
            <div>
              <h2 className="font-headline text-lg md:text-xl font-bold text-primary tracking-tight">
                Caída de Tensión Normativa (RIC 03)
              </h2>
              <p className="text-on-surface-variant text-xs font-semibold">
                Verifica cumplimiento máximo permitido (3% o 5%)
              </p>
            </div>
          </div>
          
          <div className="text-[10px] bg-primary/5 text-primary border border-primary/10 px-2 py-1 rounded font-bold tracking-wide uppercase">
            SEC Chile
          </div>
        </div>

        {/* Sync badge info */}
        {syncCurrentValue && (
          <div className="mb-4 bg-secondary-container/30 border border-secondary-container text-on-secondary-container p-2.5 rounded text-xs font-semibold flex items-center justify-between animate-pulse">
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-primary" />
              Se cargó corriente calculada: {syncCurrentValue} A
            </span>
            <button 
              onClick={onClearSync} 
              className="text-xs text-primary underline"
            >
              Ok
            </button>
          </div>
        )}

        {/* Inputs Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          
          {/* Tipo de Red */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <span>Tipo de Red</span>
              <span className="text-red-500">*</span>
            </label>
            <select 
              value={tipoRed}
              onChange={(e) => setTipoRed(e.target.value as 'monofasico' | 'trifasico')}
              className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring text-on-surface text-sm transition-all focus:bg-white cursor-pointer"
            >
              <option value="monofasico">Monofásico (220V)</option>
              <option value="trifasico">Trifásico (380V)</option>
            </select>
          </div>

          {/* Carga corriente */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <span>Carga (Corriente)</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                value={cargaCorriente}
                onChange={(e) => setCargaCorriente(e.target.value)}
                placeholder="20"
                type="number"
                min="0.1"
                step="any"
                className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring pr-10 text-sm transition-all focus:bg-white"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xs">
                A
              </span>
            </div>
          </div>

          {/* Largo del Tramo */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <span>Largo del Tramo</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                value={largoTramo}
                onChange={(e) => setLargoTramo(e.target.value)}
                placeholder="30"
                type="number"
                min="1"
                className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring pr-10 text-sm transition-all focus:bg-white"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xs">
                m
              </span>
            </div>
          </div>

          {/* Sección Conductor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <span>Sección Conductor</span>
              <span className="text-red-500">*</span>
            </label>
            <select 
              value={seccionConductor}
              onChange={(e) => setSeccionConductor(Number(e.target.value))}
              className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring text-on-surface text-sm transition-all focus:bg-white cursor-pointer"
            >
              {CONDUCTORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label} ({c.awg})
                </option>
              ))}
            </select>
          </div>

          {/* Material (Additional premium setting) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide flex items-center gap-1">
              <span>Material Conductor</span>
              <HelpCircle className="w-3.5 h-3.5 text-on-surface-variant/70 cursor-help" title="Cobre tiene rho ~0.0178, Aluminio tiene rho ~0.0282" />
            </label>
            <select 
              value={material}
              onChange={(e) => setMaterial(e.target.value as 'cobre' | 'aluminio')}
              className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring text-on-surface text-sm transition-all focus:bg-white cursor-pointer"
            >
              <option value="cobre">Cobre (Resistivo estándar)</option>
              <option value="aluminio">Aluminio (Industrial)</option>
            </select>
          </div>

          {/* Límite Reglamentario (Additional premium setting) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wide flex items-center gap-1">
              <span>Límite Máx. Permitido</span>
              <HelpCircle className="w-3.5 h-3.5 text-on-surface-variant/70 cursor-help" title="RIC 03 exige Alimentadores máx 3% de pérdida, Circuitos finales máx 5%" />
            </label>
            <select 
              value={limiteMaximo}
              onChange={(e) => setLimiteMaximo(Number(e.target.value))}
              className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg input-focus-ring text-on-surface text-sm transition-all focus:bg-white cursor-pointer"
            >
              <option value={3}>3% - Alimentadores y Subalimentadores</option>
              <option value={5}>5% - Circuitos Finales (Alumbrado/Fuerza)</option>
              <option value={1.5}>1.5% - Mayor rendimiento exigente</option>
            </select>
          </div>

          {/* Calculate Trigger Button */}
          <div className="md:col-span-2 pt-2">
            <button 
              onClick={() => runCalculation(false)}
              disabled={loading}
              type="button" 
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-headline font-semibold text-sm hover:bg-primary-container transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] relative overflow-hidden group cursor-pointer disabled:opacity-80"
              id="btn-calc"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Procesando pérdida...</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4" />
                    <span>Calcular Pérdidas</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 h-full w-0 bg-white/10 transition-[width] duration-300 ease-out group-hover:w-full"></div>
            </button>
          </div>

        </form>
      </div>

      {/* Result Indicator Area */}
      <div className="mt-8 p-5 bg-surface-container rounded-xl border border-primary/10 transition-colors hover:border-primary/25">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          {/* Result 1: Caída de Tensión (Volts) */}
          <div 
            className={`transition-all duration-500 transform ${
              resultsActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
            }`}
            id="res-val1"
          >
            <p className="text-on-surface-variant font-sans font-bold text-xs tracking-wider uppercase mb-1">
              Caída Estimada
            </p>
            <p className="text-3xl font-bold text-primary">
              {loading ? "..." : `${currentResults.caidaV} `}
              <span className="text-base font-medium text-primary/80">V</span>
            </p>
          </div>

          {/* Result 2: Porcentaje de Pérdida (%) */}
          <div 
            className={`border-t md:border-t-0 md:border-x border-outline-variant/60 pt-4 md:pt-0 transition-all duration-500 delay-100 transform ${
              resultsActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
            }`}
            id="res-val2"
          >
            <p className="text-on-surface-variant font-sans font-bold text-xs tracking-wider uppercase mb-1">
              Porcentaje de Pérdida
            </p>
            <p className={`text-3xl font-bold ${currentResults.cumple ? 'text-secondary' : 'text-red-600'}`}>
              {loading ? "..." : `${currentResults.porcentaje} `}
              <span className="text-base font-medium opacity-80">%</span>
            </p>
          </div>

          {/* Result 3: Dictamen (SEC) */}
          <div 
            className={`border-t md:border-t-0 pt-4 md:pt-0 flex flex-col justify-center items-center transition-all duration-500 delay-200 transform ${
              resultsActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
            }`}
            id="res-val3"
          >
            <p className="text-on-surface-variant font-sans font-bold text-xs tracking-wider uppercase mb-1.5">
              Dictamen (SEC)
            </p>
            {loading ? (
              <span className="text-sm text-outline animate-pulse font-bold tracking-widest">
                VERIFICANDO...
              </span>
            ) : currentResults.cumple ? (
              <span className="text-[12px] font-extrabold text-green-700 tracking-wider bg-green-100/90 border border-green-200 inline-block px-3 py-1.5 rounded uppercase shadow-2xs">
                CUMPLE NORMATIVA
              </span>
            ) : (
              <span className="text-[12px] font-extrabold text-red-700 tracking-wider bg-red-100/90 border border-red-200 inline-block px-3 py-1.5 rounded uppercase shadow-2xs">
                FUERA DE NORMA
              </span>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
