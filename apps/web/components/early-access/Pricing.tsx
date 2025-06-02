'use client'

import { motion, useInView } from 'framer-motion'
import { Check } from "lucide-react"
import Link from 'next/link'
import { useRef } from 'react'

const tiers = [
  {
    name: "Abonnement Coach",
    price: 39,
    description: "Développez votre activité de coaching et gagnez en visibilité.",
    features: [
      "Profil coach optimisé et référencé.",
      "Mise en avant auprès des joueurs.",
      "Intégration complète avec Discord.",
      "Gestion des réservations simplifiée.",
      "Paiements sécurisés avec Stripe.",
      "Support prioritaire et assistance dédiée.",
    ],
    cta: "Devenir Coach →",
    color: "from-blue-600 to-purple-600",
    role: "coach_poker"
  },
  {
    name: "Abonnement Élève",
    price: 0,
    description: "Trouvez le coach idéal pour progresser rapidement.",
    features: [
      "Accès à un réseau de coachs proposant tous types de formats (cash, tournois, spin&go, mental, etc.).",
      "Réservation et paiement sécurisé.",
      "Profil personnalisé avec objectifs, ABI, format préféré et résultats détaillés.",
      "Intégration à la communauté Discord.",
      "Support dédié et suivi personnalisé.",
      "Gestion de bankroll et suivi de ses résultats.(à venir)"
    ],
    cta: "Rejoindre la liste →",
    color: "from-gray-900 to-gray-800",
    role: "player"
  }
];


export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-20%" })

  const handlePricingClick = (role: string) => {
    localStorage.setItem('selectedRole', role);
    if (role === 'coach_poker') {
      window.location.href = '#inscription-coach';
    } else {
      window.location.href = '#inscription';
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white"
      id="tarifs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Des offres adaptées à vos besoins
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez la formule qui correspond le mieux à votre profil
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 lg:p-12 border border-gray-100">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="text-lg text-gray-600">{tier.description}</p>
                  
                  <div className="space-y-4">
                    {tier.features.map((feature) => (
                      <motion.div
                        key={feature}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3"
                      >
                        <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-4">
                      {tier.price}€
                      <span className="text-xl text-gray-500">/mois</span>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => handlePricingClick(tier.role)}
                        className={`inline-block w-full py-4 rounded-xl font-medium bg-gradient-to-r ${tier.color} text-white transition-all`}
                      >
                        {tier.cta}
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}