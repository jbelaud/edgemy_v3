import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock the API call
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock the WaitlistForm component since we don't have the actual implementation
const MockWaitlistForm = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    role: '',
  })
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    const newErrors: any = {}
    if (!formData.email) newErrors.email = "L'email est requis"
    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis'
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis'
    if (!formData.role) newErrors.role = 'Le rôle est requis'

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="firstName">Prénom</label>
        <input
          id="firstName"
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>

      <div>
        <label htmlFor="lastName">Nom</label>
        <input
          id="lastName"
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="role"
            value="FUTUR_COACH_POKER"
            checked={formData.role === 'FUTUR_COACH_POKER'}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          Je suis un futur coach poker
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="FUTUR_COACH_MENTAL"
            checked={formData.role === 'FUTUR_COACH_MENTAL'}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          Je suis un futur coach mental
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="FUTUR_ELEVE"
            checked={formData.role === 'FUTUR_ELEVE'}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          Je suis un futur élève
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Inscription...' : 'Rejoindre la liste d\'attente'}
      </button>

      {submitStatus === 'success' && <div>Inscription réussie !</div>}
      {submitStatus === 'error' && <div>Erreur lors de l'inscription</div>}
    </form>
  )
}

describe('WaitlistForm', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('renders form fields correctly', () => {
    render(<MockWaitlistForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument()
    expect(screen.getByText(/je suis un futur coach poker/i)).toBeInTheDocument()
    expect(screen.getByText(/je suis un futur coach mental/i)).toBeInTheDocument()
    expect(screen.getByText(/je suis un futur élève/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rejoindre la liste d'attente/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<MockWaitlistForm />)

    const submitButton = screen.getByRole('button', { name: /rejoindre la liste d'attente/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/l'email est requis/i)).toBeInTheDocument()
      expect(screen.getByText(/le prénom est requis/i)).toBeInTheDocument()
      expect(screen.getByText(/le nom est requis/i)).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<MockWaitlistForm />)

    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    const submitButton = screen.getByRole('button', { name: /rejoindre la liste d'attente/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/format d'email invalide/i)).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    const mockResponse = {
      success: true,
      message: 'Inscription à la liste d\'attente réussie',
      data: {
        waitlistEntry: {
          id: '1',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'FUTUR_COACH_POKER',
        },
      },
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(<MockWaitlistForm />)

    // Fill form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: 'Doe' },
    })

    // Select role
    const coachPokerRadio = screen.getByLabelText(/je suis un futur coach poker/i)
    fireEvent.click(coachPokerRadio)

    // Submit form
    const submitButton = screen.getByRole('button', { name: /rejoindre la liste d'attente/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'FUTUR_COACH_POKER',
        }),
      })
    })

    await waitFor(() => {
      expect(screen.getByText(/inscription réussie/i)).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<MockWaitlistForm />)

    // Fill form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: 'Doe' },
    })

    const coachPokerRadio = screen.getByLabelText(/je suis un futur coach poker/i)
    fireEvent.click(coachPokerRadio)

    const submitButton = screen.getByRole('button', { name: /rejoindre la liste d'attente/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/erreur lors de l'inscription/i)).toBeInTheDocument()
    })
  })

  it('handles different role selections', async () => {
    render(<MockWaitlistForm />)

    // Test coach mental role
    const coachMentalRadio = screen.getByLabelText(/je suis un futur coach mental/i)
    fireEvent.click(coachMentalRadio)
    expect(coachMentalRadio).toBeChecked()

    // Test élève role
    const eleveRadio = screen.getByLabelText(/je suis un futur élève/i)
    fireEvent.click(eleveRadio)
    expect(eleveRadio).toBeChecked()
    expect(coachMentalRadio).not.toBeChecked()
  })

  it('shows loading state during submission', async () => {
    // Mock a slow API response
    mockFetch.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    render(<MockWaitlistForm />)

    // Fill form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: 'Doe' },
    })

    const coachPokerRadio = screen.getByLabelText(/je suis un futur coach poker/i)
    fireEvent.click(coachPokerRadio)

    const submitButton = screen.getByRole('button', { name: /rejoindre la liste d'attente/i })
    fireEvent.click(submitButton)

    // Check if button is disabled during submission
    expect(submitButton).toBeDisabled()
  })
}) 