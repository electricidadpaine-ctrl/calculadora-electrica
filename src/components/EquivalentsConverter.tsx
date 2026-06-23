import React, { useState, useEffect } from 'react';
import { Layers, HelpCircle, Activity, Info, FileCode, CheckCircle } from 'lucide-react';
import { CONDUCTORS } from '../data';

export default function EquivalentsConverter() {
  const [inputType, setInputType] = useState<'awg' | 'metric'>('awg');
  const [selectedAwg, setSelectedAwg] = useState<string>('14 AWG');
  const [customMetric, setCustomMetric] = useState<string>('2.5');

  // Matched outputs
  const [matchedConductor, setMatchedConductor] = useState(CONDUCTORS[1]); // initially 2.5 mm² / 14 AWG
  const [exactSection, setExactSection] = useState<number>(2.08); // real physical equivalent of 14 AWG

  // Conversion rates (American Wire Gauge actual values vs. standard metric commercial sizes in Chile)
  const awgFractions: { [key: string]: { exactMm2: number; commercialMm2: number } } = {
    "16 AWG": { exactMm2: 1.31, commercialMm2: 1.5 },
    "14 AWG": { exactMm2: 2.08, commercialMm2: 2.5 },
    "12 AWG": { exactMm2: 3.31, commercialMm2: 4.0 },
    "10 AWG": { exactMm2: 5.26, commercialMm2: 6.0 },
    "8 AWG": { exactMm2: 8.36, commercialMm2: 10.0 },
    "6 AWG": { exactMm2: 13.3, commercialMm2: 16.0 },
    "4 AWG": { exactMm2: 21.15, commercialMm2: 25.0 },
    "2 AWG": { exactMm2: 33.62, commercialMm2: 35.0 },
  };

  useEffect(() => {
    if (inputType === 'awg') {
      const fraction = awgFractions[selectedAwg] || awgFractions["14 AWG"];
      setExactSection(fraction.exactMm2);
      
      const found = CONDUCTORS.find(c => c.value === fraction.commercialMm2);
      if (found) {
        setMatchedConductor(found);
      }
    } else {
      // Find the closest equivalent for custom metric input that is equal or larger (conservative engineering)
      const numericVal = parseFloat(customMetric) || 1.5;
      
      // Find closest standard conductor that satisfies this value (greater or equal)
      let found = CONDUCTORS.find(c => c.value >= numericVal);
      if (!found) {
        // If larger than all, default to largest
        found = CONDUCTORS[CONDUCTORS.length - 1];
      }
      setMatchedConductor(found);

      // Estimate average exact AWG section by scale representation
      const matchingFraction = Object.entries(awgFractions).find(([awgKey, frac]) => frac.commercialMm2 === found?.value);
      if (matchingFraction) {
        setExactSection(matchingFraction[1].exactMm2);
        setSelectedAwg(matchingFraction[0]);
      } else {
        setExactSection(Number((numericVal * 0.85).toFixed(2))); // approximation
      }
    }
  }, [inputType, selectedAwg, customMetric]);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Upper informational head */}
      <div className="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-xs">
        <h3 className="font-headline font-bold text-primary text-lg mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-secondary" />
          <span>Conversor Interactivo AWG a mm²</span>
        </h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          En el mercado chileno se importan muchos dispositivos y cargas (especialmente de climatización y automatización de EE.UU.) rotulados en calibre americano <b>AWG</b>. La superintendencia SEC exige traducir y respaldar su tendido bajo secciones comerciales normalizadas en milímetros cuadrados <b>mm²</b>. Diseñe de forma segura a continuación.
        </p>
      </div>

      {/* Main interactive grid panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column - Select input types (spans 5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-outline-variant/60 space-y-6">
          <h4 className="font-headline font-bold text-sm text-primary border-b border-outline-variant/40 pb-3">
            Opciones de Conversión
          </h4>

          {/* Selector toggle */}
          <div className="flex bg-surface-container p-1 rounded-lg">
            <button
              onClick={() => setInputType('awg')}
              className={`flex-1 text-center py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                inputType === 'awg' 
                  ? 'bg-white text-primary shadow-2xs' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Calibre AWG a mm²
            </button>
            <button
              onClick={() => setInputType('metric')}
              className={`flex-1 text-center py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                inputType === 'metric' 
                  ? 'bg-white text-primary shadow-2xs' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              mm² Comercial a AWG
            </button>
          </div>

          {/* Form control based on Selected type */}
          {inputType === 'awg' ? (
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wide">
                Calibre de Conductor AWG
              </label>
              <select
                value={selectedAwg}
                onChange={(e) => setSelectedAwg(e.target.value)}
                className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg text-sm input-focus-ring cursor-pointer"
              >
                {Object.keys(awgFractions).map((awg) => (
                  <option key={awg} value={awg}>{awg}</option>
                ))}
              </select>
              <p className="text-[10px] text-on-surface-variant/80 italic pt-1 leading-relaxed">
                * El calibre AWG representa la medida de masa trefilada americana de la asociación ASTM.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wide">
                Sección Calculada / Requerida (mm²)
              </label>
              <div className="relative">
                <input
                  value={customMetric}
                  onChange={(e) => setCustomMetric(e.target.value)}
                  placeholder="2.5"
                  type="number"
                  min="0.5"
                  max="120"
                  step="any"
                  className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg text-sm pr-12 input-focus-ring"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xs">
                  mm²
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant/80 italic pt-1 leading-relaxed">
                * Buscaremos el conductor comercial en Chile inmediatamente superior para garantizar seguridad térmica.
              </p>
            </div>
          )}

          {/* Context warning badge */}
          <div className="bg-secondary-container/20 border border-secondary-container/40 p-4 rounded-lg flex gap-3 text-xs">
            <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-on-secondary-container text-[11px]">
              <p className="font-bold">Regla de Conductancia Térmica:</p>
              <p className="leading-relaxed leading-normal">
                En Chile se prohíbe pasar cables sin normalizar o importar rollos no autorizados por la SEC. Se debe documentar la equivalencia exacta en planos de proyecto TE1.
              </p>
            </div>
          </div>
        </div>

        {/* Right column - Output equivalents and metrics (spans 7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-outline-variant/60 space-y-6">
          <h4 className="font-headline font-bold text-sm text-primary border-b border-outline-variant/40 pb-3 flex justify-between items-center">
            <span>Resultados de Homologación</span>
            <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-extrabold uppercase tracking-widest">
              Equivalencia Segura
            </span>
          </h4>

          {/* Major output summary panel */}
          <div className="p-6 bg-surface-container rounded-xl grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-on-surface-variant font-bold text-[10px] uppercase tracking-wider mb-1">
                Física Real AWG
              </p>
              <p className="text-2.5xl font-extrabold text-primary">
                {exactSection} <span className="text-xs font-semibold">mm²</span>
              </p>
              <p className="text-xs text-on-surface-variant font-medium mt-1">
                ({selectedAwg})
              </p>
            </div>

            <div className="border-l border-outline-variant/50">
              <p className="text-on-surface-variant font-bold text-[10px] uppercase tracking-wider mb-1">
                Mínimo Recomendado SEC
              </p>
              <p className="text-2.5xl font-extrabold text-secondary">
                {matchedConductor.value} <span className="text-xs font-semibold">mm²</span>
              </p>
              <p className="text-xs text-on-surface-variant font-medium mt-1">
                (Sección Comercial standard)
              </p>
            </div>
          </div>

          {/* Conductor specifications overview */}
          <div className="space-y-3">
            <p className="font-bold text-xs text-primary uppercase tracking-wide">
              Ficha Técnica del Conductor Recomendado:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              
              {/* Ampacity */}
              <div className="p-3.5 rounded bg-surface border border-outline-variant/40 flex items-start gap-2.5">
                <Activity className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-primary">Corriente Máxima Permitida (Ampacidad)</p>
                  <p className="text-lg font-extrabold text-secondary mt-1">
                    {matchedConductor.ampacity} A <span className="text-[10px] font-normal text-on-surface-variant">(en ducto)</span>
                  </p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5 leading-normal">
                    Límite máximo térmico antes del deterioro de aislación EVA.
                  </p>
                </div>
              </div>

              {/* Linear Resistance */}
              <div className="p-3.5 rounded bg-surface border border-outline-variant/40 flex items-start gap-2.5">
                <FileCode className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-primary">Resistencia Lineal (20°C)</p>
                  <p className="text-lg font-extrabold text-primary mt-1">
                    {matchedConductor.resistance} <span className="text-xs font-semibold">Ω/km</span>
                  </p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5 leading-normal">
                    Determina la pérdida directa de resistencia óhmica por caída de tensión.
                  </p>
                </div>
              </div>

            </div>

            {/* Recommended use */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 space-y-1">
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider block">
                Aplicaciones Reglamentarias en Chile:
              </span>
              <p className="text-xs font-bold text-primary">
                {matchedConductor.recommendedUse}
              </p>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                Bajo los pliegos <b>RIC 07</b> y <b>RIC 10</b>, cada circuito comercial debe limitar la cantidad de enchufes y centros de luz según esta sección mínima de conductor de cobre.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
