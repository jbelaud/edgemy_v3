'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const faqItems = [
  {
    question: "Comment fonctionne la plateforme Edgemy ?",
    answer: "Edgemy connecte les joueurs de poker avec des coachs professionnels via Discord. Vous pouvez réserver des sessions de coaching via un choix en fonction de vos objectifs et format."
  },
  {
    question: "Comment choisir le bon coach pour moi ?",
    answer: "Notre plateforme propose des profils détaillés de chaque coach, y compris leurs spécialisations, leurs disponibilités et leurs avis. Vous pouvez filtrer les coachs en fonction de vos besoins spécifiques."
  },
  {
    question: "Puis-je essayer la plateforme avant de m'engager ?",
    answer: "Oui, en phase 1 la plateforme sera totalement gratuite pour les joueurs pour vous permettre de découvrir les fonctionnalités et de rencontrer des coachs."
  },
  {
    question: "Comment se déroulent les sessions de coaching ?",
    answer: "Les sessions se déroulent sur Discord, où vous pouvez discuter en direct avec votre coach, partager votre écran pour des analyses en temps réel et enregistrer vos sessions pour un suivi ultérieur."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les cartes de crédit, PayPal et d'autres méthodes de paiement sécurisées. Tous les paiements sont cryptés pour garantir votre sécurité."
  },
  {
    question: "Puis-je annuler ou modifier une réservation ?",
    answer: "Oui, vous pouvez annuler ou modifier une réservation jusqu'à 24 heures avant la session prévue. Consultez notre politique d'annulation pour plus de détails."
  }
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24 overflow-hidden" id="faq">
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Foire aux questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez des réponses aux questions les plus fréquentes sur notre plateforme.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-6 h-6 text-indigo-600" />
                  <span className="text-lg font-medium text-gray-900">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 sm:px-8 pb-6 sm:pb-8"
                  >
                    <p className="text-gray-600">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}