"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, XCircle, Mail, User, Users, BrainCircuit, AlertCircle, Trophy, Brain, ChevronDown } from 'lucide-react'
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui"

// Types d'erreurs possibles
type ErrorType = 'validation' | 'network' | 'server' | 'unknown' | 'security'

interface ErrorState {
  type: ErrorType
  message: string
  field?: string
}

interface ValidationErrors {
  email?: string
  name?: string
  firstName?: string
}

interface CTASVariant {
  text: string
  trackingId: string
}

// Constantes de sécurité
const MAX_SUBMISSIONS_PER_HOUR = 5
const SUBMISSION_COOLDOWN = 1000 // 1 seconde entre chaque soumission
const MAX_FIELD_LENGTH = 50
const ALLOWED_CHARS_REGEX = /^[a-zA-ZÀ-ÿ\s\-']+$/

export default function WaitlistForm() {
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [role, setRole] = useState<string>("PLAYER")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [error, setError] = useState<ErrorState | null>(null)
  const [submissionCount, setSubmissionCount] = useState<number>(0)
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0)
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)



  // Nettoyage des entrées
  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '')
  }

  // Validation des caractères autorisés
  const validateAllowedChars = (input: string): boolean => {
    return ALLOWED_CHARS_REGEX.test(input)
  }

  // Gestion du rate limiting
  const checkRateLimit = useCallback(() => {
    const now = Date.now()
    const submissionsInLastHour = localStorage.getItem('submissionCount')
    const lastSubmission = localStorage.getItem('lastSubmissionTime')

    if (submissionsInLastHour && lastSubmission) {
      const count = parseInt(submissionsInLastHour)
      const lastTime = parseInt(lastSubmission)
      
      if (count >= MAX_SUBMISSIONS_PER_HOUR && now - lastTime < 3600000) {
        setError({
          type: 'security',
          message: "Trop de tentatives. Veuillez réessayer plus tard."
        })
        return false
      }
    }

    if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
      setError({
        type: 'security',
        message: "Veuillez patienter avant de soumettre à nouveau."
      })
      return false
    }

    return true
  }, [lastSubmissionTime])

  // Validation des champs
  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      errors.email = "L'adresse email est requise"
    } else if (!emailRegex.test(email)) {
      errors.email = "Veuillez entrer une adresse email valide"
    } else if (email.length > MAX_FIELD_LENGTH) {
      errors.email = `L'email ne doit pas dépasser ${MAX_FIELD_LENGTH} caractères`
    }

    // Validation nom et prénom
    if (!name) {
      errors.name = "Le nom est requis"
    } else if (!validateAllowedChars(name)) {
      errors.name = "Le nom contient des caractères non autorisés"
    } else if (name.length < 2) {
      errors.name = "Le nom doit contenir au moins 2 caractères"
    } else if (name.length > MAX_FIELD_LENGTH) {
      errors.name = `Le nom ne doit pas dépasser ${MAX_FIELD_LENGTH} caractères`
    }

    if (!firstName) {
      errors.firstName = "Le prénom est requis"
    } else if (!validateAllowedChars(firstName)) {
      errors.firstName = "Le prénom contient des caractères non autorisés"
    } else if (firstName.length < 2) {
      errors.firstName = "Le prénom doit contenir au moins 2 caractères"
    } else if (firstName.length > MAX_FIELD_LENGTH) {
      errors.firstName = `Le prénom ne doit pas dépasser ${MAX_FIELD_LENGTH} caractères`
    }

   

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Vérification du rate limiting
    if (!checkRateLimit()) {
      return;
    }
    
    // Réinitialiser les erreurs
    setError(null)
    setMessage("")
    
    // Nettoyage des entrées
    const sanitizedData = {
      email: sanitizeInput(email),
      name: sanitizeInput(name),
      firstName: sanitizeInput(firstName),
      role: role
    }
    
    // Vérifier la validation avant la soumission
    if (!validateForm()) {
      setError({
        type: 'validation',
        message: "Veuillez corriger les erreurs dans le formulaire"
      })
      return;
    }

    setIsSubmitting(true);
    setLastSubmissionTime(Date.now())

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        // Gestion des erreurs spécifiques du serveur
        if (response.status === 409) {
          setError({
            type: 'server',
            message: "Cette adresse email est déjà inscrite",
            field: 'email'
          })
        } else if (response.status === 429) {
          setError({
            type: 'server',
            message: "Trop de tentatives. Veuillez réessayer plus tard"
          })
        } else {
          setError({
            type: 'server',
            message: data.message || "Une erreur est survenue. Veuillez réessayer."
          })
        }
        return;
      }
  
      // Mise à jour du compteur de soumissions
      const newCount = submissionCount + 1
      setSubmissionCount(newCount)
      localStorage.setItem('submissionCount', newCount.toString())
      localStorage.setItem('lastSubmissionTime', Date.now().toString())
  
      console.log("✅ Inscription réussie:", data);
      setMessage("Inscription réussie ! Vous serez informé(e) du lancement.");
      setEmail("")
      setName("");
      setFirstName("");
  
      // 🔄 Rafraîchir la page si besoin
      router.refresh();
      setIsSubmitted(true)
    } catch (error) {
      console.error("❌ Erreur lors de la requête:", error);
      setError({
        type: 'network',
        message: "Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer."
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  const CTAS_VARIANTS = [
    {
      text: "Rejoindre la liste d'attente",
      trackingId: "cta-limited-spots",
    },
    {
      text: "Devenir membre fondateur (Gratuit)",
      trackingId: "cta-founding-member",
    },
    {
      text: "Accéder aux offres lancement 🚀",
      trackingId: "cta-launch-offers",
    },
  ];

  const [currentCTAIndex, setCurrentCTAIndex] = useState(0);

  // Changer de CTA toutes les 24h
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCTAIndex((prev) => (prev + 1) % CTAS_VARIANTS.length);
    }, 1000 * 60 * 60 * 24); // 24h

    return () => clearInterval(interval);
  }, []);
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-6 bg-green-50 rounded-lg"
      >
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Merci pour votre inscription !</h3>
        <p className="text-gray-600">
          Vous serez parmi les premiers informés du lancement d'Edgemy.
        </p>
      </motion.div>
    )
  }

  return (
    <section id="waitlist" className="relative bg-gradient-to-b from-indigo-50/70 to-white py-16 overflow-hidden backdrop-blur-sm">
      {/* Éléments décoratifs animés */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-indigo-300 rounded-full blur-xl" />
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-purple-300 rounded-full blur-xl" />
        <div className="absolute top-40 right-1/4 w-20 h-20 bg-blue-300 rounded-full blur-xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Rejoignez la révolution Edgemy
          </h2>
          <motion.p
            className="mt-4 text-xl text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            La plateforme ultime pour transformer votre jeu de poker
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
                  className={`w-full pl-10 pr-3 h-12 border ${
                    validationErrors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md bg-gray-50/50`}
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                )}
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
                  className={`w-full pl-10 pr-3 h-12 border ${
                    validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md bg-gray-50/50`}
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.firstName}</p>
                )}
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
                  className={`w-full pl-10 pr-3 h-12 border ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md bg-gray-50/50`}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
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
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full h-12 px-5 pr-10 border border-gray-300 rounded-xl bg-gray-50/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:shadow-md appearance-none"
                  style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill='none' stroke='gray' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="">Sélectionnez votre rôle</option>
                  <option value="FUTUR_ELEVE">🎯 Futur élève</option>
                  <option value="FUTUR_COACH_POKER">♠️ Futur coach poker</option>
                  <option value="FUTUR_COACH_MENTAL">🧠 Futur coach mental</option>
                </select>
              </motion.div>
            </div>

            <motion.div 
              className="flex justify-center pt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className={`w-full sm:w-auto px-8 py-4 text-white font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                } relative overflow-hidden`}
                disabled={isSubmitting}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isSubmitting ? "loading" : "cta"}
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
                        {CTAS_VARIANTS[currentCTAIndex]?.text ?? "Rejoindre la liste d'attente"}
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.form>

          <AnimatePresence>
            {error && (
              <motion.div
                className="mt-6 p-4 rounded-lg bg-red-50 text-red-600 border border-red-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <AlertCircle className="h-6 w-6" />
                  </motion.div>
                  <span className="font-medium">{error.message}</span>
                </div>
              </motion.div>
            )}
            {message && (
              <motion.div
                className={`mt-6 p-4 rounded-lg ${
                  message.includes("erreur") 
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
  )
}

