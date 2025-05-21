"use client"

import { LandingButton } from "@workspace/ui/components/early-access/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative bg-indigo-100 overflow-hidden py-16 sm:py-24">
      {/* Fond animé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-purple-300/20 animate-gradient-x" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Titres avec animation en cascade */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Trouvez votre coach de poker pro</span>
                <motion.span
                  className="block text-indigo-600 mt-2"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  sur Discord
                </motion.span>
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Description avec apparition retardée */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Améliorez votre jeu avec des sessions de coaching personnalisées. Connectez-vous facilement avec des pros via Discord et élevez votre niveau de poker.
          </motion.p>

          {/* CTA avec effets interactifs */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-5 max-w-md mx-auto"
          >
            <LandingButton 
              asChild 
              variant="primary"
              size="lg"
              className="relative overflow-hidden group"
            >
              <Link href="#inscription">
                {/* Fond animé du bouton */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700"
                  initial={{ opacity: 1 }}
                  animate={{
                    background: [
                      'linear-gradient(to right, #4f46e5, #7c3aed)',
                      'linear-gradient(to right, #7c3aed, #4f46e5)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Texte avec effet de "float" */}
                <motion.span
                  className="relative z-10"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Rejoindre la liste d'attente 🚀
                </motion.span>
              </Link>
            </LandingButton>
          </motion.div>

          {/* Éléments décoratifs animés */}
          {/* <div className="absolute top-20 right-20 opacity-10">
            <motion.img
              src="/images/poker-chip.png"
              alt=""
              className="h-24 w-24"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />
          </div> */}
        </div>
      </div>
    </div>
  )
}