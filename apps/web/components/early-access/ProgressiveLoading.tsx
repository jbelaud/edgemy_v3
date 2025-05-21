import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ProgressiveLoadingProps {
  children: React.ReactNode
  threshold?: number
  className?: string
}

export default function ProgressiveLoading({
  children,
  threshold = 0.1,
  className = ''
}: ProgressiveLoadingProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    const element = document.getElementById('progressive-loading')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold])

  return (
    <motion.div
      id="progressive-loading"
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
} 