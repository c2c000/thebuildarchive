export interface Story {
  id: string
  name: string
  role: string
  image: string
  profileImage?: string
  tags: string[]
  quote: string
  fullStory: string
  location: string
  age: string
  currentStatus: string
  status: 'pending' | 'published'
  submittedAt?: string
}

export interface Hotspot {
  id: string
  x: number
  y: number
  label: string
  description: string
}

export interface DissectedObject {
  id: string
  name: string
  description: string
  image: string
  hotspots: Hotspot[]
}

export interface LearningStep {
  id: string
  title: string
  content: string
  confusedNote?: string
}

export interface LearningModule {
  id: string
  title: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  topic: 'coding' | 'electricity' | 'mechanics' | 'robotics' | 'electronics' | 'general'
  steps: LearningStep[]
}

export type DiscussionTopic = 'coding' | 'electricity' | 'mechanics' | 'robotics' | 'electronics' | 'careers' | 'general'

export interface DiscussionReply {
  id: string
  authorName: string
  content: string
  createdAt: string
}

export interface DiscussionPost {
  id: string
  topic: DiscussionTopic
  title: string
  content: string
  authorName: string
  createdAt: string
  replies: DiscussionReply[]
}

export interface Sponsor {
  id: string
  name: string
  description: string
  url: string
  tier: 'platinum' | 'gold' | 'silver' | 'community'
}

export interface ThankYou {
  id: string
  name: string
  note: string
}

// Color scheme presets
export type ColorScheme = 'default' | 'forest' | 'ocean' | 'sunset' | 'lavender' | 'monochrome'

export const colorSchemes: Record<ColorScheme, {
  name: string
  primary: string
  accent: string
  background: string
  description: string
}> = {
  default: {
    name: 'Blueprint Blue',
    primary: 'oklch(0.45 0.18 250)',
    accent: 'oklch(0.55 0.2 25)',
    background: 'oklch(0.98 0.005 90)',
    description: 'Classic blue with warm coral accent',
  },
  forest: {
    name: 'Forest Green',
    primary: 'oklch(0.45 0.15 145)',
    accent: 'oklch(0.55 0.18 85)',
    background: 'oklch(0.98 0.008 140)',
    description: 'Earthy greens with golden accent',
  },
  ocean: {
    name: 'Ocean Depths',
    primary: 'oklch(0.45 0.15 220)',
    accent: 'oklch(0.55 0.15 180)',
    background: 'oklch(0.98 0.008 220)',
    description: 'Deep teal with seafoam accent',
  },
  sunset: {
    name: 'Sunset Warmth',
    primary: 'oklch(0.5 0.2 25)',
    accent: 'oklch(0.55 0.2 55)',
    background: 'oklch(0.98 0.01 60)',
    description: 'Warm terracotta with amber accent',
  },
  lavender: {
    name: 'Lavender Fields',
    primary: 'oklch(0.5 0.15 300)',
    accent: 'oklch(0.55 0.18 340)',
    background: 'oklch(0.98 0.01 300)',
    description: 'Soft purple with rose accent',
  },
  monochrome: {
    name: 'Monochrome',
    primary: 'oklch(0.25 0 0)',
    accent: 'oklch(0.45 0 0)',
    background: 'oklch(0.98 0 0)',
    description: 'Elegant black and white',
  },
}

// Editable site content
export interface SiteContent {
  // Site Identity
  siteName: string
  siteDescription: string

  // Color Scheme
  colorScheme: ColorScheme

  // Section Order (comma-separated section ids)
  sectionOrder: string

  // Hidden Sections (comma-separated section ids to hide)
  hiddenSections: string

  // Social Links
  socialInstagram: string
  socialYoutube: string
  socialGithub: string
  socialEmail: string

  // Hero
  heroTagline: string
  heroTitle: string
  heroSubtitle: string
  heroCta1: string
  heroCta2: string

  // Stats
  statsTitle: string
  stat1Value: string
  stat1Label: string
  stat2Value: string
  stat2Label: string
  stat3Value: string
  stat3Label: string
  stat4Value: string
  stat4Label: string

  // Sections
  sectionsTitle: string
  sectionsSubtitle: string

  // Documentary
  documentarySubtitle: string
  documentaryTitle: string
  documentaryDescription: string

  // Stories
  storiesSubtitle: string
  storiesTitle: string
  storiesDescription: string

  // Careers
  careersSubtitle: string
  careersTitle: string
  careersDescription: string

  // Entry Lab
  entryLabSubtitle: string
  entryLabTitle: string
  entryLabDescription: string

  // Dissected
  dissectedSubtitle: string
  dissectedTitle: string
  dissectedDescription: string

  // Mission
  missionQuote: string
  missionLabel: string
  missionSource: string

  // Sponsors & Thank Yous
  sponsorsTitle: string
  sponsorsSubtitle: string
  thankYousTitle: string

  // Stay Updated
  stayUpdatedTitle: string
  stayUpdatedDescription: string
  stayUpdatedButtonText: string
  stayUpdatedDisclaimer: string

  // Footer
  footerCta: string
  footerDescription: string
  footerProjectDescription: string

  // About Page - Founder
  founderSectionTitle: string
  founderName: string
  founderRole: string
  founderImage: string
  founderBio: string
  founderQuote: string

  // About Page
  aboutTagline: string
  aboutTitle: string
  aboutSubtitle: string
  aboutCoreIdeaTitle: string
  aboutCoreIdeaText1: string
  aboutCoreIdeaText2: string
  aboutPartsTitle: string
  aboutPartsSubtitle: string
  aboutPart1Title: string
  aboutPart1Description: string
  aboutPart1Act1: string
  aboutPart1Act1Desc: string
  aboutPart1Act2: string
  aboutPart1Act2Desc: string
  aboutPart1Act3: string
  aboutPart1Act3Desc: string
  aboutPart2Title: string
  aboutPart2Description: string
  aboutPart3Title: string
  aboutPart3Description: string
  aboutPart4Title: string
  aboutPart4Subtitle: string
  aboutPart4Description: string
  aboutPart4Question: string
  aboutDissectedTitle: string
  aboutDissectedText: string
  aboutDissectedLooksLike: string
  aboutDissectedLooksLikeList: string
  aboutDissectedTheme: string
  aboutDissectedThemeText: string
  aboutDissectedThemeHighlight: string
  aboutUnifyingLabel: string
  aboutUnifyingMessage: string
  aboutUnifyingSubtext: string
}

export const defaultSiteContent: SiteContent = {
  // Site Identity
  siteName: 'The Build Archive',
  siteDescription: 'A multimedia passion project investigating engineering access, identity, and the broken entry point into STEM.',

  // Color Scheme
  colorScheme: 'default',

  // Section Order (reflections is placed after themes/stats section)
  sectionOrder: 'reflections,documentary,stories,careers,entry-lab,dissected,sponsors',

  // Hidden Sections
  hiddenSections: '',

  // Social Links
  socialInstagram: '',
  socialYoutube: '',
  socialGithub: '',
  socialEmail: '',

  // Hero
  heroTagline: 'A Documentary Experience',
  heroTitle: 'Who gets to build?',
  heroSubtitle: 'Engineering is creative. But not everyone gets in. This is a story about access, identity, and redesigning the entry point.',
  heroCta1: 'Start Learning',
  heroCta2: 'Explore Stories',

  // Stats
  statsTitle: 'The Numbers Behind the Problem',
  stat1Value: '$120K',
  stat1Label: 'Average hidden costs beyond tuition',
  stat2Value: '68%',
  stat2Label: "Feel they don't belong in engineering",
  stat3Value: '44%',
  stat3Label: 'Lack access to intro courses in high school',
  stat4Value: '1 in 3',
  stat4Label: 'Leave STEM within two years',

  // Sections
  sectionsTitle: 'Explore the Experience',
  sectionsSubtitle: 'Five interconnected pathways to understanding—and changing—who gets to build.',

  // Documentary
  documentarySubtitle: 'Watch the Film',
  documentaryTitle: 'Documentary',
  documentaryDescription: 'A three-act exploration of systemic barriers in engineering education.',

  // Stories
  storiesSubtitle: 'Real Experiences',
  storiesTitle: 'Story Archive',
  storiesDescription: 'Personal narratives from those who faced barriers—and those who broke through.',

  // Careers
  careersSubtitle: 'Explore Paths',
  careersTitle: 'STEM Careers',
  careersDescription: 'Discover diverse career paths in science, technology, engineering, and mathematics.',

  // Entry Lab
  entryLabSubtitle: 'Start Learning',
  entryLabTitle: 'Entry Lab',
  entryLabDescription: 'Learn coding, electricity, mechanics, and more—with a community that gets it.',

  // Dissected
  dissectedSubtitle: 'Understand How Things Work',
  dissectedTitle: 'Dissected',
  dissectedDescription: 'Interactive exploded diagrams revealing the engineering inside everyday objects.',

  // Mission
  missionQuote: 'Engineering shapes the world. We believe the people shaping it should reflect the world—and that starts with who gets to learn in the first place.',
  missionLabel: 'The Project Mission',
  missionSource: 'Who Gets to Build?',

  // Sponsors & Thank Yous
  sponsorsTitle: 'Sponsors & Supporters',
  sponsorsSubtitle: 'This work is made possible by the organizations and people who believe in building a more inclusive future for engineering.',
  thankYousTitle: 'With Gratitude',

  // Footer
  footerCta: 'Ready to Start?',
  footerDescription: 'Everyone belongs in engineering. Start with Entry Lab, or share your own story.',
  footerProjectDescription: 'A multimedia passion project investigating engineering access, identity, and the broken entry point into STEM.',

  // Stay Updated
  stayUpdatedTitle: 'This project is still being built.',
  stayUpdatedDescription: 'The documentary is in production. The archive is growing. The platform is being designed. If any part of this resonates — we want to hear from you.',
  stayUpdatedButtonText: 'Stay updated',
  stayUpdatedDisclaimer: 'No spam. Updates only when something real launches.',

  // About Page - Founder
  founderSectionTitle: 'About the Founder',
  founderName: 'Your Name',
  founderRole: 'Creator & Director',
  founderImage: '',
  founderBio: 'Add your bio here. Share your journey, what drives you, and why you started this project. Talk about your background, your experiences with STEM, and what you hope to achieve with Who Gets to Build?',
  founderQuote: 'Add a personal quote or mission statement here.',

  // About Page
  aboutTagline: 'About the Project',
  aboutTitle: 'Who Gets to Build?',
  aboutSubtitle: 'A Documentary, Archive & Open-Source Platform on Engineering Access, Identity, and the Broken Entry Point into STEM',
  aboutCoreIdeaTitle: 'The Core Idea',
  aboutCoreIdeaText1: "Most people aren't leaving STEM because they're not smart enough — they're leaving because the system was never designed for them.",
  aboutCoreIdeaText2: "Who Gets to Build? is a multimedia passion project that investigates why people get pushed out of engineering, reframes what engineering actually looks like, and then does something about it by building a beginner platform so anyone can find their way in.",
  aboutPartsTitle: 'Four Interlocking Parts',
  aboutPartsSubtitle: 'Each piece reinforces the others — investigation, documentation, education, and curiosity working together.',
  aboutPart1Title: 'The Documentary',
  aboutPart1Description: 'A short-film series combining interviews, split-screen photography, and data visualization. Follow students with different levels of access to STEM, capture their environments, and layer in statistics and personal quotes.',
  aboutPart1Act1: 'The Dream',
  aboutPart1Act1Desc: 'What engineering promises',
  aboutPart1Act2: 'The Reality',
  aboutPart1Act2Desc: 'Who gets left out and why: burnout, cost, lack of representation, bad teaching',
  aboutPart1Act3: 'What Could Change',
  aboutPart1Act3Desc: 'A vision for accessible engineering education',
  aboutPart2Title: 'The Story Archive',
  aboutPart2Description: "A living, visual archive of real people who quit STEM — or almost did. Photographs in their actual environments. Short interviews. Graphic design surfacing key quotes and data. Individual stories become collective evidence.",
  aboutPart3Title: 'Entry Lab',
  aboutPart3Description: "A beginner-friendly learning platform for coding, electricity, mechanics, and more. Built from the documented chaos of trying to learn from scratch — the jargon, the dead ends, the gaps — transformed into something accessible.",
  aboutPart4Title: 'Dissected',
  aboutPart4Subtitle: 'An Engineering Autopsy Series',
  aboutPart4Description: "Take everyday objects — a cheap earphone, a smoke detector, a disposable camera — and destroy them on purpose. Photograph every layer, every component, every wire. Turn the wreckage into something that looks more like art than a textbook.",
  aboutPart4Question: "The question driving each piece isn't \"how does this work?\" — it's \"who had to think of this, and why don't we know their name?\"",
  aboutDissectedTitle: 'Why Dissected Is Different',
  aboutDissectedText: "Most \"how things work\" content explains mechanisms. Dissected is about restoring credit and curiosity — making the viewer feel like engineering is something humans did, not something that just exists.",
  aboutDissectedLooksLike: 'What It Looks Like',
  aboutDissectedLooksLikeList: "Flat-lay photography of disassembled objects, styled like fashion editorials|Illustrated diagrams drawn over actual photos|Short pieces tracing the engineering decision-making",
  aboutDissectedTheme: 'The Running Theme',
  aboutDissectedThemeText: "Anonymous engineers built everything around you, and engineering is invisible until you break something open. Every episode asks: could you have solved this problem?",
  aboutDissectedThemeHighlight: "The answer is always designed to feel like maybe yes.",
  aboutUnifyingLabel: 'The Unifying Message',
  aboutUnifyingMessage: "Engineering is creative, accessible, and for everyone — but right now, the system doesn't act like it.",
  aboutUnifyingSubtext: "This project investigates why, tells the stories being ignored, and builds something better.",
}

// Default data
export const defaultStories: Story[] = [
  {
    id: '1',
    name: 'Maria Santos',
    role: 'Former CS Student',
    image: '/placeholder.svg?height=400&width=400',
    tags: ['Cost', 'First-Gen'],
    quote: 'I was the first in my family to go to college. No one told me I\'d need $3,000 for textbooks and software.',
    fullStory: 'Growing up in a small Texas town, I dreamed of building apps that could help my community. When I got accepted to study computer science, my whole neighborhood celebrated. But by sophomore year, I was working three jobs just to afford the required software licenses. I\'d code until 3am, then wake up at 6am for my shift at the coffee shop. Eventually, something had to give. I dropped out with $40,000 in debt and no degree. Now I work as a receptionist, still paying off loans for an education I couldn\'t finish.',
    location: 'Austin, TX',
    age: '24',
    currentStatus: 'Working in hospitality, self-teaching web development at night',
    status: 'published',
  },
  {
    id: '2',
    name: 'James Chen',
    role: 'Engineering Dropout',
    image: '/placeholder.svg?height=400&width=400',
    tags: ['Didn\'t Belong', 'Burnout'],
    quote: 'I was one of three Black students in my entire engineering program. The isolation was crushing.',
    fullStory: 'I loved building things since I was a kid—took apart every appliance in our house. Engineering seemed like a natural fit. But college was different. Study groups that "forgot" to invite me. Professors who seemed surprised when I answered correctly. Microaggressions that accumulated like snow, until I couldn\'t breathe. I transferred to business school, then dropped out entirely. Sometimes I wonder who I\'d be if someone had just made me feel like I belonged.',
    location: 'Atlanta, GA',
    age: '26',
    currentStatus: 'Community organizer, mentoring Black youth interested in STEM',
    status: 'published',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Biology Major',
    image: '/placeholder.svg?height=400&width=400',
    tags: ['Systemic', 'Access'],
    quote: 'My high school didn\'t offer AP Physics or Calculus. I was already behind before I even started.',
    fullStory: 'I wanted to be a doctor since I was seven, watching my grandmother battle diabetes without proper care. But my rural high school couldn\'t afford advanced science courses. When I got to college, everyone else had already taken calculus, organic chemistry prerequisites, AP Biology. I spent my first year in remedial classes while my peers moved ahead. The gap never closed. After failing organic chemistry twice, I switched to communications. I still want to help my community—I just wish the path hadn\'t been blocked from the start.',
    location: 'Rural Ohio',
    age: '23',
    currentStatus: 'Health communications, advocating for rural healthcare access',
    status: 'published',
  },
  {
    id: '4',
    name: 'Alex Rivera',
    role: 'Physics Student',
    image: '/placeholder.svg?height=400&width=400',
    tags: ['Burnout', 'Cost'],
    quote: 'I loved physics until it became a competition to see who could suffer the most.',
    fullStory: 'In high school, physics felt like magic—understanding how the universe works. College turned that wonder into anxiety. All-night problem sets, brutal curves, professors who bragged about high failure rates. "Weed-out" courses designed to make people quit. I started having panic attacks before exams. When I told my advisor, he said "maybe physics isn\'t for you." So I believed him. Left after junior year. The universe still fascinates me, but I can\'t look at an equation without feeling that old dread.',
    location: 'Berkeley, CA',
    age: '25',
    currentStatus: 'Science writer, making physics accessible to general audiences',
    status: 'published',
  },
  {
    id: '5',
    name: 'Destiny Williams',
    role: 'CS Student',
    image: '/placeholder.svg?height=400&width=400',
    tags: ['First-Gen', 'Didn\'t Belong'],
    quote: 'Everyone seemed to already know each other from coding camps I couldn\'t afford.',
    fullStory: 'I taught myself to code using library computers and free online courses. Got a full scholarship to a top CS program—thought I\'d made it. But my classmates had been coding since middle school, had parents who worked at tech companies, spoke a language of internships and hackathons I didn\'t understand. Imposter syndrome hit hard. I\'d hide my confusion, afraid to ask "stupid" questions. By junior year, I was barely passing. Left before they could kick me out. The industry\'s loss, I tell myself. Some days I believe it.',
    location: 'Detroit, MI',
    age: '22',
    currentStatus: 'Starting a coding bootcamp for underrepresented youth',
    status: 'published',
  },
]

export const defaultDissectedObjects: DissectedObject[] = [
  {
    id: '1',
    name: 'Mechanical Watch',
    description: 'Explore the intricate mechanism that keeps time without batteries',
    image: '/placeholder.svg?height=600&width=800',
    hotspots: [
      {
        id: 'h1',
        x: 50,
        y: 30,
        label: 'Mainspring',
        description: 'A coiled spring that stores energy when wound. As it unwinds, it releases energy to power the watch. A fully wound mainspring can keep a watch running for 40+ hours.',
      },
      {
        id: 'h2',
        x: 65,
        y: 50,
        label: 'Escapement',
        description: 'The heart of the watch. It releases the mainspring\'s energy in controlled increments, creating the "tick-tock" rhythm. Each tick represents one small step of the gear train.',
      },
      {
        id: 'h3',
        x: 35,
        y: 60,
        label: 'Balance Wheel',
        description: 'Oscillates back and forth 28,800 times per hour in a typical watch. This consistent rhythm is what makes mechanical watches accurate.',
      },
      {
        id: 'h4',
        x: 50,
        y: 75,
        label: 'Gear Train',
        description: 'A series of interconnected gears that transfer energy from the mainspring to the hands. Each gear is precisely sized to create the correct time divisions.',
      },
    ],
  },
  {
    id: '2',
    name: 'Electric Motor',
    description: 'See how electromagnetic forces create rotational motion',
    image: '/placeholder.svg?height=600&width=800',
    hotspots: [
      {
        id: 'h1',
        x: 50,
        y: 25,
        label: 'Stator',
        description: 'The stationary outer part containing permanent magnets or electromagnets. It creates the magnetic field that the rotor pushes against.',
      },
      {
        id: 'h2',
        x: 50,
        y: 50,
        label: 'Rotor',
        description: 'The rotating inner part wrapped with copper wire. When electricity flows through the wire, it becomes an electromagnet that interacts with the stator\'s field.',
      },
      {
        id: 'h3',
        x: 30,
        y: 60,
        label: 'Commutator',
        description: 'Switches the direction of current in the rotor at just the right moment, keeping the motor spinning in one direction. Think of it as a rotating switch.',
      },
      {
        id: 'h4',
        x: 70,
        y: 60,
        label: 'Brushes',
        description: 'Carbon blocks that press against the commutator to deliver electricity to the spinning rotor. They wear down over time and need replacement in brushed motors.',
      },
    ],
  },
  {
    id: '3',
    name: 'Mechanical Keyboard Switch',
    description: 'Discover what happens in the milliseconds when you press a key',
    image: '/placeholder.svg?height=600&width=800',
    hotspots: [
      {
        id: 'h1',
        x: 50,
        y: 20,
        label: 'Keycap',
        description: 'The plastic cap you press. Its shape (profile) affects typing feel. Common profiles include Cherry, OEM, and SA, each with different heights and angles.',
      },
      {
        id: 'h2',
        x: 50,
        y: 40,
        label: 'Stem',
        description: 'Connects the keycap to the spring mechanism. The stem\'s design determines the switch type: linear (smooth), tactile (bump), or clicky (bump + sound).',
      },
      {
        id: 'h3',
        x: 50,
        y: 60,
        label: 'Spring',
        description: 'Determines how much force you need to press the key (measured in grams) and provides the return force. Heavier springs prevent accidental presses but tire fingers faster.',
      },
      {
        id: 'h4',
        x: 50,
        y: 80,
        label: 'Metal Contact Leaves',
        description: 'Two small metal pieces that touch when the key is pressed, completing an electrical circuit. This contact is what registers your keypress to the computer.',
      },
    ],
  },
]

export const defaultDiscussionPosts: DiscussionPost[] = [
  {
    id: '1',
    topic: 'electricity',
    title: 'Why do batteries die even when not in use?',
    content: 'I left some AA batteries in a drawer for a year and now they barely work. What happened to them?',
    authorName: 'CuriousLearner',
    createdAt: '2024-01-15T10:30:00Z',
    replies: [
      {
        id: 'r1',
        authorName: 'ScienceHelper',
        content: 'Great question! Batteries undergo a process called self-discharge. Even when not connected to anything, chemical reactions slowly occur inside the battery. The rate depends on the battery type - alkaline batteries lose about 2-3% of their charge per year, while cheaper zinc-carbon batteries can lose much more.',
        createdAt: '2024-01-15T11:45:00Z',
      },
      {
        id: 'r2',
        authorName: 'TechNovice',
        content: 'I had the same question! Temperature also matters - batteries in hot places discharge faster.',
        createdAt: '2024-01-15T14:20:00Z',
      },
    ],
  },
  {
    id: '2',
    topic: 'coding',
    title: 'What exactly is a "variable" in programming?',
    content: 'Every tutorial mentions variables but I still do not understand what they actually ARE. Can someone explain like I have never coded before?',
    authorName: 'FirstTimeHere',
    createdAt: '2024-01-18T09:15:00Z',
    replies: [
      {
        id: 'r1',
        authorName: 'CodeMentor',
        content: 'Think of a variable like a labeled box. The label is the name you give it (like "age" or "score"), and you can put something inside the box (like the number 25 or 100). Later, you can look at what is in the box, change what is inside, or use it somewhere else. The computer remembers what you put in each box as long as your program is running.',
        createdAt: '2024-01-18T10:00:00Z',
      },
    ],
  },
  {
    id: '3',
    topic: 'mechanics',
    title: 'How do gears make things easier to turn?',
    content: 'I see gears in bikes and machines but I do not get how they help. A bigger gear connected to a smaller one... what does that actually do?',
    authorName: 'MechanicsNewbie',
    createdAt: '2024-01-20T16:45:00Z',
    replies: [],
  },
]

export const defaultSponsors: Sponsor[] = []

export const defaultThankYous: ThankYou[] = []

export const defaultLearningModules: LearningModule[] = [
  {
    id: '1',
    title: 'What is Electricity?',
    description: 'Start from the very beginning: atoms, electrons, and why stuff lights up',
    icon: 'zap',
    difficulty: 'beginner',
    duration: '15 min',
    topic: 'electricity',
    steps: [
      {
        id: 's1',
        title: 'Everything is Made of Atoms',
        content: 'Imagine the smallest piece of something—like gold. Cut it in half, then half again, over and over. Eventually you\'d get to something called an atom. Atoms are the building blocks of literally everything: your phone, your body, the air, this text on your screen.',
        confusedNote: 'I remember thinking atoms were the smallest thing possible. Turns out they\'re made of even smaller stuff—but let\'s not go there yet.',
      },
      {
        id: 's2',
        title: 'The Electron\'s Wild Ride',
        content: 'Inside each atom, tiny particles called electrons zip around the center. In some materials (like copper), electrons can break free and move between atoms. When billions of electrons flow in the same direction, that\'s what we call electricity.',
        confusedNote: 'I spent weeks thinking electrons traveled at light speed through wires. They actually move super slowly—like inches per hour. It\'s the "push" that travels fast.',
      },
      {
        id: 's3',
        title: 'Why Batteries Have Two Ends',
        content: 'Electrons need a reason to move—they don\'t just wander around. Batteries create a pressure difference: lots of electrons crowded at one end (negative) want to escape to the other end (positive). Connect a wire, and they flow.',
        confusedNote: 'The positive/negative naming is honestly confusing because Benjamin Franklin guessed wrong about which way electricity flows. We\'re stuck with it now.',
      },
      {
        id: 's4',
        title: 'Making Electrons Do Work',
        content: 'Here\'s the cool part: we can put obstacles in the electrons\' path and make them do useful things. Push electrons through a light bulb filament, and it glows. Through a motor, and it spins. The electron flow (current) plus the pressure (voltage) equals power.',
        confusedNote: 'Voltage vs current confused me forever. Think of it like water: voltage is the water pressure, current is how much water flows per second.',
      },
    ],
  },
  {
    id: '2',
    title: 'Your First Circuit',
    description: 'Build something that actually works: a simple LED circuit',
    icon: 'lightbulb',
    difficulty: 'beginner',
    duration: '20 min',
    topic: 'electronics',
    steps: [
      {
        id: 's1',
        title: 'What You\'ll Need',
        content: 'Gather these components: a 9V battery, an LED (any color), a 330Ω resistor (orange-orange-brown stripes), and two wires with clips. You can find these at any electronics store or order a basic kit online for under $10.',
        confusedNote: 'I destroyed many LEDs before learning they need resistors. They\'re surprisingly fragile—too much current and they burn out instantly.',
      },
      {
        id: 's2',
        title: 'Why We Need a Resistor',
        content: 'An LED can only handle so much current before it dies. The resistor acts like a speed bump for electrons—it slows down the flow to a safe level. Without it, your LED becomes a brief, expensive flash.',
        confusedNote: 'The math for choosing resistor values is actually simple: (Battery Voltage - LED Voltage) ÷ Desired Current. But honestly, 330Ω works for most LEDs with a 9V battery.',
      },
      {
        id: 's3',
        title: 'Making the Connection',
        content: 'Connect the battery\'s positive end to the resistor. Connect the other end of the resistor to the LED\'s longer leg (positive side). Connect the LED\'s shorter leg back to the battery\'s negative end. Complete the circle, and it lights up!',
        confusedNote: 'I always forget which LED leg is positive. The longer leg is positive. Also, there\'s a flat spot on the LED\'s base on the negative side.',
      },
      {
        id: 's4',
        title: 'Troubleshooting',
        content: 'LED not lighting? Check these: Is the LED in the right direction? (They only work one way.) Is everything connected firmly? Is your battery fresh? Try flipping the LED around—if that works, you just learned that LEDs are directional.',
        confusedNote: 'My first circuit didn\'t work for 30 minutes. Turned out I\'d grabbed a burned-out LED from a previous attempt. Always test with known-good components.',
      },
    ],
  },
  {
    id: '3',
    title: 'How Code Becomes Action',
    description: 'Connect the digital world to the physical: programming an Arduino',
    icon: 'cpu',
    difficulty: 'intermediate',
    duration: '30 min',
    topic: 'coding',
    steps: [
      {
        id: 's1',
        title: 'Meet the Microcontroller',
        content: 'An Arduino is a tiny computer on a board. Unlike your laptop, it\'s designed to connect to the physical world: motors, sensors, lights. It runs one program over and over, waiting for input and controlling output.',
        confusedNote: 'I thought Arduino was a programming language. It\'s actually a board—you program it using a simplified version of C++. The software is called the Arduino IDE.',
      },
      {
        id: 's2',
        title: 'Your First Sketch',
        content: 'Arduino programs are called "sketches." Every sketch has two parts: setup() runs once when power is applied, and loop() runs forever after. For blinking an LED: in setup(), tell pin 13 to be an output. In loop(), turn it on, wait, turn it off, wait, repeat.',
        confusedNote: 'The loop() function running forever seems obvious now, but I spent hours wondering why my "turn LED on" code only worked once before I understood the structure.',
      },
      {
        id: 's3',
        title: 'From Code to Electrons',
        content: 'When your code says "digitalWrite(13, HIGH)", here\'s what happens: the microcontroller sends 5 volts to pin 13. Electrons flow from that pin, through your LED, through a resistor, to ground. The code literally controls the physical flow of electricity.',
        confusedNote: 'HIGH and LOW just mean "5 volts" and "0 volts." I kept thinking they were arbitrary programming terms.',
      },
      {
        id: 's4',
        title: 'Reading the Physical World',
        content: 'The magic happens both ways. Connect a button to a pin, and your code can ask "is this button pressed?" Connect a temperature sensor, and you get actual numbers representing real-world heat. The digital and physical worlds connect through these little pins.',
        confusedNote: 'Reading inputs was confusing until I understood "pull-up resistors." Without them, an unconnected input pin just picks up random electrical noise and gives garbage readings.',
      },
    ],
  },
]
