import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      collection: 'Collection',
      artists: 'Artists',
      explore: 'Explore',
      programs: 'Programs',
      visit: 'Visit',
      news: 'News',
    },
    home: {
      hero1: {
        eyebrow: 'The Collection',
        title: 'Four Decades of Contemporary Art',
        subtitle: 'Discover a remarkable collection assembled over forty years—focusing on artists who followed their own vision.',
        cta1: 'Explore the Collection',
        cta2: 'Plan Your Visit',
      },
      hero2: {
        eyebrow: 'The Collector',
        title: 'William Louis-Dreyfus',
        subtitle: 'A life dedicated to discovering and supporting artists working outside the mainstream.',
        cta: 'Learn His Story',
      },
      hero3: {
        eyebrow: 'Art Loan Program',
        title: 'Art That Travels',
        subtitle: 'Works from the collection regularly travel to museums and institutions worldwide.',
        cta: 'Learn More',
      },
      mission: {
        eyebrow: 'Our Mission',
        title: 'Stewardship, Education, and the Art of Sharing',
        body: 'The William Louis-Dreyfus Foundation preserves and shares a remarkable collection of contemporary art, ensuring these works remain accessible through museum loans, educational programs, and gallery visits.',
      },
      programs: {
        eyebrow: 'Programs',
        title: 'How We Share the Collection',
        artLoan: {
          title: 'Art Loan Program',
          description: 'Works travel to museums, universities, and cultural institutions worldwide.',
          cta: 'Learn More',
        },
        tours: {
          title: 'Tours & Education',
          description: 'Guided visits, virtual experiences, and educational programs.',
          cta: 'Book a Visit',
        },
        scholarship: {
          title: 'Writing & Scholarship',
          description: 'Essays, research, and curatorial insights on the collection.',
          cta: 'Read More',
        },
      },
      collection: {
        eyebrow: 'The Collection',
        title: 'Explore Contemporary Art',
        subtitle: 'From Abstract Expressionism to contemporary voices—discover the breadth of the collection.',
        cta: 'Browse All Artworks',
      },
      artists: {
        eyebrow: 'Featured Artist',
        cta: 'View All Artists',
      },
      virtualTour: {
        eyebrow: 'Virtual Experience',
        title: 'Explore the Gallery from Anywhere',
        body: 'Take a 360° virtual tour of our Mount Kisco gallery and discover works on view.',
        cta: 'Start Virtual Tour',
      },
      getInvolved: {
        title: 'Get Involved',
        visit: {
          title: 'Visit the Gallery',
          description: 'Schedule a visit to our Mount Kisco location.',
          cta: 'Plan Your Visit',
        },
        newsletter: {
          title: 'Stay Connected',
          description: 'Receive updates on new exhibitions and programs.',
          cta: 'Subscribe',
        },
        loan: {
          title: 'Request a Loan',
          description: 'Curators and institutions can inquire about borrowing works.',
          cta: 'Submit Inquiry',
        },
      },
    },
  },
  es: {
    nav: {
      collection: 'Colección',
      artists: 'Artistas',
      explore: 'Explorar',
      programs: 'Programas',
      visit: 'Visitar',
      news: 'Noticias',
    },
    home: {
      hero1: {
        eyebrow: 'La Colección',
        title: 'Cuatro Décadas de Arte Contemporáneo',
        subtitle: 'Descubre una notable colección reunida durante cuarenta años, centrada en artistas que siguieron su propia visión.',
        cta1: 'Explorar la Colección',
        cta2: 'Planifica tu Visita',
      },
      hero2: {
        eyebrow: 'El Coleccionista',
        title: 'William Louis-Dreyfus',
        subtitle: 'Una vida dedicada a descubrir y apoyar artistas que trabajan fuera de la corriente principal.',
        cta: 'Conoce su Historia',
      },
      hero3: {
        eyebrow: 'Programa de Préstamo de Arte',
        title: 'Arte que Viaja',
        subtitle: 'Las obras de la colección viajan regularmente a museos e instituciones de todo el mundo.',
        cta: 'Más Información',
      },
      mission: {
        eyebrow: 'Nuestra Misión',
        title: 'Custodia, Educación y el Arte de Compartir',
        body: 'La Fundación William Louis-Dreyfus preserva y comparte una notable colección de arte contemporáneo, asegurando que estas obras permanezcan accesibles a través de préstamos a museos, programas educativos y visitas a la galería.',
      },
      programs: {
        eyebrow: 'Programas',
        title: 'Cómo Compartimos la Colección',
        artLoan: {
          title: 'Programa de Préstamo de Arte',
          description: 'Las obras viajan a museos, universidades e instituciones culturales de todo el mundo.',
          cta: 'Más Información',
        },
        tours: {
          title: 'Visitas y Educación',
          description: 'Visitas guiadas, experiencias virtuales y programas educativos.',
          cta: 'Reservar Visita',
        },
        scholarship: {
          title: 'Escritura e Investigación',
          description: 'Ensayos, investigación y perspectivas curatoriales sobre la colección.',
          cta: 'Leer Más',
        },
      },
      collection: {
        eyebrow: 'La Colección',
        title: 'Explora el Arte Contemporáneo',
        subtitle: 'Desde el Expresionismo Abstracto hasta voces contemporáneas: descubre la amplitud de la colección.',
        cta: 'Ver Todas las Obras',
      },
      artists: {
        eyebrow: 'Artista Destacado',
        cta: 'Ver Todos los Artistas',
      },
      virtualTour: {
        eyebrow: 'Experiencia Virtual',
        title: 'Explora la Galería desde Cualquier Lugar',
        body: 'Haz un recorrido virtual de 360° por nuestra galería de Mount Kisco y descubre las obras expuestas.',
        cta: 'Iniciar Recorrido Virtual',
      },
      getInvolved: {
        title: 'Participa',
        visit: {
          title: 'Visita la Galería',
          description: 'Programa una visita a nuestra ubicación en Mount Kisco.',
          cta: 'Planifica tu Visita',
        },
        newsletter: {
          title: 'Mantente Conectado',
          description: 'Recibe actualizaciones sobre nuevas exposiciones y programas.',
          cta: 'Suscribirse',
        },
        loan: {
          title: 'Solicitar un Préstamo',
          description: 'Curadores e instituciones pueden consultar sobre el préstamo de obras.',
          cta: 'Enviar Consulta',
        },
      },
    },
  },
  fr: {
    nav: {
      collection: 'Collection',
      artists: 'Artistes',
      explore: 'Explorer',
      programs: 'Programmes',
      visit: 'Visiter',
      news: 'Actualités',
    },
    home: {
      hero1: {
        eyebrow: 'La Collection',
        title: 'Quatre Décennies d\'Art Contemporain',
        subtitle: 'Découvrez une remarquable collection assemblée pendant quarante ans, centrée sur des artistes qui ont suivi leur propre vision.',
        cta1: 'Explorer la Collection',
        cta2: 'Planifiez votre Visite',
      },
      hero2: {
        eyebrow: 'Le Collectionneur',
        title: 'William Louis-Dreyfus',
        subtitle: 'Une vie dédiée à la découverte et au soutien d\'artistes travaillant en dehors du courant dominant.',
        cta: 'Découvrir son Histoire',
      },
      hero3: {
        eyebrow: 'Programme de Prêt d\'Art',
        title: 'L\'Art qui Voyage',
        subtitle: 'Les œuvres de la collection voyagent régulièrement vers des musées et institutions du monde entier.',
        cta: 'En Savoir Plus',
      },
      mission: {
        eyebrow: 'Notre Mission',
        title: 'Conservation, Éducation et l\'Art du Partage',
        body: 'La Fondation William Louis-Dreyfus préserve et partage une remarquable collection d\'art contemporain, garantissant que ces œuvres restent accessibles grâce aux prêts aux musées, aux programmes éducatifs et aux visites de galerie.',
      },
      programs: {
        eyebrow: 'Programmes',
        title: 'Comment Nous Partageons la Collection',
        artLoan: {
          title: 'Programme de Prêt d\'Art',
          description: 'Les œuvres voyagent vers des musées, universités et institutions culturelles du monde entier.',
          cta: 'En Savoir Plus',
        },
        tours: {
          title: 'Visites et Éducation',
          description: 'Visites guidées, expériences virtuelles et programmes éducatifs.',
          cta: 'Réserver une Visite',
        },
        scholarship: {
          title: 'Écriture et Recherche',
          description: 'Essais, recherches et perspectives curatoriales sur la collection.',
          cta: 'Lire Plus',
        },
      },
      collection: {
        eyebrow: 'La Collection',
        title: 'Explorer l\'Art Contemporain',
        subtitle: 'De l\'Expressionnisme Abstrait aux voix contemporaines : découvrez l\'étendue de la collection.',
        cta: 'Parcourir Toutes les Œuvres',
      },
      artists: {
        eyebrow: 'Artiste en Vedette',
        cta: 'Voir Tous les Artistes',
      },
      virtualTour: {
        eyebrow: 'Expérience Virtuelle',
        title: 'Explorez la Galerie de N\'importe Où',
        body: 'Faites une visite virtuelle à 360° de notre galerie de Mount Kisco et découvrez les œuvres exposées.',
        cta: 'Commencer la Visite Virtuelle',
      },
      getInvolved: {
        title: 'Participez',
        visit: {
          title: 'Visitez la Galerie',
          description: 'Planifiez une visite à notre emplacement de Mount Kisco.',
          cta: 'Planifiez votre Visite',
        },
        newsletter: {
          title: 'Restez Connecté',
          description: 'Recevez des mises à jour sur les nouvelles expositions et programmes.',
          cta: 'S\'abonner',
        },
        loan: {
          title: 'Demander un Prêt',
          description: 'Les conservateurs et institutions peuvent se renseigner sur l\'emprunt d\'œuvres.',
          cta: 'Soumettre une Demande',
        },
      },
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}