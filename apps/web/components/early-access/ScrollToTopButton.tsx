'use client'

import { motion, useScroll, useAnimation } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.05) { // Affiche le bouton après 5% de défilement
        setIsVisible(true)
        controls.start({ opacity: 1, y: 0 })
      } else {
        controls.start({ opacity: 0, y: 20 }).then(() => setIsVisible(false))
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, controls])

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Défilement fluide
      })
    }
  }

  return (
    <>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
          whileHover={{ scale: 1.1 }} // Effet de zoom au survol
          whileTap={{ scale: 0.9 }} // Effet de rétrécissement au clic
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }} // Effet de pulsation
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.div>
        </motion.button>
      )}
    </>
  )
}