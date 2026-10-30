import { siteInfo } from './site';

export type TopicGroup = 'historia-arte' | 'llegar-visita' | 'alrededores' | 'comer' | 'rutas';

export const TOPIC_GROUP_LABELS: Record<TopicGroup, string> = {
  'historia-arte': 'Historia, arquitectura y arte',
  'llegar-visita': 'Cómo llegar y planificar',
  alrededores: 'Parques, cultura y alrededores',
  comer: 'Comer, beber y comprar',
  rutas: 'Rutas e itinerarios'
};

export const TOPIC_GROUP_ORDER: TopicGroup[] = [
  'historia-arte',
  'llegar-visita',
  'alrededores',
  'comer',
  'rutas'
];

export interface TopicSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface TopicFaq {
  q: string;
  a: string;
}

export interface TopicFact {
  label: string;
  value: string;
}

export interface TopicContent {
  kicker: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  updated: string;
  facts: TopicFact[];
  sections: TopicSection[];
  faqs: TopicFaq[];
  related: string[];
  photo?: keyof typeof siteInfo.photos;
}

export interface Topic {
  slug: string;
  group: TopicGroup;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ready: boolean;
  content?: TopicContent;
}

export const TOPICS: Topic[] = [
  // ───────────────────────────── A. Historia, arquitectura y arte ─────────────────────────────
  {
    slug: 'historia',
    group: 'historia-arte',
    title: 'Historia de Plaza Venezuela en Caracas',
    metaTitle: 'Historia de Plaza Venezuela en Caracas · Origen y significado',
    metaDescription:
      'Cómo se formó Plaza Venezuela como nodo urbano de Caracas, su relación con Avenida Casanova y la Zona Rental, y por qué convive con el arte cinético venezolano.',
    ready: true,
    content: {
      kicker: 'Historia urbana',
      h1: 'Historia de Plaza Venezuela en Caracas',
      metaTitle: 'Historia de Plaza Venezuela en Caracas · Origen y significado',
      metaDescription:
        'Cómo se formó Plaza Venezuela como nodo urbano de Caracas, su relación con Avenida Casanova y la Zona Rental, y por qué convive con el arte cinético venezolano.',
      lead: 'Plaza Venezuela no nació como una plaza tradicional. Es el resultado de varias capas de la expansión de Caracas hacia el este: una encrucijada de avenidas, un distribuidor vial y un espacio donde la ciudad puso obras de arte público de escala urbana.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Ubicación', value: 'Av. Casanova, Caracas 1052' },
        { label: 'Entorno', value: 'Zona Rental / Chacaíto' },
        { label: 'Valoración', value: '4,2 / 5 · 35.687 reseñas' },
        { label: 'Ficha consultada', value: '22 de octubre de 2026' }
      ],
      sections: [
        {
          heading: 'Un espacio que se construyó por capas',
          paragraphs: [
            'El interés de Plaza Venezuela está en su composición: calles, recorridos peatonales, fuente, arquitectura y arte cinético se leen juntos. No es un conjunto cerrado en una sola fecha, sino un punto de la ciudad que fue ganando peso a medida que Caracas crecía hacia el este.',
            'Sobre el nombre de la plaza, esta guía no ha verificado un documento que explique sus motivos formales. Lo que sí está documentado es el entorno: la relación con Avenida Casanova y con la zona conocida como Zona Rental.'
          ]
        },
        {
          heading: 'El transporte como parte de la historia',
          paragraphs: [
            'La Fundación Fondo Andrés Bello de la UCV ha documentado el entorno de Zona Rental y las estaciones Plaza Venezuela y Zona Rental. Esa documentación ayuda a ubicar el conjunto, pero no sustituye la información del servicio actual del Metro.',
            'Por eso, en esta guía distinguimos siempre la historia urbana de las condiciones que encontrarás durante la visita. La documentación histórica no confirma accesos, servicios ni espectáculos vigentes.'
          ]
        },
        {
          heading: 'Rehabilitación documentada, no programa actual',
          paragraphs: [
            'El proyecto presentado en el archivo BAQ 2010 describe trabajos desde 2007 y obras civiles de la fuente hasta mayo de 2009, con intervención en iluminación, sonido y formas de agua. Es documentación histórica, no una garantía de funcionamiento actual.',
            'No se han encontrado aquí un programa vigente de la fuente ni documentación para las historias populares que circulan sobre ella. Consulta las indicaciones del lugar; no planifiques la visita alrededor de una supuesta función fija.'
          ]
        },
        {
          heading: 'Un símbolo en movimiento',
          paragraphs: [
            'Hoy en día, Plaza Venezuela sigue siendo un punto de encuentro para caraqueños y visitantes. Su significado trasciende lo arquitectónico: es un espacio donde convergen la memoria histórica, la expresión artística y la vida cotidiana de una ciudad en movimiento.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Por qué se llama Plaza Venezuela?',
          a: 'Esta guía no ha verificado un documento sobre los motivos formales del nombre. Conviene leer el espacio por lo que es hoy: un nodo urbano, no un monumento aislado con una fecha fundacional única.'
        },
        {
          q: '¿Cuándo se rehabilitó la fuente?',
          a: 'La documentación del proyecto BAQ 2010 describe obras desde 2007 y trabajos civiles de la fuente hasta mayo de 2009, con mejoras en iluminación, sonido y formas de agua. Es historia del conjunto, no una garantía de su operación actual.'
        },
        {
          q: '¿Plaza Venezuela y Plaza El Venezolano son lo mismo?',
          a: 'No. Plaza El Venezolano es otro destino, en el centro histórico de Caracas. Esta guía trata específicamente el espacio de Avenida Casanova; no confundas ambos nombres al planificar el viaje.'
        },
        {
          q: '¿La historia confirma un horario de espectáculos?',
          a: 'No se ha encontrado un programa vigente de la fuente ni documentación para las historias populares sobre funciones fijas. Trata la documentación histórica como contexto, no como horario actual.'
        }
      ],
      related: ['fuente', 'fuente-original-los-caobos', 'arte-cinetico', 'como-llegar'],
      photo: 'panorama'
    }
  },
  {
    slug: 'fuente',
    group: 'historia-arte',
    title: 'Fuente de Plaza Venezuela: historia y diseño',
    metaTitle: 'Fuente de Plaza Venezuela · Historia y diseño actual',
    metaDescription:
      'Qué se sabe de la fuente actual de Plaza Venezuela, su rehabilitación documentada entre 2007 y 2009, y por qué no debes planificar la visita como un espectáculo fijo.',
    ready: true,
    content: {
      kicker: 'La fuente',
      h1: 'Fuente de Plaza Venezuela: historia y diseño',
      metaTitle: 'Fuente de Plaza Venezuela · Historia y diseño actual',
      metaDescription:
        'Qué se sabe de la fuente actual de Plaza Venezuela, su rehabilitación documentada entre 2007 y 2009, y por qué no debes planificar la visita como un espectáculo fijo.',
      lead: 'La fuente es el elemento que da identidad visual a Plaza Venezuela, pero conviene separar la obra documentada de su funcionamiento del día. La versión puesta en servicio en 2009 incorporó control de iluminación y recursos sonoros; la operación actual depende del mantenimiento y no está garantizada.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Versión en servicio', value: 'Desde 2009' },
        { label: 'Rehabilitación', value: '2007–2009 (BAQ 2010)' },
        { label: 'Recursos', value: 'Agua, luz y sonido' },
        { label: 'Operación hoy', value: 'Sujeta a mantenimiento' }
      ],
      sections: [
        {
          heading: 'Una fuente reconstruida, no la original',
          paragraphs: [
            'Existe una diferencia que vale la pena conocer: la fuente original de Plaza Venezuela y la fuente que hoy está en el lugar no son necesariamente el mismo proyecto. La fuente original, de Ernesto Maragall, fue trasladada al Parque Los Caobos. La plaza actual tiene una fuente distinta, fruto de rehabilitaciones posteriores.',
            'Si quieres profundizar en esa distinción, consulta la página sobre la Fuente Venezuela original y su traslado a Los Caobos.'
          ]
        },
        {
          heading: 'Lo que dice la rehabilitación de 2009',
          paragraphs: [
            'El archivo del proyecto BAQ 2010 describe la recuperación de la fuente y sus sistemas de agua, luz y sonido. La guía no ha verificado un esquema actual de filtración, ahorro de agua ni un programa automático de espectáculos.',
            'El aspecto y el funcionamiento pueden cambiar por mantenimiento. Las fotografías históricas y los documentos de rehabilitación no demuestran la operación de hoy.'
          ]
        },
        {
          heading: 'Cómo mirarla sin esperar un show',
          paragraphs: [
            'La fuente gana protagonismo cuando está operativa, especialmente después del atardecer. Pero no hay un horario de función confirmado, así que conviene tratarla como un elemento urbano de luz y agua que puede o no estar activo.',
            'Para una visita al anochecer, confirma primero si la fuente está funcionando y organiza el regreso con tiempo, porque el transporte nocturno tiene sus propias condiciones.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿La fuente de Plaza Venezuela es la original?',
          a: 'No. La fuente original de Ernesto Maragall fue trasladada al Parque Los Caobos. La plaza actual tiene una fuente distinta, resultado de rehabilitaciones posteriores.'
        },
        {
          q: '¿A qué hora hay espectáculo de luz y agua?',
          a: 'No se ha verificado un programa vigente. La documentación de la rehabilitación de 2009 describe recursos de iluminación y sonido, pero no una función fija ni un horario actual.'
        },
        {
          q: '¿La entrada para ver la fuente es gratuita?',
          a: 'No se ha verificado de forma independiente una tarifa actual ni el acceso gratuito en toda circunstancia. Confirma las indicaciones del lugar; la fuente forma parte de un espacio público, pero las condiciones pueden cambiar.'
        }
      ],
      related: ['fuente-original-los-caobos', 'historia', 'arte-cinetico', 'parque-los-caobos'],
      photo: 'panorama'
    }
  },
  {
    slug: 'fuente-original-los-caobos',
    group: 'historia-arte',
    title: 'La Fuente Venezuela original y su traslado a Los Caobos',
    metaTitle: 'Fuente Venezuela original · Por qué está en Los Caobos',
    metaDescription:
      'La fuente original de Plaza Venezuela, de Ernesto Maragall, fue trasladada al Parque Los Caobos. Qué diferencia aclarar antes de visitar ambos espacios.',
    ready: true,
    content: {
      kicker: 'Historia de la fuente',
      h1: 'La Fuente Venezuela original y su traslado a Los Caobos',
      metaTitle: 'Fuente Venezuela original · Por qué está en Los Caobos',
      metaDescription:
        'La fuente original de Plaza Venezuela, de Ernesto Maragall, fue trasladada al Parque Los Caobos. Qué diferencia aclarar antes de visitar ambos espacios.',
      lead: 'Una confusión frecuente: la fuente que hoy está en Plaza Venezuela no es la obra original que lleva el nombre. La Fuente Venezuela original, diseñada por Ernesto Maragall, fue reubicada en el Parque Los Caobos, donde puede verse como pieza de ese parque histórico.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Autor original', value: 'Ernesto Maragall' },
        { label: 'Ubicación actual', value: 'Parque Los Caobos' },
        { label: 'Relación', value: 'Traslada de Plaza Venezuela' },
        { label: 'Fuente en la plaza', value: 'Obra posterior' }
      ],
      sections: [
        {
          heading: 'Dos obras con el mismo apellido',
          paragraphs: [
            'La historia del conjunto permite distinguir la Fuente Venezuela original, de Ernesto Maragall, de la fuente que hoy ocupa la plaza. La primera fue llevada al Parque Los Caobos; la segunda es resultado de las rehabilitaciones posteriores del espacio.',
            'Esta distinción importa si estás investigando o fotografiando: la pieza en Los Caobos tiene su propia historia dentro de ese parque, y no es la misma que verás en Avenida Casanova.'
          ]
        },
        {
          heading: 'Por qué aclararlo antes de ir',
          paragraphs: [
            'Si planeas visitar ambos lugares, conviene no asumir que la fuente "original" está en la plaza. El Parque Los Caobos y Plaza Venezuela son destinos separados, cada uno con sus accesos y condiciones propias.',
            'Para el recorrido entre ambos, consulta la página sobre Parque Los Caobos y la de cómo llegar; el trayecto a pie debe planearse con cruces peatonales seguros, no cruzando el distribuidor.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Dónde está la fuente original de Plaza Venezuela?',
          a: 'La Fuente Venezuela original, de Ernesto Maragall, fue trasladada al Parque Los Caobos. La fuente que hoy está en Plaza Venezuela es una obra posterior, fruto de rehabilitaciones del conjunto.'
        },
        {
          q: '¿Puedo ver las dos en la misma visita?',
          a: 'Son destinos separados. Puedes combinarlos, pero planea el trayecto a pie con pasos señalizados y evita atravesar carriles del distribuidor; cada espacio tiene sus propios accesos.'
        }
      ],
      related: ['fuente', 'parque-los-caobos', 'historia'],
      photo: 'panorama'
    }
  },
  {
    slug: 'abra-solar',
    group: 'historia-arte',
    title: 'Abra Solar de Alejandro Otero',
    metaTitle: 'Abra Solar de Alejandro Otero · Arte cinético en Plaza Venezuela',
    metaDescription:
      'Qué es Abra Solar, la estructura cinética de Alejandro Otero en Plaza Venezuela, y cómo observarla según la luz y el viento sin tocar la obra.',
    ready: true,
    content: {
      kicker: 'Arte cinético · 1982',
      h1: 'Abra Solar de Alejandro Otero',
      metaTitle: 'Abra Solar de Alejandro Otero · Arte cinético en Plaza Venezuela',
      metaDescription:
        'Qué es Abra Solar, la estructura cinética de Alejandro Otero en Plaza Venezuela, y cómo observarla según la luz y el viento sin tocar la obra.',
      lead: 'Abra Solar es una gran estructura de aluminio concebida como obra cinética: sus elementos responden al viento y a la luz. Más que una escultura estática, propone observar cómo el ambiente modifica lo que vemos.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Autor', value: 'Alejandro Otero' },
        { label: 'Año', value: '1982' },
        { label: 'Técnica', value: 'Estructura cinética' },
        { label: 'Material', value: 'Aluminio' }
      ],
      sections: [
        {
          heading: 'Una obra que depende del entorno',
          paragraphs: [
            'En Abra Solar, la estructura y sus elementos móviles permiten apreciar la relación entre viento, luz y metal. El movimiento no es un programa programado, sino la respuesta del objeto a lo que pasa a su alrededor.',
            'Por eso la mejor forma de mirarla es recorrerla desde distintos puntos y en distintas horas. La lectura cambia con la posición del observador y con las condiciones del día.'
          ]
        },
        {
          heading: 'Cómo observarla sin dañarla',
          paragraphs: [
            'Recorre los pasos permitidos sin tocar las piezas. No hay un color, secuencia de movimiento ni intervalo de observación garantizado; la experiencia es abierta.',
            'Respeta jardines, barreras y señales. No trepes a las esculturas ni dejes marcas sobre las obras.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Quién hizo Abra Solar?',
          a: 'Abra Solar es de Alejandro Otero, uno de los referentes del arte cinético venezolano del siglo XX. Se instaló en el entorno de Plaza Venezuela en 1982.'
        },
        {
          q: '¿La obra se mueve sola?',
          a: 'Sus elementos responden al viento y a la luz; no es una pieza con movimiento mecánico programado. La observación depende del ambiente y de tu posición.'
        }
      ],
      related: ['fisicromia-andres-bello', 'arte-cinetico', 'historia'],
      photo: 'abraSolar'
    }
  },
  {
    slug: 'fisicromia-andres-bello',
    group: 'historia-arte',
    title: 'Fisicromía en Homenaje a Andrés Bello',
    metaTitle: 'Fisicromía — Homenaje a Andrés Bello · Cruz-Díez en Plaza Venezuela',
    metaDescription:
      'La Fisicromía de Carlos Cruz-Díez en Plaza Venezuela: cómo el color se transforma con la posición del observador y por qué caminar frente a la obra es parte de la experiencia.',
    ready: true,
    content: {
      kicker: 'Arte cinético · 1982',
      h1: 'Fisicromía en Homenaje a Andrés Bello',
      metaTitle: 'Fisicromía — Homenaje a Andrés Bello · Cruz-Díez en Plaza Venezuela',
      metaDescription:
        'La Fisicromía de Carlos Cruz-Díez en Plaza Venezuela: cómo el color se transforma con la posición del observador y por qué caminar frente a la obra es parte de la experiencia.',
      lead: 'La Fisicromía — Homenaje a Don Andrés Bello, de Carlos Cruz-Díez, hace que el color deje de ser una superficie fija. Las franjas cromáticas producen lecturas distintas desde cada ángulo; caminar frente a la obra forma parte de la experiencia.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Autor', value: 'Carlos Cruz-Díez' },
        { label: 'Año', value: '1982' },
        { label: 'Técnica', value: 'Fisicromía' },
        { label: 'Homenaje', value: 'Andrés Bello' }
      ],
      sections: [
        {
          heading: 'El color como movimiento',
          paragraphs: [
            'En la Fisicromía, las bandas cromáticas generan variaciones visuales según la luz y la posición del observador. No hay una "imagen correcta": la obra se completa con quien la recorre.',
            'Esta pieza enlaza la plaza con la tradición cinética venezolana del siglo XX, junto con Abra Solar de Alejandro Otero.'
          ]
        },
        {
          heading: 'Cómo mirarla',
          paragraphs: [
            'Camina frente a la obra y observa desde distintos puntos seguros, sin invadir la calzada. Con luz diurna es más fácil leer los cambios de color.',
            'No toques las piezas ni bloquees los pasos con cámaras o trípodes. Para cualquier reutilización de imágenes, comprueba las licencias y los derechos que puedan corresponder a la obra.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué es una fisicromía?',
          a: 'Es una técnica de Carlos Cruz-Díez en la que franjas de color producen lecturas distintas según la luz y la posición de quien observa. El color "se mueve" con el espectador.'
        },
        {
          q: '¿A quién homenajea la obra?',
          a: 'A Andrés Bello, figura clave de la cultura y el pensamiento en Venezuela y América. El título completo es Fisicromía — Homenaje a Don Andrés Bello.'
        }
      ],
      related: ['abra-solar', 'arte-cinetico', 'historia'],
      photo: 'fisicromia'
    }
  },
  {
    slug: 'arte-cinetico',
    group: 'historia-arte',
    title: 'Guía del arte cinético en Plaza Venezuela',
    metaTitle: 'Arte cinético en Plaza Venezuela · Otero y Cruz-Díez',
    metaDescription:
      'La tradición cinética venezolana en Plaza Venezuela: Abra Solar de Otero y la Fisicromía de Cruz-Díez, y cómo observarlas como una lección de arte al aire libre.',
    ready: true,
    content: {
      kicker: 'Arte en movimiento',
      h1: 'Guía del arte cinético en Plaza Venezuela',
      metaTitle: 'Arte cinético en Plaza Venezuela · Otero y Cruz-Díez',
      metaDescription:
        'La tradición cinética venezolana en Plaza Venezuela: Abra Solar de Otero y la Fisicromía de Cruz-Díez, y cómo observarlas como una lección de arte al aire libre.',
      lead: 'Plaza Venezuela funciona como una pequeña lección de arte venezolano al aire libre. Dos obras emblemáticas de la tradición cinética conviven en el mismo entorno: Abra Solar, de Alejandro Otero, y la Fisicromía — Homenaje a Don Andrés Bello, de Carlos Cruz-Díez.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Obra 1', value: 'Abra Solar (Otero)' },
        { label: 'Obra 2', value: 'Fisicromía (Cruz-Díez)' },
        { label: 'Año', value: 'Ambas de 1982' },
        { label: 'Corriente', value: 'Arte cinético' }
      ],
      sections: [
        {
          heading: 'Dos maneras de hacer visible el tiempo',
          paragraphs: [
            'Otero trabaja con estructura, viento y reflejo: Abra Solar es una pieza que responde al ambiente. Cruz-Díez hace que el color se transforme a medida que cambia tu posición: la Fisicromía no tiene una imagen fija.',
            'Juntas, permiten leer por qué Caracas es una referencia del arte cinético latinoamericano del siglo XX.'
          ]
        },
        {
          heading: 'Cómo recorrerlas',
          paragraphs: [
            'Reserva entre 45 y 90 minutos si quieres observar la fuente y ambas obras con calma. Dedica más tiempo si fotografías o si añades parques y la universidad.',
            'Observa cada pieza desde distintos puntos seguros y con luz diurna. La iluminación de la fuente, cuando está operativa, cambia la lectura del conjunto al anochecer.'
          ]
        },
        {
          heading: 'Cuidar las obras',
          paragraphs: [
            'No trepes a las esculturas ni entres en el agua. Mantén a los niños supervisados y respeta jardines, barreras y señales.',
            'No pintes, pegues adhesivos ni dejes marcas sobre las obras. Deposita la basura en recipientes disponibles o llévala contigo.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué obras de arte hay en Plaza Venezuela?',
          a: 'Las dos más conocidas son Abra Solar, de Alejandro Otero, y la Fisicromía — Homenaje a Don Andrés Bello, de Carlos Cruz-Díez, ambas de 1982, dentro de la tradición cinética venezolana.'
        },
        {
          q: '¿El arte cinético es solo para fotografiar?',
          a: 'No. La experiencia es recorrer las obras y observar cómo cambian con la luz y tu posición. La fotografía es un registro, pero la lectura ocurre al caminar frente a ellas.'
        }
      ],
      related: ['abra-solar', 'fisicromia-andres-bello', 'fuente', 'historia'],
      photo: 'fisicromia'
    }
  },
  {
    slug: 'arquitectura',
    group: 'historia-arte',
    title: 'Arquitectura y edificios alrededor de Plaza Venezuela',
    metaTitle: 'Arquitectura en Plaza Venezuela · Edificios y entorno',
    metaDescription:
      'Los edificios y el entorno arquitectónico que rodean Plaza Venezuela, y cómo leer el conjunto urbano desde la Zona Rental.',
    ready: true,
    content: {
      kicker: 'Entorno urbano',
      h1: 'Arquitectura y edificios alrededor de Plaza Venezuela',
      metaTitle: 'Arquitectura en Plaza Venezuela · Edificios y entorno',
      metaDescription:
        'Los edificios y el entorno arquitectónico que rodean Plaza Venezuela, y cómo leer el conjunto urbano desde la Zona Rental.',
      lead: 'Plaza Venezuela se entiende mejor como parte de un conjunto urbano que como un edificio aislado. El entorno de Avenida Casanova y la Zona Rental reúne torres, equipamiento público y espacios abiertos que explican por qué la plaza funciona como nodo de Caracas.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Eje', value: 'Avenida Casanova' },
        { label: 'Entorno', value: 'Zona Rental' },
        { label: 'Lectura', value: 'Conjunto urbano' },
        { label: 'Estilo', value: 'Por verificar' }
      ],
      sections: [
        {
          heading: 'Una plaza definida por lo que la rodea',
          paragraphs: [
            'La imagen de Plaza Venezuela no viene de un solo edificio, sino de cómo se organizan las vías, las torres y los espacios peatonales. El distribuidor vial, la estación del Metro y los edificios de oficinas y vivienda del entorno construyen su aspecto cotidiano.',
            'Leer la arquitectura del lugar significa entender la relación entre la ciudad densa del este de Caracas y un punto de encuentro abierto al tráfico y al peatón.'
          ]
        },
        {
          heading: 'Zona Rental como clave del conjunto',
          paragraphs: [
            'La Zona Rental es una referencia documentada por la UCV para ubicar el entorno. Su trazado y sus edificios ayudan a explicar por qué Plaza Venezuela y el enlace de Zona Rental son piezas de un mismo sistema urbano.',
            'No se ha verificado una cronología de cada inmueble ni una clasificación patrimonial específica. Conviene tratar el entorno como contexto, no como una guía de edificios individuales.'
          ]
        },
        {
          heading: 'Cómo observarla con seguridad',
          paragraphs: [
            'Camina por los bordes peatonales señalizados y observa la plaza desde distintos puntos. La luz y el tráfico cambian la percepción del conjunto a lo largo del día.',
            'No ingreses a zonas de circulación vehicular ni cruces no señalizados para "mejorar" la vista: la seguridad del recorrido importa más que la fotografía.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué tipo de arquitectura hay en Plaza Venezuela?',
          a: 'No se ha verificado una clasificación de estilo única. El lugar se lee como un conjunto urbano de vías, torres y espacios abiertos en torno a Avenida Casanova y la Zona Rental.'
        },
        {
          q: '¿Hay edificios históricos frente a la plaza?',
          a: 'El entorno combina equipamiento público, torres y espacios abiertos; no se ha documentado aquí una lista patrimonial de los inmuebles. Trata la arquitectura como contexto del recorrido.'
        }
      ],
      related: ['historia', 'fuente', 'metro-plaza-venezuela', 'como-llegar'],
      photo: 'panorama'
    }
  },

  // ───────────────────────────── B. Cómo llegar y planificar ─────────────────────────────
  {
    slug: 'como-llegar',
    group: 'llegar-visita',
    title: 'Cómo llegar a Plaza Venezuela: Metro, autobús y mapa',
    metaTitle: 'Cómo llegar a Plaza Venezuela · Metro, autobús y mapa',
    metaDescription:
      'Cómo llegar a Plaza Venezuela en Caracas: estación de Metro, autobuses, taxi y a pie. Une las búsquedas de ubicación, cómo llegar y Metro en una guía clara.',
    ready: true,
    content: {
      kicker: 'Transporte detallado',
      h1: 'Cómo llegar a Plaza Venezuela: Metro, autobús y mapa',
      metaTitle: 'Cómo llegar a Plaza Venezuela · Metro, autobús y mapa',
      metaDescription:
        'Cómo llegar a Plaza Venezuela en Caracas: estación de Metro, autobuses, taxi y a pie. Une las búsquedas de ubicación, cómo llegar y Metro en una guía clara.',
      lead: 'Plaza Venezuela funciona como nodo porque conecta Metro, autobuses, taxis, avenidas y recorridos peatonales. Esta página une las búsquedas de "dónde queda", "cómo llegar" y "Metro" en un solo punto de partida.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Dirección', value: 'Av. Casanova, Caracas 1052' },
        { label: 'Plus Code', value: 'F4W7+MMM' },
        { label: 'Metro', value: 'Estación Plaza Venezuela' },
        { label: 'Ficha Maps', value: '22 de octubre de 2026' }
      ],
      sections: [
        {
          heading: 'En Metro',
          paragraphs: [
            'La estación Plaza Venezuela y el enlace de Zona Rental son las referencias principales. La documentación de la UCV describe conexiones con las líneas 1, 3 y 4; consulta al operador el servicio del día y sigue las salidas señalizadas.',
            'Para detalles de las líneas y combinaciones, consulta la página de la estación Plaza Venezuela.'
          ]
        },
        {
          heading: 'En autobús',
          paragraphs: [
            'Confirma la ruta, la parada y el precio con el operador antes de subir. No se ha verificado una conexión específica para esta visita; el entorno es denso y las paradas cambian con la operación urbana.'
          ]
        },
        {
          heading: 'En taxi y aplicaciones',
          paragraphs: [
            'Indica "Plaza Venezuela, Av. Casanova" y acuerda descenso en un borde vial seguro. Evita que el vehículo se detenga en carriles de circulación o dentro de zonas de cruce intenso.',
            'Para el regreso nocturno, define el punto de recogida antes de alejarte de las áreas iluminadas.'
          ]
        },
        {
          heading: 'A pie: planifica los cruces',
          paragraphs: [
            'Comprueba por separado los caminos a Sabana Grande, Los Caobos, el Jardín Botánico o la Ciudad Universitaria. Usa pasos y semáforos peatonales, y no cruces siguiendo trayectorias vehiculares del distribuidor.'
          ]
        },
        {
          heading: 'Desde el aeropuerto (CCS Maiquetía)',
          paragraphs: [
            'Desde el Aeropuerto Internacional Simón Bolívar de Maiquetía, la alternativa más directa es transporte terrestre autorizado o taxi hasta Plaza Venezuela; si usas transporte colectivo, planifica un enlace hacia el centro y luego Metro o transporte urbano. El tiempo varía mucho con el tráfico.',
            'No se ha comprobado un autobús directo ni un tiempo fijo de viaje a la plaza.'
          ]
        },
        {
          heading: 'En vehículo particular',
          paragraphs: [
            'No se ha verificado un aparcamiento exclusivo ni plazas disponibles, tarifas o franjas de congestión. Comprueba la señalización y las condiciones de estacionamiento antes de dejar el vehículo.',
            'En horas punta, la opción más simple suele ser evitar conducir hasta el centro del distribuidor.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Dónde queda Plaza Venezuela?',
          a: 'En Av. Casanova, Caracas 1052, Distrito Capital. La ficha de Google Maps consultada el 22 de octubre de 2026 da el Plus Code F4W7+MMM. El pin del mapa no es una entrada ni una parada segura verificada.'
        },
        {
          q: '¿Qué estación de Metro me deja en Plaza Venezuela?',
          a: 'La estación Plaza Venezuela, con el enlace de Zona Rental. La documentación de la UCV describe las líneas 1, 3 y 4; confirma el servicio del día con el operador.'
        },
        {
          q: '¿Se puede ir a pie desde Sabana Grande?',
          a: 'Sí, es una continuación natural hacia el este, pero planea los cruces con pasos señalizados y evita el distribuidor. No trates las distancias del mapa como rutas peatonales seguras verificadas.'
        }
      ],
      related: ['metro-plaza-venezuela', 'estacionamiento', 'desde-maiquetia', 'parque-los-caobos'],
      photo: 'panorama'
    }
  },
  {
    slug: 'metro-plaza-venezuela',
    group: 'llegar-visita',
    title: 'Estación Plaza Venezuela: líneas y conexiones',
    metaTitle: 'Estación Plaza Venezuela · Líneas y conexiones del Metro',
    metaDescription:
      'La estación Plaza Venezuela del Metro de Caracas: líneas documentadas, el enlace Zona Rental y cómo usarla como base para recorrer la ciudad.',
    ready: true,
    content: {
      kicker: 'Metro de Caracas',
      h1: 'Estación Plaza Venezuela: líneas y conexiones',
      metaTitle: 'Estación Plaza Venezuela · Líneas y conexiones del Metro',
      metaDescription:
        'La estación Plaza Venezuela del Metro de Caracas: líneas documentadas, el enlace Zona Rental y cómo usarla como base para recorrer la ciudad.',
      lead: 'La estación Plaza Venezuela es uno de los puntos de referencia para llegar al espacio y moverse por Caracas. La documentación de la UCV describe su relación con la Zona Rental y con varias líneas del sistema.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Referencia', value: 'Líneas 1, 3 y enlace L4' },
        { label: 'Enlace', value: 'Zona Rental' },
        { label: 'Fuente', value: 'Documentación UCV' },
        { label: 'Confirma', value: 'Servicio del día' }
      ],
      sections: [
        {
          heading: 'Qué dice la documentación',
          paragraphs: [
            'La Fundación Fondo Andrés Bello de la UCV documenta el entorno de Zona Rental y las estaciones Plaza Venezuela y Zona Rental, con conexiones descritas para las líneas 1, 3 y el enlace de la línea 4.',
            'Esa documentación ayuda a ubicar el conjunto, pero no sustituye la información del servicio actual. Consulta al Metro el funcionamiento del día.'
          ]
        },
        {
          heading: 'Cómo usarla como base',
          paragraphs: [
            'La estación funciona bien como punto de partida para otros destinos: Sabana Grande, el centro, la Ciudad Universitaria o el eje cultural. Para cada combinación, confirma la línea y la salida señalizada.',
            'No se ha comprobado el funcionamiento de ascensores ni un itinerario sin escalones; si lo necesitas, confirma con antelación.'
          ]
        },
        {
          heading: 'Salidas y cruces',
          paragraphs: [
            'Las salidas concentran flujos intensos. Prioriza las señalizadas, las rampas disponibles y los cruces peatonales formales para llegar a la plaza.',
            'Una página dedicada a las salidas de la estación se publicará cuando se cuente con información de ubicación y acceso verificada.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué líneas pasan por Plaza Venezuela?',
          a: 'La documentación de la UCV describe conexiones con las líneas 1, 3 y el enlace de la línea 4. Confirma con el Metro el servicio vigente antes de tu viaje.'
        },
        {
          q: '¿La estación conecta con Zona Rental?',
          a: 'Sí, el enlace de Zona Rental es una referencia documentada para planificar la llegada. Sigue las salidas señalizadas y confirma el servicio del día.'
        }
      ],
      related: ['como-llegar', 'salidas-del-metro', 'desde-sabana-grande', 'desde-bellas-artes'],
      photo: 'panorama'
    }
  },
  {
    slug: 'salidas-del-metro',
    group: 'llegar-visita',
    title: 'Salidas de la estación Plaza Venezuela',
    metaTitle: 'Salidas de la estación Plaza Venezuela · Cómo orientarse',
    metaDescription:
      'Cómo orientarse con las salidas de la estación Plaza Venezuela y llegar a la plaza: criterios de uso, cruces y qué confirmar antes de tu viaje.',
    ready: true,
    content: {
      kicker: 'Metro de Caracas',
      h1: 'Salidas de la estación Plaza Venezuela',
      metaTitle: 'Salidas de la estación Plaza Venezuela · Cómo orientarse',
      metaDescription:
        'Cómo orientarse con las salidas de la estación Plaza Venezuela y llegar a la plaza: criterios de uso, cruces y qué confirmar antes de tu viaje.',
      lead: 'La estación Plaza Venezuela concentra flujos intensos en sus salidas. Esta guía no ha verificado la ubicación exacta de cada salida: ofrece criterios para orientarte, priorizar las señalizadas y planear los cruces hacia la plaza.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Estación', value: 'Plaza Venezuela' },
        { label: 'Enlace', value: 'Zona Rental' },
        { label: 'Verificación', value: 'No por salida' },
        { label: 'Confirma', value: 'Señalización del día' }
      ],
      sections: [
        {
          heading: 'Por qué no listamos cada salida',
          paragraphs: [
            'No se ha verificado de forma independiente la ubicación exacta ni el estado actual de cada salida de la estación. Publicar un listado sin comprobación sería inventar información de acceso.',
            'En su lugar, conviene usar la señalización del interior de la estación y preguntar al personal antes de salir, porque las salidas pueden cambiar por obras o por la operación del día.'
          ]
        },
        {
          heading: 'Criterios para elegir la salida',
          paragraphs: [
            'Prioriza las salidas señalizadas y las rampas disponibles si vas con movilidad reducida o equipaje. Evita salir por donde se concentra el tráfico vehicular del distribuidor.',
            'Para llegar a la plaza, busca la salida que te deje en un borde peatonal seguro y usa pasos y semáforos formales. No cruces siguiendo trayectorias de vehículos.'
          ]
        },
        {
          heading: 'El enlace Zona Rental',
          paragraphs: [
            'El enlace de Zona Rental es una referencia documentada para planificar la llegada. Si tu destino queda del lado de la Zona Rental, confirma con el personal cuál salida acerca más.',
            'Consulta también la página de la estación y la de cómo llegar para encadenar el recorrido.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Cuántas salidas tiene la estación Plaza Venezuela?',
          a: 'No se ha verificado el número ni la ubicación exacta de cada salida. Usa la señalización interior y el personal de la estación para orientarte el día de tu visita.'
        },
        {
          q: '¿Cuál salida deja más cerca de la plaza?',
          a: 'Depende de la operación del día. Prioriza las salidas señalizadas que desembocan en un borde peatonal seguro y evita cruzar el distribuidor por trayectoria vehicular.'
        }
      ],
      related: ['metro-plaza-venezuela', 'como-llegar', 'accesibilidad', 'desde-sabana-grande'],
      photo: 'panorama'
    }
  },
  {
    slug: 'desde-sabana-grande',
    group: 'llegar-visita',
    title: 'Cómo llegar desde Sabana Grande',
    metaTitle: 'Cómo llegar a Plaza Venezuela desde Sabana Grande',
    metaDescription:
      'El recorrido entre Sabana Grande y Plaza Venezuela: a pie por el bulevar o en Metro, y cómo planear los cruces del distribuidor.',
    ready: true,
    content: {
      kicker: 'Desde el este',
      h1: 'Cómo llegar desde Sabana Grande',
      metaTitle: 'Cómo llegar a Plaza Venezuela desde Sabana Grande',
      metaDescription:
        'El recorrido entre Sabana Grande y Plaza Venezuela: a pie por el bulevar o en Metro, y cómo planear los cruces del distribuidor.',
      lead: 'Sabana Grande es la continuación natural de Plaza Venezuela hacia el este. Esta página reúne las formas de recorrer ese tramo, a pie por el bulevar o combinando Metro, y cómo planear los cruces con seguridad.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Dirección', value: 'Este desde la plaza' },
        { label: 'A pie', value: 'Por el bulevar' },
        { label: 'Metro', value: 'Estación Sabana Grande' },
        { label: 'Cruces', value: 'Señalizados' }
      ],
      sections: [
        {
          heading: 'A pie por el bulevar',
          paragraphs: [
            'El Bulevar de Sabana Grande es la prolongación peatonal más directa hacia el este. Es una buena opción si buscas combinar la plaza con vida urbana, comercio y opciones para comer.',
            'Planifica los cruces con pasos y semáforos señalizados. No cruces el distribuidor por trayectoria vehicular ni entre vehículos detenidos.'
          ]
        },
        {
          heading: 'En Metro',
          paragraphs: [
            'Sabana Grande es otra estación de referencia del sistema. Si prefieres no caminar, usa el Metro para ese tramo y confirma la línea y la salida del día.',
            'La combinación Metro + caminata corta suele ser más simple que intentar llegar en vehículo hasta el centro del distribuidor en horas punta.'
          ]
        },
        {
          heading: 'Qué llevar y precauciones',
          paragraphs: [
            'Lleva agua y supervisa a los niños cerca de los cruces: el bulevar concentra mucha gente en horas pico.',
            'No dejes objetos de valor a la vista ni te distraigas con el teléfono al cruzar.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Se puede ir caminando desde Sabana Grande a Plaza Venezuela?',
          a: 'Sí, por el Bulevar de Sabana Grande hacia el oeste es la continuación natural. Usa pasos señalizados y evita el distribuidor. No trates las distancias del mapa como rutas peatonales seguras verificadas.'
        },
        {
          q: '¿Cuánto tarda el recorrido a pie?',
          a: 'Depende del cruce y del ritmo. No se ha verificado un tiempo fijo; planea con holgura y descansa si hace calor.'
        }
      ],
      related: ['bulevar-sabana-grande', 'como-llegar', 'metro-plaza-venezuela', 'cafeterias-cerca'],
      photo: 'panorama'
    }
  },
  {
    slug: 'desde-ciudad-universitaria',
    group: 'llegar-visita',
    title: 'Cómo llegar desde la Ciudad Universitaria',
    metaTitle: 'Cómo llegar a Plaza Venezuela desde la Ciudad Universitaria',
    metaDescription:
      'Cómo llegar desde la Ciudad Universitaria de Caracas a Plaza Venezuela, y por qué conviene tratarlo como un destino con acceso propio.',
    ready: true,
    content: {
      kicker: 'Desde la UCV',
      h1: 'Cómo llegar desde la Ciudad Universitaria',
      metaTitle: 'Cómo llegar a Plaza Venezuela desde la Ciudad Universitaria',
      metaDescription:
        'Cómo llegar desde la Ciudad Universitaria de Caracas a Plaza Venezuela, y por qué conviene tratarlo como un destino con acceso propio.',
      lead: 'La Ciudad Universitaria de Caracas es un destino con acceso propio, no un punto intermedio de la plaza. Esta guía explica cómo acercarse desde allí sin confundir los recorridos ni asumir distancias peatonales verificadas.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Destino', value: 'Ciudad Universitaria (UCV)' },
        { label: 'Patrimonio', value: 'UNESCO 2000' },
        { label: 'Metro', value: 'Estación Ciudad Universitaria' },
        { label: 'A pie', value: 'Distancia por verificar' }
      ],
      sections: [
        {
          heading: 'Un destino distinto, no una parada',
          paragraphs: [
            'La Ciudad Universitaria tiene sus propios accesos, horarios de sus espacios y condiciones de visita. Conviene tratarla como una parada separada y luego acercarse a Plaza Venezuela.',
            'No asumas que el camino entre ambos es un paseo peatonal corto y seguro; la distancia y los cruces deben comprobarse en el terreno.'
          ]
        },
        {
          heading: 'En Metro',
          paragraphs: [
            'La estación Ciudad Universitaria es la referencia más directa dentro del sistema. Desde allí puedes combinar con la estación Plaza Venezuela; confirma la línea y la salida del día.',
            'Si vienes de visita a la universidad, define primero el punto de la UCV que quieres conocer y luego el enlace hacia la plaza.'
          ]
        },
        {
          heading: 'Cómo encadenar la visita',
          paragraphs: [
            'Una opción razonable es visitar la Ciudad Universitaria (Patrimonio de la Humanidad desde 2000) y luego bajar hacia Plaza Venezuela en Metro o transporte urbano.',
            'Consulta la página de la Ciudad Universitaria y la de cómo llegar para armar el recorrido completo.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Se puede ir caminando de la Ciudad Universitaria a Plaza Venezuela?',
          a: 'Es posible, pero no se ha verificado una ruta peatonal corta y segura. Mejor combina Metro o transporte urbano y confirma los cruces en el terreno.'
        },
        {
          q: '¿La Ciudad Universitaria es Patrimonio de la UNESCO?',
          a: 'Sí, la Ciudad Universitaria de Caracas fue inscrita en la lista de Patrimonio Mundial de la UNESCO en el año 2000. Es un destino cultural por derecho propio.'
        }
      ],
      related: ['ciudad-universitaria', 'metro-plaza-venezuela', 'como-llegar', 'ruta-de-museos'],
      photo: 'panorama'
    }
  },
  {
    slug: 'desde-bellas-artes',
    group: 'llegar-visita',
    title: 'Cómo llegar desde Bellas Artes',
    metaTitle: 'Cómo llegar a Plaza Venezuela desde Bellas Artes',
    metaDescription:
      'El trayecto entre el Museo de Bellas Artes, la Plaza de los Museos y Plaza Venezuela, y cómo encadenarlos en una visita cultural.',
    ready: true,
    content: {
      kicker: 'Eje cultural',
      h1: 'Cómo llegar desde Bellas Artes',
      metaTitle: 'Cómo llegar a Plaza Venezuela desde Bellas Artes',
      metaDescription:
        'El trayecto entre el Museo de Bellas Artes, la Plaza de los Museos y Plaza Venezuela, y cómo encadenarlos en una visita cultural.',
      lead: 'Bellas Artes, la Plaza de los Museos y Plaza Venezuela forman un eje cultural que puede encadenarse en una misma salida. Esta página explica cómo moverse entre ellos sin depender de un trayecto fijo verificado.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Punto de partida', value: 'Museo de Bellas Artes' },
        { label: 'Conexión', value: 'Plaza de los Museos' },
        { label: 'Metro', value: 'Estación Plaza Venezuela' },
        { label: 'A pie', value: 'Por verificar' }
      ],
      sections: [
        {
          heading: 'Bellas Artes y la Plaza de los Museos',
          paragraphs: [
            'El Museo de Bellas Artes y la Plaza de los Museos están próximos entre sí, por lo que suelen visitarse juntos. Desde allí, Plaza Venezuela queda a una distancia que debe comprobarse en el terreno.',
            'No asumas una ruta peatonal directa y segura sin confirmarla; el entorno tiene cruces intensos que conviene planear.'
          ]
        },
        {
          heading: 'En Metro',
          paragraphs: [
            'La estación Plaza Venezuela es la referencia para llegar al espacio desde la zona de los museos. Confirma la línea y la salida señalizada del día.',
            'Si prefieres caminar parte del trayecto, usa pasos peatonales formales y evita el distribuidor.'
          ]
        },
        {
          heading: 'Cómo armar la visita cultural',
          paragraphs: [
            'Puedes combinar Bellas Artes, la Plaza de los Museos y Plaza Venezuela en una salida, reservando tiempo para cada espacio.',
            'Consulta las páginas del Museo de Bellas Artes, la Plaza de los Museos y la ruta cultural para encadenarlos.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Están Bellas Artes y Plaza Venezuela muy lejos?',
          a: 'Están en el mismo eje cultural, pero no se ha verificado una distancia peatonal corta y segura. Combina Metro o transporte urbano y confirma los cruces.'
        },
        {
          q: '¿Puedo visitar Bellas Artes y la plaza el mismo día?',
          a: 'Sí. Son destinos cercanos en el mapa; organiza el tiempo por cada espacio y usa el Metro o pasos señalizados para moverte entre ellos.'
        }
      ],
      related: ['museo-bellas-artes', 'plaza-de-los-museos', 'ruta-de-museos', 'como-llegar'],
      photo: 'panorama'
    }
  },
  {
    slug: 'desde-maiquetia',
    group: 'llegar-visita',
    title: 'Cómo llegar desde el Aeropuerto de Maiquetía',
    metaTitle: 'Cómo llegar a Plaza Venezuela desde Maiquetía (CCS)',
    metaDescription:
      'Opciones desde el Aeropuerto Internacional Simón Bolívar de Maiquetía a Plaza Venezuela: transporte terrestre autorizado, taxi y enlaces hacia el centro.',
    ready: true,
    content: {
      kicker: 'Desde el aeropuerto',
      h1: 'Cómo llegar desde el Aeropuerto de Maiquetía',
      metaTitle: 'Cómo llegar a Plaza Venezuela desde Maiquetía (CCS)',
      metaDescription:
        'Opciones desde el Aeropuerto Internacional Simón Bolívar de Maiquetía a Plaza Venezuela: transporte terrestre autorizado, taxi y enlaces hacia el centro.',
      lead: 'Desde el Aeropuerto Internacional Simón Bolívar (CCS) de Maiquetía, la alternativa más directa hacia Plaza Venezuela es transporte terrestre autorizado o taxi. Esta página reúne las opciones y advierte sobre tiempos variables.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Aeropuerto', value: 'CCS · Maiquetía' },
        { label: 'Opción directa', value: 'Taxi / terrestre autorizado' },
        { label: 'Público', value: 'Con enlace al centro' },
        { label: 'Tiempo', value: 'Variable por tráfico' }
      ],
      sections: [
        {
          heading: 'Transporte directo autorizado',
          paragraphs: [
            'La opción más simple es transporte terrestre autorizado o taxi desde el aeropuerto hasta Plaza Venezuela o un punto cercano de Av. Casanova.',
            'Acuerda el descenso en un borde vial seguro y evita que el vehículo se detenga dentro de zonas de cruce intenso del distribuidor.'
          ]
        },
        {
          heading: 'Transporte público con enlaces',
          paragraphs: [
            'Si usas transporte colectivo, el recorrido suele requerir un enlace hacia el centro y luego Metro o transporte urbano. No se ha comprobado un autobús directo ni un tiempo fijo de viaje a la plaza.',
            'Planifica el enlace con holgura y confirma con el operador antes de subir.'
          ]
        },
        {
          heading: 'Tiempo y precauciones',
          paragraphs: [
            'El tiempo varía mucho con el tráfico entre Maiquetía y Caracas, especialmente en horas punta. No programes conexiones ajustadas.',
            'Para el regreso al aeropuerto, reserva el transporte con antelación y considera el mismo margen de tráfico.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Hay un autobús directo del aeropuerto a Plaza Venezuela?',
          a: 'No se ha comprobado un autobús directo ni un tiempo fijo de viaje. La opción más simple es taxi o transporte terrestre autorizado, o transporte público con un enlace hacia el centro y luego Metro.'
        },
        {
          q: '¿Cuánto tarda el trayecto?',
          a: 'Depende del tráfico entre Maiquetía y Caracas; no se ha verificado un tiempo fijo. Deja margen amplio, sobre todo en horas punta.'
        }
      ],
      related: ['como-llegar', 'metro-plaza-venezuela', 'estacionamiento', 'horarios-y-visita'],
      photo: 'panorama'
    }
  },
  {
    slug: 'estacionamiento',
    group: 'llegar-visita',
    title: 'Dónde estacionar cerca de Plaza Venezuela',
    metaTitle: 'Estacionamiento cerca de Plaza Venezuela · Consejos',
    metaDescription:
      'Dónde estacionar cerca de Plaza Venezuela: qué verificar antes de dejar el vehículo y por qué evitar el centro del distribuidor en horas punta.',
    ready: true,
    content: {
      kicker: 'En vehículo',
      h1: 'Dónde estacionar cerca de Plaza Venezuela',
      metaTitle: 'Estacionamiento cerca de Plaza Venezuela · Consejos',
      metaDescription:
        'Dónde estacionar cerca de Plaza Venezuela: qué verificar antes de dejar el vehículo y por qué evitar el centro del distribuidor en horas punta.',
      lead: 'Esta guía no recomienda un estacionamiento concreto: no se han verificado plazas, tarifas ni disponibilidad. Ofrece criterios para decidir dónde dejar el vehículo y por qué conviene evitar el centro del distribuidor en horas punta.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Zona', value: 'Av. Casanova · Zona Rental' },
        { label: 'Plazas fijas', value: 'No verificadas' },
        { label: 'Tarifas', value: 'Confirmar in situ' },
        { label: 'Consejo', value: 'Evitar el distribuidor' }
      ],
      sections: [
        {
          heading: 'Por qué no listamos un estacionamiento',
          paragraphs: [
            'No se ha verificado un aparcamiento exclusivo ni plazas disponibles, tarifas o franjas de congestión. Publicar un nombre concreto sin comprobación sería inventar información.',
            'En su lugar, conviene comprobar la señalización y las condiciones del día antes de dejar el vehículo.'
          ]
        },
        {
          heading: 'Criterios para elegir dónde dejar el auto',
          paragraphs: [
            'Busca zonas con señalización clara y, si es posible, estacionamiento vigilado. Confirma precio y tiempo antes de apartar el vehículo.',
            'En horas punta, la opción más simple suele ser evitar conducir hasta el centro del distribuidor y usar Metro o taxi para el último tramo.'
          ]
        },
        {
          heading: 'Seguridad del vehículo',
          paragraphs: [
            'No dejes objetos de valor a la vista. Revisa la zona de descenso para no bloquear cruces ni carriles de circulación.',
            'Define el punto de recogida para el regreso antes de alejarte de las áreas iluminadas.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Hay estacionamiento frente a Plaza Venezuela?',
          a: 'No se ha verificado un aparcamiento exclusivo ni disponibilidad y tarifas. Comprueba la señalización del día y, en horas punta, considera dejar el auto fuera del distribuidor y usar Metro o taxi.'
        },
        {
          q: '¿Vale la pena ir en carro propio?',
          a: 'Depende del día. El centro del distribuidor se satura en horas punta; muchas veces es más simple combinar vehículo con Metro o taxi para el último tramo.'
        }
      ],
      related: ['como-llegar', 'metro-plaza-venezuela', 'desde-maiquetia', 'accesibilidad'],
      photo: 'panorama'
    }
  },
  {
    slug: 'accesibilidad',
    group: 'llegar-visita',
    title: 'Accesibilidad y movilidad reducida',
    metaTitle: 'Accesibilidad en Plaza Venezuela · Movilidad reducida',
    metaDescription:
      'Accesibilidad y movilidad reducida en Plaza Venezuela: cruces, rampas y qué confirmar antes de la visita.',
    ready: true,
    content: {
      kicker: 'Para todos',
      h1: 'Accesibilidad y movilidad reducida',
      metaTitle: 'Accesibilidad en Plaza Venezuela · Movilidad reducida',
      metaDescription:
        'Accesibilidad y movilidad reducida en Plaza Venezuela: cruces, rampas y qué confirmar antes de la visita.',
      lead: 'Plaza Venezuela es un espacio abierto atravesado por vías intensas, por lo que la accesibilidad depende de los cruces y las salidas del Metro. Esta página explica qué considerar si vienes con movilidad reducida, coche de bebé o equipaje.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Espacio', value: 'Abierto y urbano' },
        { label: 'Rampas', value: 'Por confirmar' },
        { label: 'Metro', value: 'Consultar acceso' },
        { label: 'Cruces', value: 'Señalizados' }
      ],
      sections: [
        {
          heading: 'El reto principal: los cruces',
          paragraphs: [
            'El mayor obstáculo no es la plaza en sí, sino los cruces vehiculares que la rodean. Prioriza siempre pasos peatonales señalizados y, si es posible, las salidas con rampa del Metro.',
            'No se ha comprobado un itinerario sin escalones ni el funcionamiento de ascensores de la estación; confírmalo con el operador antes de tu viaje.'
          ]
        },
        {
          heading: 'Qué confirmar antes de ir',
          paragraphs: [
            'Verifica con el Metro la accesibilidad de la estación y las salidas el día de tu visita. Pregunta también por la disponibilidad de rampas en el recorrido peatonal.',
            'Si vienes con acompañante, definan el punto de encuentro y la ruta más corta entre la salida y la plaza.'
          ]
        },
        {
          heading: 'Recomendaciones prácticas',
          paragraphs: [
            'Evita las horas de mayor flujo vehicular para reducir el estrés de los cruces. Lleva agua y planifica pausas a la sombra.',
            'Para el regreso, acuerda el punto de recogida en un borde seguro y bien iluminado.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Es accesible Plaza Venezuela para sillas de ruedas?',
          a: 'El espacio abierto lo es, pero los cruces vehiculares y las salidas del Metro son la variable. No se ha verificado un itinerario sin escalones; confirma accesibilidad y rampas con el operador del Metro.'
        },
        {
          q: '¿El Metro tiene ascensores en Plaza Venezuela?',
          a: 'No se ha comprobado el funcionamiento de ascensores ni un itinerario sin escalones. Consulta al Metro el servicio vigente antes de tu viaje.'
        }
      ],
      related: ['salidas-del-metro', 'visita-con-ninos', 'metro-plaza-venezuela', 'estacionamiento'],
      photo: 'panorama'
    }
  },
  {
    slug: 'visita-con-ninos',
    group: 'llegar-visita',
    title: 'Visitar Plaza Venezuela con niños',
    metaTitle: 'Visitar Plaza Venezuela con niños · Consejos',
    metaDescription:
      'Cómo visitar Plaza Venezuela con niños: supervisión cerca del agua y del tráfico, pausas y qué llevar.',
    ready: true,
    content: {
      kicker: 'En familia',
      h1: 'Visitar Plaza Venezuela con niños',
      metaTitle: 'Visitar Plaza Venezuela con niños · Consejos',
      metaDescription:
        'Cómo visitar Plaza Venezuela con niños: supervisión cerca del agua y del tráfico, pausas y qué llevar.',
      lead: 'Plaza Venezuela puede ser una visita familiar si se planifica el recorrido y se mantiene la supervisión, sobre todo cerca del agua de la fuente y de los cruces vehiculares. Esta página reúne recomendaciones prácticas.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Supervisión', value: 'Cerca del agua' },
        { label: 'Cruces', value: 'Siempre señalizados' },
        { label: 'Pausas', value: 'A la sombra' },
        { label: 'Llevar', value: 'Agua y sol' }
      ],
      sections: [
        {
          heading: 'Seguridad primero',
          paragraphs: [
            'La fuente es el punto más atractivo para los niños, pero hay agua y bordes. Mantenlos supervisados y no los dejes trepar a las esculturas ni acercarse al espejo de agua.',
            'Los cruces vehiculares son el riesgo mayor. Usa siempre pasos y semáforos peatonales y dales la mano en el distribuidor.'
          ]
        },
        {
          heading: 'El arte como juego de observación',
          paragraphs: [
            'Abra Solar y la Fisicromía son buenas para que los niños observen cómo cambia lo que ven con la luz y la posición. Conviene explicarlo como un juego de colores y movimiento.',
            'No toquen las obras ni dejen marcas. Las piezas son parte del patrimonio artístico de la ciudad.'
          ]
        },
        {
          heading: 'Cómo organizar la salida',
          paragraphs: [
            'Reserva pausas para comer o tomar algo y descansar entre la plaza y un paseo más largo como el bulevar o Los Caobos.',
            'Lleva agua, protección solar y, si hace calor, planea la visita en las horas más suaves del día.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Es seguro llevar niños a Plaza Venezuela?',
          a: 'Puede ser una visita familiar si hay supervisión constante, especialmente cerca del agua de la fuente y de los cruces vehiculares. Usa siempre pasos señalizados.'
        },
        {
          q: '¿Qué pueden hacer los niños en la plaza?',
          a: 'Observar las obras de arte cinético, caminar por los bordes peatonales y descansar a la sombra. No suban a las esculturas ni se acerquen al agua sin supervisión.'
        }
      ],
      related: ['arte-cinetico', 'parque-los-caobos', 'accesibilidad', 'horarios-y-visita'],
      photo: 'panorama'
    }
  },
  {
    slug: 'horarios-y-visita',
    group: 'llegar-visita',
    title: 'Horarios, acceso y recomendaciones de visita',
    metaTitle: 'Horarios y recomendaciones de visita · Plaza Venezuela',
    metaDescription:
      'Horarios de referencia, tiempo recomendado y recomendaciones para visitar Plaza Venezuela sin depender de un programa fijo.',
    ready: true,
    content: {
      kicker: 'Planifica',
      h1: 'Horarios, acceso y recomendaciones de visita',
      metaTitle: 'Horarios y recomendaciones de visita · Plaza Venezuela',
      metaDescription:
        'Horarios de referencia, tiempo recomendado y recomendaciones para visitar Plaza Venezuela sin depender de un programa fijo.',
      lead: 'Plaza Venezuela no funciona como un atractivo con horario de taquilla. Esta página reúne una referencia de acceso, el tiempo recomendado y recomendaciones para visitar sin depender de un programa fijo de la fuente o de espectáculos.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Espacio', value: 'Abierto al aire libre' },
        { label: 'Programa fijo', value: 'No verificado' },
        { label: 'Tiempo', value: '45–90 min' },
        { label: 'Mejor luz', value: 'Diurna' }
      ],
      sections: [
        {
          heading: 'Sobre los horarios',
          paragraphs: [
            'No se ha verificado un horario de apertura ni un programa fijo de la fuente. La plaza es un espacio público abierto cuyas condiciones de acceso y operación dependen del día.',
            'No planifiques la visita alrededor de una supuesta función de luz y agua; trata la documentación histórica como contexto.'
          ]
        },
        {
          heading: 'Tiempo recomendado',
          paragraphs: [
            'Reserva entre 45 y 90 minutos si quieres observar la fuente y las dos obras de arte cinético con calma. Dedica más tiempo si fotografías o si añades parques y la universidad.',
            'Para una visita al anochecer, confirma primero si la fuente está operativa y organiza el regreso con tiempo.'
          ]
        },
        {
          heading: 'Recomendaciones generales',
          paragraphs: [
            'Lleva agua y protección solar. Usa pasos peatonales señalizados y evita el distribuidor.',
            'No dejes objetos de valor a la vista ni te distraigas con el teléfono al cruzar. Para decisiones críticas de viaje, confirma condiciones vigentes por canales oficiales.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿A qué hora abre Plaza Venezuela?',
          a: 'No se ha verificado un horario de apertura ni un programa fijo de la fuente. Es un espacio público abierto; no planifiques la visita alrededor de una supuesta función de luz y agua.'
        },
        {
          q: '¿Cuánto tiempo se necesita para visitarla?',
          a: 'Entre 45 y 90 minutos para ver la fuente y las obras de arte cinético con calma. Más si fotografías o combinas con Los Caobos o la Ciudad Universitaria.'
        }
      ],
      related: ['como-llegar', 'visita-con-ninos', 'fuente', 'itinerario-medio-dia'],
      photo: 'panorama'
    }
  },

  // ───────────────────────────── C. Parques, cultura y alrededores ─────────────────────────────
  {
    slug: 'parque-los-caobos',
    group: 'alrededores',
    title: 'Parque Los Caobos desde Plaza Venezuela',
    metaTitle: 'Parque Los Caobos · Desde Plaza Venezuela',
    metaDescription:
      'Parque Los Caobos visto desde Plaza Venezuela: por qué vale la pena prolongar la caminata, su fuente original y cómo llegar con cruces seguros.',
    ready: true,
    content: {
      kicker: 'Alrededores verdes',
      h1: 'Parque Los Caobos desde Plaza Venezuela',
      metaTitle: 'Parque Los Caobos · Desde Plaza Venezuela',
      metaDescription:
        'Parque Los Caobos visto desde Plaza Venezuela: por qué vale la pena prolongar la caminata, su fuente original y cómo llegar con cruces seguros.',
      lead: 'Parque Los Caobos es uno de los parques históricos del centro-este de Caracas. Es una prolongación natural de la visita a Plaza Venezuela si buscas sombra, escultura al aire libre y un paseo más tranquilo.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Tipo', value: 'Parque histórico' },
        { label: 'Distancia', value: 'Sujeta al cruce elegido' },
        { label: 'Atractivo', value: 'Fuente original trasladada' },
        { label: 'Acceso', value: 'Verificar aparte' }
      ],
      sections: [
        {
          heading: 'Por qué combinarlos',
          paragraphs: [
            'Los Caobos es útil para prolongar la caminata entre sombra y arte público. Además, alberga la Fuente Venezuela original de Ernesto Maragall, trasladada desde la plaza.',
            'Trátalo como un destino separado: sus horarios, conexiones a pie y condiciones de acceso deben comprobarse por separado.'
          ]
        },
        {
          heading: 'Cómo llegar desde la plaza',
          paragraphs: [
            'Comprueba el camino a pie con pasos señalizados y evita atravesar carriles del distribuidor. La distancia depende de la salida del Metro y del cruce elegido; no trates el valor del mapa como una ruta peatonal verificada.',
            'Si prefieres no caminar, evalúa transporte urbano hasta el borde del parque y confirma el acceso del día.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿La fuente original de Plaza Venezuela está en Los Caobos?',
          a: 'Sí. La Fuente Venezuela original, de Ernesto Maragall, fue trasladada al Parque Los Caobos. La fuente que hoy está en la plaza es una obra posterior.'
        },
        {
          q: '¿Se puede ir caminando desde Plaza Venezuela?',
          a: 'Es posible, pero planea los cruces con pasos señalizados y evita el distribuidor. La distancia depende del cruce; no asumas una ruta peatonal segura sin verificarla.'
        }
      ],
      related: ['fuente-original-los-caobos', 'fuente', 'jardin-botanico', 'como-llegar'],
      photo: 'panorama'
    }
  },
  {
    slug: 'bulevar-sabana-grande',
    group: 'alrededores',
    title: 'Qué ver en el Bulevar de Sabana Grande',
    metaTitle: 'Bulevar de Sabana Grande · Qué ver y cómo llegar',
    metaDescription:
      'El Bulevar de Sabana Grande como continuación de la visita: vida urbana, arquitectura y gran flujo peatonal, y cómo llegar desde Plaza Venezuela.',
    ready: true,
    content: {
      kicker: 'Alrededores urbanos',
      h1: 'Qué ver en el Bulevar de Sabana Grande',
      metaTitle: 'Bulevar de Sabana Grande · Qué ver y cómo llegar',
      metaDescription:
        'El Bulevar de Sabana Grande como continuación de la visita: vida urbana, arquitectura y gran flujo peatonal, y cómo llegar desde Plaza Venezuela.',
      lead: 'El Bulevar de Sabana Grande es la continuación natural de Plaza Venezuela hacia el este: un paseo peatonal con vida urbana, arquitectura y mucho movimiento. Es el destino más obvio para combinar con la plaza.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Tipo', value: 'Paseo peatonal' },
        { label: 'Dirección', value: 'Este desde la plaza' },
        { label: 'Atractivo', value: 'Comercio y vida urbana' },
        { label: 'Acceso', value: 'A pie o Metro' }
      ],
      sections: [
        {
          heading: 'Un paseo, no un monumento',
          paragraphs: [
            'El bulevar es un espacio de tránsito y encuentro: cafés, comercio, arquitectura y un flujo peatonal intenso. No es una atracción con horario, sino un tramo de la ciudad para recorrer.',
            'Es el lugar donde la visita a Plaza Venezuela suele extenderse si buscas comer, tomar algo o simplemente caminar con menos tráfico vehicular que el distribuidor.'
          ]
        },
        {
          heading: 'Cómo llegar desde la plaza',
          paragraphs: [
            'A pie es la opción más directa hacia el este, pero planifica los cruces con pasos señalizados. En Metro, Sabana Grande es otra estación de referencia del sistema.',
            'Lleva agua y supervisa a los niños cerca de los cruces; el bulevar concentra gente en horas pico.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Cómo se llega al Bulevar de Sabana Grande desde Plaza Venezuela?',
          a: 'A pie hacia el este es la continuación natural, con cruces señalizados. También puedes usar el Metro hasta la estación Sabana Grande. No cruces el distribuidor por trayectoria vehicular.'
        },
        {
          q: '¿Vale la pena visitar los dos juntos?',
          a: 'Sí, si buscas combinar la plaza y el arte con un paseo urbano y opciones para comer o tomar algo. Trata el bulevar como un tramo de la ciudad, no como un destino con horario.'
        }
      ],
      related: ['restaurantes-cerca', 'cafeterias-cerca', 'compras-sabana-grande', 'ruta-sabana-grande'],
      photo: 'panorama'
    }
  },
  {
    slug: 'jardin-botanico',
    group: 'alrededores',
    title: 'Jardín Botánico de Caracas',
    metaTitle: 'Jardín Botánico de Caracas · Guía desde Plaza Venezuela',
    metaDescription:
      'El Jardín Botánico de Caracas como visita separada desde Plaza Venezuela: naturaleza, educación y acceso propio a verificar.',
    ready: true,
    content: {
      kicker: 'Naturaleza urbana',
      h1: 'Jardín Botánico de Caracas',
      metaTitle: 'Jardín Botánico de Caracas · Guía desde Plaza Venezuela',
      metaDescription:
        'El Jardín Botánico de Caracas como visita separada desde Plaza Venezuela: naturaleza, educación y acceso propio a verificar.',
      lead: 'El Jardín Botánico de Caracas es un espacio de naturaleza y educación próximo a la Ciudad Universitaria. Conviene tratarlo como un destino separado, con acceso y condiciones propias a verificar.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Tipo', value: 'Jardín botánico' },
        { label: 'Entorno', value: 'Cerca de la UCV' },
        { label: 'Acceso', value: 'Verificar aparte' },
        { label: 'Plan', value: 'Visita separada' }
      ],
      sections: [
        {
          heading: 'Un destino con identidad propia',
          paragraphs: [
            'El Jardín Botánico se visita por su colección de plantas, sombra y ambiente de paseo, no como una extensión directa de la plaza. Trátalo como una parada aparte.',
            'Sus horarios y condiciones de acceso deben comprobarse por separado; no se han verificado aquí.'
          ]
        },
        {
          heading: 'Cómo acercarse desde la plaza',
          paragraphs: [
            'La opción más directa suele ser Metro combinado con una caminata corta, pero la ruta peatonal exacta y sus cruces deben confirmarse en el terreno.',
            'Evita cruzar el distribuidor por trayectoria vehicular; prioriza pasos señalizados.'
          ]
        },
        {
          heading: 'Por qué combinarlo',
          paragraphs: [
            'Si ya planeas la Ciudad Universitaria, el Jardín Botánico encaja como prolongación natural del paseo.',
            'Consulta también las páginas de la Ciudad Universitaria y de la ruta cultural para encadenar la visita.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿El Jardín Botánico está junto a Plaza Venezuela?',
          a: 'No; está próximo a la Ciudad Universitaria y se visita como destino aparte. Combínalo con la UCV y verifica acceso y horario por separado.'
        },
        {
          q: '¿Se puede ir caminando desde la plaza?',
          a: 'Es posible con Metro y una caminata corta, pero no se ha verificado una ruta peatonal segura fija. Usa pasos señalizados y evita el distribuidor.'
        }
      ],
      related: ['ciudad-universitaria', 'parque-los-caobos', 'ruta-de-museos', 'como-llegar'],
      photo: 'panorama'
    }
  },
  {
    slug: 'ciudad-universitaria',
    group: 'alrededores',
    title: 'Ciudad Universitaria de Caracas',
    metaTitle: 'Ciudad Universitaria de Caracas · Patrimonio UNESCO',
    metaDescription:
      'La Ciudad Universitaria de Caracas, Patrimonio de la UNESCO, como destino cultural separado desde Plaza Venezuela.',
    ready: true,
    content: {
      kicker: 'Patrimonio UNESCO',
      h1: 'Ciudad Universitaria de Caracas',
      metaTitle: 'Ciudad Universitaria de Caracas · Patrimonio UNESCO',
      metaDescription:
        'La Ciudad Universitaria de Caracas, Patrimonio de la UNESCO, como destino cultural separado desde Plaza Venezuela.',
      lead: 'La Ciudad Universitaria de Caracas es un destino cultural por derecho propio y Patrimonio Mundial de la UNESCO desde 2000. Esta guía explica cómo acercarse desde Plaza Venezuela y por qué conviene visitarla como parada separada.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Patrimonio', value: 'UNESCO 2000' },
        { label: 'Campus', value: 'Universidad Central' },
        { label: 'Metro', value: 'Estación Ciudad Universitaria' },
        { label: 'Acceso', value: 'Verificar por espacio' }
      ],
      sections: [
        {
          heading: 'Un campus que es patrimonio',
          paragraphs: [
            'La Ciudad Universitaria fue inscrita en la lista de Patrimonio Mundial de la UNESCO en 2000 por su valor arquitectónico y urbanístico. Es un destino cultural aparte, no una extensión de la plaza.',
            'Cada espacio del campus puede tener acceso y condiciones propias; compruébalas antes de tu visita.'
          ]
        },
        {
          heading: 'Cómo llegar desde Plaza Venezuela',
          paragraphs: [
            'La estación Ciudad Universitaria del Metro es la referencia más directa. Desde allí combinas con un recorrido a pie dentro del campus.',
            'No asumas que el camino entre la plaza y la universidad es un paseo peatonal corto y seguro; la distancia y los cruces deben comprobarse.'
          ]
        },
        {
          heading: 'Cómo visitarla',
          paragraphs: [
            'Reserva tiempo suficiente: el campus es extenso. Prioriza los espacios de interés y usa el Metro para evitar el tráfico del distribuidor.',
            'Consulta la página sobre cómo llegar desde la Ciudad Universitaria y la ruta cultural para armar el recorrido.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿La Ciudad Universitaria es Patrimonio de la UNESCO?',
          a: 'Sí, fue inscrita en la lista de Patrimonio Mundial de la UNESCO en 2000. Es un destino cultural por derecho propio.'
        },
        {
          q: '¿Cómo se llega desde Plaza Venezuela?',
          a: 'La estación Ciudad Universitaria del Metro es la referencia más directa. No se ha verificado una ruta peatonal corta y segura entre ambos; combina Metro y camina por pasos señalizados.'
        }
      ],
      related: ['desde-ciudad-universitaria', 'jardin-botanico', 'ruta-de-museos', 'metro-plaza-venezuela'],
      photo: 'panorama'
    }
  },
  {
    slug: 'museo-bellas-artes',
    group: 'alrededores',
    title: 'Museo de Bellas Artes',
    metaTitle: 'Museo de Bellas Artes · Desde Plaza Venezuela',
    metaDescription:
      'El Museo de Bellas Artes y la Plaza de los Museos como recorrido cultural desde Plaza Venezuela.',
    ready: true,
    content: {
      kicker: 'Arte y cultura',
      h1: 'Museo de Bellas Artes',
      metaTitle: 'Museo de Bellas Artes · Desde Plaza Venezuela',
      metaDescription:
        'El Museo de Bellas Artes y la Plaza de los Museos como recorrido cultural desde Plaza Venezuela.',
      lead: 'El Museo de Bellas Artes es uno de los ejes del recorrido cultural que puede encadenarse con Plaza Venezuela. Esta guía explica cómo acercarse y por qué conviene visitarlo como destino aparte.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Tipo', value: 'Museo de arte' },
        { label: 'Conjunto', value: 'Plaza de los Museos' },
        { label: 'Acceso', value: 'Verificar horario' },
        { label: 'Metro', value: 'Estación Plaza Venezuela' }
      ],
      sections: [
        {
          heading: 'Parte de la Plaza de los Museos',
          paragraphs: [
            'El Museo de Bellas Artes se visita junto con la Plaza de los Museos y otros espacios culturales cercanos. Conviene tratarlos como un eje aparte de la plaza.',
            'Los horarios y condiciones de cada museo deben comprobarse antes de tu visita; no se han verificado aquí.'
          ]
        },
        {
          heading: 'Cómo llegar desde Plaza Venezuela',
          paragraphs: [
            'La estación Plaza Venezuela es la referencia para moverte hacia la zona de los museos. Confirma línea y salida señalizada del día.',
            'Si prefieres caminar parte del trayecto, usa pasos peatonales formales y evita el distribuidor.'
          ]
        },
        {
          heading: 'Cómo encadenarla con la plaza',
          paragraphs: [
            'Puedes visitar Bellas Artes y luego bajar a Plaza Venezuela, o al revés, reservando tiempo para cada espacio.',
            'Consulta las páginas de la Plaza de los Museos y de la ruta cultural para armar el recorrido completo.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿El Museo de Bellas Artes está cerca de Plaza Venezuela?',
          a: 'Está en el mismo eje cultural, pero se visita como destino aparte. La estación Plaza Venezuela es la referencia de Metro para acercarte; verifica horarios de los museos por separado.'
        },
        {
          q: '¿Puedo combinar Bellas Artes con la plaza?',
          a: 'Sí. Son destinos cercanos en el mapa; organiza el tiempo por cada espacio y usa Metro o pasos señalizados para moverte entre ellos.'
        }
      ],
      related: ['plaza-de-los-museos', 'museo-de-ciencias', 'desde-bellas-artes', 'ruta-de-museos'],
      photo: 'panorama'
    }
  },
  {
    slug: 'museo-de-ciencias',
    group: 'alrededores',
    title: 'Museo de Ciencias de Caracas',
    metaTitle: 'Museo de Ciencias de Caracas · Guía',
    metaDescription:
      'El Museo de Ciencias de Caracas como destino familiar y cultural cercano a Plaza Venezuela.',
    ready: true,
    content: {
      kicker: 'Ciencia y familia',
      h1: 'Museo de Ciencias de Caracas',
      metaTitle: 'Museo de Ciencias de Caracas · Guía',
      metaDescription:
        'El Museo de Ciencias de Caracas como destino familiar y cultural cercano a Plaza Venezuela.',
      lead: 'El Museo de Ciencias de Caracas es una opción familiar y educativa próxima a la Plaza de los Museos. Esta guía explica cómo acercarse desde Plaza Venezuela y por qué conviene visitarlo como destino aparte.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Tipo', value: 'Museo de ciencias' },
        { label: 'Público', value: 'Familiar' },
        { label: 'Eje', value: 'Plaza de los Museos' },
        { label: 'Acceso', value: 'Verificar horario' }
      ],
      sections: [
        {
          heading: 'Un destino familiar',
          paragraphs: [
            'El Museo de Ciencias suele interesar a quienes visitan con niños o buscan una opción educativa. Se visita junto con la Plaza de los Museos, pero conviene tratarlo como parada aparte.',
            'Los horarios y condiciones de acceso deben comprobarse antes de tu visita; no se han verificado aquí.'
          ]
        },
        {
          heading: 'Cómo llegar desde Plaza Venezuela',
          paragraphs: [
            'La estación Plaza Venezuela es la referencia para moverte hacia la zona de los museos. Confirma línea y salida señalizada del día.',
            'Si caminas parte del trayecto, usa pasos peatonales formales y evita el distribuidor.'
          ]
        },
        {
          heading: 'Cómo combinarlo',
          paragraphs: [
            'Puedes encadenar el Museo de Ciencias con Bellas Artes y la plaza en una misma salida cultural.',
            'Consulta las páginas de la Plaza de los Museos y de la ruta cultural para armar el recorrido.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿El Museo de Ciencias está cerca de Plaza Venezuela?',
          a: 'Está en el eje de la Plaza de los Museos, que se visita como destino aparte. La estación Plaza Venezuela es la referencia de Metro; verifica horarios por separado.'
        },
        {
          q: '¿Es recomendable con niños?',
          a: 'Suele ser una opción familiar y educativa. Confirma las condiciones de acceso y horario antes de ir, y combínalo con un descanso cercano.'
        }
      ],
      related: ['museo-bellas-artes', 'plaza-de-los-museos', 'visita-con-ninos', 'ruta-de-museos'],
      photo: 'panorama'
    }
  },
  {
    slug: 'plaza-de-los-museos',
    group: 'alrededores',
    title: 'Plaza de los Museos',
    metaTitle: 'Plaza de los Museos · Recorrido cultural',
    metaDescription:
      'La Plaza de los Museos y cómo encadenarla con Bellas Artes y el Museo de Ciencias desde Plaza Venezuela.',
    ready: true,
    content: {
      kicker: 'Eje cultural',
      h1: 'Plaza de los Museos',
      metaTitle: 'Plaza de los Museos · Recorrido cultural',
      metaDescription:
        'La Plaza de los Museos y cómo encadenarla con Bellas Artes y el Museo de Ciencias desde Plaza Venezuela.',
      lead: 'La Plaza de los Museos articula varios espacios culturales de Caracas y puede encadenarse con Plaza Venezuela en una misma salida. Esta guía explica cómo moverse entre ellos.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Conjunto', value: 'Bellas Artes · Ciencias' },
        { label: 'Metro', value: 'Estación Plaza Venezuela' },
        { label: 'Acceso', value: 'Por espacio' },
        { label: 'Plan', value: 'Recorrido cultural' }
      ],
      sections: [
        {
          heading: 'Un eje, varios museos',
          paragraphs: [
            'La Plaza de los Museos reúne espacios como el Museo de Bellas Artes y el Museo de Ciencias. Cada uno tiene acceso y condiciones propias que deben comprobarse por separado.',
            'No asumas que todos comparten horario ni entrada; verifica antes de tu visita.'
          ]
        },
        {
          heading: 'Cómo llegar desde Plaza Venezuela',
          paragraphs: [
            'La estación Plaza Venezuela es la referencia de Metro para acercarte a la zona de los museos. Confirma línea y salida señalizada.',
            'Si caminas, usa pasos peatonales formales y evita el distribuidor.'
          ]
        },
        {
          heading: 'Cómo armar el recorrido',
          paragraphs: [
            'Reserva tiempo por cada museo y define un orden lógico. Puedes empezar en la plaza y bajar a los museos, o al revés.',
            'Consulta las páginas de Bellas Artes, del Museo de Ciencias y de la ruta cultural para encadenarlos.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué museos hay en la Plaza de los Museos?',
          a: 'Entre ellos, el Museo de Bellas Artes y el Museo de Ciencias. Cada espacio tiene acceso y horario propios que debes verificar antes de tu visita.'
        },
        {
          q: '¿Cómo se llega desde Plaza Venezuela?',
          a: 'La estación Plaza Venezuela es la referencia de Metro. No se ha verificado una ruta peatonal corta y segura; usa pasos señalizados o Metro.'
        }
      ],
      related: ['museo-bellas-artes', 'museo-de-ciencias', 'desde-bellas-artes', 'ruta-de-museos'],
      photo: 'panorama'
    }
  },
  {
    slug: 'teatro-teresa-carreno',
    group: 'alrededores',
    title: 'Teatro Teresa Carreño',
    metaTitle: 'Teatro Teresa Carreño · Cómo llegar',
    metaDescription:
      'El Complejo Cultural Teresa Carreño como destino cultural cercano a Plaza Venezuela, y cómo llegar de forma independiente.',
    ready: true,
    content: {
      kicker: 'Escena y cultura',
      h1: 'Teatro Teresa Carreño',
      metaTitle: 'Teatro Teresa Carreño · Cómo llegar',
      metaDescription:
        'El Complejo Cultural Teresa Carreño como destino cultural cercano a Plaza Venezuela, y cómo llegar de forma independiente.',
      lead: 'El Complejo Cultural Teresa Carreño es uno de los grandes escenarios de Caracas y un destino cultural aparte de Plaza Venezuela. Esta guía explica cómo acercarse y por qué verificar la cartelera por separado.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Tipo', value: 'Complejo cultural' },
        { label: 'Actividad', value: 'Cartelera propia' },
        { label: 'Metro', value: 'Estación Plaza Venezuela' },
        { label: 'Acceso', value: 'Verificar evento' }
      ],
      sections: [
        {
          heading: 'Un destino con su propia cartelera',
          paragraphs: [
            'El Teresa Carreño funciona con una programación propia de conciertos, ópera y artes escénicas. Conviene tratarlo como una parada aparte de la plaza y verificar la cartelera y el horario del evento.',
            'No se ha verificado aquí la agenda ni las condiciones de acceso por función.'
          ]
        },
        {
          heading: 'Cómo llegar desde Plaza Venezuela',
          paragraphs: [
            'La estación Plaza Venezuela es la referencia de Metro más cercana dentro del sistema. Confirma línea y salida señalizada del día.',
            'Si vas a un evento, define con antelación el punto de llegada y el regreso, porque el entorno se satura antes y después de las funciones.'
          ]
        },
        {
          heading: 'Cómo combinarlo',
          paragraphs: [
            'Puedes visitar la plaza de día y el teatro por la noche, pero planifica el regreso con tiempo y en un borde seguro.',
            'Consulta las páginas de cómo llegar y de accesibilidad para organizar el recorrido.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿El Teresa Carreño está cerca de Plaza Venezuela?',
          a: 'Es un destino cultural cercano en el mapa, pero con cartelera propia. La estación Plaza Venezuela es la referencia de Metro; verifica la función y el horario por separado.'
        },
        {
          q: '¿Se puede visitar la plaza y el teatro el mismo día?',
          a: 'Sí, pero planifica el regreso: el entorno del teatro se satura en horas de función. Define el punto de recogida en un borde seguro.'
        }
      ],
      related: ['como-llegar', 'accesibilidad', 'plaza-de-los-museos', 'horarios-y-visita'],
      photo: 'panorama'
    }
  },
  {
    slug: 'paseo-amador-bendayan',
    group: 'alrededores',
    title: 'Paseo Amador Bendayán',
    metaTitle: 'Paseo Amador Bendayán · Conexiones culturales',
    metaDescription:
      'El Paseo Amador Bendayán y sus conexiones culturales con el entorno de Plaza Venezuela.',
    ready: true,
    content: {
      kicker: 'Conexiones culturales',
      h1: 'Paseo Amador Bendayán',
      metaTitle: 'Paseo Amador Bendayán · Conexiones culturales',
      metaDescription:
        'El Paseo Amador Bendayán y sus conexiones culturales con el entorno de Plaza Venezuela.',
      lead: 'El Paseo Amador Bendayán es un eje peatonal y cultural del centro de Caracas con conexiones hacia la zona de los museos y la plaza. Esta guía explica cómo leerlo como parte del entorno y cómo moverse con seguridad.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Tipo', value: 'Paseo peatonal' },
        { label: 'Conexión', value: 'Eje de museos' },
        { label: 'Metro', value: 'Estación Plaza Venezuela' },
        { label: 'Acceso', value: 'Verificar por tramo' }
      ],
      sections: [
        {
          heading: 'Un eje que une cultura',
          paragraphs: [
            'El Paseo Amador Bendayán articula un recorrido peatonal con edificios y equipamiento cultural del centro. Se lee bien como prolongación de la visita a la plaza hacia la zona de los museos.',
            'Sus condiciones por tramo y sus cruces deben comprobarse en el terreno; no se han verificado aquí.'
          ]
        },
        {
          heading: 'Cómo llegar desde Plaza Venezuela',
          paragraphs: [
            'La estación Plaza Venezuela es la referencia de Metro. Desde allí puedes combinar con una caminata hacia el paseo por pasos señalizados.',
            'Evita cruzar el distribuidor por trayectoria vehicular y prioriza los semáforos peatonales.'
          ]
        },
        {
          heading: 'Cómo encadenarlo',
          paragraphs: [
            'Puedes combinar el paseo con la Plaza de los Museos y Bellas Artes en una salida cultural.',
            'Consulta las páginas de la Plaza de los Museos y de la ruta cultural para armar el recorrido.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿El Paseo Amador Bendayán conecta con la plaza?',
          a: 'Es un eje peatonal y cultural del centro que se acerca a la zona de los museos. La estación Plaza Venezuela es la referencia de Metro para moverte entre ambos.'
        },
        {
          q: '¿Vale la pena caminar por el paseo?',
          a: 'Si buscas un recorrido cultural continuo, sí; úsalo como prolongación hacia los museos y planifica los cruces con pasos señalizados.'
        }
      ],
      related: ['plaza-de-los-museos', 'museo-bellas-artes', 'ruta-de-museos', 'como-llegar'],
      photo: 'panorama'
    }
  },

  // ───────────────────────────── D. Comer, beber y comprar ─────────────────────────────
  {
    slug: 'restaurantes-cerca',
    group: 'comer',
    title: 'Restaurantes cerca de Plaza Venezuela',
    metaTitle: 'Restaurantes cerca de Plaza Venezuela · Criterios de elección',
    metaDescription:
      'Cómo elegir dónde comer cerca de Plaza Venezuela y Sabana Grande: tipos de cocina, presupuesto y qué verificar antes de entrar a un local.',
    ready: true,
    content: {
      kicker: 'Comer cerca: criterios',
      h1: 'Restaurantes cerca de Plaza Venezuela',
      metaTitle: 'Restaurantes cerca de Plaza Venezuela · Criterios de elección',
      metaDescription:
        'Cómo elegir dónde comer cerca de Plaza Venezuela y Sabana Grande: tipos de cocina, presupuesto y qué verificar antes de entrar a un local.',
      lead: 'Esta guía no recomienda un restaurante concreto. Ofrece criterios neutrales para elegir dónde comer cerca de Plaza Venezuela y del Bulevar de Sabana Grande, y recuerda que la presencia y disponibilidad de cada local deben comprobarse.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Zonas', value: 'Av. Casanova · Sabana Grande' },
        { label: 'Enfoque', value: 'Criterios, no locales' },
        { label: 'Recomendación', value: 'Comprobar antes' },
        { label: 'Postura', value: 'Sin fines de lucro' }
      ],
      sections: [
        {
          heading: 'Por qué no nombramos negocios',
          paragraphs: [
            'No se han verificado aquí horarios, precios ni condiciones de apertura de restaurantes específicos. Recomendar un local concreto sin comprobación sería inventar información.',
            'En su lugar, esta página te ayuda a comparar opciones por tipo de cocina, presupuesto y proximidad, y a confirmar lo básico en cada establecimiento.'
          ]
        },
        {
          heading: 'Cómo elegir',
          paragraphs: [
            'Define primero tu presupuesto y el tiempo disponible. El entorno de Av. Casanova y el Bulevar de Sabana Grande concentran opciones de comida local, rápida y sentada.',
            'Compara precios y condiciones en el local antes de sentarte. Observa las condiciones de manipulación y conservación de los alimentos.',
            'Si te interesa probar arepas, empanadas u otros platos, pregunta ingredientes y preparación; no des por sentado el menú del día.'
          ]
        },
        {
          heading: 'Si visitas con niños',
          paragraphs: [
            'Elige un lugar con espacio y supervisa a los menores cerca de la calle y del tráfico. Reserva una pausa para comer y descansar entre la plaza y el siguiente destino.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Hay restaurantes frente a Plaza Venezuela?',
          a: 'El entorno de Av. Casanova y Sabana Grande tiene opciones de comida, pero esta guía no recomienda un local concreto ni verifica sus horarios. Compara y confirma en cada establecimiento.'
        },
        {
          q: '¿Dónde comer más barato?',
          a: 'Depende del día y del local. Compara precios y porciones en el sitio; la comida rápida y los locales de la zona tienen condiciones distintas. No se ha verificado una opción "más barata" fija.'
        }
      ],
      related: ['cafeterias-cerca', 'desayunar-cerca', 'almorzar-cerca', 'bulevar-sabana-grande'],
      photo: 'panorama'
    }
  },
  {
    slug: 'cafeterias-cerca',
    group: 'comer',
    title: 'Cafeterías cerca de Plaza Venezuela',
    metaTitle: 'Cafeterías cerca de Plaza Venezuela · Dónde tomar un café',
    metaDescription:
      'Cafeterías cerca de Plaza Venezuela y Sabana Grande: cómo elegir un lugar para descansar, con criterios neutros y sin recomendaciones comerciales.',
    ready: true,
    content: {
      kicker: 'Café y descanso',
      h1: 'Cafeterías cerca de Plaza Venezuela',
      metaTitle: 'Cafeterías cerca de Plaza Venezuela · Dónde tomar un café',
      metaDescription:
        'Cafeterías cerca de Plaza Venezuela y Sabana Grande: cómo elegir un lugar para descansar, con criterios neutros y sin recomendaciones comerciales.',
      lead: 'Para una pausa corta, el entorno de Av. Casanova y el Bulevar de Sabana Grande concentran opciones de café. Esta guía da criterios para elegir dónde descansar, sin recomendar un local concreto.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Zonas', value: 'Av. Casanova · Sabana Grande' },
        { label: 'Uso', value: 'Pausa y descanso' },
        { label: 'Recomendación', value: 'Comprobar antes' },
        { label: 'Postura', value: 'Independiente' }
      ],
      sections: [
        {
          heading: 'El café como pausa del recorrido',
          paragraphs: [
            'Una cafetería es útil para descansar entre la plaza y un paseo más largo. Busca un lugar con acceso fácil desde tu ruta y sin desviarte demasiado.',
            'Si vienes del Metro, prioriza locales cerca de la salida señalizada para no volver a cruzar el distribuidor.'
          ]
        },
        {
          heading: 'Cómo elegir sin recomendaciones',
          paragraphs: [
            'Confirma qué establecimientos están abiertos y sus precios antes de desviar el recorrido. La disponibilidad cambia con el día y el barrio.',
            'Lleva agua además del café; no dependas de encontrar un comercio abierto durante toda la visita.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Hay cafeterías frente a Plaza Venezuela?',
          a: 'El entorno de Av. Casanova y Sabana Grande tiene opciones de café, pero no se recomienda un local concreto ni se verifican horarios. Compara y confirma en el sitio.'
        },
        {
          q: '¿Dónde tomarme un café después de la plaza?',
          a: 'El Bulevar de Sabana Grande, hacia el este, es la continuación natural con más opciones. Elige según proximidad a tu ruta y confirma apertura y precios.'
        }
      ],
      related: ['restaurantes-cerca', 'desayunar-cerca', 'bulevar-sabana-grande', 'como-llegar'],
      photo: 'panorama'
    }
  },
  {
    slug: 'desayunar-cerca',
    group: 'comer',
    title: 'Dónde desayunar cerca de Plaza Venezuela',
    metaTitle: 'Dónde desayunar cerca de Plaza Venezuela',
    metaDescription:
      'Opciones y criterios para desayunar cerca de Plaza Venezuela y Sabana Grande antes o después de la visita.',
    ready: true,
    content: {
      kicker: 'Desayuno',
      h1: 'Dónde desayunar cerca de Plaza Venezuela',
      metaTitle: 'Dónde desayunar cerca de Plaza Venezuela',
      metaDescription:
        'Opciones y criterios para desayunar cerca de Plaza Venezuela y Sabana Grande antes o después de la visita.',
      lead: 'Esta guía no recomienda un local concreto para desayunar. Ofrece criterios neutrales para elegir dónde desayunar cerca de Plaza Venezuela y del Bulevar de Sabana Grande, y recuerda que la presencia de cada local debe comprobarse.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Zonas', value: 'Av. Casanova · Sabana Grande' },
        { label: 'Enfoque', value: 'Criterios, no locales' },
        { label: 'Recomendación', value: 'Comprobar antes' },
        { label: 'Postura', value: 'Sin fines de lucro' }
      ],
      sections: [
        {
          heading: 'Por qué no sugerimos un sitio',
          paragraphs: [
            'No se han verificado horarios, precios ni condiciones de apertura de locales específicos para desayunar. Recomendar uno sin comprobación sería inventar información.',
            'En su lugar, esta página te ayuda a comparar opciones por tipo, presupuesto y proximidad, y a confirmar lo básico en cada establecimiento.'
          ]
        },
        {
          heading: 'Criterios para elegir el desayuno',
          paragraphs: [
            'Define si quieres algo rápido o sentado, y cuánto tiempo tienes antes de la visita. El entorno de Av. Casanova y Sabana Grande concentra opciones variadas.',
            'Compara precios y condiciones en el local antes de sentarte. Observa higiene y conservación de los alimentos.'
          ]
        },
        {
          heading: 'Si vienes con niños',
          paragraphs: [
            'Elige un lugar con espacio y supervisa a los menores cerca de la calle. Reserva una pausa para desayunar y descansar antes de la plaza.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Dónde desayunar cerca de la plaza?',
          a: 'El entorno de Av. Casanova y Sabana Grande tiene opciones, pero no se recomienda un local concreto ni se verifican horarios. Compara y confirma en cada establecimiento.'
        },
        {
          q: '¿Qué comer en un desayuno típico?',
          a: 'Depende del local. Pregunta ingredientes y preparación de arepas, empanadas u otros platos; no des por sentado el menú del día.'
        }
      ],
      related: ['restaurantes-cerca', 'cafeterias-cerca', 'panaderias-y-golfeados', 'bulevar-sabana-grande'],
      photo: 'panorama'
    }
  },
  {
    slug: 'almorzar-cerca',
    group: 'comer',
    title: 'Dónde almorzar en Plaza Venezuela y Sabana Grande',
    metaTitle: 'Dónde almorzar en Plaza Venezuela y Sabana Grande',
    metaDescription:
      'Criterios para almorzar cerca de Plaza Venezuela y Sabana Grande, y cómo encadenar la comida con el recorrido.',
    ready: true,
    content: {
      kicker: 'Almuerzo',
      h1: 'Dónde almorzar en Plaza Venezuela y Sabana Grande',
      metaTitle: 'Dónde almorzar en Plaza Venezuela y Sabana Grande',
      metaDescription:
        'Criterios para almorzar cerca de Plaza Venezuela y Sabana Grande, y cómo encadenar la comida con el recorrido.',
      lead: 'Esta guía no recomienda un restaurante concreto para almorzar. Ofrece criterios neutrales para elegir dónde comer cerca de Plaza Venezuela y del Bulevar de Sabana Grande, y recuerda que la disponibilidad de cada local debe comprobarse.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Zonas', value: 'Av. Casanova · Sabana Grande' },
        { label: 'Enfoque', value: 'Criterios, no locales' },
        { label: 'Recomendación', value: 'Comprobar antes' },
        { label: 'Postura', value: 'Independiente' }
      ],
      sections: [
        {
          heading: 'Por qué no nombramos negocios',
          paragraphs: [
            'No se han verificado aquí horarios, precios ni condiciones de apertura de restaurantes específicos para almorzar. Recomendar un local concreto sin comprobación sería inventar información.',
            'En su lugar, esta página te ayuda a comparar opciones por tipo de cocina, presupuesto y proximidad.'
          ]
        },
        {
          heading: 'Criterios para elegir el almuerzo',
          paragraphs: [
            'Define tu presupuesto y el tiempo disponible. El entorno combina comida local, rápida y sentada.',
            'Compara precios y porciones en el sitio. Observa las condiciones de manipulación y conservación de los alimentos antes de sentarte.'
          ]
        },
        {
          heading: 'Cómo encadenar la comida',
          paragraphs: [
            'Una buena opción es visitar la plaza por la mañana y almorzar en Sabana Grande, o al revés, usando el bulevar como pausa del recorrido.',
            'Reserva tiempo para el regreso y evita cruzar el distribuidor por trayectoria vehicular.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Dónde almorzar más cerca de la plaza?',
          a: 'El entorno de Av. Casanova y Sabana Grande tiene opciones de comida, pero no se recomienda un local concreto ni se verifican horarios. Compara y confirma en cada establecimiento.'
        },
        {
          q: '¿Conviene almorzar en Sabana Grande?',
          a: 'Puede ser práctico si ya recorres el bulevar. Elige según proximidad a tu ruta y confirma apertura y precios en el sitio.'
        }
      ],
      related: ['restaurantes-cerca', 'desayunar-cerca', 'cafeterias-cerca', 'bulevar-sabana-grande'],
      photo: 'panorama'
    }
  },
  {
    slug: 'panaderias-y-golfeados',
    group: 'comer',
    title: 'Panaderías y golfeados cerca de Plaza Venezuela',
    metaTitle: 'Panaderías y golfeados cerca de Plaza Venezuela',
    metaDescription:
      'Dónde encontrar panaderías y golfeados cerca de Plaza Venezuela, y por qué verificar horarios y precios.',
    ready: true,
    content: {
      kicker: 'Pan y dulce',
      h1: 'Panaderías y golfeados cerca de Plaza Venezuela',
      metaTitle: 'Panaderías y golfeados cerca de Plaza Venezuela',
      metaDescription:
        'Dónde encontrar panaderías y golfeados cerca de Plaza Venezuela, y por qué verificar horarios y precios.',
      lead: 'El golfeado es uno de los panes dulces más conocidos de Caracas. Esta guía no recomienda una panadería concreta, pero da criterios para encontrar panaderías y golfeados cerca de Plaza Venezuela y Sabana Grande.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Zonas', value: 'Av. Casanova · Sabana Grande' },
        { label: 'Enfoque', value: 'Criterios, no locales' },
        { label: 'Recomendación', value: 'Comprobar antes' },
        { label: 'Postura', value: 'Sin fines de lucro' }
      ],
      sections: [
        {
          heading: 'Por qué no sugerimos una panadería',
          paragraphs: [
            'No se han verificado horarios, precios ni disponibilidad de panaderías específicas. Recomendar un local sin comprobación sería inventar información.',
            'En su lugar, esta página ayuda a identificar opciones por proximidad y a confirmar lo básico en cada establecimiento.'
          ]
        },
        {
          heading: 'Criterios para elegir',
          paragraphs: [
            'Busca panaderías con movimiento y producto fresco; el giro de clientes suele indicar rotación. Compara precios del golfeado y otros panes antes de comprar.',
            'Confirma horario de apertura, porque varias panaderías pueden abrir temprano y cerrar tras el pico de la mañana.'
          ]
        },
        {
          heading: 'Qué preguntar',
          paragraphs: [
            'Pregunta ingredientes y si el golfeado lleva relleno dulce o queso, según el estilo del local. No des por sentado el surtido del día.',
            'Lleva efectivo o confirma medios de pago antes de hacer la fila.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Dónde comprar golfeados cerca de la plaza?',
          a: 'El entorno de Av. Casanova y Sabana Grande tiene panaderías, pero no se recomienda una concreta ni se verifican horarios. Compara y confirma en el sitio.'
        },
        {
          q: '¿Qué es un golfeado?',
          a: 'Es un pan dulce típico de Venezuela, enrollado y con relleno, que suele encontrarse en panaderías. Pregunta en el local su preparación y relleno.'
        }
      ],
      related: ['desayunar-cerca', 'cafeterias-cerca', 'bulevar-sabana-grande', 'compras-sabana-grande'],
      photo: 'panorama'
    }
  },
  {
    slug: 'compras-sabana-grande',
    group: 'comer',
    title: 'Dónde comprar en Sabana Grande',
    metaTitle: 'Dónde comprar en Sabana Grande · Comercio y servicios',
    metaDescription:
      'Compras y servicios en el Bulevar de Sabana Grande cerca de Plaza Venezuela: qué verificar antes de comprar.',
    ready: true,
    content: {
      kicker: 'Compras y servicios',
      h1: 'Dónde comprar en Sabana Grande',
      metaTitle: 'Dónde comprar en Sabana Grande · Comercio y servicios',
      metaDescription:
        'Compras y servicios en el Bulevar de Sabana Grande cerca de Plaza Venezuela: qué verificar antes de comprar.',
      lead: 'El Bulevar de Sabana Grande concentra comercio y servicios y es la prolongación natural de la plaza hacia el este. Esta guía da criterios para comprar y usar servicios sin recomendar negocios concretos.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Zona', value: 'Bulevar de Sabana Grande' },
        { label: 'Oferta', value: 'Comercio y servicios' },
        { label: 'Recomendación', value: 'Comprobar antes' },
        { label: 'Postura', value: 'Independiente' }
      ],
      sections: [
        {
          heading: 'Por qué no listamos comercios',
          paragraphs: [
            'No se han verificado aquí precios, horarios ni condiciones de comercios específicos. Recomendar un negocio sin comprobación sería inventar información.',
            'En su lugar, esta página ayuda a comparar opciones y a confirmar lo básico antes de comprar.'
          ]
        },
        {
          heading: 'Criterios para comprar',
          paragraphs: [
            'Compara precios entre locales antes de decidir. Observa condiciones de devolución y forma de pago, y guarda el comprobante de compra.',
            'Si buscas servicios (cajeros, farmacia, recargas), prioriza puntos bien señalizados y evita descuidar tus pertenencias en zonas concurridas.'
          ]
        },
        {
          heading: 'Cómo encadenarlo con la visita',
          paragraphs: [
            'Puedes visitar la plaza y luego recorrer el bulevar para compras o servicios, usando el paseo peatonal como continuación.',
            'Planifica los cruces con pasos señalizados y no cruces el distribuidor por trayectoria vehicular.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Dónde hacer compras cerca de Plaza Venezuela?',
          a: 'El Bulevar de Sabana Grande, hacia el este, concentra comercio y servicios. No se recomienda un negocio concreto; compara precios y confirma condiciones en el sitio.'
        },
        {
          q: '¿Hay servicios como cajeros o farmacia?',
          a: 'El bulevar y su entorno suelen tener servicios, pero no se verifican ubicaciones fijas. Busca puntos señalizados y cuida tus pertenencias en zonas concurridas.'
        }
      ],
      related: ['bulevar-sabana-grande', 'desayunar-cerca', 'cafeterias-cerca', 'almorzar-cerca'],
      photo: 'panorama'
    }
  },

  // ───────────────────────────── E. Rutas e itinerarios ─────────────────────────────
  {
    slug: 'ruta-sabana-grande',
    group: 'rutas',
    title: 'Ruta a pie: Plaza Venezuela y Sabana Grande',
    metaTitle: 'Ruta a pie · Plaza Venezuela y Sabana Grande',
    metaDescription:
      'Una ruta a pie que une Plaza Venezuela con el Bulevar de Sabana Grande: orden de la caminata, cruces y tiempo estimado.',
    ready: true,
    content: {
      kicker: 'A pie',
      h1: 'Ruta a pie: Plaza Venezuela y Sabana Grande',
      metaTitle: 'Ruta a pie · Plaza Venezuela y Sabana Grande',
      metaDescription:
        'Una ruta a pie que une Plaza Venezuela con el Bulevar de Sabana Grande: orden de la caminata, cruces y tiempo estimado.',
      lead: 'Esta ruta une Plaza Venezuela con el Bulevar de Sabana Grande en una caminata urbana. El orden, los cruces y el tiempo son sugerencias flexibles; la distancia peatonal exacta debe comprobarse en el terreno.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Tipo', value: 'Caminata urbana' },
        { label: 'Dirección', value: 'Este desde la plaza' },
        { label: 'Cruces', value: 'Señalizados' },
        { label: 'Tiempo', value: 'Ajusta al terreno' }
      ],
      sections: [
        {
          heading: 'Orden sugerido',
          paragraphs: [
            'Empieza en Plaza Venezuela observando la fuente y las obras de arte cinético. Luego avanza hacia el este por el bulevar, usando pasos y semáforos señalizados.',
            'Reserva una pausa para comer o tomar algo en Sabana Grande y descansa antes de regresar.'
          ]
        },
        {
          heading: 'Cruces y seguridad',
          paragraphs: [
            'No cruces el distribuidor por trayectoria vehicular. Usa siempre pasos peatonales formales y dale la mano a los niños.',
            'Lleva agua y protección solar; el tramo es abierto y puede hacer calor.'
          ]
        },
        {
          heading: 'Tiempo y ajustes',
          paragraphs: [
            'No se ha verificado un tiempo fijo de caminata. Ajusta el recorrido a tu ritmo y a las condiciones del día.',
            'Si prefieres no caminar todo el tramo, usa el Metro entre las estaciones Plaza Venezuela y Sabana Grande.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Se puede caminar de la plaza a Sabana Grande?',
          a: 'Sí, por el Bulevar de Sabana Grande hacia el este es la continuación natural. Usa pasos señalizados y evita el distribuidor. No trates las distancias del mapa como ruta peatonal verificada.'
        },
        {
          q: '¿Cuánto tiempo lleva la ruta?',
          a: 'Depende de tu ritmo y de los cruces. No se ha verificado un tiempo fijo; planea con holgura y descansa si hace calor.'
        }
      ],
      related: ['desde-sabana-grande', 'bulevar-sabana-grande', 'arte-cinetico', 'horarios-y-visita'],
      photo: 'panorama'
    }
  },
  {
    slug: 'ruta-los-caobos',
    group: 'rutas',
    title: 'Ruta de Plaza Venezuela a Parque Los Caobos',
    metaTitle: 'Ruta · Plaza Venezuela a Parque Los Caobos',
    metaDescription:
      'La ruta de Plaza Venezuela al Parque Los Caobos: cómo planear los cruces y ver la fuente original trasladada.',
    ready: true,
    content: {
      kicker: 'Verde y arte',
      h1: 'Ruta de Plaza Venezuela a Parque Los Caobos',
      metaTitle: 'Ruta · Plaza Venezuela a Parque Los Caobos',
      metaDescription:
        'La ruta de Plaza Venezuela al Parque Los Caobos: cómo planear los cruces y ver la fuente original trasladada.',
      lead: 'Esta ruta une Plaza Venezuela con el Parque Los Caobos, donde está la Fuente Venezuela original trasladada. El orden y los cruces son sugerencias; la ruta peatonal exacta debe comprobarse en el terreno.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Destino', value: 'Parque Los Caobos' },
        { label: 'Atractivo', value: 'Fuente original' },
        { label: 'Cruces', value: 'Señalizados' },
        { label: 'Tiempo', value: 'Ajusta al terreno' }
      ],
      sections: [
        {
          heading: 'Por qué vale la pena',
          paragraphs: [
            'El Parque Los Caobos alberga la Fuente Venezuela original de Ernesto Maragall, trasladada desde la plaza. Ver ambas piezas aclara la historia del conjunto.',
            'Trata el parque como un destino separado, con acceso y condiciones propias a verificar.'
          ]
        },
        {
          heading: 'Cómo planear los cruces',
          paragraphs: [
            'Comprueba el camino a pie con pasos señalizados y evita atravesar carriles del distribuidor. La distancia depende del cruce elegido.',
            'Si prefieres no caminar, evalúa transporte urbano hasta el borde del parque y confirma el acceso del día.'
          ]
        },
        {
          heading: 'Orden sugerido',
          paragraphs: [
            'Empieza en Plaza Venezuela viendo la fuente actual y el arte cinético, y termina en Los Caobos para ver la fuente original y su escultura al aire libre.',
            'Consulta las páginas de la fuente original y de Los Caobos para encadenar la visita.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Se puede ir caminando de la plaza a Los Caobos?',
          a: 'Es posible, pero planea los cruces con pasos señalizados y evita el distribuidor. La distancia depende del cruce; no asumas una ruta peatonal segura sin verificarla.'
        },
        {
          q: '¿La fuente original está en Los Caobos?',
          a: 'Sí. La Fuente Venezuela original, de Ernesto Maragall, fue trasladada al Parque Los Caobos. La fuente que hoy está en la plaza es una obra posterior.'
        }
      ],
      related: ['fuente-original-los-caobos', 'parque-los-caobos', 'fuente', 'ruta-arte-publico'],
      photo: 'panorama'
    }
  },
  {
    slug: 'ruta-arte-publico',
    group: 'rutas',
    title: 'Ruta del arte público y cinético en Caracas',
    metaTitle: 'Ruta del arte público y cinético en Caracas',
    metaDescription:
      'Una ruta del arte cinético que parte de Plaza Venezuela y enlaza Abra Solar y la Fisicromía con otras piezas del entorno.',
    ready: true,
    content: {
      kicker: 'Arte en movimiento',
      h1: 'Ruta del arte público y cinético en Caracas',
      metaTitle: 'Ruta del arte público y cinético en Caracas',
      metaDescription:
        'Una ruta del arte cinético que parte de Plaza Venezuela y enlaza Abra Solar y la Fisicromía con otras piezas del entorno.',
      lead: 'Esta ruta parte de Plaza Venezuela para leer la tradición cinética venezolana: Abra Solar, de Otero, y la Fisicromía, de Cruz-Díez. El orden es sugerencia; la ubicación exacta de cada pieza y sus cruces deben comprobarse.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Obra 1', value: 'Abra Solar (Otero)' },
        { label: 'Obra 2', value: 'Fisicromía (Cruz-Díez)' },
        { label: 'Año', value: 'Ambas de 1982' },
        { label: 'Lectura', value: 'Según la luz' }
      ],
      sections: [
        {
          heading: 'Cómo leer el arte cinético',
          paragraphs: [
            'En Abra Solar, observa cómo la estructura responde al viento y a la luz. En la Fisicromía, camina frente a la obra: el color cambia con tu posición.',
            'La experiencia ocurre al recorrer las piezas, no solo al fotografiarlas.'
          ]
        },
        {
          heading: 'Orden sugerido',
          paragraphs: [
            'Empieza por la Fisicromía y Abra Solar en la plaza, y amplía la mirada al entorno si buscas más arte público del mismo período.',
            'No trepes a las esculturas ni dejes marcas sobre las obras. Respeta jardines y señales.'
          ]
        },
        {
          heading: 'Cuidar las obras',
          paragraphs: [
            'Mantén a los niños supervisados y no entres en el agua de la fuente. Deposita la basura en recipientes disponibles o llévala contigo.',
            'Para reutilizar imágenes, comprueba licencias y derechos que puedan corresponder a las obras.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué obras de arte hay en Plaza Venezuela?',
          a: 'Las dos más conocidas son Abra Solar, de Alejandro Otero, y la Fisicromía — Homenaje a Don Andrés Bello, de Carlos Cruz-Díez, ambas de 1982.'
        },
        {
          q: '¿Cómo se observa el arte cinético?',
          a: 'Caminando frente a las piezas y observando cómo cambian con la luz y tu posición. La fotografía es un registro, pero la lectura ocurre al recorrerlas.'
        }
      ],
      related: ['arte-cinetico', 'abra-solar', 'fisicromia-andres-bello', 'ruta-sabana-grande'],
      photo: 'fisicromia'
    }
  },
  {
    slug: 'ruta-de-museos',
    group: 'rutas',
    title: 'Ruta cultural desde Plaza Venezuela a los museos',
    metaTitle: 'Ruta cultural · Plaza Venezuela a los museos',
    metaDescription:
      'Recorrido cultural desde Plaza Venezuela hacia la Plaza de los Museos, Bellas Artes y el Museo de Ciencias.',
    ready: true,
    content: {
      kicker: 'Eje cultural',
      h1: 'Ruta cultural desde Plaza Venezuela a los museos',
      metaTitle: 'Ruta cultural · Plaza Venezuela a los museos',
      metaDescription:
        'Recorrido cultural desde Plaza Venezuela hacia la Plaza de los Museos, Bellas Artes y el Museo de Ciencias.',
      lead: 'Esta ruta une Plaza Venezuela con la Plaza de los Museos, Bellas Artes y el Museo de Ciencias. El orden es sugerencia; los horarios y accesos de cada museo deben comprobarse por separado.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Paradas', value: 'Plaza · Museos' },
        { label: 'Metro', value: 'Estación Plaza Venezuela' },
        { label: 'Acceso', value: 'Por museo' },
        { label: 'Tiempo', value: 'Ajusta a cada espacio' }
      ],
      sections: [
        {
          heading: 'Orden sugerido',
          paragraphs: [
            'Empieza en Plaza Venezuela con la fuente y el arte cinético. Luego baja hacia la Plaza de los Museos y visita Bellas Artes y el Museo de Ciencias.',
            'Reserva tiempo por cada espacio; no asumas que comparten horario ni entrada.'
          ]
        },
        {
          heading: 'Cómo moverse',
          paragraphs: [
            'La estación Plaza Venezuela es la referencia de Metro hacia la zona de los museos. Confirma línea y salida señalizada.',
            'Si caminas, usa pasos peatonales formales y evita el distribuidor.'
          ]
        },
        {
          heading: 'Cómo prepararte',
          paragraphs: [
            'Verifica la cartelera y el horario de cada museo antes de ir. Lleva agua y protección solar para los tramos al aire libre.',
            'Consulta las páginas de la Plaza de los Museos, Bellas Artes y el Museo de Ciencias para armar el recorrido.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué museos puedo visitar saliendo de Plaza Venezuela?',
          a: 'Hacia la Plaza de los Museos: el Museo de Bellas Artes y el Museo de Ciencias, entre otros. Cada uno tiene acceso y horario propios que debes verificar.'
        },
        {
          q: '¿Cómo llegar de la plaza a los museos?',
          a: 'La estación Plaza Venezuela es la referencia de Metro. No se ha verificado una ruta peatonal corta y segura; usa pasos señalizados o Metro.'
        }
      ],
      related: ['plaza-de-los-museos', 'museo-bellas-artes', 'museo-de-ciencias', 'desde-bellas-artes'],
      photo: 'panorama'
    }
  },
  {
    slug: 'itinerario-medio-dia',
    group: 'rutas',
    title: 'Plaza Venezuela y alrededores en medio día',
    metaTitle: 'Itinerario de medio día · Plaza Venezuela y alrededores',
    metaDescription:
      'Un itinerario flexible de medio día que combina Plaza Venezuela, el arte cinético y un alrededor cercano.',
    ready: true,
    content: {
      kicker: 'Medio día',
      h1: 'Plaza Venezuela y alrededores en medio día',
      metaTitle: 'Itinerario de medio día · Plaza Venezuela y alrededores',
      metaDescription:
        'Un itinerario flexible de medio día que combina Plaza Venezuela, el arte cinético y un alrededores cercano.',
      lead: 'Un medio día permite combinar Plaza Venezuela con un alrededor cercano sin prisa. Este itinerario es flexible; ajusta el orden y los tiempos a tus intereses y al transporte del día.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Duración', value: '3–5 horas' },
        { label: 'Incluye', value: 'Plaza · arte · parque' },
        { label: 'Transporte', value: 'Metro o a pie' },
        { label: 'Ajuste', value: 'Al terreno' }
      ],
      sections: [
        {
          heading: 'Orden sugerido',
          paragraphs: [
            'Dedica la primera parte a Plaza Venezuela: fuente, Abra Solar y la Fisicromía. Luego prolonga hacia Parque Los Caobos o el bulevar, según prefieras naturaleza o vida urbana.',
            'Reserva una pausa para comer o tomar algo y descansar a la sombra.'
          ]
        },
        {
          heading: 'Cómo moverte',
          paragraphs: [
            'El Metro y los pasos peatonales señalizados son la base. Evita el distribuidor y usa cruces formales.',
            'Si vienes de lejos, define el punto de llegada y el regreso antes de alejarte de las áreas iluminadas.'
          ]
        },
        {
          heading: 'Cómo prepararte',
          paragraphs: [
            'Lleva agua y protección solar. Verifica accesos y horarios de los espacios que vayas a visitar.',
            'Consulta las páginas de Los Caobos, el bulevar y el arte cinético para armar el recorrido.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué se puede ver en medio día?',
          a: 'Plaza Venezuela con su fuente y arte cinético, y un alrededor como Los Caobos o el bulevar. Ajusta el orden y los tiempos a tus intereses.'
        },
        {
          q: '¿Vale la pena combinar con Los Caobos?',
          a: 'Sí si buscas sombra y escultura al aire libre, incluida la Fuente Venezuela original. Trátalo como destino aparte y verifica su acceso.'
        }
      ],
      related: ['horarios-y-visita', 'ruta-los-caobos', 'parque-los-caobos', 'arte-cinetico'],
      photo: 'panorama'
    }
  },
  {
    slug: 'itinerario-un-dia',
    group: 'rutas',
    title: 'Un día en Caracas empezando en Plaza Venezuela',
    metaTitle: 'Itinerario de un día · Caracas desde Plaza Venezuela',
    metaDescription:
      'Un día completo en Caracas empezando en Plaza Venezuela, con parques, cultura y comida.',
    ready: true,
    content: {
      kicker: 'Día completo',
      h1: 'Un día en Caracas empezando en Plaza Venezuela',
      metaTitle: 'Itinerario de un día · Caracas desde Plaza Venezuela',
      metaDescription:
        'Un día completo en Caracas empezando en Plaza Venezuela, con parques, cultura y comida.',
      lead: 'Un día completo permite combinar Plaza Venezuela con parques, cultura y comida. Este itinerario es flexible; ajusta el orden y los tiempos a tus intereses y al transporte del día.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Duración', value: 'Todo el día' },
        { label: 'Incluye', value: 'Plaza · parque · museos' },
        { label: 'Comida', value: 'En la ruta' },
        { label: 'Ajuste', value: 'Al terreno' }
      ],
      sections: [
        {
          heading: 'Orden sugerido',
          paragraphs: [
            'Empieza por Plaza Venezuela en la mañana, con la fuente y el arte cinético. Luego visita Parque Los Caobos o la Ciudad Universitaria, y reserva la tarde para la Plaza de los Museos.',
            'Intercala una pausa para almorzar en Sabana Grande o cerca de los museos.'
          ]
        },
        {
          heading: 'Cómo moverte',
          paragraphs: [
            'El Metro es la base para distancias mayores; usa pasos peatonales señalizados para los tramos cortos. Evita el distribuidor.',
            'Define con antelación el punto de llegada y el regreso, porque el entorno se satura en horas pico.'
          ]
        },
        {
          heading: 'Cómo prepararte',
          paragraphs: [
            'Lleva agua, protección solar y calzado cómodo. Verifica accesos y horarios de cada espacio antes de ir.',
            'Consulta las páginas de Los Caobos, la Ciudad Universitaria, la Plaza de los Museos y la ruta cultural para armar el recorrido.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué se puede hacer en un día desde Plaza Venezuela?',
          a: 'Plaza Venezuela, Parque Los Caobos o la Ciudad Universitaria por la mañana, y la Plaza de los Museos por la tarde, con una pausa para comer. Ajusta el orden a tus intereses.'
        },
        {
          q: '¿Vale la pena la Ciudad Universitaria en un día?',
          a: 'Sí si te interesa el patrimonio UNESCO, pero es extensa. Reserva tiempo suficiente y usa el Metro para evitar el tráfico del distribuidor.'
        }
      ],
      related: ['itinerario-medio-dia', 'ciudad-universitaria', 'ruta-de-museos', 'ruta-los-caobos'],
      photo: 'panorama'
    }
  },
  {
    slug: 'plan-dia-de-lluvia',
    group: 'rutas',
    title: 'Qué hacer cerca de Plaza Venezuela si llueve',
    metaTitle: 'Plan de lluvia · Qué hacer cerca de Plaza Venezuela',
    metaDescription:
      'Opciones cubiertas cerca de Plaza Venezuela para un día de lluvia: museos, centros comerciales y precauciones.',
    ready: true,
    content: {
      kicker: 'Plan de lluvia',
      h1: 'Qué hacer cerca de Plaza Venezuela si llueve',
      metaTitle: 'Plan de lluvia · Qué hacer cerca de Plaza Venezuela',
      metaDescription:
        'Opciones cubiertas cerca de Plaza Venezuela para un día de lluvia: museos, centros comerciales y precauciones.',
      lead: 'Si llueve, conviene priorizar espacios cubiertos y dejar la plaza para los tramos secos. Esta guía reúne opciones cerca de Plaza Venezuela y precauciones; los horarios y accesos deben comprobarse por separado.',
      updated: '22 de octubre de 2026',
      facts: [
        { label: 'Opción 1', value: 'Museos' },
        { label: 'Opción 2', value: 'Centros comerciales' },
        { label: 'Precaución', value: 'Cruces mojados' },
        { label: 'Verificar', value: 'Horarios' }
      ],
      sections: [
        {
          heading: 'Espacios cubiertos',
          paragraphs: [
            'La Plaza de los Museos (Bellas Artes, Museo de Ciencias) es la opción cultural más cercana. Cada museo tiene acceso y horario propios que debes verificar.',
            'Los centros comerciales del entorno de Sabana Grande ofrecen cobertura y servicios, pero no se recomienda uno concreto ni se verifican ubicaciones fijas.'
          ]
        },
        {
          heading: 'Cómo moverse con lluvia',
          paragraphs: [
            'Usa Metro para los tramos largos y minimiza los cruces a piemojados. Lleva paraguas o impermeable y calzado adecuado.',
            'Evita el distribuidor y prioriza pasos peatonales señalizados con buena visibilidad.'
          ]
        },
        {
          heading: 'Precauciones',
          paragraphs: [
            'Los cruces mojados y resbaladizos son el mayor riesgo; camina con cuidado y da la mano a los niños.',
            'No dejes objetos ni dispositivos expuestos a la lluvia más de lo necesario.'
          ]
        }
      ],
      faqs: [
        {
          q: '¿Qué hacer si llueve en Plaza Venezuela?',
          a: 'Prioriza espacios cubiertos como los museos de la Plaza de los Museos o centros comerciales de Sabana Grande. Verifica horarios y accesos por separado.'
        },
        {
          q: '¿Se puede visitar la plaza con lluvia?',
          a: 'Sí en los tramos secos, pero la observación de las obras al aire libre es mejor con buena luz. Usa Metro y ten precaución con los cruces mojados.'
        }
      ],
      related: ['plaza-de-los-museos', 'museo-bellas-artes', 'museo-de-ciencias', 'bulevar-sabana-grande'],
      photo: 'panorama'
    }
  }
];

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function topicSlugs(): string[] {
  return TOPICS.filter((t) => t.ready && t.content).map((t) => t.slug);
}

export function topicsByGroup(group: TopicGroup): Topic[] {
  return TOPICS.filter((t) => t.group === group && t.ready && t.content);
}

export function labelForLink(slug: string): string {
  return getTopic(slug)?.title ?? slug;
}
