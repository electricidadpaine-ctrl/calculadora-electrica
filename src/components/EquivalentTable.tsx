import React from 'react';
import { Info, BadgeCheck } from 'lucide-react';
import { CONDUCTORS } from '../data';

export default function EquivalentTable() {
  return (
    <section className="bg-white p-6 md:p-8 rounded-xl border border-outline-variant/60 calculation-card font-sans shadow-xs">
      
      {/* Title block with Lucide scale/measure icon */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-secondary-container p-3.5 rounded-lg text-on-secondary-container shadow-2xs">
          {/* Using custom style alignment or Zap as a placeholder for straight measurement */}
          <BadgeCheck className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="font-headline text-lg md:text-xl font-bold text-primary tracking-tight">
            Guía de Equivalencias AWG a mm²
          </h2>
          <p className="text-on-surface-variant text-xs font-semibold">
            Tabla estándar para importación de equipos según normativa US/Chile
          </p>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto rounded-lg border border-outline-variant/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b-2 border-primary/10">
              <th className="p-4 font-sans font-bold text-xs text-primary uppercase tracking-widest">
                Calibre AWG
              </th>
              <th className="p-4 font-sans font-bold text-xs text-primary uppercase tracking-widest">
                Sección Comercial (mm²)
              </th>
              <th className="p-4 font-sans font-bold text-xs text-primary uppercase tracking-widest">
                Corriente Máx (Ampacidad A)
              </th>
              <th className="p-4 font-sans font-bold text-xs text-primary uppercase tracking-widest">
                Uso Recomendado Habitual
              </th>
              <th className="p-4 font-sans font-bold text-xs text-primary uppercase tracking-widest">
                Normativa SEC
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {CONDUCTORS.slice(0, 7).map((conductor, index) => (
              <tr 
                key={conductor.value} 
                className={`border-b border-outline-variant/30 hover:bg-surface-container-low/50 transition-colors duration-150 ${
                  index % 2 === 1 ? 'bg-surface/10' : ''
                }`}
              >
                <td className="p-4 font-bold text-primary text-sm">
                  {conductor.awg}
                </td>
                <td className="p-4 font-sans font-medium text-on-surface">
                  {conductor.label}
                </td>
                <td className="p-4 font-mono font-semibold text-secondary">
                  {conductor.ampacity} A
                </td>
                <td className="p-4 text-on-surface-variant font-medium">
                  {conductor.recommendedUse}
                </td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded shadow-3xs uppercase tracking-wide">
                    Válido
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status bottom alert box */}
      <div className="mt-6 flex items-start gap-3 text-on-surface-variant text-xs bg-surface-container-low p-4 rounded-lg border-l-4 border-secondary transition-all hover:bg-surface-container shadow-2xs">
        <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-primary">Información sobre Tolerancias de Fabricantes:</p>
          <p className="leading-relaxed">
            La conversión real de resistencia física depende firmemente del trenzado interno y porcentaje de aleación cobre-aluminio del fabricante. Verifique siempre la ficha de certificación técnica SEC del conductor antes del tendido físico.
          </p>
        </div>
      </div>

    </section>
  );
}
