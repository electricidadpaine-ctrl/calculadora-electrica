import React, { useState } from 'react';
import { Menu, X, FileText, Calculator, BookOpen, Layers, History } from 'lucide-react';
import { AppTab } from '../types';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenReport: () => void;
  historyCount: number;
}

export default function Header({ activeTab, setActiveTab, onOpenReport, historyCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'calculadoras' as AppTab, label: 'Calculadoras', icon: Calculator },
    { id: 'normativa' as AppTab, label: 'Normativa RIC', icon: BookOpen },
    { id: 'equivalencias' as AppTab, label: 'Equivalencias', icon: Layers },
    { id: 'historial' as AppTab, label: 'Historial', icon: History },
  ];

  const handleTabClick = (tabId: AppTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-outline-variant w-full top-0 sticky z-50 transition-all duration-300 shadow-xs">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleTabClick('calculadoras')}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer group"
          id="brand-header"
        >
          <img 
            alt="Logo CRL" 
            className="h-10 w-auto object-contain p-0.5 rounded-full border border-outline-variant/60 group-hover:border-primary/40 transition-colors" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLtN_AkpF8XeVJGOKto4KbqLiLS0-DtSk2EZsII3rEWskDK1oZp85SZ-ffjVrmz0dGQjyW7PwEWvWPh7icQ0nwAkwbay5PNRKoEBrchkpoJededu5PfstvqDaRhVXRPwqlx1z3Lnqm7AaepuUEAHvQytEY9J-ATvlX1gQ-QhE7vsEP5D1G0Cfg6RH35Mu7Qm2coF716AvLlmXhcjzXZLC_M4aIyvbtu4Z9H6QrOXAgulBP7Ej6MYar2OVmQ"
            referrerPolicy="no-referrer"
          />
          <span className="font-headline text-lg md:text-xl font-bold text-primary tracking-tight">
            RIC Electrical Calc
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative py-1 transition-all flex items-center gap-1.5 font-medium ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
                id={`tab-${item.id}`}
              >
                <Icon className="w-4 h-4 md:hidden lg:inline" />
                <span>{item.label}</span>
                {item.id === 'historial' && historyCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-primary text-white rounded-full font-bold">
                    {historyCount}
                  </span>
                )}
                {/* Visual Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-transform duration-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button & Help */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={onOpenReport}
            className="bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded font-sans font-semibold text-xs tracking-wider uppercase hover:bg-secondary-fixed transition-all duration-150 shadow-xs active:scale-95 hover:shadow-md flex items-center gap-2 cursor-pointer"
            id="btn-reporte-header"
          >
            <FileText className="w-4 h-4" />
            <span>Generar Reporte</span>
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {activeTab === 'historial' && historyCount > 0 && (
            <span className="px-2 py-0.5 text-[11px] bg-primary text-white rounded-full font-bold">
              {historyCount}
            </span>
          )}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant bg-white shadow-lg animate-fade-in py-4 px-6 space-y-4 absolute left-0 right-0 z-50">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg text-left text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-primary/5 text-primary border-l-4 border-primary' 
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5 text-primary-container" />
                  <span className="flex-1">{item.label}</span>
                  {item.id === 'historial' && historyCount > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-primary text-white rounded-full font-bold">
                      {historyCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="pt-2 border-t border-outline-variant">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReport();
              }}
              className="w-full bg-secondary-container text-on-secondary-container py-3 rounded font-sans font-semibold text-sm hover:bg-secondary-fixed transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Generar Reporte Técnico</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
