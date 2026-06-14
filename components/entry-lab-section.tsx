'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Wrench,
  Cpu,
  Zap,
  MessageCircle,
  Code,
  Battery,
  Radio,
  Cog,
  Users,
  BookOpen,
  Eye,
  Heart,
  Unlock,
  Share2,
  Compass,
  Send,
  MessageSquare,
  Clock,
  ChevronDown,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContent } from '@/lib/content-context'
import type { LearningModule, DiscussionTopic, DiscussionPost } from '@/lib/content-types'

const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  lightbulb: Lightbulb,
  cpu: Cpu,
  cog: Cog,
  wrench: Wrench,
  code: Code,
  battery: Battery,
  radio: Radio,
}

const topics: { id: DiscussionTopic; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'coding', label: 'Coding', icon: Code, color: 'bg-blue-500' },
  { id: 'electricity', label: 'Electricity', icon: Zap, color: 'bg-yellow-500' },
  { id: 'mechanics', label: 'Mechanics', icon: Cog, color: 'bg-orange-500' },
  { id: 'robotics', label: 'Robotics', icon: Cpu, color: 'bg-purple-500' },
  { id: 'electronics', label: 'Electronics', icon: Battery, color: 'bg-green-500' },
  { id: 'careers', label: 'Careers', icon: Compass, color: 'bg-pink-500' },
  { id: 'general', label: 'General', icon: MessageCircle, color: 'bg-gray-500' },
]

const principles = [
  {
    icon: BookOpen,
    title: 'Minimal Jargon',
    description: 'Every technical term explained in plain language. No assumed knowledge.',
  },
  {
    icon: Eye,
    title: 'Visual Step-by-Step',
    description: 'Onboarding built around what you can see and touch, not abstract concepts.',
  },
  {
    icon: Users,
    title: 'Community Layer',
    description: "Real people at the same stage. Questions that don't feel stupid here.",
  },
  {
    icon: Heart,
    title: 'Free Resources Only',
    description: 'Built using only what is freely available. No paywalls, no prerequisites.',
  },
  {
    icon: Share2,
    title: 'Open Source',
    description: 'Every lesson, every resource, every dead end documented and shared.',
  },
  {
    icon: Compass,
    title: 'Multiple Paths',
    description: 'A window into robotics, hardware, software, and adjacent STEM careers.',
  },
]

export function EntryLabSection() {
  const { learningModules, discussionPosts, addDiscussionPost, addReplyToPost } = useContent()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  
  const [activeTab, setActiveTab] = useState<'learn' | 'community'>('learn')
  const [selectedTopic, setSelectedTopic] = useState<DiscussionTopic | 'all'>('all')
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  
  // New post form
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPostTopic, setNewPostTopic] = useState<DiscussionTopic>('general')
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostAuthor, setNewPostAuthor] = useState('')
  
  // Reply form
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [replyAuthor, setReplyAuthor] = useState('')
  
  // Community search
  const [communitySearch, setCommunitySearch] = useState('')

  const filteredModules = selectedTopic === 'all' 
    ? learningModules 
    : learningModules.filter(m => m.topic === selectedTopic)

  const filteredPosts = discussionPosts.filter(p => {
    // Filter by topic
    if (selectedTopic !== 'all' && p.topic !== selectedTopic) return false
    // Filter by search query
    if (communitySearch.trim()) {
      const query = communitySearch.toLowerCase()
      const matchesTitle = p.title.toLowerCase().includes(query)
      const matchesContent = p.content.toLowerCase().includes(query)
      const matchesAuthor = p.authorName.toLowerCase().includes(query)
      const matchesReplies = p.replies?.some(r => 
        r.content.toLowerCase().includes(query) || r.authorName.toLowerCase().includes(query)
      )
      if (!matchesTitle && !matchesContent && !matchesAuthor && !matchesReplies) return false
    }
    return true
  })

  const completedCount = completedModules.size
  const progress = learningModules.length > 0 ? (completedCount / learningModules.length) * 100 : 0

  const toggleComplete = (moduleId: string) => {
    setCompletedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const getIcon = (iconName: string): React.ElementType => {
    return iconMap[iconName] || Lightbulb
  }

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostAuthor.trim()) return
    
    addDiscussionPost({
      topic: newPostTopic,
      title: newPostTitle,
      content: newPostContent,
      authorName: newPostAuthor,
    })
    
    setNewPostTitle('')
    setNewPostContent('')
    setShowNewPostForm(false)
  }

  const handleSubmitReply = (postId: string) => {
    if (!replyContent.trim() || !replyAuthor.trim()) return
    
    addReplyToPost(postId, {
      authorName: replyAuthor,
      content: replyContent,
    })
    
    setReplyContent('')
    setReplyingTo(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section id="entry-lab" ref={containerRef} className="relative py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs uppercase tracking-widest text-primary">
            Entry Lab
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Start here if you have never done this before.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            No jargon. No gatekeeping. Just step-by-step learning designed for people the system forgot about.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <principle.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Topic Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Filter by topic:</span>
            <button
              onClick={() => setSelectedTopic('all')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedTopic === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              All
            </button>
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedTopic === topic.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <topic.icon className="h-3.5 w-3.5" />
                {topic.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 flex gap-2 rounded-lg bg-secondary p-1"
        >
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'learn'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Learn ({filteredModules.length})
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'community'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Community ({filteredPosts.length})
          </button>
        </motion.div>

        {/* Learn Tab Content */}
        {activeTab === 'learn' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Your Progress</h3>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium text-foreground">
                    {completedCount} of {learningModules.length}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>

                <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">A note on jargon</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Engineering is full of words that sound complicated but mean simple things. We
                    translate everything. If something does not make sense, that is our fault, not yours.
                  </p>
                </div>
              </div>
            </div>

            {/* Modules List */}
            <div className="space-y-4 lg:col-span-2">
              {filteredModules.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-12 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No modules available for this topic yet.</p>
                </div>
              ) : (
                filteredModules.map((module, index) => {
                  const IconComponent = getIcon(module.icon)
                  const isCompleted = completedModules.has(module.id)
                  const isExpanded = expandedModule === module.id
                  const topicInfo = topics.find(t => t.id === module.topic)

                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                        className={`w-full rounded-xl border p-5 text-left transition-all ${
                          isExpanded
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                              isCompleted
                                ? 'bg-primary/20 text-primary'
                                : 'bg-secondary text-muted-foreground'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-6 w-6" />
                            ) : (
                              <IconComponent className="h-6 w-6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-foreground">{module.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{module.description}</p>
                              </div>
                              <ChevronRight
                                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                                  isExpanded ? 'rotate-90' : ''
                                }`}
                              />
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {topicInfo && (
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs text-white ${topicInfo.color}`}>
                                  <topicInfo.icon className="h-3 w-3" />
                                  {topicInfo.label}
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">{module.duration}</span>
                              <span className="rounded bg-muted px-1.5 py-0.5 text-xs capitalize text-muted-foreground">
                                {module.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Expanded Module Content */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 overflow-hidden rounded-xl border border-border bg-card p-6"
                        >
                          {module.steps.map((step, stepIndex) => (
                            <div key={step.id} className="mb-6 last:mb-0">
                              <div className="mb-2 flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                  {stepIndex + 1}
                                </span>
                                <h4 className="font-medium text-foreground">{step.title}</h4>
                              </div>
                              <p className="mb-3 pl-10 text-sm leading-relaxed text-muted-foreground">
                                {step.content}
                              </p>
                              {step.confusedNote && (
                                <div className="ml-10 rounded-lg border border-accent/30 bg-accent/5 p-3">
                                  <p className="text-sm italic text-accent">
                                    <span className="font-medium">What confused me:</span> {step.confusedNote}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}

                          <Button
                            className="mt-6 w-full"
                            variant={isCompleted ? 'outline' : 'default'}
                            onClick={() => toggleComplete(module.id)}
                          >
                            {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })
              )}
            </div>
          </motion.div>
        )}

        {/* Community Tab Content */}
        {activeTab === 'community' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Search and New Post */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search discussions..."
                  value={communitySearch}
                  onChange={(e) => setCommunitySearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              {!showNewPostForm && (
                <Button onClick={() => setShowNewPostForm(true)} className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Ask a Question
                </Button>
              )}
            </div>
            
            {showNewPostForm && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="mb-4 font-semibold text-foreground">Ask the Community</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Your Name
                        </label>
                        <Input
                          value={newPostAuthor}
                          onChange={(e) => setNewPostAuthor(e.target.value)}
                          placeholder="How should we call you?"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Topic
                        </label>
                        <select
                          value={newPostTopic}
                          onChange={(e) => setNewPostTopic(e.target.value as DiscussionTopic)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                              {topic.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Question Title
                      </label>
                      <Input
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="What are you curious about?"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Details
                      </label>
                      <Textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Give some context. What do you already know? What specifically confuses you?"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSubmitPost} className="gap-2">
                        <Send className="h-4 w-4" />
                        Post Question
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </motion.div>
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-12 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    No discussions yet for this topic. Be the first to ask a question!
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const topicInfo = topics.find(t => t.id === post.topic)
                  const isExpanded = expandedPost === post.id

                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-border bg-card"
                    >
                      <button
                        onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                        className="w-full p-5 text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              {topicInfo && (
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs text-white ${topicInfo.color}`}>
                                  <topicInfo.icon className="h-3 w-3" />
                                  {topicInfo.label}
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {formatDate(post.createdAt)}
                              </span>
                            </div>
                            <h3 className="font-semibold text-foreground">{post.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {post.content}
                            </p>
                            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>by {post.authorName}</span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
                              </span>
                            </div>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Expanded Post Content */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-t border-border p-5"
                        >
                          <p className="mb-6 text-sm leading-relaxed text-foreground">
                            {post.content}
                          </p>

                          {/* Replies */}
                          {post.replies.length > 0 && (
                            <div className="mb-6 space-y-4">
                              <h4 className="text-sm font-semibold text-foreground">
                                {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
                              </h4>
                              {post.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="rounded-lg border border-border bg-muted/30 p-4"
                                >
                                  <p className="text-sm text-foreground">{reply.content}</p>
                                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="font-medium">{reply.authorName}</span>
                                    <span>·</span>
                                    <span>{formatDate(reply.createdAt)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Form */}
                          {replyingTo === post.id ? (
                            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                              <div>
                                <label className="mb-1 block text-xs font-medium text-foreground">
                                  Your Name
                                </label>
                                <Input
                                  value={replyAuthor}
                                  onChange={(e) => setReplyAuthor(e.target.value)}
                                  placeholder="Your name"
                                  className="h-9"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-medium text-foreground">
                                  Your Reply
                                </label>
                                <Textarea
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  placeholder="Share what you know or your perspective..."
                                  rows={3}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleSubmitReply(post.id)}>
                                  <Send className="mr-1.5 h-3 w-3" />
                                  Reply
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setReplyingTo(post.id)}
                              className="gap-1.5"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              Add a Reply
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
