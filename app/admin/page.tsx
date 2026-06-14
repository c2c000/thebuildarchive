'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '@/lib/content-context'
import {
  type Story,
  type DissectedObject,
  type LearningModule,
  type Hotspot,
  type LearningStep,
  type ColorScheme,
} from '@/lib/content-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BookOpen,
  Users,
  Layers,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  ArrowLeft,
  X,
  GripVertical,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Loader2,
  Heart,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

const AVAILABLE_TAGS = ['Cost', 'First-Gen', 'Burnout', 'Didn\'t Belong', 'Systemic', 'Access']
const ICON_OPTIONS = ['zap', 'lightbulb', 'cpu', 'cog', 'wrench', 'code', 'battery', 'radio']
const ADMIN_PASSWORD = 'admin123' // In production, use environment variables

// Password Protection Component
function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('wgtb-admin-auth')
    if (stored === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('wgtb-admin-auth', 'true')
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Enter the admin password to access the content manager.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className={error ? 'border-destructive' : ''}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {error && (
                  <p className="text-sm text-destructive">Incorrect password. Please try again.</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Access Admin Panel
              </Button>
              <div className="text-center">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Back to Site
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <PasswordGate>
      <AdminContent />
    </PasswordGate>
  )
}

function AdminContent() {
  const {
    stories,
    addStory,
    updateStory,
    deleteStory,
    dissectedObjects,
    addDissectedObject,
    updateDissectedObject,
    deleteDissectedObject,
    learningModules,
    addLearningModule,
    updateLearningModule,
    deleteLearningModule,
    sponsors,
    addSponsor,
    updateSponsor,
    deleteSponsor,
    thankYous,
    addThankYou,
    updateThankYou,
    deleteThankYou,
    siteContent,
    updateSiteContent,
    resetToDefaults,
    exportData,
    importData,
  } = useContent()

  const [activeTab, setActiveTab] = useState('site')
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Story editing
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [isAddingStory, setIsAddingStory] = useState(false)

  // Dissected object editing
  const [editingObject, setEditingObject] = useState<DissectedObject | null>(null)
  const [isAddingObject, setIsAddingObject] = useState(false)

  // Learning module editing
  const [editingModule, setEditingModule] = useState<LearningModule | null>(null)
  const [isAddingModule, setIsAddingModule] = useState(false)

  // Site content editing
  const [siteContentForm, setSiteContentForm] = useState(siteContent)
  const [siteContentSaved, setSiteContentSaved] = useState(false)

  // Subscribers
  const [subscribers, setSubscribers] = useState<Array<{ id: string, email: string, subscribed_at: string, is_active: boolean }>>([])
  const [loadingSubscribers, setLoadingSubscribers] = useState(false)
  const [deletingSubscriber, setDeletingSubscriber] = useState<string | null>(null)

  // Database Stories (for admin moderation)
  const [dbStories, setDbStories] = useState<Story[]>([])
  const [loadingDbStories, setLoadingDbStories] = useState(false)
  const [storyCounts, setStoryCounts] = useState({ total: 0, pending: 0, published: 0 })
  const [storyFilter, setStoryFilter] = useState<'all' | 'pending' | 'published'>('all')
  const [updatingStoryId, setUpdatingStoryId] = useState<string | null>(null)
  const [showAddStoryForm, setShowAddStoryForm] = useState(false)
  const [addingStory, setAddingStory] = useState(false)
  const [newStoryForm, setNewStoryForm] = useState({
    name: '',
    role: '',
    quote: '',
    fullStory: '',
    location: '',
    age: '',
    currentStatus: '',
    tags: [] as string[],
  })
  const [deletingStoryId, setDeletingStoryId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  // Sponsor & Thank You forms
  const [sponsorForm, setSponsorForm] = useState<{ name: string; description: string; url: string; tier: 'platinum' | 'gold' | 'silver' | 'community' }>({ name: '', description: '', url: '', tier: 'gold' })
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null)
  const [thankYouForm, setThankYouForm] = useState({ name: '', note: '' })
  const [editingThankYouId, setEditingThankYouId] = useState<string | null>(null)

  useEffect(() => {
    setSiteContentForm(siteContent)
  }, [siteContent])

  const loadSubscribers = async () => {
    setLoadingSubscribers(true)
    try {
      const response = await fetch('/api/subscribers')
      const data = await response.json()
      if (data.subscribers) {
        setSubscribers(data.subscribers)
      }
    } catch (error) {
      console.error('Failed to load subscribers:', error)
    } finally {
      setLoadingSubscribers(false)
    }
  }

  const handleDeleteSubscriber = async (id: string) => {
    setDeletingSubscriber(id)
    try {
      await fetch('/api/subscribers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setSubscribers(prev => prev.filter(s => s.id !== id))
    } catch (error) {
      console.error('Failed to delete subscriber:', error)
    } finally {
      setDeletingSubscriber(null)
    }
  }

  useEffect(() => {
    if (activeTab === 'subscribers') {
      loadSubscribers()
    }
    if (activeTab === 'stories') {
      loadDbStories()
      loadStoryCounts()
    }
  }, [activeTab])

  const loadDbStories = async () => {
    setLoadingDbStories(true)
    try {
      const response = await fetch('/api/stories?admin=true')
      const data = await response.json()
      if (data.stories) {
        setDbStories(data.stories)
      }
    } catch (error) {
      console.error('Failed to load stories:', error)
    } finally {
      setLoadingDbStories(false)
    }
  }

  const loadStoryCounts = async () => {
    try {
      const response = await fetch('/api/stories/count')
      const data = await response.json()
      setStoryCounts(data)
    } catch (error) {
      console.error('Failed to load story counts:', error)
    }
  }

  const handleToggleStoryStatus = async (id: string, currentStatus: string) => {
    setUpdatingStoryId(id)
    const newStatus = currentStatus === 'published' ? 'pending' : 'published'
    try {
      await fetch('/api/stories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      setDbStories(prev => prev.map(s => s.id === id ? { ...s, status: newStatus as 'pending' | 'published' } : s))
      loadStoryCounts()
    } catch (error) {
      console.error('Failed to update story:', error)
    } finally {
      setUpdatingStoryId(null)
    }
  }

  const handleDeleteDbStory = async (id: string) => {
    setDeletingStoryId(id)
    try {
      await fetch('/api/stories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setDbStories(prev => prev.filter(s => s.id !== id))
      setConfirmDeleteId(null)
      loadStoryCounts()
    } catch (error) {
      console.error('Failed to delete story:', error)
    } finally {
      setDeletingStoryId(null)
    }
  }

  const filteredDbStories = dbStories.filter(s => {
    if (storyFilter === 'all') return true
    return s.status === storyFilter
  })

  const handleAddStoryManually = async () => {
    if (!newStoryForm.name || !newStoryForm.quote || !newStoryForm.fullStory) return

    setAddingStory(true)
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStoryForm.name,
          role: newStoryForm.role,
          quote: newStoryForm.quote,
          fullStory: newStoryForm.fullStory,
          location: newStoryForm.location,
          age: newStoryForm.age,
          currentStatus: newStoryForm.currentStatus,
          tags: newStoryForm.tags,
        }),
      })

      if (response.ok) {
        setShowAddStoryForm(false)
        setNewStoryForm({
          name: '',
          role: '',
          quote: '',
          fullStory: '',
          location: '',
          age: '',
          currentStatus: '',
          tags: [],
        })
        loadDbStories()
        loadStoryCounts()
      }
    } catch (error) {
      console.error('Failed to add story:', error)
    } finally {
      setAddingStory(false)
    }
  }

  const handleSaveSiteContent = () => {
    updateSiteContent(siteContentForm)
    setSiteContentSaved(true)
    setTimeout(() => setSiteContentSaved(false), 2000)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('wgtb-admin-auth')
    window.location.reload()
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wgtb-content-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const success = importData(content)
      if (!success) {
        setImportError('Failed to import data. Please check the file format.')
      } else {
        setImportError(null)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Site</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-lg font-semibold">Content Manager</h1>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(true)}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <Lock className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {importError && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            {importError}
            <button onClick={() => setImportError(null)} className="ml-2 underline">
              Dismiss
            </button>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 grid w-full grid-cols-3 sm:grid-cols-6 lg:w-[750px]">
            <TabsTrigger value="site" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Site Content
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Stories
            </TabsTrigger>
            <TabsTrigger value="dissected" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Dissected
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Entry Lab
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Sponsors
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Subscribers
            </TabsTrigger>
          </TabsList>

          {/* Site Content Tab */}
          <TabsContent value="site">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Site Content</h2>
                <p className="text-muted-foreground">Edit all text content across the website</p>
              </div>
              <Button onClick={handleSaveSiteContent} disabled={siteContentSaved}>
                {siteContentSaved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>

            <div className="space-y-8">
              {/* Site Identity */}
              <Card>
                <CardHeader>
                  <CardTitle>Site Identity</CardTitle>
                  <CardDescription>The name and description of your site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site Name</label>
                    <Input
                      value={siteContentForm.siteName || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, siteName: e.target.value })}
                      placeholder="The Build Archive"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site Description</label>
                    <Textarea
                      value={siteContentForm.siteDescription || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, siteDescription: e.target.value })}
                      placeholder="A multimedia passion project..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section Order */}
              <Card>
                <CardHeader>
                  <CardTitle>Section Order & Visibility</CardTitle>
                  <CardDescription>Control which sections appear and in what order</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section Order</label>
                    <Input
                      value={siteContentForm.sectionOrder || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, sectionOrder: e.target.value })}
                      placeholder="reflections,documentary,stories,careers,entry-lab,dissected"
                    />
                    <p className="text-xs text-muted-foreground">
                      Available sections: reflections, documentary, stories, careers, entry-lab, dissected. Separate with commas. The &quot;reflections&quot; section auto-hides when no stories are published.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hidden Sections</label>
                    <Input
                      value={siteContentForm.hiddenSections || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, hiddenSections: e.target.value })}
                      placeholder="e.g., documentary,careers"
                    />
                    <p className="text-xs text-muted-foreground">
                      Sections to hide from the homepage. Separate with commas. Leave empty to show all.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Color Scheme */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                  <CardDescription>Choose the color palette for your site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { id: 'default', name: 'Blueprint Blue', primary: '#2563eb', accent: '#f97316', desc: 'Classic blue with warm coral accent' },
                      { id: 'forest', name: 'Forest Green', primary: '#16a34a', accent: '#ca8a04', desc: 'Earthy greens with golden accent' },
                      { id: 'ocean', name: 'Ocean Depths', primary: '#0891b2', accent: '#14b8a6', desc: 'Deep teal with seafoam accent' },
                      { id: 'sunset', name: 'Sunset Warmth', primary: '#ea580c', accent: '#eab308', desc: 'Warm terracotta with amber accent' },
                      { id: 'lavender', name: 'Lavender Fields', primary: '#9333ea', accent: '#ec4899', desc: 'Soft purple with rose accent' },
                      { id: 'monochrome', name: 'Monochrome', primary: '#171717', accent: '#525252', desc: 'Elegant black and white' },
                    ].map((scheme) => (
                      <button
                        key={scheme.id}
                        type="button"
                        onClick={() => setSiteContentForm({ ...siteContentForm, colorScheme: scheme.id as 'default' | 'forest' | 'ocean' | 'sunset' | 'lavender' | 'monochrome' })}
                        className={`rounded-lg border p-4 text-left transition-all ${siteContentForm.colorScheme === scheme.id
                            ? 'border-primary bg-primary/5 ring-2 ring-primary'
                            : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: scheme.primary }} />
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: scheme.accent }} />
                        </div>
                        <div className="font-medium text-sm">{scheme.name}</div>
                        <div className="text-xs text-muted-foreground">{scheme.desc}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>Connect links shown in the footer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Instagram URL</label>
                      <Input
                        value={siteContentForm.socialInstagram || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, socialInstagram: e.target.value })}
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">YouTube URL</label>
                      <Input
                        value={siteContentForm.socialYoutube || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, socialYoutube: e.target.value })}
                        placeholder="https://youtube.com/@yourchannel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">GitHub URL</label>
                      <Input
                        value={siteContentForm.socialGithub || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, socialGithub: e.target.value })}
                        placeholder="https://github.com/yourprofile"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input
                        value={siteContentForm.socialEmail || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, socialEmail: e.target.value })}
                        placeholder="contact@example.com"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leave empty to hide a social link. Only filled links will appear in the footer.
                  </p>
                </CardContent>
              </Card>

              {/* Hero Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                  <CardDescription>The main landing area of the homepage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tagline</label>
                    <Input
                      value={siteContentForm.heroTagline}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, heroTagline: e.target.value })}
                      placeholder="A Documentary Experience"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={siteContentForm.heroTitle}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, heroTitle: e.target.value })}
                      placeholder="Who gets to build?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subtitle</label>
                    <Textarea
                      value={siteContentForm.heroSubtitle}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, heroSubtitle: e.target.value })}
                      placeholder="Engineering is creative..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Button</label>
                      <Input
                        value={siteContentForm.heroCta1}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, heroCta1: e.target.value })}
                        placeholder="Start Learning"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Secondary Button</label>
                      <Input
                        value={siteContentForm.heroCta2}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, heroCta2: e.target.value })}
                        placeholder="Explore Stories"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistics Section</CardTitle>
                  <CardDescription>Key numbers that highlight the problem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section Title</label>
                    <Input
                      value={siteContentForm.statsTitle}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, statsTitle: e.target.value })}
                      placeholder="The Numbers Behind the Problem"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stat 1 Value</label>
                      <Input
                        value={siteContentForm.stat1Value}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stat1Value: e.target.value })}
                        placeholder="$120K"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stat 1 Label</label>
                      <Input
                        value={siteContentForm.stat1Label}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stat1Label: e.target.value })}
                        placeholder="Average hidden costs beyond tuition"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stat 2 Value</label>
                      <Input
                        value={siteContentForm.stat2Value}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stat2Value: e.target.value })}
                        placeholder="68%"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stat 2 Label</label>
                      <Input
                        value={siteContentForm.stat2Label}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stat2Label: e.target.value })}
                        placeholder="Feel they don't belong in engineering"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stat 3 Value</label>
                      <Input
                        value={siteContentForm.stat3Value}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stat3Value: e.target.value })}
                        placeholder="44%"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stat 3 Label</label>
                      <Input
                        value={siteContentForm.stat3Label}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stat3Label: e.target.value })}
                        placeholder="Lack access to intro courses in high school"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stat 4 Value</label>
                      <Input
                        value={siteContentForm.stat4Value}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stat4Value: e.target.value })}
                        placeholder="1 in 3"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stat 4 Label</label>
                      <Input
                        value={siteContentForm.stat4Label}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stat4Label: e.target.value })}
                        placeholder="Leave STEM within two years"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sections */}
              <Card>
                <CardHeader>
                  <CardTitle>Section Cards</CardTitle>
                  <CardDescription>The grid of section cards on the homepage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sections Title</label>
                    <Input
                      value={siteContentForm.sectionsTitle}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, sectionsTitle: e.target.value })}
                      placeholder="Explore the Experience"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sections Subtitle</label>
                    <Textarea
                      value={siteContentForm.sectionsSubtitle}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, sectionsSubtitle: e.target.value })}
                      placeholder="Five interconnected pathways..."
                      rows={2}
                    />
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {/* Documentary */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">Documentary</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.documentarySubtitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, documentarySubtitle: e.target.value })}
                          placeholder="Watch the Film"
                        />
                        <Input
                          value={siteContentForm.documentaryTitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, documentaryTitle: e.target.value })}
                          placeholder="Documentary"
                        />
                        <Textarea
                          value={siteContentForm.documentaryDescription}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, documentaryDescription: e.target.value })}
                          placeholder="Description..."
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Stories */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">Story Archive</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.storiesSubtitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, storiesSubtitle: e.target.value })}
                          placeholder="Real Experiences"
                        />
                        <Input
                          value={siteContentForm.storiesTitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, storiesTitle: e.target.value })}
                          placeholder="Story Archive"
                        />
                        <Textarea
                          value={siteContentForm.storiesDescription}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, storiesDescription: e.target.value })}
                          placeholder="Description..."
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Careers */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">STEM Careers</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.careersSubtitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, careersSubtitle: e.target.value })}
                          placeholder="Explore Paths"
                        />
                        <Input
                          value={siteContentForm.careersTitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, careersTitle: e.target.value })}
                          placeholder="STEM Careers"
                        />
                        <Textarea
                          value={siteContentForm.careersDescription}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, careersDescription: e.target.value })}
                          placeholder="Description..."
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Entry Lab */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">Entry Lab</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.entryLabSubtitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, entryLabSubtitle: e.target.value })}
                          placeholder="Start Learning"
                        />
                        <Input
                          value={siteContentForm.entryLabTitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, entryLabTitle: e.target.value })}
                          placeholder="Entry Lab"
                        />
                        <Textarea
                          value={siteContentForm.entryLabDescription}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, entryLabDescription: e.target.value })}
                          placeholder="Description..."
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Dissected */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">Dissected</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.dissectedSubtitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, dissectedSubtitle: e.target.value })}
                          placeholder="Understand How Things Work"
                        />
                        <Input
                          value={siteContentForm.dissectedTitle}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, dissectedTitle: e.target.value })}
                          placeholder="Dissected"
                        />
                        <Textarea
                          value={siteContentForm.dissectedDescription}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, dissectedDescription: e.target.value })}
                          placeholder="Description..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mission */}
              <Card>
                <CardHeader>
                  <CardTitle>Mission Statement</CardTitle>
                  <CardDescription>The quote section near the footer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quote</label>
                    <Textarea
                      value={siteContentForm.missionQuote}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, missionQuote: e.target.value })}
                      placeholder="Engineering shapes the world..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Label</label>
                      <Input
                        value={siteContentForm.missionLabel}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, missionLabel: e.target.value })}
                        placeholder="The Project Mission"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Source</label>
                      <Input
                        value={siteContentForm.missionSource}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, missionSource: e.target.value })}
                        placeholder="Who Gets to Build?"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stay Updated */}
              <Card>
                <CardHeader>
                  <CardTitle>Stay Updated Section</CardTitle>
                  <CardDescription>The email signup section before the footer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={siteContentForm.stayUpdatedTitle || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, stayUpdatedTitle: e.target.value })}
                      placeholder="This project is still being built."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={siteContentForm.stayUpdatedDescription || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, stayUpdatedDescription: e.target.value })}
                      placeholder="The documentary is in production..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Button Text</label>
                      <Input
                        value={siteContentForm.stayUpdatedButtonText || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stayUpdatedButtonText: e.target.value })}
                        placeholder="Stay updated"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Disclaimer</label>
                      <Input
                        value={siteContentForm.stayUpdatedDisclaimer || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, stayUpdatedDisclaimer: e.target.value })}
                        placeholder="No spam. Updates only when..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Footer */}
              <Card>
                <CardHeader>
                  <CardTitle>Footer</CardTitle>
                  <CardDescription>The call-to-action at the bottom of the site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CTA Title</label>
                    <Input
                      value={siteContentForm.footerCta}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, footerCta: e.target.value })}
                      placeholder="Ready to Start?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={siteContentForm.footerDescription}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, footerDescription: e.target.value })}
                      placeholder="Everyone belongs in engineering..."
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Description (shown at bottom)</label>
                    <Textarea
                      value={siteContentForm.footerProjectDescription || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, footerProjectDescription: e.target.value })}
                      placeholder="A multimedia passion project investigating engineering access..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* About Page */}
              <Card>
                <CardHeader>
                  <CardTitle>About Page - Header</CardTitle>
                  <CardDescription>The hero section of the About page</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tagline</label>
                    <Input
                      value={siteContentForm.aboutTagline || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutTagline: e.target.value })}
                      placeholder="About the Project"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={siteContentForm.aboutTitle || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutTitle: e.target.value })}
                      placeholder="Who Gets to Build?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subtitle</label>
                    <Textarea
                      value={siteContentForm.aboutSubtitle || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutSubtitle: e.target.value })}
                      placeholder="A Documentary, Archive & Open-Source Platform..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Page - Core Idea</CardTitle>
                  <CardDescription>The main thesis of the project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section Title</label>
                    <Input
                      value={siteContentForm.aboutCoreIdeaTitle || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutCoreIdeaTitle: e.target.value })}
                      placeholder="The Core Idea"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Main Statement (Bold)</label>
                    <Textarea
                      value={siteContentForm.aboutCoreIdeaText1 || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutCoreIdeaText1: e.target.value })}
                      placeholder="Most people aren't leaving STEM because they're not smart enough..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Supporting Text</label>
                    <Textarea
                      value={siteContentForm.aboutCoreIdeaText2 || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutCoreIdeaText2: e.target.value })}
                      placeholder="Who Gets to Build? is a multimedia passion project..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Page - Four Parts Section</CardTitle>
                  <CardDescription>The main content sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section Title</label>
                    <Input
                      value={siteContentForm.aboutPartsTitle || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPartsTitle: e.target.value })}
                      placeholder="Four Interlocking Parts"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section Subtitle</label>
                    <Textarea
                      value={siteContentForm.aboutPartsSubtitle || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPartsSubtitle: e.target.value })}
                      placeholder="Each piece reinforces the others..."
                      rows={2}
                    />
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {/* Part 1: Documentary */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">Part 1: The Documentary</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.aboutPart1Title || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart1Title: e.target.value })}
                          placeholder="The Documentary"
                        />
                        <Textarea
                          value={siteContentForm.aboutPart1Description || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart1Description: e.target.value })}
                          placeholder="Description..."
                          rows={3}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            value={siteContentForm.aboutPart1Act1 || ''}
                            onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart1Act1: e.target.value })}
                            placeholder="Act 1 Title"
                          />
                          <Input
                            value={siteContentForm.aboutPart1Act1Desc || ''}
                            onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart1Act1Desc: e.target.value })}
                            placeholder="Act 1 Description"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            value={siteContentForm.aboutPart1Act2 || ''}
                            onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart1Act2: e.target.value })}
                            placeholder="Act 2 Title"
                          />
                          <Input
                            value={siteContentForm.aboutPart1Act2Desc || ''}
                            onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart1Act2Desc: e.target.value })}
                            placeholder="Act 2 Description"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            value={siteContentForm.aboutPart1Act3 || ''}
                            onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart1Act3: e.target.value })}
                            placeholder="Act 3 Title"
                          />
                          <Input
                            value={siteContentForm.aboutPart1Act3Desc || ''}
                            onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart1Act3Desc: e.target.value })}
                            placeholder="Act 3 Description"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Part 2: Story Archive */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">Part 2: The Story Archive</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.aboutPart2Title || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart2Title: e.target.value })}
                          placeholder="The Story Archive"
                        />
                        <Textarea
                          value={siteContentForm.aboutPart2Description || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart2Description: e.target.value })}
                          placeholder="Description..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Part 3: Entry Lab */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">Part 3: Entry Lab</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.aboutPart3Title || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart3Title: e.target.value })}
                          placeholder="Entry Lab"
                        />
                        <Textarea
                          value={siteContentForm.aboutPart3Description || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart3Description: e.target.value })}
                          placeholder="Description..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Part 4: Dissected */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-semibold">Part 4: Dissected</h4>
                      <div className="space-y-3">
                        <Input
                          value={siteContentForm.aboutPart4Title || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart4Title: e.target.value })}
                          placeholder="Dissected"
                        />
                        <Input
                          value={siteContentForm.aboutPart4Subtitle || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart4Subtitle: e.target.value })}
                          placeholder="An Engineering Autopsy Series"
                        />
                        <Textarea
                          value={siteContentForm.aboutPart4Description || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart4Description: e.target.value })}
                          placeholder="Description..."
                          rows={3}
                        />
                        <Textarea
                          value={siteContentForm.aboutPart4Question || ''}
                          onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutPart4Question: e.target.value })}
                          placeholder="The driving question..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Page - Dissected Deeper</CardTitle>
                  <CardDescription>The expanded Dissected explanation section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section Title</label>
                    <Input
                      value={siteContentForm.aboutDissectedTitle || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutDissectedTitle: e.target.value })}
                      placeholder="Why Dissected Is Different"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Main Text</label>
                    <Textarea
                      value={siteContentForm.aboutDissectedText || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutDissectedText: e.target.value })}
                      placeholder="Most 'how things work' content explains mechanisms..."
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">What It Looks Like - Title</label>
                      <Input
                        value={siteContentForm.aboutDissectedLooksLike || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutDissectedLooksLike: e.target.value })}
                        placeholder="What It Looks Like"
                      />
                      <label className="text-sm font-medium">List Items (separate with |)</label>
                      <Textarea
                        value={siteContentForm.aboutDissectedLooksLikeList || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutDissectedLooksLikeList: e.target.value })}
                        placeholder="Item 1|Item 2|Item 3"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium">The Running Theme - Title</label>
                      <Input
                        value={siteContentForm.aboutDissectedTheme || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutDissectedTheme: e.target.value })}
                        placeholder="The Running Theme"
                      />
                      <label className="text-sm font-medium">Theme Text</label>
                      <Textarea
                        value={siteContentForm.aboutDissectedThemeText || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutDissectedThemeText: e.target.value })}
                        placeholder="Anonymous engineers built everything around you..."
                        rows={2}
                      />
                      <label className="text-sm font-medium">Highlight Text</label>
                      <Input
                        value={siteContentForm.aboutDissectedThemeHighlight || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutDissectedThemeHighlight: e.target.value })}
                        placeholder="The answer is always designed to feel like maybe yes."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Page - Founder</CardTitle>
                  <CardDescription>Information about the project creator</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section Title</label>
                    <Input
                      value={siteContentForm.founderSectionTitle || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, founderSectionTitle: e.target.value })}
                      placeholder="About the Founder"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={siteContentForm.founderName || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, founderName: e.target.value })}
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <Input
                        value={siteContentForm.founderRole || ''}
                        onChange={(e) => setSiteContentForm({ ...siteContentForm, founderRole: e.target.value })}
                        placeholder="Creator & Director"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Photo URL</label>
                    <Input
                      value={siteContentForm.founderImage || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, founderImage: e.target.value })}
                      placeholder="https://example.com/your-photo.jpg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter a URL to your profile photo. Leave empty to show a default icon.
                    </p>
                    {siteContentForm.founderImage && (
                      <div className="mt-2 flex items-center gap-4">
                        <img
                          src={siteContentForm.founderImage}
                          alt="Founder preview"
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <span className="text-sm text-muted-foreground">Preview</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                      value={siteContentForm.founderBio || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, founderBio: e.target.value })}
                      placeholder="Share your journey, what drives you, and why you started this project..."
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Personal Quote</label>
                    <Textarea
                      value={siteContentForm.founderQuote || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, founderQuote: e.target.value })}
                      placeholder="A personal quote or mission statement..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Page - Unifying Message</CardTitle>
                  <CardDescription>The final call-to-action card</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Label</label>
                    <Input
                      value={siteContentForm.aboutUnifyingLabel || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutUnifyingLabel: e.target.value })}
                      placeholder="The Unifying Message"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Main Message</label>
                    <Textarea
                      value={siteContentForm.aboutUnifyingMessage || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutUnifyingMessage: e.target.value })}
                      placeholder="Engineering is creative, accessible, and for everyone..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subtext</label>
                    <Textarea
                      value={siteContentForm.aboutUnifyingSubtext || ''}
                      onChange={(e) => setSiteContentForm({ ...siteContentForm, aboutUnifyingSubtext: e.target.value })}
                      placeholder="This project investigates why..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button size="lg" onClick={handleSaveSiteContent} disabled={siteContentSaved}>
                  {siteContentSaved ? 'Saved!' : 'Save All Changes'}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Story Submissions</h2>
              <p className="text-muted-foreground">Review and manage submitted stories</p>
            </div>

            {/* Stats Dashboard */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">In Queue</p>
                      <p className="mt-1 text-3xl font-bold text-amber-600">{storyCounts.pending}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                      <FileText className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Published</p>
                      <p className="mt-1 text-3xl font-bold text-green-600">{storyCounts.published}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Eye className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total</p>
                      <p className="mt-1 text-3xl font-bold">{storyCounts.total}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filter Tabs and Add Button */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  variant={storyFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStoryFilter('all')}
                >
                  All ({storyCounts.total})
                </Button>
                <Button
                  variant={storyFilter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setStoryFilter('pending')}
                >
                  In Queue ({storyCounts.pending})
                </Button>
                <Button
                  variant={storyFilter === 'published' ? 'default' : 'outline'}
                  onClick={() => setStoryFilter('published')}
                >
                  Published ({storyCounts.published})
                </Button>
                <Button variant="outline" onClick={loadDbStories} disabled={loadingDbStories}>
                  {loadingDbStories ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                </Button>
              </div>
              <Button onClick={() => setShowAddStoryForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Story Manually
              </Button>
            </div>

            {/* Add Story Form */}
            {showAddStoryForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Story</CardTitle>
                  <CardDescription>Manually add a story to the archive (will be added as pending)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name *</label>
                      <Input
                        value={newStoryForm.name}
                        onChange={(e) => setNewStoryForm({ ...newStoryForm, name: e.target.value })}
                        placeholder="e.g., J.M. or John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role/Background</label>
                      <Input
                        value={newStoryForm.role}
                        onChange={(e) => setNewStoryForm({ ...newStoryForm, role: e.target.value })}
                        placeholder="e.g., Former CS major"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={newStoryForm.location}
                        onChange={(e) => setNewStoryForm({ ...newStoryForm, location: e.target.value })}
                        placeholder="e.g., New York, NY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Age</label>
                      <Input
                        value={newStoryForm.age}
                        onChange={(e) => setNewStoryForm({ ...newStoryForm, age: e.target.value })}
                        placeholder="e.g., 24"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pull Quote * (shown in cards)</label>
                    <Textarea
                      value={newStoryForm.quote}
                      onChange={(e) => setNewStoryForm({ ...newStoryForm, quote: e.target.value })}
                      placeholder="A short, impactful quote from their story..."
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Story *</label>
                    <Textarea
                      value={newStoryForm.fullStory}
                      onChange={(e) => setNewStoryForm({ ...newStoryForm, fullStory: e.target.value })}
                      placeholder="The complete story..."
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Status</label>
                    <Input
                      value={newStoryForm.currentStatus}
                      onChange={(e) => setNewStoryForm({ ...newStoryForm, currentStatus: e.target.value })}
                      placeholder="e.g., Working as a freelancer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {['Cost', 'Burnout', 'First-Gen', "Didn't Belong", 'Systemic', 'Access', 'Success Story', 'Still Fighting'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setNewStoryForm(prev => ({
                              ...prev,
                              tags: prev.tags.includes(tag)
                                ? prev.tags.filter(t => t !== tag)
                                : [...prev.tags, tag]
                            }))
                          }}
                          className={`rounded-full px-3 py-1 text-sm ${newStoryForm.tags.includes(tag)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                            }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleAddStoryManually} disabled={addingStory || !newStoryForm.name || !newStoryForm.quote || !newStoryForm.fullStory}>
                      {addingStory ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                      Add to Queue
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddStoryForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stories List */}
            {loadingDbStories && dbStories.length === 0 ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredDbStories.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No stories {storyFilter !== 'all' ? `${storyFilter}` : ''}</h3>
                  <p className="text-sm text-muted-foreground">
                    {storyFilter === 'pending' ? 'No stories waiting for review.' : storyFilter === 'published' ? 'No published stories yet.' : 'No story submissions yet.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredDbStories.map((story) => (
                  <Card key={story.id} className={story.status === 'pending' ? 'border-amber-200 bg-amber-50/30' : ''}>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-bold">
                            {story.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{story.name}</h3>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${story.status === 'published'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-amber-100 text-amber-700'
                                }`}>
                                {story.status === 'published' ? 'Published' : 'In Queue'}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{story.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant={story.status === 'published' ? 'outline' : 'default'}
                            size="sm"
                            onClick={() => handleToggleStoryStatus(story.id, story.status)}
                            disabled={updatingStoryId === story.id}
                          >
                            {updatingStoryId === story.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : story.status === 'published' ? (
                              <EyeOff className="mr-2 h-4 w-4" />
                            ) : (
                              <Eye className="mr-2 h-4 w-4" />
                            )}
                            {story.status === 'published' ? 'Unpublish' : 'Publish'}
                          </Button>
                          {confirmDeleteId === story.id ? (
                            <div className="flex gap-1">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteDbStory(story.id)}
                                disabled={deletingStoryId === story.id}
                              >
                                {deletingStoryId === story.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm'}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setConfirmDeleteId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setConfirmDeleteId(story.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="mb-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {story.location && <span>📍 {story.location}</span>}
                        {story.age && <span>🎂 Age {story.age}</span>}
                        {story.submittedAt && (
                          <span>📅 {new Date(story.submittedAt).toLocaleDateString()}</span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-1">
                        {story.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="mb-4 border-l-2 border-primary pl-4">
                        <p className="font-serif italic text-foreground">&quot;{story.quote}&quot;</p>
                      </blockquote>

                      {/* Full Story */}
                      <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Full Story:</p>
                        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{story.fullStory}</p>
                      </div>

                      {story.currentStatus && (
                        <div className="mt-4 rounded-lg border border-border p-3">
                          <p className="text-xs font-medium text-muted-foreground">Current Status:</p>
                          <p className="text-sm">{story.currentStatus}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Dissected Tab */}
          <TabsContent value="dissected">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Dissected Objects</h2>
                <p className="text-muted-foreground">Manage interactive object diagrams</p>
              </div>
              <Button onClick={() => setIsAddingObject(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Object
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {dissectedObjects.map((obj) => (
                  <motion.div
                    key={obj.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{obj.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{obj.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">
                          {obj.hotspots.length} hotspot{obj.hotspots.length !== 1 ? 's' : ''}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingObject(obj)}>
                            <Pencil className="mr-2 h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteDissectedObject(obj.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Learning Modules Tab */}
          <TabsContent value="modules">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Learning Modules</h2>
                <p className="text-muted-foreground">Manage Entry Lab learning content</p>
              </div>
              <Button onClick={() => setIsAddingModule(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </Button>
            </div>

            <div className="grid gap-4">
              <AnimatePresence>
                {learningModules.map((module) => (
                  <motion.div
                    key={module.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card>
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="rounded bg-muted px-1.5 py-0.5 capitalize">{module.difficulty}</span>
                            <span>{module.duration}</span>
                            <span>{module.steps.length} steps</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setEditingModule(module)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteLearningModule(module.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Email Subscribers</h2>
                <p className="text-muted-foreground">
                  People who signed up to stay updated ({subscribers.length} total)
                </p>
              </div>
              <Button onClick={loadSubscribers} variant="outline" disabled={loadingSubscribers}>
                {loadingSubscribers ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Refresh
              </Button>
            </div>

            {loadingSubscribers && subscribers.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : subscribers.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Mail className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No subscribers yet</h3>
                  <p className="text-sm text-muted-foreground">
                    When people sign up via the Stay Updated form, they&apos;ll appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Emails</CardTitle>
                    <CardDescription>Copy all emails for use in your email marketing tool</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const emails = subscribers.map(s => s.email).join('\n')
                        navigator.clipboard.writeText(emails)
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Copy All Emails
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subscriber List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {subscribers.map((subscriber) => (
                        <div key={subscriber.id} className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">{subscriber.email}</p>
                            <p className="text-sm text-muted-foreground">
                              Subscribed {new Date(subscriber.subscribed_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                            disabled={deletingSubscriber === subscriber.id}
                          >
                            {deletingSubscriber === subscriber.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-destructive" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Story Dialog */}
      <StoryDialog
        story={editingStory}
        isOpen={!!editingStory || isAddingStory}
        onClose={() => {
          setEditingStory(null)
          setIsAddingStory(false)
        }}
        onSave={(data) => {
          if (editingStory) {
            updateStory(editingStory.id, data)
          } else {
            addStory(data as Omit<Story, 'id'>)
          }
          setEditingStory(null)
          setIsAddingStory(false)
        }}
      />

      {/* Dissected Object Dialog */}
      <DissectedDialog
        object={editingObject}
        isOpen={!!editingObject || isAddingObject}
        onClose={() => {
          setEditingObject(null)
          setIsAddingObject(false)
        }}
        onSave={(data) => {
          if (editingObject) {
            updateDissectedObject(editingObject.id, data)
          } else {
            addDissectedObject(data as Omit<DissectedObject, 'id'>)
          }
          setEditingObject(null)
          setIsAddingObject(false)
        }}
      />

      {/* Learning Module Dialog */}
      <ModuleDialog
        module={editingModule}
        isOpen={!!editingModule || isAddingModule}
        onClose={() => {
          setEditingModule(null)
          setIsAddingModule(false)
        }}
        onSave={(data) => {
          if (editingModule) {
            updateLearningModule(editingModule.id, data)
          } else {
            addLearningModule(data as Omit<LearningModule, 'id'>)
          }
          setEditingModule(null)
          setIsAddingModule(false)
        }}
      />

      {/* Reset Confirmation */}
      <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to Defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace all current content with the default data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetToDefaults()
                setShowResetConfirm(false)
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Story Dialog Component
function StoryDialog({
  story,
  isOpen,
  onClose,
  onSave,
}: {
  story: Story | null
  isOpen: boolean
  onClose: () => void
  onSave: (data: Partial<Story>) => void
}) {
  const [form, setForm] = useState<Partial<Story>>({
    name: '',
    role: '',
    image: '/placeholder.svg?height=400&width=400',
    tags: [],
    quote: '',
    fullStory: '',
    location: '',
    age: '',
    currentStatus: '',
  })

  useEffect(() => {
    if (story) {
      setForm(story)
    } else {
      setForm({
        name: '',
        role: '',
        image: '/placeholder.svg?height=400&width=400',
        tags: [],
        quote: '',
        fullStory: '',
        location: '',
        age: '',
        currentStatus: '',
      })
    }
  }, [story, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{story ? 'Edit Story' : 'Add Story'}</DialogTitle>
          <DialogDescription>
            {story ? 'Update the story details below.' : 'Add a new personal story to the archive.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Maria Santos"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input
                value={form.role || ''}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g., Former CS Student"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={form.location || ''}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g., Austin, TX"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <Input
                value={form.age || ''}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="e.g., 24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={form.image || ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/placeholder.svg?height=400&width=400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const tags = form.tags || []
                    if (tags.includes(tag)) {
                      setForm({ ...form, tags: tags.filter((t) => t !== tag) })
                    } else {
                      setForm({ ...form, tags: [...tags, tag] })
                    }
                  }}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${form.tags?.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quote (short)</label>
            <Textarea
              value={form.quote || ''}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              placeholder="A brief, impactful quote..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Full Story</label>
            <Textarea
              value={form.fullStory || ''}
              onChange={(e) => setForm({ ...form, fullStory: e.target.value })}
              placeholder="The complete story..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Current Status</label>
            <Input
              value={form.currentStatus || ''}
              onChange={(e) => setForm({ ...form, currentStatus: e.target.value })}
              placeholder="What are they doing now?"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(form)}>
            {story ? 'Save Changes' : 'Add Story'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Dissected Dialog Component
function DissectedDialog({
  object,
  isOpen,
  onClose,
  onSave,
}: {
  object: DissectedObject | null
  isOpen: boolean
  onClose: () => void
  onSave: (data: Partial<DissectedObject>) => void
}) {
  const [form, setForm] = useState<Partial<DissectedObject>>({
    name: '',
    description: '',
    image: '/placeholder.svg?height=600&width=800',
    hotspots: [],
  })

  useEffect(() => {
    if (object) {
      setForm(object)
    } else {
      setForm({
        name: '',
        description: '',
        image: '/placeholder.svg?height=600&width=800',
        hotspots: [],
      })
    }
  }, [object, isOpen])

  const addHotspot = () => {
    const newHotspot: Hotspot = {
      id: Date.now().toString(),
      x: 50,
      y: 50,
      label: 'New Hotspot',
      description: 'Description of this component...',
    }
    setForm({ ...form, hotspots: [...(form.hotspots || []), newHotspot] })
  }

  const updateHotspot = (id: string, updates: Partial<Hotspot>) => {
    setForm({
      ...form,
      hotspots: form.hotspots?.map((h) => (h.id === id ? { ...h, ...updates } : h)),
    })
  }

  const removeHotspot = (id: string) => {
    setForm({ ...form, hotspots: form.hotspots?.filter((h) => h.id !== id) })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{object ? 'Edit Object' : 'Add Object'}</DialogTitle>
          <DialogDescription>
            {object ? 'Update the dissected object details.' : 'Add a new interactive object diagram.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Mechanical Watch"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A brief description of the object..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={form.image || ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/placeholder.svg?height=600&width=800"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Hotspots</label>
              <Button type="button" variant="outline" size="sm" onClick={addHotspot}>
                <Plus className="mr-1 h-3 w-3" />
                Add Hotspot
              </Button>
            </div>

            <div className="space-y-3">
              {form.hotspots?.map((hotspot, index) => (
                <div key={hotspot.id} className="rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Hotspot {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={() => removeHotspot(hotspot.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid gap-2">
                    <Input
                      value={hotspot.label}
                      onChange={(e) => updateHotspot(hotspot.id, { label: e.target.value })}
                      placeholder="Label"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={hotspot.x}
                        onChange={(e) => updateHotspot(hotspot.id, { x: Number(e.target.value) })}
                        placeholder="X %"
                      />
                      <Input
                        type="number"
                        value={hotspot.y}
                        onChange={(e) => updateHotspot(hotspot.id, { y: Number(e.target.value) })}
                        placeholder="Y %"
                      />
                    </div>
                    <Textarea
                      value={hotspot.description}
                      onChange={(e) => updateHotspot(hotspot.id, { description: e.target.value })}
                      placeholder="Description..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(form)}>
            {object ? 'Save Changes' : 'Add Object'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Module Dialog Component
function ModuleDialog({
  module,
  isOpen,
  onClose,
  onSave,
}: {
  module: LearningModule | null
  isOpen: boolean
  onClose: () => void
  onSave: (data: Partial<LearningModule>) => void
}) {
  const [form, setForm] = useState<Partial<LearningModule>>({
    title: '',
    description: '',
    icon: 'zap',
    difficulty: 'beginner',
    duration: '15 min',
    topic: 'general',
    steps: [],
  })

  useEffect(() => {
    if (module) {
      setForm(module)
    } else {
      setForm({
        title: '',
        description: '',
        icon: 'zap',
        difficulty: 'beginner',
        duration: '15 min',
        topic: 'general',
        steps: [],
      })
    }
  }, [module, isOpen])

  const addStep = () => {
    const newStep: LearningStep = {
      id: Date.now().toString(),
      title: 'New Step',
      content: 'Step content...',
      confusedNote: '',
    }
    setForm({ ...form, steps: [...(form.steps || []), newStep] })
  }

  const updateStep = (id: string, updates: Partial<LearningStep>) => {
    setForm({
      ...form,
      steps: form.steps?.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })
  }

  const removeStep = (id: string) => {
    setForm({ ...form, steps: form.steps?.filter((s) => s.id !== id) })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{module ? 'Edit Module' : 'Add Module'}</DialogTitle>
          <DialogDescription>
            {module ? 'Update the learning module details.' : 'Add a new learning module to Entry Lab.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., What is Electricity?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A brief description..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Icon</label>
              <Select value={form.icon} onValueChange={(v) => setForm({ ...form, icon: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select
                value={form.difficulty}
                onValueChange={(v) => setForm({ ...form, difficulty: v as LearningModule['difficulty'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input
                value={form.duration || ''}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g., 15 min"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Select
                value={form.topic}
                onValueChange={(v) => setForm({ ...form, topic: v as LearningModule['topic'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="mechanics">Mechanics</SelectItem>
                  <SelectItem value="robotics">Robotics</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Steps</label>
              <Button type="button" variant="outline" size="sm" onClick={addStep}>
                <Plus className="mr-1 h-3 w-3" />
                Add Step
              </Button>
            </div>

            <div className="space-y-3">
              {form.steps?.map((step, index) => (
                <div key={step.id} className="rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Step {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={() => removeStep(step.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid gap-2">
                    <Input
                      value={step.title}
                      onChange={(e) => updateStep(step.id, { title: e.target.value })}
                      placeholder="Step title"
                    />
                    <Textarea
                      value={step.content}
                      onChange={(e) => updateStep(step.id, { content: e.target.value })}
                      placeholder="Step content..."
                      rows={3}
                    />
                    <Textarea
                      value={step.confusedNote || ''}
                      onChange={(e) => updateStep(step.id, { confusedNote: e.target.value })}
                      placeholder="What confused me (optional)..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(form)}>
            {module ? 'Save Changes' : 'Add Module'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
