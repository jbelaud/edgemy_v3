"use client"


import { Check } from "lucide-react"

const futureFeaturesInfo = {
  title: "Fonctionnalités à venir",
  description: "Découvrez les améliorations passionnantes prévues pour enrichir votre expérience Edgemy",
  coachFeatures: [
    {
      name: "Planification intuitive",
      description:
        "Profitez d'un calendrier interactif avec fonction glisser-déposer pour une gestion simplifiée de vos coachings.",
    },
    {
      name: "Outils de comptabilité intégrés",
      description: "Gérez facilement vos revenus et dépenses directement sur la plateforme.",
    },
    {
      name: "Marketplace de contenu",
      description: "Vendez vos ressources pédagogiques (PDF, vidéos, e-books) en complément de vos sessions.",
    },
  ],
  studentFeatures: [
    {
      name: "Abonnement Premium Élève",
      description:
        "Évitez les commissions sur les séances avec un paiement unique et accédez à des avantages exclusifs.",
    },
    {
      name: "Outils de gestion de bankroll",
      description:
        "Maîtrisez votre bankroll et suivez vos progrès avec des outils essentiels pour tout joueur de poker aspirant au professionnalisme.",
    },
    {
      name: "Communauté active sur Discord",
      description:
        "Rejoignez automatiquement un serveur communautaire pour interagir avec les coachs et autres élèves.",
    },
  ],
  generalFeatures: [
    {
      name: "Premier hub francophone de coaching poker",
      description:
        "Accédez à la plus grande communauté de coachs poker francophones, tous réunis sur une seule plateforme pour une visibilité et une mise en relation optimales.",
    },
    {
      name: "Paiement multi-devises",
      description: "Effectuez des transactions en EUR, USD, CAD et d'autres devises pour une clientèle internationale.",
    },
    {
      name: "Système de messagerie privée",
      description: "Communiquez directement avec vos coachs ou élèves de manière sécurisée.",
    },
    {
      name: "Intégration Stripe/PayPal",
      description: "Profitez de paiements sécurisés avec options d'abonnement mensuel ou annuel.",
    },
    {
      name: "Interface multilingue",
      description: "Utilisez la plateforme en français, anglais, espagnol et d'autres langues.",
    },
    {
      name: "Application mobile dédiée",
      description: "Accédez rapidement à vos sessions, calendriers et messages depuis iOS ou Android.",
    },
  ],
}

export default function FutureFeatures() {
  return (
    <div className="bg-white" id="a-venir">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{futureFeaturesInfo.title}</h2>
          <p className="mt-4 text-lg text-gray-500">{futureFeaturesInfo.description}</p>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Pour les coachs</h3>
          <ul className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8 mb-12">
            {futureFeaturesInfo.coachFeatures.map((feature, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </div>
                <p className="mt-2 ml-9 text-base text-gray-500">{feature.description}</p>
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Pour les élèves</h3>
          <ul className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8 mb-12">
            {futureFeaturesInfo.studentFeatures.map((feature, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </div>
                <p className="mt-2 ml-9 text-base text-gray-500">{feature.description}</p>
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Améliorations générales</h3>
          <ul className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8">
            {futureFeaturesInfo.generalFeatures.map((feature, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </div>
                <p className="mt-2 ml-9 text-base text-gray-500">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

