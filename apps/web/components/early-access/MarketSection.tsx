'use client'

import { motion, useInView } from 'framer-motion'
import { BarChart4, TrendingUp, Brain, Users, Rocket, Shield, Target, Globe } from 'lucide-react'
import { useRef } from 'react'

const whyEdgemy = [
  {
    icon: Target,
    title: "Un objectif clair : votre réussite",
    description: (
      <>Chez <span className="text-indigo-600">Edgemy</span>, notre mission est simple : transformer chaque joueur en un compétiteur redoutable. Grâce à un coaching sur-mesure et des outils innovants, nous vous donnons l’avantage dont vous avez besoin pour dominer vos parties.</>
    )
  },
  {
    icon: Brain,
    title: "Stratégie + Mental : La clé du succès",
    description: (
      <>Le poker ne se limite pas aux cartes. Sur <span className="text-indigo-600">Edgemy</span>, trouvez des coachs spécialisés qui vous aideront à perfectionner votre stratégie et à renforcer votre mindset. Progressez avec un accompagnement sur-mesure pour jouer avec confiance et constance, même sous pression.</>
    )
  },
  {
    icon: Users,
    title: "Des coachs d’exception à votre portée",
    description: "Accédez aux meilleurs coachs francophones, sélectionnés pour leur expertise et leur pédagogie. Que vous soyez un joueur débutant ou confirmé, les coachs vous accompagnent avec des conseils adaptés à votre style et à vos objectifs."
  },
  {
    icon: Rocket,
    title: "Un coaching structuré & un suivi de progression",
    description: "Réservez des sessions de review avec des coachs experts, accédez aux replays de vos sessions. Un accompagnement personnalisé pour optimiser votre jeu et atteindre vos objectifs."
  },
  {
    icon: Shield,
    title: "Une plateforme fiable et sécurisée",
    description: "Nous garantissons un environnement de coaching transparent, sécurisé et de haute qualité. Chaque coach est vérifié et chaque session est optimisée pour maximiser votre progression sans perte de temps."
  },
  {
    icon: Globe,
    title: "Une communauté gagnante",
    description: "Rejoignez un réseau de joueurs ambitieux et partagez vos expériences avec des passionnés du poker. Échangez, apprenez, évoluez ensemble et intégrez une dynamique de progression continue."
  }
];


export default function WhyEdgemySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-20%" })

  return (
    <section 
      ref={ref}
      className="relative bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24 overflow-hidden"
      
    >
      {/* Éléments décoratifs animés */}
      {/* <motion.div 
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
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-red-200 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 rounded-full blur-xl" />
      </motion.div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Titre et description */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4" id="pourquoi-edgemy">
            Pourquoi Edgemy ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez ce qui rend Edgemy unique et comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
        </motion.div>

        {/* Pourquoi Edgemy ? */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {whyEdgemy.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <item.icon className="w-8 h-8 text-indigo-600" />
                <h4 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h4>
              </div>
              <p className="text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}