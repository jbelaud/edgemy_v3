"use client"
import React from 'react';
import { CheckCircle, Users, Calendar, Shield, Brain } from 'lucide-react';

const features = [
  {
    name: 'Coachs professionnels',
    description: 'Accédez à un réseau de coachs de poker expérimentés et vérifiés.',
    icon: Users,
  },
  {
    name: "Coachs mentaux",
    description: "Améliorez votre état d'esprit et votre résilience avec nos coachs mentaux spécialisés.",
    icon: Brain,
  },
  {
    name: 'Sessions sur Discord',
    description: 'Profitez de sessions de coaching fluides et interactives via Discord.',
    icon: CheckCircle,
  },
  {
    name: 'Flexibilité',
    description: 'Réservez des sessions quand cela vous convient, 24/7.',
    icon: Calendar,
  },
  {
    name: "Sécurité des paiements",
    description: "Transactions sécurisées et protection des données pour votre tranquillité d’esprit.",
    icon: Shield,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white" id="fonctionnalites">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Fonctionnalités</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Améliorez votre jeu avec Edgemy
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Découvrez comment notre plateforme peut vous aider à devenir un meilleur joueur de poker.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}