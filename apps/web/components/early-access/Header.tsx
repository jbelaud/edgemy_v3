'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false) // Ferme le menu après le clic
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo avec animation au survol */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <a href="/" className="flex items-center">
              <Image
                src="/images/logo-blanc-edgemy.png"
                alt="Edgemy"
                width={300}
                height={120}
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </a>
          </motion.div>

          {/* Menu Hamburger (mobile et tablette) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>

          {/* Navigation (desktop) */}
          <nav className="hidden lg:flex space-x-10">
            <motion.button
              onClick={() => scrollToSection('roadmap')}
              whileHover={{ scale: 1.05, color: '#1E40AF' }} // Bleu indigo au survol
              whileTap={{ scale: 0.95 }}
              className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Roadmap
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('pourquoi-edgemy')}
              whileHover={{ scale: 1.05, color: '#1E40AF' }}
              whileTap={{ scale: 0.95 }}
              className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Pourquoi Edgemy ?
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('tarifs')}
              whileHover={{ scale: 1.05, color: '#1E40AF' }}
              whileTap={{ scale: 0.95 }}
              className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Tarifs
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('faq')}
              whileHover={{ scale: 1.05, color: '#1E40AF' }}
              whileTap={{ scale: 0.95 }}
              className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              FAQ
            </motion.button>
          </nav>

          {/* Bouton CTA (desktop) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block"
          >
            <button
              onClick={() => scrollToSection('inscription')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Rejoindre la liste d'attente
            </button>
          </motion.div>
        </div>

        {/* Menu mobile (slide-down) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 space-y-4"
            >
              <button
                onClick={() => scrollToSection('roadmap')}
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-gray-900 py-2"
              >
                Roadmap
              </button>
              <button
                onClick={() => scrollToSection('pourquoi-edgemy')}
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-gray-900 py-2"
              >
                Pourquoi Edgemy ?
              </button>
              <button
                onClick={() => scrollToSection('tarifs')}
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-gray-900 py-2"
              >
                Tarifs
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-gray-900 py-2"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('inscription')}
                className="block w-full text-left text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md"
              >
                Rejoindre la liste d'attente
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}