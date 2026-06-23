export type AppTab = 'calculadoras' | 'normativa' | 'equivalencias' | 'historial';

export interface ConductorOption {
  value: number; // in mm²
  label: string; // e.g. "1.5 mm²"
  awg: string;   // e.g. "16 AWG"
  ampacity: number; // standard ampacity (A) in conduit under normal conditions per RIC
  resistance: number; // in ohms/km at 20°C
  recommendedUse: string; // e.g. "Iluminación LED"
}

export interface CalculationHistoryItem {
  id: string;
  timestamp: string;
  type: 'caida_tension' | 'ley_watt';
  title: string;
  inputs: {
    tipoRed: string;
    cargaCorriente?: number;
    potenciaTotal?: number;
    largoTramo?: number;
    seccionConductor?: number;
    material?: string;
    limiteMaximo?: number; // 3% or 5%
    cosPhi?: number;
  };
  results: {
    caidaEstimadaV?: number;
    porcentajePerdida?: number;
    cumpleNormativa?: boolean;
    corrienteResultanteA?: number;
  };
}

export interface PliegoRIC {
  id: string;
  number: string;
  title: string;
  description: string;
  keyPoints: string[];
  link?: string;
}
