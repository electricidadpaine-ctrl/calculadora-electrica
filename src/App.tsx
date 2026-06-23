import React, { useState, useEffect } from 'react';
import { AppTab, CalculationHistoryItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import VoltageDropCalculator from './components/VoltageDropCalculator';
import PowerCurrentCalculator from './components/PowerCurrentCalculator';
import EquivalentTable from './components/EquivalentTable';
import RegulatoryGuidelines from './components/RegulatoryGuidelines';
import EquivalentsConverter from './components/EquivalentsConverter';
import HistoryLog from './components/HistoryLog';
import ReportModal from './components/ReportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('calculadoras');
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [currentSyncValue, setCurrentSyncValue] = useState<number | undefined>(undefined);

  // Default parameters (tracked in App state to sync seamlessly with the formal printable report)
  const [voltageDropState, setVoltageDropState] = useState({
    tipoRed: 'monofasico',
    cargaCorriente: 20,
    largoTramo: 30,
    seccionConductor: 2.5,
    material: 'cobre',
    limiteMaximo: 3,
    caidaV: 4.25,
    porcentaje: 1.93,
    cumple: true
  });

  const [wattState, setWattState] = useState({
    tipoRed: 'monofasico',
    potenciaTotal: 3000,
    cosPhi: 1.0,
    corrienteResultante: 13.63
  });

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ric_calc_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse historical logs", e);
      }
    }
  }, []);

  // Save history to localstorage
  const saveHistory = (newHistory: CalculationHistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem('ric_calc_history', JSON.stringify(newHistory));
  };

  const handleAddToHistory = (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => {
    const timestamp = new Date().toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const newLogItem: CalculationHistoryItem = {
      ...item,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      timestamp
    };

    const updated = [newLogItem, ...history].slice(0, 30); // limit to 30 items
    saveHistory(updated);

    // Also update current state for reporting!
    if (item.type === 'caida_tension') {
      setVoltageDropState({
        tipoRed: item.inputs.tipoRed || 'monofasico',
        cargaCorriente: item.inputs.cargaCorriente || 20,
        largoTramo: item.inputs.largoTramo || 30,
        seccionConductor: item.inputs.seccionConductor || 2.5,
        material: item.inputs.material || 'cobre',
        limiteMaximo: item.inputs.limiteMaximo || 3,
        caidaV: item.results.caidaEstimadaV || 0,
        porcentaje: item.results.porcentajePerdida || 0,
        cumple: item.results.cumpleNormativa ?? true
      });
    } else {
      setWattState({
        tipoRed: item.inputs.tipoRed || 'monofasico',
        potenciaTotal: item.inputs.potenciaTotal || 3000,
        cosPhi: item.inputs.cosPhi || 1.0,
        corrienteResultante: item.results.corrienteResultanteA || 0
      });
    }
  };

  const handleDeleteLog = (id: string) => {
    const filtered = history.filter(log => log.id !== id);
    saveHistory(filtered);
  };

  const handleClearLogs = () => {
    saveHistory([]);
  };

  // Syncing Watt-Ampere current converter to Voltage Drop Calculator
  const handleSyncToVoltageDrop = (calculatedCurrent: number) => {
    setCurrentSyncValue(calculatedCurrent);
    // Automatically swap tabs back to Calculadoras so the user instantly sees the sync confirmation
    setActiveTab('calculadoras');
  };

  const handleReloadInputs = (log: CalculationHistoryItem) => {
    if (log.type === 'caida_tension') {
      setVoltageDropState({
        tipoRed: log.inputs.tipoRed || 'monofasico',
        cargaCorriente: log.inputs.cargaCorriente || 20,
        largoTramo: log.inputs.largoTramo || 30,
        seccionConductor: log.inputs.seccionConductor || 2.5,
        material: log.inputs.material || 'cobre',
        limiteMaximo: log.inputs.limiteMaximo || 3,
        caidaV: log.results.caidaEstimadaV || 0,
        porcentaje: log.results.porcentajePerdida || 0,
        cumple: log.results.cumpleNormativa ?? true
      });
      setCurrentSyncValue(log.inputs.cargaCorriente);
    } else {
      setWattState({
        tipoRed: log.inputs.tipoRed || 'monofasico',
        potenciaTotal: log.inputs.potenciaTotal || 3000,
        cosPhi: log.inputs.cosPhi || 1.0,
        corrienteResultante: log.results.corrienteResultanteA || 0
      });
    }
    setActiveTab('calculadoras');
  };

  return (
    <div className="bg-background text-on-background font-sans selection:bg-primary/20 relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      
      {/* Animated Technical Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-grid-pattern animate-grid-flow" />
      <div className="fixed inset-0 pointer-events-none z-[-2] bg-gradient-to-b from-transparent via-background/80 to-background" />

      {/* Main Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenReport={() => setIsReportOpen(true)}
        historyCount={history.length}
      />

      {/* Primary Page Layout body router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-16 relative">
        
        {/* Router tabs switches */}
        {activeTab === 'calculadoras' && (
          <div className="space-y-16 animate-fade-in">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto space-y-6">
              <div id="badge-normativo" className="inline-block bg-primary px-4 py-1.5 rounded-full hover:animate-pulse-subtle cursor-default">
                <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase">
                  Cumplimiento Normativo SEC
                </span>
              </div>
              <h1 className="font-headline text-3xl md:text-4.5xl font-extrabold text-primary tracking-tight leading-normal">
                Calculadoras Eléctricas Gratuitas
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                Diseñadas bajo los parámetros de los Pliegos Técnicos RIC de la SEC (Chile) para garantizar seguridad, durabilidad y máxima eficiencia en ingeniería y montaje eléctrico.
              </p>
            </section>

            {/* Bento Grid layout containing both Calculators */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left span 8: Voltage Drop */}
              <div className="lg:col-span-8">
                <VoltageDropCalculator 
                  onAddToHistory={handleAddToHistory} 
                  syncCurrentValue={currentSyncValue}
                  onClearSync={() => setCurrentSyncValue(undefined)}
                />
              </div>

              {/* Right span 4: Watt Law to App converter */}
              <div className="lg:col-span-4">
                <PowerCurrentCalculator 
                  onAddToHistory={handleAddToHistory}
                  onSyncToVoltageDrop={handleSyncToVoltageDrop}
                />
              </div>

            </div>

            {/* Guide Equivalence standard reference table */}
            <EquivalentTable />
          </div>
        )}

        {activeTab === 'normativa' && (
          <div className="animate-fade-in">
            <RegulatoryGuidelines />
          </div>
        )}

        {activeTab === 'equivalencias' && (
          <div className="animate-fade-in">
            <EquivalentsConverter />
          </div>
        )}

        {activeTab === 'historial' && (
          <div className="animate-fade-in">
            <HistoryLog 
              logs={history} 
              onDeleteLog={handleDeleteLog} 
              onClearLogs={handleClearLogs}
              onReloadInputs={handleReloadInputs}
            />
          </div>
        )}

      </main>

      {/* Technical Print/Save Report Overlay */}
      {isReportOpen && (
        <ReportModal 
          onClose={() => setIsReportOpen(false)} 
          voltageDropParams={voltageDropState}
          wattParams={wattState}
        />
      )}

      {/* Main Footer */}
      <Footer onNavigate={setActiveTab} />

    </div>
  );
}
