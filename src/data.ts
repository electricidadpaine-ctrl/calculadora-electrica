import { ConductorOption, PliegoRIC } from './types';

// Standard copper conductors as defined in RIC 04 (Chile) & AWG equivalents
export const CONDUCTORS: ConductorOption[] = [
  {
    value: 1.5,
    label: "1.5 mm²",
    awg: "16 AWG",
    ampacity: 15,
    resistance: 12.1,
    recommendedUse: "Iluminación LED y circuitos de alumbrado"
  },
  {
    value: 2.5,
    label: "2.5 mm²",
    awg: "14 AWG",
    ampacity: 20,
    resistance: 7.41,
    recommendedUse: "Enchufes de fuerza, electrodomésticos de uso general"
  },
  {
    value: 4.0,
    label: "4.0 mm²",
    awg: "12 AWG",
    ampacity: 25,
    resistance: 4.61,
    recommendedUse: "Lavadoras, hornos eléctricos, circuitos de fuerza media"
  },
  {
    value: 6.0,
    label: "6.0 mm²",
    awg: "10 AWG",
    ampacity: 35,
    resistance: 3.08,
    recommendedUse: "Sistemas de Climatización (AC), termos eléctricos"
  },
  {
    value: 10.0,
    label: "10 mm²",
    awg: "8 AWG",
    ampacity: 50,
    resistance: 1.83,
    recommendedUse: "Subalimentadores generales y tableros secundarios"
  },
  {
    value: 16.0,
    label: "16 mm²",
    awg: "6 AWG",
    ampacity: 68,
    resistance: 1.15,
    recommendedUse: "Empalmes T1 monofásicos, alimentadores residenciales"
  },
  {
    value: 25.0,
    label: "25 mm²",
    awg: "4 AWG",
    ampacity: 89,
    resistance: 0.727,
    recommendedUse: "Alimentadores principales de edificios u oficinas"
  },
  {
    value: 35.0,
    label: "35 mm²",
    awg: "2 AWG",
    ampacity: 111,
    resistance: 0.524,
    recommendedUse: "Acometidas generales y distribución industrial pesada"
  }
];

// Official Chilean SEC Pliegos Técnicos - RIC (Reglamento de Seguridad de Instalaciones de Consumo de Energía Eléctrica)
export const PLIEGOS_RIC: PliegoRIC[] = [
  {
    id: "ric01",
    number: "RIC 01",
    title: "Empalmes",
    description: "Establece las exigencias técnicas y de seguridad que deben cumplir los empalmes eléctricos para la conexión de instalaciones de consumo a las redes de distribución.",
    keyPoints: [
      "Define límites de propiedad y puntos de conexión.",
      "Especifica altura mínima de acometidas (vías públicas).",
      "Delimita las protecciones obligatorias en el punto de medición."
    ]
  },
  {
    id: "ric02",
    number: "RIC 02",
    title: "Tableros Eléctricos",
    description: "Determina las condiciones mínimas de seguridad y diseño para la construcción, montaje e instalación de tableros eléctricos de distribución.",
    keyPoints: [
      "Exige separación fásica y rotulación clara en español de todos los automáticos.",
      "Uso obligatorio de luces piloto e indicadoras de tensión.",
      "Establece distancias mínimas de operación y mantención segura."
    ]
  },
  {
    id: "ric03",
    number: "RIC 03",
    title: "Alimentadores y Subalimentadores",
    description: "Regula las dimensiones y diseño de conductores térmicos e hidráulicos eléctricos que transportan energía desde el empalme hasta los tableros generales y de distribución.",
    keyPoints: [
      "Caída de tensión máxima permitida para alimentadores: 3%.",
      "Caída de tensión máxima permitida para circuitos finales: 5%.",
      "Establece factores de demanda máximas para el cálculo de potencia de diseño."
    ]
  },
  {
    id: "ric04",
    number: "RIC 04",
    title: "Conductores y Canalizaciones",
    description: "norma los métodos de instalación de conductores eléctricos, cables y sistemas de bandejas, tuberías y ductos en todo tipo de ambientes.",
    keyPoints: [
      "Prohibición de empalmes de conductores dentro de cajas de paso si exceden el 60% de capacidad de espacio.",
      "Código de colores obligatorio: Fase 1 Azul, Fase 2 Negro, Fase 3 Rojo, Neutro Blanco, Tierra de protección Verde.",
      "Uso exigido de conductores libres de halógenos (H07Z1-K) en locales de reunión de personas."
    ]
  },
  {
    id: "ric05",
    number: "RIC 05",
    title: "Medidas de Protección contra Tensiones Peligrosas",
    description: "Establece los requisitos obligatorios para evitar contactos directos e indirectos que perturben la integridad de las personas.",
    keyPoints: [
      "Obligatoriedad de protectores diferenciales de sensibilidad de hasta 30mA en enchufes.",
      "Define sistemas de seguridad por aislación clase II.",
      "Especifica tensiones de seguridad límites de 24V en zonas húmedas y 50V normales."
    ]
  },
  {
    id: "ric06",
    number: "RIC 06",
    title: "Puesta a Tierra y Enlace Equipotencial",
    description: "Detalla el diseño, cálculo e instalación obligatoria de los electrodos y conductores de la malla de puesta a tierra.",
    keyPoints: [
      "Malla única de tierra de servicio combinada con tierra de protección.",
      "Valor máximo de resistencia recomendado para mallas residenciales comunes: 20 ohms.",
      "Inspección periódica obligatoria de uniones soldadas y grapas de conexión."
    ]
  },
  {
    id: "ric07",
    number: "RIC 07",
    title: "Instalaciones de Iluminación",
    description: "Regula las potencias de iluminación, tipos de luminaria y sistemas de alumbrado de emergencia en recintos públicos y privados.",
    keyPoints: [
      "Especifica eficiencias lúmicas mínimas por metro cuadrado.",
      "Uso de luminarias IP según el nivel de estanqueidad ambiental.",
      "Mandata alimentación separada para alumbrado de seguridad activa extrema."
    ]
  },
  {
    id: "ric08",
    number: "RIC 08",
    title: "Sistemas de Autogeneración",
    description: "Alinea las pautas técnicas para alimentar instalaciones con autoproductores y almacenamiento a batería (Solar Fotovoltaico, Motores térmicos).",
    keyPoints: [
      "Protección anti-isla certificada para inyectar excedentes a la red distribuidora.",
      "Sistemas de transferencia automática con enclavamiento físico e irreversible.",
      "Señales de advertencia visibles de doble suministro eléctrico."
    ]
  },
  {
    id: "ric09",
    number: "RIC 09",
    title: "Sistemas de Emergencia",
    description: "Instruye la implementación de generadores de respaldo de emergencia automáticos e independientes.",
    keyPoints: [
      "Arranque e interconexión segura del grupo electrógeno en menos de 15 segundos.",
      "Autonomía mínima de combustible dictada por el rubro del establecimiento.",
      "Exclusividad de canalización para circuitos críticos de emergencia."
    ]
  },
  {
    id: "ric10",
    number: "RIC 10",
    title: "Instalaciones de Uso General",
    description: "Define las exigencias para el diseño seguro de enchufes, interruptores domésticos e industriales habituales.",
    keyPoints: [
      "Mínimo de cantidad de centros de enchufe por metros lineales de muro.",
      "Altura reglamentaria de centros de comando e interruptores táctiles.",
      "Restricciones para la instalación en salas de baño (zonas de seguridad del 1 al 3)."
    ]
  },
  {
    id: "ric11",
    number: "RIC 11",
    title: "Instalaciones Especiales",
    description: "norma condiciones de fuerza y control en recintos singulares como piscinas, recintos médicos, canteras y faenas agrícolas.",
    keyPoints: [
      "Zonificación de estanques y salas quirúrgicas con mallas de equipotencialidad activa.",
      "Sistemas de monitoreo de aislación con alarmas audibles e interruptores diferenciales rápidos.",
      "Alimentación a baja tensión aislada mediante transformador de seguridad."
    ]
  },
  {
    id: "ric12",
    number: "RIC 12",
    title: "Áreas Peligrosas",
    description: "Exige el cumplimiento de metodologías antideflagrantes (Explosion-Proof) en presencia de polvos o gases inflamables.",
    keyPoints: [
      "Clasificación estricta de zonas de gases (Clase I) e inflamables secos (Clase II).",
      "Sellar conductores en el límite de la zona clasificada para evitar transferencia de vapores.",
      "Uso de artefactos metálicos con puesta a tierra de seguridad interna obligatoria."
    ]
  },
  {
    id: "ric13",
    number: "RIC 13",
    title: "Cargadores de Vehículos Eléctricos",
    description: "Define requisitos para los sistemas de carga de vehículos híbridos y eléctricos enchufables (Electromovilidad).",
    keyPoints: [
      "Obligatoriedad de protecciones diferencial de Tipo B o Tipo A con detección de fugas DC.",
      "Calcula factores de coincidencia elevados para el dimensionamiento del transformador principal.",
      "Zonificación e interfaces de conexión certificadas SEC."
    ]
  },
  {
    id: "ric14",
    number: "RIC 14",
    title: "Eficiencia Energética",
    description: "Exige implementar pautas de diseño que reduzcan pérdidas técnicas de iluminación y climatización en grandes infraestructuras.",
    keyPoints: [
      "Cálculo del factor de potencia dinámico para evitar penalizaciones por energía reactiva.",
      "Obligación de instalar equipos de control automático para iluminación vacía.",
      "Sistemas de medición de corriente parciales para auditorías independientes."
    ]
  },
  {
    id: "ric15",
    number: "RIC 15",
    title: "Gestión de la Energía",
    description: "Normas para la captura masiva de datos mediante sensores inteligentes interconectados en el edificio.",
    keyPoints: [
      "Integración de protocolos domóticos estandarizados (Modbus, KNX).",
      "Monitoreo centralizado de la curva de demanda máxima horaria."
    ]
  },
  {
    id: "ric16",
    number: "RIC 16",
    title: "Subsistemas de Distribución",
    description: "Normativas sobre canaletas, postes y sistemas aéreos o soterrados privados en condominios residenciales.",
    keyPoints: [
      "Profundidad reglamentaria de zanjas eléctricas subterráneas y cintas demarcadoras rojas.",
      "Exigencia de resistencia mecánica del hormigón de muretes de empalme."
    ]
  },
  {
    id: "ric17",
    number: "RIC 17",
    title: "Operación y Mantenimiento",
    description: "Responsabilidad y manuales de operaciones seguros para personal electricista autorizado SEC.",
    keyPoints: [
      "Exige planos actualizados As-Built permanently guardados en sitio físico.",
      "Inspecciones semestrales programadas de tableros de transferencia automática rápida."
    ]
  },
  {
    id: "ric18",
    number: "RIC 18",
    title: "Presentación de Proyectos y Tramitaciones",
    description: "Paso a paso para la declaración reglamentaria de instalaciones ante la SEC mediante trámites digitales TE1, TE2, TE4.",
    keyPoints: [
      "Formatos normalizados de simbología eléctrica e índices estructurales del proyecto.",
      "Obligatoriedad de firma por instalador eléctrico con licencia del estamento pertinente."
    ]
  },
  {
    id: "ric19",
    number: "RIC 19",
    title: "Puesta en Servicio",
    description: "Pruebas reglamentarias previas para energizar la casa, industria o comercio con total seguridad certificable.",
    keyPoints: [
      "Medición de aislación física con megóhmetro (exigiendo mínimo 1 Megaohm).",
      "Validación de operatividad física del lazo de falla y tiempo de disparo diferencial."
    ]
  }
];

/**
 * Calculations based on Pliego RIC 03
 * Conductivity of Copper at design operating levels:
 * For nominal copper, we use resistivity rho = 0.0178 ohm-mm²/m (at 20°C).
 * Aluminum resistivity rho = 0.0282 ohm-mm²/m.
 */
export function calculateVoltageDrop(params: {
  tipoRed: 'monofasico' | 'trifasico';
  cargaCorriente: number;
  largoTramo: number;
  seccionConductor: number; // mm²
  material: 'cobre' | 'aluminio';
}) {
  const { tipoRed, cargaCorriente, largoTramo, seccionConductor, material } = params;

  if (cargaCorriente <= 0 || largoTramo <= 0 || seccionConductor <= 0) {
    return {
      caidaV: 0,
      porcentaje: 0
    };
  }

  // Resistivity key
  const rho = material === 'cobre' ? 0.0178 : 0.0282;

  let caidaV = 0;
  let tensionNominal = tipoRed === 'monofasico' ? 220 : 380;

  if (tipoRed === 'monofasico') {
    // Monofásico (2 fases o Fase + Neutro)
    // dV = (2 * rho * L * I) / S
    caidaV = (2 * rho * largoTramo * cargaCorriente) / seccionConductor;
  } else {
    // Trifásico (Línea trifásica balanceada line-to-line)
    // dV = (sqrt(3) * rho * L * I) / S
    caidaV = (Math.sqrt(3) * rho * largoTramo * cargaCorriente) / seccionConductor;
  }

  const porcentaje = (caidaV / tensionNominal) * 100;

  return {
    caidaV: Number(caidaV.toFixed(2)),
    porcentaje: Number(porcentaje.toFixed(2))
  };
}

/**
 * Power and current converter (Ley de Watt)
 * cosPhi: power factor (usually 1.0 for resistive load, up to 0.8 for motors)
 */
export function calculateCurrent(params: {
  tipoRed: 'monofasico' | 'trifasico';
  potenciaTotal: number; // In Watts
  cosPhi: number;
}) {
  const { tipoRed, potenciaTotal, cosPhi } = params;

  if (potenciaTotal <= 0 || cosPhi <= 0) {
    return 0;
  }

  let corriente = 0;

  if (tipoRed === 'monofasico') {
    // I = P / (220 * cosPhi)
    corriente = potenciaTotal / (220 * cosPhi);
  } else {
    // I = P / (sqrt(3) * 380 * cosPhi)
    corriente = potenciaTotal / (Math.sqrt(3) * 380 * cosPhi);
  }

  return Number(corriente.toFixed(2));
}
