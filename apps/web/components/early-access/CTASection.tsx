'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Loader2, CheckCircle2, XCircle, Mail, User, Users, Trophy, Brain } from 'lucide-react'
import Head from 'next/head'

// Définition des rôles possibles
enum WaitlistRole {
  FUTUR_ELEVE = 'FUTUR_ELEVE',
  FUTUR_COACH_POKER = 'FUTUR_COACH_POKER',
  FUTUR_COACH_MENTAL = 'FUTUR_COACH_MENTAL'
}

export default function CTASection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [role, setRole] = useState<WaitlistRole>(WaitlistRole.FUTUR_ELEVE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  // Détection du mobile pour optimiser les animations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Optimisation des animations pour mobile
  const animationConfig = {
    initial: { opacity: 0, y: isMobile ? 10 : 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.3 : 0.6 }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Nettoyage des entrées
    const sanitizeInput = (input: string): string => {
      return input.trim().replace(/[<>]/g, '');
    };

    const formData = {
      email: sanitizeInput(email),
      name: sanitizeInput(name),
      firstName: sanitizeInput(firstName),
      role: role,
    }

    // Validation des entrées
    if (!formData.email || !formData.name || !formData.firstName || !formData.role) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Veuillez entrer une adresse email valide.");
      setIsSubmitting(false);
      return;
    }

    // Rate limiting
    const lastSubmission = localStorage.getItem('lastSubmissionTime');
    if (lastSubmission && Date.now() - parseInt(lastSubmission) < 1000) {
      setMessage("Veuillez patienter avant de soumettre à nouveau.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(formData),
        credentials: 'same-origin',
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        console.error("Erreur backend:", data);
        setMessage(data.error || "Une erreur est survenue. Veuillez réessayer.");
        return;
      }
  
      console.log("✅ Inscription réussie:", data);
      setMessage("Inscription réussie ! Vous serez informé(e) du lancement.");
      setEmail("");
      setName("");
      setFirstName("");
      setRole(WaitlistRole.FUTUR_ELEVE);
      
      // Mise à jour du timestamp de dernière soumission
      localStorage.setItem('lastSubmissionTime', Date.now().toString());
    } catch (error) {
      console.error("❌ Erreur lors de la requête:", error);
      setMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edgemy - La plateforme de coaching poker et mental</title>
        <meta name="description" content="Rejoignez Edgemy, la seule plateforme qui met en relation joueurs et coachs certifiés pour progresser dans tous les aspects du poker : technique et mental." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Edgemy - La plateforme de coaching poker et mental" />
        <meta property="og:description" content="Rejoignez Edgemy, la seule plateforme qui met en relation joueurs et coachs certifiés pour progresser dans tous les aspects du poker : technique et mental." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edgemy.fr" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section id="inscription" className="relative bg-gradient-to-b from-indigo-50/70 to-white py-16 sm:py-24 overflow-hidden backdrop-blur-sm">
        {/* Éléments décoratifs animés - Optimisés pour mobile */}
        <motion.div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobile ? 0.05 : 0.1 }}
          transition={{ duration: isMobile ? 0.5 : 1 }}
        >
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-indigo-300 rounded-full blur-xl" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300 rounded-full blur-xl" />
          <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-blue-300 rounded-full blur-xl" />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-10"
            {...animationConfig}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Rejoignez gratuitement la seule plateforme pour trouver votre coach poker ou mental
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: isMobile ? 0.1 : 0.3 }}
              className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Edgemy met en relation joueurs et coachs certifiés pour progresser dans tous les aspects du poker : technique et mental. <span className="font-semibold text-indigo-600">Inscription 100% gratuite.</span>
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-md border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md bg-gray-50/50"
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Votre prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md bg-gray-50/50"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md bg-gray-50/50"
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as WaitlistRole)}
                    required
                    className="w-full h-12 px-5 pr-10 border border-gray-300 rounded-xl bg-gray-50/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:shadow-md appearance-none"
                    style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill='none' stroke='gray' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                  >
                    <option value={WaitlistRole.FUTUR_ELEVE}>🎯 Futur élève</option>
                    <option value={WaitlistRole.FUTUR_COACH_POKER}>♠️ Futur coach poker</option>
                    <option value={WaitlistRole.FUTUR_COACH_MENTAL}>🧠 Futur coach mental</option>
                  </select>
                </motion.div>
              </div>

              <motion.div 
                className="flex justify-center pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-8 py-4 text-white font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  } relative overflow-hidden`}
                  disabled={isSubmitting}
                >
                  {/* Effet de vague au survol */}
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isSubmitting ? "loading" : "submit"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Inscription en cours...
                        </>
                      ) : (
                        <>
                          <span>🚀</span>
                          Rejoindre la liste d'attente
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity
                            }}
                            className="hidden sm:inline-block"
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </motion.div>
            </motion.form>

            <AnimatePresence>
              {message && (
                <motion.div
                  className={`mt-6 p-4 rounded-lg ${
                    message.includes("erreur") || message.includes("déjà inscrit")
                      ? "bg-red-50 text-red-600 border border-red-200" 
                      : "bg-green-50 text-green-600 border border-green-200"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    {message.includes("réussie") ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <CheckCircle2 className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <XCircle className="h-6 w-6" />
                      </motion.div>
                    )}
                    <span className="font-medium">{message}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p 
            className="mt-6 text-sm text-gray-500 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            En vous inscrivant, vous acceptez de recevoir des informations exclusives par e-mail.
          </motion.p>

          {/* Animation de fond */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl opacity-5 pointer-events-none"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="h-64 w-full bg-gradient-radial from-indigo-200 to-transparent" />
          </motion.div>
        </div>
      </section>
    </>
  )
}