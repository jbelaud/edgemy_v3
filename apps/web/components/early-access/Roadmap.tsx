'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Calendar, ShoppingBag, BarChart4, Users2, Wallet, Globe, Sparkles, Star } from 'lucide-react'

interface RoadmapItem {
  icon: React.ElementType;
  title: string;
  description: string;
  date: string;
  status: RoadmapStatus;
  features: string[];
  type: 'existing' | 'coach' | 'student' | 'general';
}

const roadmapItems: RoadmapItem[] = [
  // T1 2025 - En production
  {
    type: 'existing',
    icon: Users2,
    title: "Landing page",
    description: "Pour commencer à faire connaître la plateforme Edgemy",
    date: "T1 2025",
    status: "En production",
    features: ["Présentation des coachs", "Inscription à la liste d'attente", "Mise en avant des avantages pour joueurs et coachs"]
  },

  // T3 2025 - En développement
  {
    type: 'existing',
    icon: Users2,
    title: "Phase 1 - MVP",
    description: "Développement du MVP avec les fonctionnalités de base pour le lancement avant septembre 2025.",
    date: "T3 2025",
    status: "En développement",
    features: ["profil coach et joueur", "réservation en ligne avec paiement via Stripe", "session via API Discord", "tableau de bord joueur et coach"]
  },
  {
    type: 'existing',
    icon: Users2,
    title: "Sessions sur Discord",
    description: "Plateforme de coaching interactif avec intégration complète à Discord",
    date: "T3 2025",
    status: "En développement",
    features: ["réservation en ligne", "paiement sécurisé via Stripe", "salons privés Discord", "partage d'écran et enregistrement", "disponibilité 24/7"]
  },
  {
    type: 'existing',
    icon: Users2,
    title: "Coachs professionnels vérifiés",
    description: "Accès à notre réseau de coachs expérimentés et certifiés",
    date: "T3 2025",
    status: "En développement",
    features: ["processus de vérification des coachs", "affichage des spécialisations", "notation et avis des joueurs"]
  },
  {
    type: 'existing',
    icon: Star,
    title: "Système d'avis et notations",
    description: "Les joueurs et coachs peuvent s'évaluer mutuellement après une session.",
    date: "T3 2025",
    status: "En développement",
    features: [
      "notation sur 5 étoiles",
      "avis détaillés avec commentaires",
      "moyenne des évaluations visible sur le profil",
      "protection contre les abus (modération des avis)"
    ]
  },
  
  // T1 2026 - Phase 2
  {
    type: 'student',
    group: 1,
    icon: Wallet,
    title: "Phase 2 - abonnement premium pour les joueurs",
    description: "Accès exclusif aux fonctionnalités avancées et coaching sans commission.",
    date: "T1 2026",
    status: "Planifié",
    features: [
      "accès illimité aux coachs vérifiés",
      "sessions de coaching sans frais supplémentaires",
      "outils avancés de gestion de bankroll"
    ]
  },
  {
    type: 'student',
    group: 1,
    icon: Wallet,
    title: "Gestion de bankroll automatisée",
    description: "Suivi et gestion de la bankroll intégré à l'abonnement premium joueur.",
    date: "T1 2026",
    status: "Planifié",
    features: [
      "suivi des gains et pertes",
      "alertes personnalisées pour éviter les risques",
      "statistiques avancées et graphiques de progression"
    ]
  },
  {
    type: 'coach',
    group: 1,
    icon: BarChart4,
    title: "Tableau de bord coach",
    description: "Espace dédié pour le suivi des performances et des revenus des coachs.",
    date: "T1 2026",
    status: "Planifié",
    features: [
      "visualisation des revenus mensuels et annuels",
    ]
  },
  {
    type: 'student',
    group: 1,
    icon: Calendar,
    title: "Planification intelligente",
    description: "Calendrier interactif avec gestion intuitive des rendez-vous.",
    date: "T1 2026",
    status: "Planifié",
    features: [
      "interface glisser-déposer pour définir ses disponibilités",
      "réservations en un clic pour les joueurs",
      "synchronisation avec Google Calendar et autres outils"
    ]
  },
  {
    type: 'general',
    group: 1,
    icon: Sparkles,
    title: "Messagerie sécurisée",
    description: "Système de communication privé pour les échanges coachs-joueurs.",
    date: "T1 2026",
    status: "Planifié",
    features: [
      "partage de fichiers et documents",
      "historique des conversations et suivi des discussions",
      "notifications en temps réel"
    ]
  },

  // T3 2026 - Planifié
  {
    type: 'coach',
    group: 2,
    icon: BarChart4,
    title: "Export comptable simplifié",
    description: "Génération automatique de factures et rapports fiscaux pour la déclaration de revenus",
    date: "T3 2026",
    status: "Planifié",
    features: ["génération automatique de factures", "synthèse annuelle des revenus", "exportation compatible avec logiciels comptables"]
  },

  // T1 2027 - Planifié
  {
    type: 'coach',
    group: 3,
    icon: ShoppingBag,
    title: "Marketplace de contenu",
    description: "Plateforme de vente de ressources pédagogiques",
    date: "T1 2027",
    status: "Planifié",
    features: ["création et vente de masterclass","statistiques des ventes et paiements"]
  },
  {
    type: 'general',
    group: 3,
    icon: Globe,
    title: "Multi-devises",
    description: "Paiements internationaux avec conversion automatique",
    date: "T1 2027",
    status: "Planifié",
    features: ["paiements en EUR, USD, CAD", "conversion automatique des devises", "gestion de portefeuille multi-devises"]
  },

  // T1 2028 - À venir
  {
    type: 'general',
    group: 4,
    icon: Sparkles,
    title: "Application mobile",
    description: "Accès mobile à toutes les fonctionnalités Edgemy",
    date: "T1 2028",
    status: "À venir",
    features: ["disponible sur iOS et Android", "notifications push", "mode hors-ligne pour accès aux replays"]
  }
];

type RoadmapStatus = 'En production' | 'En développement' | 'Planifié' | 'À venir';

const statusColors: Record<RoadmapStatus, string> = {
  'En production': 'bg-green-500',
  'En développement': 'bg-blue-500',
  'Planifié': 'bg-yellow-500',
  'À venir': 'bg-gray-500'
};

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<HTMLDivElement[]>([])
  const [activeSection, setActiveSection] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
          setActiveSection(index)
        }
      })
    }, { threshold: 0.5 })

    sectionRefs.current.forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 min-h-screen bg-gradient-to-b from-indigo-50 to-white overflow-hidden" id="roadmap">
    {/* Éléments décoratifs animés */}
    <motion.div 
      className="absolute inset-0 opacity-10"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 360]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-indigo-200 rounded-full blur-xl" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full blur-xl" />
    </motion.div>
  
    <div className="container mx-auto px-4 relative z-10">
      {/* Titre et description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }} 
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full mb-4">
          Roadmap 2025
        </span>
        <h2 className="text-4xl font-bold mb-4">Notre vision pour l'avenir</h2>
        <p className="text-xl text-gray-600">
          Découvrez les améliorations passionnantes prévues pour enrichir votre expérience avec Edgemy
        </p>
      </motion.div>
  
      {/* Conteneur de la roadmap */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto">
        {/* Ligne de temps verticale */}
        <motion.div 
          style={{ height: timelineHeight }}
          className="absolute left-1/2 w-1.5 bg-gradient-to-b from-blue-600 to-blue-400 transform -translate-x-1/2 rounded-full z-0 shadow-lg"
        />
  
        {/* Éléments de la roadmap */}
        <div className="space-y-24 relative z-10">
          {roadmapItems.map((item, index) => (
            <div 
              key={index}
              ref={(el: HTMLDivElement) => {
                if (el) sectionRefs.current[index] = el
              }}
              className="relative group"
            >  
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`bg-white p-8 rounded-xl shadow-lg border ${
                  item.type === 'existing' ? 'border-purple-200' :
                  item.type === 'coach' ? 'border-blue-200' :
                  item.type === 'student' ? 'border-green-200' : 
                  'border-gray-200'
                } ${index % 2 === 0 ? 'ml-0' : 'ml-auto'}`}
                style={{ width: '90%' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-md ${
                      item.type === 'existing' ? 'bg-purple-500' :
                      item.type === 'coach' ? 'bg-blue-500' :
                      item.type === 'student' ? 'bg-green-500' : 
                      'bg-gray-500'
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`h-2 w-2 rounded-full ${statusColors[item.status]}`} />
                      <span className="text-sm text-gray-500">{item.status}</span>
                      <span className="text-sm font-medium text-blue-600">{item.date}</span>
                    </div>
                  </div>
                </div>
  
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.type === 'existing' ? 'bg-purple-100 text-purple-600' :
                        item.type === 'coach' ? 'bg-blue-100 text-blue-600' :
                        item.type === 'student' ? 'bg-green-100 text-green-600' : 
                        'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Sparkles className="inline-block w-4 h-4 mr-1" />
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}