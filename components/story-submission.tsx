'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, X, Upload, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const availableTags = [
  'Cost',
  'Burnout',
  'First-Gen',
  'Didn\'t Belong',
  'Systemic',
  'Access',
  'Success Story',
  'Still Fighting',
]

export function StorySubmission() {

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [profileImage, setProfileImage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    location: '',
    age: '',
    currentStatus: '',
    quote: '',
    fullStory: '',
    tags: [] as string[],
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
          quote: formData.quote,
          fullStory: formData.fullStory,
          location: formData.location,
          age: formData.age,
          currentStatus: formData.currentStatus,
          tags: formData.tags,
          profileImage: profileImage || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to submit story')
        return
      }

      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        setProfileImage('')
        setFormData({
          name: '',
          role: '',
          location: '',
          age: '',
          currentStatus: '',
          quote: '',
          fullStory: '',
          tags: [],
        })
      }, 4000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="submit" className="border-t border-border bg-card/30 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Share Your Story
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            The archive is incomplete without you.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every name we don't hear becomes a number we don't count. Tell us where the system stopped working for you. Anonymous initials are welcome. We do not edit, repackage, or sell your words.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >

          </motion.div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-12 rounded-2xl border border-border bg-card p-12 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Thank you for sharing
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Your story has been submitted for review. Once approved, it will appear in the archive.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="mt-12 rounded-2xl border border-border bg-card p-8 text-left"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    Your STEM Experience
                  </h3>
                </div>

                {/* Photo Upload */}
                <div className="mb-6 flex items-center gap-6">
                  <div
                    className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profileImage ? (
                      <img src={profileImage} alt="Profile preview" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-10 w-10 text-muted-foreground" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Profile Photo (optional)</p>
                    <p className="text-xs text-muted-foreground">Click to upload a photo</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Your Name (or a pseudonym)
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="How you'd like to be known"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Your Role / Background
                    </label>
                    <Input
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Former CS Student, Engineer"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Location
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, State or Region"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Age (optional)
                    </label>
                    <Input
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Your age"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Current Status
                  </label>
                  <Input
                    value={formData.currentStatus}
                    onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                    placeholder="What are you doing now?"
                    className="bg-background"
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    A quote that captures your experience
                  </label>
                  <Input
                    required
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="One sentence that sums it up"
                    className="bg-background"
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Your Full Story
                  </label>
                  <textarea
                    required
                    value={formData.fullStory}
                    onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
                    placeholder="Share as much or as little as you're comfortable with. What happened? How did it affect you? Where are you now? What was the first moment you knew you didn't fit in? What did you give up that you wish you hadn't? What did the system never ask you? What would you tell a younger version of yourself who was about to walk away?"
                    rows={6}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-3 block text-sm font-medium text-foreground">
                    Tags that describe your experience
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${formData.tags.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Your story will be reviewed before appearing in the archive.
                    </p>
                    {error && (
                      <p className="mt-1 text-xs text-destructive">{error}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isSubmitting ? 'Submitting...' : 'Submit Story'}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  )
}
