'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const partners = [
  {
    name: "PokerStars",
    logo: "/images/partners/pokerstars.png", // Remplace par le chemin de ton logo
  },
  {
    name: "GGPoker",
    logo: "/images/partners/ggpoker.png", // Remplace par le chemin de ton logo
  },
  {
    name: "MindCoach",
    logo: "/images/partners/mindcoach.png", // Remplace par le chemin de ton logo
  },
  {
    name: "PokerNews",
    logo: "/images/partners/pokernews.png", // Remplace par le chemin de ton logo
  },
  {
    name: "Winamax",
    logo: "/images/partners/winamax.png", // Remplace par le chemin de ton logo
  },
  {
    name: "WPT",
    logo: "/images/partners/wpt.png", // Remplace par le chemin de ton logo
  },
  {
    name: "EPT",
    logo: "/images/partners/ept.png", // Remplace par le chemin de ton logo
  },
  {
    name: "Hold'em Manager",
    logo: "/images/partners/holdemmanager.png", // Remplace par le chemin de ton logo
  }
]

export default function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-20%" })
  const [isPaused, setIsPaused] = useState(false)

  // Duplique les partenaires pour créer un effet de boucle fluide
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section 
      ref={ref}
      className="relative bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24 overflow-hidden"
      id="partenariats"
    >
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Titre et description */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos partenaires
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous collaborons avec les meilleurs acteurs du poker et du coaching pour vous offrir une expérience unique.
          </p>
        </motion.div>

        {/* Carrousel de logos */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-100%'], // Défilement de gauche à droite
            }}
            transition={{
              duration: 20, // Vitesse du défilement
              repeat: Infinity, // Boucle infinie
              ease: 'linear',
              pause: isPaused // Pause au survol
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 px-8 sm:px-12"
                whileHover={{ scale: 1.1 }} // Effet de zoom au survol
              >
                <div className="relative h-16 w-32 sm:h-20 sm:w-40">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain grayscale hover:grayscale-0 transition-all" // Effet grayscale au départ
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call-to-action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Vous souhaitez devenir partenaire ?
          </h3>
          <p className="text-xl text-gray-600 mb-6">
            Rejoignez notre réseau et collaborez avec les meilleurs.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
            >
              Contactez-nous 🚀
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}