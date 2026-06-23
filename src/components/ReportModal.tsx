import React, { useState } from 'react';
import { X, Printer, User, Award, Building, FileText, CheckCircle, AlertTriangle, Layers, Power, Clock } from 'lucide-react';
import { CONDUCTORS } from '../data';

interface ReportModalProps {
  onClose: () => void;
  voltageDropParams: {
    tipoRed: string;
    cargaCorriente: number;
    largoTramo: number;
    seccionConductor: number;
    material: string;
    limiteMaximo: number;
    caidaV: number;
    porcentaje: number;
    cumple: boolean;
  };
  wattParams: {
    tipoRed: string;
    potenciaTotal: number;
    cosPhi: number;
    corrienteResultante: number;
  };
}

export default function ReportModal({ onClose, voltageDropParams, wattParams }: ReportModalProps) {
  // Report details state
  const [projectTitle, setProjectTitle] = useState('Instalación Eléctrica Paine');
  const [clientName, setClientName] = useState('Cliente Particular');
  const [address, setAddress] = useState('Sector Paine Centro, Región Metropolitana');
  const [technicianName, setTechnicianName] = useState('Instalador CRL Autorizado');
  const [licenciaSEC, setLicenciaSEC] = useState('Clase A - Registro SEC N°2024');

  const currentDate = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const selectedConductor = CONDUCTORS.find(c => c.value === voltageDropParams.seccionConductor);

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-[100] flex justify-center items-center p-4 transition-all overflow-y-auto">
      
      {/* Modal Card wrapper */}
      <div className="bg-white rounded-2xl border border-outline-variant shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col justify-between overflow-hidden animate-scale-in">
        
        {/* Modal Top Header (Hidden on print) */}
        <div className="flex justify-between items-center px-6 py-4 bg-primary text-white print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary" />
            <span className="font-headline font-bold text-sm md:text-base">
              Generar Informe de Cumplimiento Técnico
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer outline-none"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scroll area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-on-surface">
          
          {/* Form particulars - Configured by installer (Hidden on print) */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 space-y-4 print:hidden">
            <h4 className="font-headline font-bold text-xs text-primary uppercase tracking-wider">
              1. Datos del Proyecto e Instalador
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-on-surface uppercase tracking-wide">Nombre del Proyecto</label>
                <input 
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  type="text" 
                  className="w-full bg-white border border-outline-variant p-2 rounded text-xs input-focus-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-on-surface uppercase tracking-wide">Nombre del Cliente</label>
                <input 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  type="text" 
                  className="w-full bg-white border border-outline-variant p-2 rounded text-xs input-focus-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-on-surface uppercase tracking-wide">Ubicación / Dirección</label>
                <input 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text" 
                  className="w-full bg-white border border-outline-variant p-2 rounded text-xs input-focus-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-on-surface uppercase tracking-wide">Instalador Técnico SEC</label>
                <input 
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  type="text" 
                  className="w-full bg-white border border-outline-variant p-2 rounded text-xs input-focus-ring"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-bold text-on-surface uppercase tracking-wide">Licencia SEC y Registro</label>
                <input 
                  value={licenciaSEC}
                  onChange={(e) => setLicenciaSEC(e.target.value)}
                  type="text" 
                  placeholder="Clase A" 
                  className="w-full bg-white border border-outline-variant p-2 rounded text-xs input-focus-ring"
                />
              </div>
            </div>
          </div>

          <div className="print:hidden border-t border-outline-variant/30 pt-2" />

          {/* 2. THE REPORT RENDER BLOCK (Shows on screen, and is precisely formatted for printing!) */}
          <div id="printable-area" className="bg-white p-2 text-on-surface space-y-6">
            
            {/* Printable official header block */}
            <div className="flex justify-between items-start border-b-2 border-primary pb-5">
              <div className="space-y-1">
                <h2 className="font-headline font-extrabold text-lg text-primary tracking-tight">
                  INFORME DE CUMPLIMIENTO TÉCNICO ELÉCTRICO
                </h2>
                <p className="text-[10px] text-on-surface-variant font-bold tracking-widest uppercase">
                  Reglamento de Seguridad SEC - Pliego RIC 03
                </p>
                <p className="text-xs text-on-surface-variant">
                  Fecha de simulación: <b>{currentDate}</b>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono border-2 border-primary font-bold px-2.5 py-1 text-primary rounded inline-block">
                  AUDITORÍA RIC
                </span>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mt-1.5 font-bold">
                  Ingeniería Eléctrica Chile
                </p>
              </div>
            </div>

            {/* Meta details table layout */}
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-on-surface border border-outline-variant/60 p-4 rounded bg-surface/30">
              <div>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mb-0.5">Descripción de Obra</p>
                <p className="text-primary font-bold">{projectTitle}</p>
                <p className="text-[10px] font-normal text-on-surface-variant mt-1">Ubicación: {address}</p>
              </div>
              <div>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mb-0.5">Cliente</p>
                <p className="text-primary font-bold">{clientName}</p>
                <p className="text-[10px] font-normal text-on-surface-variant mt-1">Instalador SEC: {technicianName}</p>
              </div>
            </div>

            {/* Calculations metrics summary */}
            <div className="space-y-4">
              <h3 className="font-headline font-bold text-xs text-primary border-b border-outline-variant/60 pb-1 uppercase tracking-wider">
                Parámetros de Cálculo y Diseño (Ley de Watt y RIC 03)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
                
                {/* Section A: Voltage drop details */}
                <div className="border border-outline-variant/40 rounded p-3.5 space-y-2.5 bg-surface/10">
                  <p className="font-bold text-primary flex items-center gap-1.5 uppercase tracking-wide border-b border-outline-variant/30 pb-1.5">
                    <Layers className="w-4 h-4 text-secondary" />
                    <span>Cálculo de Caída de Tensión</span>
                  </p>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Tipo de Suministro:</span>
                      <span className="font-bold text-on-surface font-mono">
                        {voltageDropParams.tipoRed === 'monofasico' ? 'Monofásico (220V)' : 'Trifásico (380V)'}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Corriente del Circuito (I):</span>
                      <span className="font-bold text-on-surface font-mono">{voltageDropParams.cargaCorriente} A</span>
                    </div>

                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Largo del Tramo (L):</span>
                      <span className="font-bold text-on-surface font-mono">{voltageDropParams.largoTramo} metros</span>
                    </div>

                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Conductor Recomendado:</span>
                      <span className="font-bold text-primary font-mono">{selectedConductor?.label} ({selectedConductor?.awg})</span>
                    </div>

                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Material del Cable:</span>
                      <span className="font-bold text-on-surface font-mono uppercase">{voltageDropParams.material}</span>
                    </div>

                    <div className="flex justify-between pb-1">
                      <span className="text-on-surface-variant">Límite Normativa SEC:</span>
                      <span className="font-bold text-on-surface font-mono">{voltageDropParams.limiteMaximo}.0 %</span>
                    </div>
                  </div>
                </div>

                {/* Section B: Load converter details */}
                <div className="border border-outline-variant/40 rounded p-3.5 space-y-2.5 bg-surface/10">
                  <p className="font-bold text-primary flex items-center gap-1.5 uppercase tracking-wide border-b border-outline-variant/30 pb-1.5">
                    <Power className="w-4 h-4 text-primary" />
                    <span>Estudio de Potencia Convertidor</span>
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Sistema Eléctrico:</span>
                      <span className="font-bold text-on-surface font-mono">
                        {wattParams.tipoRed === 'monofasico' ? 'Monofásico' : 'Trifásico'}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Potencia de Diseño (P):</span>
                      <span className="font-bold text-on-surface font-mono">{wattParams.potenciaTotal} Watts</span>
                    </div>

                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Factor de Potencia (cos φ):</span>
                      <span className="font-bold text-on-surface font-mono">{wattParams.cosPhi}</span>
                    </div>

                    <div className="flex justify-between pb-1">
                      <span className="text-on-surface-variant">Amperaje de Trabajo:</span>
                      <span className="font-bold text-secondary font-mono">{wattParams.corrienteResultante} A</span>
                    </div>
                  </div>

                  <div className="bg-surface p-2.5 rounded border border-outline-variant/40 mt-3 text-[10px] leading-normal text-on-surface-variant">
                    <b>Cálculo Secuencial:</b> Amperaje derivado sirve para alimentar la resistencia de caída térmica lineal, garantizando que el conductor no incremente pérdidas.
                  </div>
                </div>

              </div>
            </div>

            {/* Calculations outcomes & auditing verification */}
            <div className="space-y-4">
              <h3 className="font-headline font-bold text-xs text-primary border-b border-outline-variant/60 pb-1 uppercase tracking-wider">
                Auditoría y Dictamen Final (Pliego RIC 03)
              </h3>

              <div className="border border-outline-variant/60 rounded p-4 bg-surface/20 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="space-y-1.5 text-center sm:text-left text-xs">
                  <p>
                    Caída de Tensión Total Calculada: <b>{voltageDropParams.caidaV} Volts</b>
                  </p>
                  <p>
                    Porcentaje de Pérdida Resistiva: <b>{voltageDropParams.porcentaje}%</b> del voltaje nominal.
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    Límite máximo permitido según Pliego RIC 03 admisible: <b>{voltageDropParams.limiteMaximo}.0%</b>
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mb-1 font-bold">
                    Dictamen de Seguridad SEC
                  </p>
                  {voltageDropParams.cumple ? (
                    <div className="flex items-center gap-1.5 text-green-700 bg-green-100 border border-green-200 px-4 py-2 rounded text-xs font-bold font-headline uppercase shadow-3xs">
                      <CheckCircle className="w-5 h-5 text-green-700" />
                      <span>CUMPLE EXIGENCIAS</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-red-700 bg-red-100 border border-red-200 px-4 py-2 rounded text-xs font-bold font-headline uppercase shadow-3xs">
                      <AlertTriangle className="w-5 h-5 text-red-700" />
                      <span>FUERA DE LIMITES SEC</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Signature Block (Perfect for professional printable deliverables) */}
            <div className="pt-16 grid grid-cols-2 gap-12 text-center text-xs">
              <div className="space-y-1">
                <div className="border-t border-on-surface-variant/80 w-44 mx-auto pt-1.5" />
                <p className="font-bold text-on-surface mt-1">{technicianName}</p>
                <p className="text-[10px] text-on-surface-variant">{licenciaSEC}</p>
                <p className="text-[9px] text-on-surface-variant">Firma de Registro SEC</p>
              </div>
              <div className="space-y-1">
                <div className="border-t border-on-surface-variant/80 w-44 mx-auto pt-1.5" />
                <p className="font-bold text-on-surface mt-1">{clientName}</p>
                <p className="text-[10px] text-on-surface-variant">Representante de Proyecto</p>
                <p className="text-[9px] text-on-surface-variant">Firma de Aceptación</p>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Actions (Hidden on print) */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-surface-container border-t border-outline-variant print:hidden">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-bold text-on-surface hover:bg-surface-container-high border border-outline-variant/60 transition-all cursor-pointer bg-white"
          >
            Cerrar Ventana
          </button>
          
          <button 
            onClick={handlePrint}
            className="px-5 py-2.5 rounded text-xs font-bold text-on-secondary-container bg-secondary-container hover:bg-secondary-fixed transition-all flex items-center gap-1.5 shadow-xs cursor-pointer inline-flex"
            id="print-button"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Informe / Guardar PDF</span>
          </button>
        </div>

      </div>

      {/* Embedded print utility helper classes */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          header, footer, nav, button, .print\\:hidden, #brand-header, #btn-reporte-header, #mobile-menu-toggle {
            display: none !important;
          }
          #printable-area {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: white !important;
            z-index: 99999 !important;
          }
        }
      `}</style>
    </div>
  );
}
