import React from 'react';
import { Mail, Globe, MapPin, Award, CheckCircle } from 'lucide-react';
import { AppTab } from '../types';

interface FooterProps {
  onNavigate: (tab: AppTab) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant w-full mt-24 relative z-10 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 py-12 max-w-7xl mx-auto gap-12">
        
        {/* Branch Info and Description */}
        <div className="space-y-6 max-w-xs md:max-w-sm">
          <div className="flex items-center gap-3">
            <img 
              alt="CRL Footer Logo" 
              className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLtN_AkpF8XeVJGOKto4KbqLiLS0-DtSk2EZsII3rEWskDK1oZp85SZ-ffjVrmz0dGQjyW7PwEWvWPh7icQ0nwAkwbay5PNRKoEBrchkpoJededu5PfstvqDaRhVXRPwqlx1z3Lnqm7AaepuUEAHvQytEY9J-ATvlX1gQ-QhE7vsEP5D1G0Cfg6RH35Mu7Qm2coF716AvLlmXhcjzXZLC_M4aIyvbtu4Z9H6QrOXAgulBP7Ej6MYar2OVmQ"
              referrerPolicy="no-referrer"
            />
            <span className="font-headline font-semibold text-primary text-sm tracking-widest uppercase">
              Ingeniería CRL
            </span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Especialistas en instalaciones eléctricas certificadas y regularizaciones de planos TE1 en la Región Metropolitana y todo Chile. Absoluto compromiso con las normativas vigentes SEC.
          </p>
          
          {/* Badge */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-outline-variant/60 inline-flex shadow-2xs">
            <Award className="w-4 h-4 text-secondary" />
            <span className="text-[11px] font-bold text-primary tracking-wide">
              Instalador Autorizado SEC Clase A
            </span>
          </div>

          {/* Social icons / Contact items */}
          <div className="flex gap-4">
            <a 
              className="text-primary bg-white p-2.5 rounded-full border border-outline-variant hover:text-secondary-container hover:bg-primary hover:-translate-y-0.5 transition-all duration-200 outline-none" 
              href="https://www.sec.cl" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Sitio Oficial Chile SEC"
              title="Superintendencia de Electricidad y Combustibles (SEC)"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a 
              className="text-primary bg-white p-2.5 rounded-full border border-outline-variant hover:text-secondary-container hover:bg-primary hover:-translate-y-0.5 transition-all duration-200 outline-none" 
              href="mailto:electricidadpaine@gmail.com"
              aria-label="Enviar Correo de Contacto"
              title="Escribir a electricidadpaine@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services & Quick Links Columns */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:flex md:gap-24">
          
          {/* Column 1: Servicios */}
          <div>
            <h4 className="font-sans font-bold text-xs text-primary mb-5 uppercase tracking-widest">
              Servicios Eléctricos
            </h4>
            <ul className="space-y-3.5 text-xs text-on-surface-variant font-medium">
              {[
                "Instalaciones Eléctricas Domiciliarias",
                "Aumento de Capacidad de Potencia",
                "Mallas de Tierra de Protección",
                "Declaración y Trámite TE1 SEC"
              ].map((service, index) => (
                <li key={index} className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-default">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Enlaces */}
          <div>
            <h4 className="font-sans font-bold text-xs text-primary mb-5 uppercase tracking-widest">
              Navegación
            </h4>
            <ul className="space-y-3 text-xs text-on-surface-variant font-semibold">
              <li>
                <button 
                  onClick={() => onNavigate('calculadoras')} 
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-1 group text-left cursor-pointer"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3.5 transition-all duration-200">›</span>
                  <span>Calculadoras Gratuitas</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('normativa')} 
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-1 group text-left cursor-pointer"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3.5 transition-all duration-200">›</span>
                  <span>Pliegos Normativa RIC</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('equivalencias')} 
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-1 group text-left cursor-pointer"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3.5 transition-all duration-200">›</span>
                  <span>Tabla AWG a mm²</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('historial')} 
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-1 group text-left cursor-pointer"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3.5 transition-all duration-200">›</span>
                  <span>Historial de Registros</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyblock footer section */}
      <div className="border-t border-outline-variant/40 bg-surface-container/60">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-6 max-w-7xl mx-auto gap-4">
          <p className="font-sans font-semibold text-xs text-on-surface-variant text-center md:text-left">
            © {currentYear} Ingeniería Eléctrica Chile. Respaldado bajo parámetros RIC de la SEC.
          </p>
          <div className="flex gap-6 font-semibold text-xs text-on-surface-variant">
            <span className="cursor-help hover:text-primary transition-colors">Normas de Seguridad SEC</span>
            <span className="cursor-help hover:text-primary transition-colors">Pliegos Técnicos Chilenos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
