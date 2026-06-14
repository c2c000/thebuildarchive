'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  type Story,
  type DissectedObject,
  type LearningModule,
  type DiscussionPost,
  type DiscussionReply,
  type SiteContent,
  defaultStories,
  defaultDissectedObjects,
  defaultLearningModules,
  defaultDiscussionPosts,
  defaultSiteContent,
} from './content-types'

interface ContentContextType {
  // Stories
  stories: Story[]
  addStory: (story: Omit<Story, 'id'>) => void
  updateStory: (id: string, story: Partial<Story>) => void
  deleteStory: (id: string) => void

  // Dissected Objects
  dissectedObjects: DissectedObject[]
  addDissectedObject: (obj: Omit<DissectedObject, 'id'>) => void
  updateDissectedObject: (id: string, obj: Partial<DissectedObject>) => void
  deleteDissectedObject: (id: string) => void

  // Learning Modules
  learningModules: LearningModule[]
  addLearningModule: (module: Omit<LearningModule, 'id'>) => void
  updateLearningModule: (id: string, module: Partial<LearningModule>) => void
  deleteLearningModule: (id: string) => void

  // Discussion Posts
  discussionPosts: DiscussionPost[]
  addDiscussionPost: (post: Omit<DiscussionPost, 'id' | 'createdAt' | 'replies'>) => void
  addReplyToPost: (postId: string, reply: Omit<DiscussionReply, 'id' | 'createdAt'>) => void
  deleteDiscussionPost: (id: string) => void

  // Site Content
  siteContent: SiteContent
  updateSiteContent: (updates: Partial<SiteContent>) => void

  // Utilities
  resetToDefaults: () => void
  exportData: () => string
  importData: (jsonString: string) => boolean
}

const ContentContext = createContext<ContentContextType | null>(null)

const STORAGE_KEYS = {
  stories: 'wgtb-stories',
  dissectedObjects: 'wgtb-dissected',
  learningModules: 'wgtb-modules',
  discussionPosts: 'wgtb-discussions',
  siteContent: 'wgtb-site-content',
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<Story[]>(defaultStories)
  const [dissectedObjects, setDissectedObjects] = useState<DissectedObject[]>(defaultDissectedObjects)
  const [learningModules, setLearningModules] = useState<LearningModule[]>(defaultLearningModules)
  const [discussionPosts, setDiscussionPosts] = useState<DiscussionPost[]>(defaultDiscussionPosts)
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const loadedStories = localStorage.getItem(STORAGE_KEYS.stories)
    const loadedObjects = localStorage.getItem(STORAGE_KEYS.dissectedObjects)
    const loadedModules = localStorage.getItem(STORAGE_KEYS.learningModules)

    if (loadedStories) {
      try {
        setStories(JSON.parse(loadedStories))
      } catch (e) {
        console.error('Failed to parse stories from localStorage')
      }
    }

    if (loadedObjects) {
      try {
        setDissectedObjects(JSON.parse(loadedObjects))
      } catch (e) {
        console.error('Failed to parse dissected objects from localStorage')
      }
    }

    if (loadedModules) {
      try {
        setLearningModules(JSON.parse(loadedModules))
      } catch (e) {
        console.error('Failed to parse learning modules from localStorage')
      }
    }

    const loadedDiscussions = localStorage.getItem(STORAGE_KEYS.discussionPosts)
    if (loadedDiscussions) {
      try {
        setDiscussionPosts(JSON.parse(loadedDiscussions))
      } catch (e) {
        console.error('Failed to parse discussion posts from localStorage')
      }
    }

    const loadedSiteContent = localStorage.getItem(STORAGE_KEYS.siteContent)
    if (loadedSiteContent) {
      try {
        setSiteContent({ ...defaultSiteContent, ...JSON.parse(loadedSiteContent) })
      } catch (e) {
        console.error('Failed to parse site content from localStorage')
      }
    }

    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever data changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.stories, JSON.stringify(stories))
    }
  }, [stories, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.dissectedObjects, JSON.stringify(dissectedObjects))
    }
  }, [dissectedObjects, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.learningModules, JSON.stringify(learningModules))
    }
  }, [learningModules, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.discussionPosts, JSON.stringify(discussionPosts))
    }
  }, [discussionPosts, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.siteContent, JSON.stringify(siteContent))
    }
  }, [siteContent, isHydrated])

  // Story CRUD
  const addStory = (story: Omit<Story, 'id'>) => {
    setStories((prev) => [...prev, { ...story, id: generateId() }])
  }

  const updateStory = (id: string, updates: Partial<Story>) => {
    setStories((prev) =>
      prev.map((story) => (story.id === id ? { ...story, ...updates } : story))
    )
  }

  const deleteStory = (id: string) => {
    setStories((prev) => prev.filter((story) => story.id !== id))
  }

  // Dissected Object CRUD
  const addDissectedObject = (obj: Omit<DissectedObject, 'id'>) => {
    setDissectedObjects((prev) => [...prev, { ...obj, id: generateId() }])
  }

  const updateDissectedObject = (id: string, updates: Partial<DissectedObject>) => {
    setDissectedObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj))
    )
  }

  const deleteDissectedObject = (id: string) => {
    setDissectedObjects((prev) => prev.filter((obj) => obj.id !== id))
  }

  // Learning Module CRUD
  const addLearningModule = (module: Omit<LearningModule, 'id'>) => {
    setLearningModules((prev) => [...prev, { ...module, id: generateId() }])
  }

  const updateLearningModule = (id: string, updates: Partial<LearningModule>) => {
    setLearningModules((prev) =>
      prev.map((module) => (module.id === id ? { ...module, ...updates } : module))
    )
  }

  const deleteLearningModule = (id: string) => {
    setLearningModules((prev) => prev.filter((module) => module.id !== id))
  }

  // Discussion Post CRUD
  const addDiscussionPost = (post: Omit<DiscussionPost, 'id' | 'createdAt' | 'replies'>) => {
    setDiscussionPosts((prev) => [
      {
        ...post,
        id: generateId(),
        createdAt: new Date().toISOString(),
        replies: [],
      },
      ...prev,
    ])
  }

  const addReplyToPost = (postId: string, reply: Omit<DiscussionReply, 'id' | 'createdAt'>) => {
    setDiscussionPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: [
                ...post.replies,
                {
                  ...reply,
                  id: generateId(),
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    )
  }

  const deleteDiscussionPost = (id: string) => {
    setDiscussionPosts((prev) => prev.filter((post) => post.id !== id))
  }

  // Site Content
  const updateSiteContent = (updates: Partial<SiteContent>) => {
    setSiteContent((prev) => ({ ...prev, ...updates }))
  }

  // Utilities
  const resetToDefaults = () => {
    setStories(defaultStories)
    setDissectedObjects(defaultDissectedObjects)
    setLearningModules(defaultLearningModules)
    setDiscussionPosts(defaultDiscussionPosts)
    setSiteContent(defaultSiteContent)
    localStorage.removeItem(STORAGE_KEYS.stories)
    localStorage.removeItem(STORAGE_KEYS.dissectedObjects)
    localStorage.removeItem(STORAGE_KEYS.learningModules)
    localStorage.removeItem(STORAGE_KEYS.discussionPosts)
    localStorage.removeItem(STORAGE_KEYS.siteContent)
  }

  const exportData = () => {
    return JSON.stringify(
      {
        stories,
        dissectedObjects,
        learningModules,
        discussionPosts,
        siteContent,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    )
  }

  const importData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString)
      if (data.stories && Array.isArray(data.stories)) {
        setStories(data.stories)
      }
      if (data.dissectedObjects && Array.isArray(data.dissectedObjects)) {
        setDissectedObjects(data.dissectedObjects)
      }
      if (data.learningModules && Array.isArray(data.learningModules)) {
        setLearningModules(data.learningModules)
      }
      if (data.discussionPosts && Array.isArray(data.discussionPosts)) {
        setDiscussionPosts(data.discussionPosts)
      }
      if (data.siteContent && typeof data.siteContent === 'object') {
        setSiteContent({ ...defaultSiteContent, ...data.siteContent })
      }
      return true
    } catch (e) {
      console.error('Failed to import data:', e)
      return false
    }
  }

  return (
    <ContentContext.Provider
      value={{
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
        discussionPosts,
        addDiscussionPost,
        addReplyToPost,
        deleteDiscussionPost,
        siteContent,
        updateSiteContent,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}
