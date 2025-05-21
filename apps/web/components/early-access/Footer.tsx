'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Effet de fond animé */}
      {/* <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-black-200 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-200 rounded-full blur-xl" />
      </motion.div> */}

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 relative z-10">
        {/* Liens vers les réseaux sociaux avec animations */}
        <div className="flex justify-center space-x-6 md:order-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="https://twitter.com/edgemy_off"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <span className="sr-only">X (Twitter)</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="https://instagram.com/edgemy_off"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 2.163c-3.259 0-3.667.014-4.947.072-2.905.133-4.164 1.457-4.297 4.297-.057 1.28-.072 1.689-.072 4.947 0 3.259.014 3.668.072 4.947.133 2.905 1.457 4.164 4.297 4.297 1.28.057 1.689.072 4.947.072 3.259 0 3.668-.014 4.947-.072 2.905-.133 4.164-1.457 4.297-4.297.057-1.28.072-1.689.072-4.947 0-3.259-.014-3.668-.072-4.947-.133-2.905-1.457-4.164-4.297-4.297-1.28-.057-1.689-.072-4.947-.072zm0 5.838c-2.619 0-4.737 2.118-4.737 4.737 0 2.619 2.118 4.737 4.737 4.737 2.619 0 4.737-2.118 4.737-4.737 0-2.619-2.118-4.737-4.737-4.737zm0 7.838c-1.711 0-3.1-1.39-3.1-3.1 0-1.711 1.39-3.1 3.1-3.1 1.711 0 3.1 1.39 3.1 3.1 0 1.711-1.39 3.1-3.1 3.1z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Adresse email de contact et copyright */}
        <div className="mt-8 md:mt-0 md:order-1 text-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} Edgemy, Inc. Tous droits réservés.
          </p>
          <div className="mt-4">
            <a
              href="mailto:contact@edgemy.fr"
              className="text-gray-400 hover:text-gray-500 text-sm transition-colors duration-200"
            >
              Contact : contact@edgemy.fr
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}