import React, { useState } from 'react';
import { Search, Info, Award, CheckCircle, FileText, ChevronRight, HelpCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { PLIEGOS_RIC } from '../data';
import { PliegoRIC } from '../types';

export default function RegulatoryGuidelines() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPliego, setSelectedPliego] = useState<string | null>(null);

  // Filter Pliegos based on search term
  const filteredPliegos = PLIEGOS_RIC.filter(pliego => 
    pliego.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pliego.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pliego.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pliego.keyPoints.some(pt => pt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10 font-sans">
      
      {/* Intro Banner with SEC Info */}
      <section className="bg-primary text-white p-6 md:p-10 rounded-2xl relative overflow-hidden shadow-md">
        {/* Abstract design elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-12 pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-block bg-secondary-container text-on-secondary-container px-3.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
            Normas Eléctricas SEC Chile
          </div>
          <h2 className="font-headline text-2xl md:text-3.5xl font-extrabold tracking-tight">
            Pliegos Técnicos de Consumo Electrónico (RIC)
          </h2>
          <p className="text-primary-fixed-dim text-sm md:text-base leading-relaxed font-normal">
            En Chile, las instalaciones eléctricas de consumo están regidas bajo el nuevo Reglamento de Seguridad SEC, compuesto por 19 Pliegos Técnicos RIC. Este calculador integra los mandatos de caída de tensión y sección mínima del conductor para resguardar la seguridad humana y el rendimiento eficiente.
          </p>
        </div>
      </section>

      {/* Critical Standards Highlights Cards (Bento style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* RIC 03 highlight (Voltage Drop) */}
        <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-xs border-l-4 border-l-primary flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">
                PLIEGO CRÍTICO
              </span>
              <h3 className="font-headline font-bold text-primary text-base">
                RIC 03 - Pérdidas Máximas Permitidas
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              El pliego <b>RIC 03</b> regula los límites de caída de tensión térmica calculable. Superar estos porcentajes provoca sobrecalentamiento de cables, pérdida millonaria de vatios y daño irreparable a electrodomésticos inductivos.
            </p>
            
            <div className="mt-4 space-y-2 bg-surface p-3.5 rounded border border-outline-variant/40 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                <span className="font-semibold text-on-surface">Alimentadores Principales:</span>
                <span className="font-bold text-primary px-1.5 py-0.5 bg-primary/5 rounded">Máximo 3.0 %</span>
              </div>
              <div className="flex justify-between items-center pt-1.5">
                <span className="font-semibold text-on-surface">Circuitos Interiores/Finales:</span>
                <span className="font-bold text-secondary px-1.5 py-0.5 bg-secondary-container/20 rounded">Máximo 5.0 %</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-on-surface-variant/80 italic mt-3">
            * Nota: Ambas tolerancias no son acumulativas de manera paralela arbitraria en el mismo tablero.
          </p>
        </div>

        {/* RIC 04 highlight (Wire Colors) */}
        <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-xs border-l-4 border-l-secondary flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-secondary bg-secondary-container/25 px-2 py-1 rounded text-on-secondary-container">
                CÓDIGO DE COLORES
              </span>
              <h3 className="font-headline font-bold text-primary text-base">
                RIC 04 - Cableado Normativos Chile
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              La correcta identificación de fases ayuda a la mantención posterior y previene cortocircuitos mortales durante la ampliación de tableros.
            </p>
            
            {/* Live Chilean code representation colors */}
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] font-bold text-center">
              <div className="bg-blue-600 text-white py-1.5 px-2 rounded shadow-2xs">
                Fase 1: Azul (A)
              </div>
              <div className="bg-neutral-900 text-white py-1.5 px-2 rounded shadow-2xs">
                Fase 2: Negro (B)
              </div>
              <div className="bg-red-600 text-white py-1.5 px-2 rounded shadow-2xs">
                Fase 3: Rojo (C)
              </div>
              <div className="bg-white text-neutral-800 border border-outline-variant py-1.5 px-2 rounded shadow-2xs">
                Neutro: Blanco
              </div>
              <div className="bg-green-600 text-white py-1.5 px-2 rounded col-span-2 lg:col-span-1 shadow-2xs">
                Tierra: Verde
              </div>
            </div>
          </div>
          <p className="text-[10px] text-on-surface-variant/80 italic mt-3">
            * Mandatario para toda instalación de consumo declarada activa ante la SEC.
          </p>
        </div>

      </div>

      {/* Interactive Pliegos Explorer */}
      <section className="bg-white p-6 md:p-8 rounded-xl border border-outline-variant/60">
        
        {/* Search header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-headline font-bold text-lg text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              <span>Explorador de Pliegos RIC</span>
            </h3>
            <p className="text-xs text-on-surface-variant">
              Consulte directrices, descripciones, y exigencias clave de cada pliego de la SEC
            </p>
          </div>
          
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nro, título o palabra..."
              type="text"
              className="w-full bg-surface border border-outline-variant p-2.5 rounded-lg text-sm pr-9 input-focus-ring"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
          </div>
        </div>

        {/* Pliegos items list */}
        {filteredPliegos.length === 0 ? (
          <div className="text-center py-10 bg-surface-container-low rounded-lg text-on-surface-variant">
            <AlertTriangle className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-sm font-semibold">No se encontraron pliegos para tu búsqueda.</p>
            <button 
              onClick={() => setSearchTerm('')} 
              className="text-primary font-bold text-xs underline mt-1 cursor-pointer"
            >
              Ver todos los pliegos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {filteredPliegos.map((pliego) => {
              const isOpen = selectedPliego === pliego.id;
              return (
                <div 
                  key={pliego.id}
                  onClick={() => setSelectedPliego(isOpen ? null : pliego.id)}
                  className={`border p-4.5 rounded-lg text-left cursor-pointer transition-all duration-200 select-none ${
                    isOpen 
                      ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                      : 'border-outline-variant/70 hover:border-primary hover:bg-surface-container-low/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-extrabold text-white bg-primary px-2 py-0.5 rounded tracking-widest uppercase">
                      {pliego.number}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-outline transition-transform duration-200 ${
                      isOpen ? 'rotate-90 text-primary' : ''
                    }`} />
                  </div>
                  <h4 className="font-headline font-bold text-primary text-sm mb-2">
                    {pliego.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-3">
                    {pliego.description}
                  </p>

                  {/* Expanded key points view */}
                  {isOpen && (
                    <div className="pt-3 border-t border-outline-variant/40 mt-3 space-y-2 animate-fade-in text-xs">
                      <p className="font-bold text-primary mb-1">Exigencias Clave del Pliego:</p>
                      {pliego.keyPoints.map((pt, index) => (
                        <div key={index} className="flex items-start gap-1.5 text-on-surface-variant">
                          <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Standard Process TE1 explanation block */}
      <section className="bg-surface-container p-6 md:p-8 rounded-xl border border-outline-variant/60 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Trámite y Fiscalización SEC
            </span>
          </div>
          <h3 className="font-headline font-bold text-primary text-lg">
            ¿Cómo obtener el Certificado de Inscripción TE1 Autorizado?
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            El certificado TE1 (Trámite Eléctrico N°1) es el documento legal emitido por la Superintendencia de Electricidad y Combustibles (SEC) que declara formalmente que la instalación es libre de riesgos, cumple la normativa RIC y se encuentra autorizada para conectarse a redes de distribuidoras tradicionales (Enel, CGE, etc).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex gap-2.5 items-start">
              <span className="bg-primary/5 text-primary font-extrabold w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
              <div>
                <p className="font-bold text-xs text-primary">Diseño Técnico</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Cálculo de mallas, caída de tensión (RIC 03) y planos lineales (RIC 18).</p>
              </div>
            </div>
            
            <div className="flex gap-2.5 items-start">
              <span className="bg-primary/5 text-primary font-extrabold w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
              <div>
                <p className="font-bold text-xs text-primary">Pruebas en Terreno</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Medición de continuidad, prueba de diferenciales rápidos y megado de aislaciones.</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <span className="bg-primary/5 text-primary font-extrabold w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
              <div>
                <p className="font-bold text-xs text-primary">Cargación en Portal</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Subida digital de planos CAD, boletas de pruebas y credencial del técnico Clase A/B.</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <span className="bg-primary/5 text-primary font-extrabold w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
              <div>
                <p className="font-bold text-xs text-primary">Aprobación y TE1</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">La SEC revisa la cargación técnica digital y emite el código TE1 para energización.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-outline-variant/60 flex flex-col justify-between items-center text-center shadow-2xs">
          <Award className="w-12 h-12 text-secondary" />
          <h4 className="font-headline font-bold text-primary text-sm mt-3">
            ¿Necesitas un trámite TE1 para tu casa o industria?
          </h4>
          <p className="text-[11px] text-on-surface-variant leading-relaxed my-2">
            Nuestros ingenieros eléctricos están autorizados por la SEC Clase A para regularizar tu empalme rápidamente con total seguridad.
          </p>
          <a
            href="mailto:electricidadpaine@gmail.com?subject=Cotizacion%20Tramite%20TE1%20SEC"
            className="w-full bg-primary hover:bg-primary-container text-white py-2 px-3 rounded text-xs font-semibold cursor-pointer transition-all"
          >
            Contacto Directo
          </a>
        </div>
      </section>

    </div>
  );
}
