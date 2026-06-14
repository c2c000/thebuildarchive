'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  Beaker,
  Building2,
  Stethoscope,
  Rocket,
  TreePine,
  Database,
  Palette,
  Zap,
  ChevronRight,
  Users,
  TrendingUp,
  GraduationCap,
  Heart,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Career {
  id: string
  title: string
  field: string
  icon: React.ReactNode
  color: string
  description: string
  dayInLife: string[]
  skills: string[]
  education: string
  salary: string
  growth: string
  whyMatters: string
  realPerson: {
    name: string
    role: string
    quote: string
  }
}

const careers: Career[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    field: 'Technology',
    icon: <Cpu className="size-6" />,
    color: 'bg-primary',
    description:
      'Build the apps, websites, and systems that power our digital world. From social media to healthcare software, you solve problems through code.',
    dayInLife: [
      'Morning standup with the team to discuss progress',
      'Write and review code for a new feature',
      'Debug an issue reported by users',
      'Collaborate with designers on user experience',
      'Learn a new technology or attend a tech talk',
    ],
    skills: ['Problem-solving', 'Logical thinking', 'Collaboration', 'Creativity', 'Communication'],
    education: "Bachelor's degree common, but many successful engineers are self-taught or bootcamp graduates",
    salary: '$70,000 - $200,000+',
    growth: '25% job growth expected by 2032',
    whyMatters:
      'Software engineers create solutions that help millions of people daily - from apps that connect families to systems that save lives in hospitals.',
    realPerson: {
      name: 'Maya Chen',
      role: 'Senior Engineer at a Health Tech Startup',
      quote:
        "I didn't write my first line of code until I was 22. Now I build software that helps doctors diagnose rare diseases faster. You don't need to start young - you just need to start.",
    },
  },
  {
    id: 'biomedical-engineer',
    title: 'Biomedical Engineer',
    field: 'Healthcare',
    icon: <Stethoscope className="size-6" />,
    color: 'bg-accent',
    description:
      'Combine engineering with medicine to create life-saving devices - from artificial hearts to prosthetic limbs to diagnostic equipment.',
    dayInLife: [
      'Test a prototype medical device in the lab',
      'Meet with doctors to understand clinical needs',
      'Analyze data from device trials',
      'Design improvements based on patient feedback',
      'Document work for FDA approval',
    ],
    skills: ['Biology knowledge', 'Engineering design', 'Attention to detail', 'Empathy', 'Research'],
    education: "Bachelor's or Master's in Biomedical Engineering or related field",
    salary: '$65,000 - $150,000+',
    growth: '10% job growth expected by 2032',
    whyMatters:
      'Every artificial limb that helps someone walk again, every pacemaker that keeps a heart beating - biomedical engineers make these possible.',
    realPerson: {
      name: 'David Okonkwo',
      role: 'Prosthetics Design Lead',
      quote:
        'My grandmother lost her leg to diabetes. That experience drove me to design affordable prosthetics. Engineering is deeply personal when you see how it changes lives.',
    },
  },
  {
    id: 'environmental-scientist',
    title: 'Environmental Scientist',
    field: 'Earth Sciences',
    icon: <TreePine className="size-6" />,
    color: 'bg-chart-3',
    description:
      'Study and protect our planet. Analyze pollution, develop sustainable practices, and help communities adapt to climate change.',
    dayInLife: [
      'Collect water or soil samples in the field',
      'Analyze environmental data in the lab',
      'Write reports on environmental impact',
      'Present findings to community stakeholders',
      'Develop sustainability recommendations',
    ],
    skills: ['Scientific analysis', 'Field work', 'Data interpretation', 'Communication', 'Systems thinking'],
    education: "Bachelor's degree minimum, Master's common for advanced positions",
    salary: '$55,000 - $120,000+',
    growth: '6% job growth expected by 2032',
    whyMatters:
      "Climate change is the defining challenge of our generation. Environmental scientists are on the front lines, finding solutions to protect communities and ecosystems.",
    realPerson: {
      name: 'Rosa Martinez',
      role: 'Environmental Justice Researcher',
      quote:
        'I grew up near a polluted river that made people in my neighborhood sick. Now I study how environmental harm affects marginalized communities - and how to fix it.',
    },
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    field: 'Technology',
    icon: <Database className="size-6" />,
    color: 'bg-chart-4',
    description:
      'Find patterns in data that help organizations make better decisions. From predicting disease outbreaks to understanding customer needs.',
    dayInLife: [
      'Clean and prepare datasets for analysis',
      'Build machine learning models',
      'Create visualizations to communicate insights',
      'Present findings to stakeholders',
      'Experiment with new analysis techniques',
    ],
    skills: ['Statistics', 'Programming', 'Critical thinking', 'Storytelling with data', 'Curiosity'],
    education: "Bachelor's in Math, Statistics, or Computer Science; Master's increasingly common",
    salary: '$80,000 - $180,000+',
    growth: '35% job growth expected by 2032',
    whyMatters:
      'Data scientists help us understand complex problems - from tracking pandemic spread to identifying bias in systems to optimizing renewable energy.',
    realPerson: {
      name: 'Aisha Johnson',
      role: 'Data Scientist at Nonprofit',
      quote:
        "I use data to help food banks predict demand so less food goes to waste and more families get fed. Numbers aren't cold - they represent real people.",
    },
  },
  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    field: 'Engineering',
    icon: <Building2 className="size-6" />,
    color: 'bg-chart-5',
    description:
      'Design and build the infrastructure that communities depend on - bridges, roads, water systems, and buildings that stand for generations.',
    dayInLife: [
      'Review design plans and specifications',
      'Visit construction sites to monitor progress',
      'Run structural simulations on computer',
      'Meet with city planners about projects',
      'Ensure designs meet safety codes',
    ],
    skills: ['Mathematics', 'Spatial reasoning', 'Project management', 'Technical drawing', 'Safety awareness'],
    education: "Bachelor's degree in Civil Engineering required, PE license for senior roles",
    salary: '$65,000 - $140,000+',
    growth: '5% job growth expected by 2032',
    whyMatters:
      'Civil engineers shape the physical world we live in. Every bridge you cross, every building you enter - someone designed it to keep you safe.',
    realPerson: {
      name: 'James Whitehorse',
      role: 'Infrastructure Engineer',
      quote:
        'Growing up on a reservation with unreliable water, I knew I wanted to build systems that work for everyone. Now I design water infrastructure for underserved communities.',
    },
  },
  {
    id: 'aerospace-engineer',
    title: 'Aerospace Engineer',
    field: 'Engineering',
    icon: <Rocket className="size-6" />,
    color: 'bg-primary',
    description:
      'Design aircraft, spacecraft, satellites, and missiles. Push the boundaries of what humans can build and where we can go.',
    dayInLife: [
      'Run simulations on aircraft designs',
      'Test components in wind tunnels',
      'Analyze flight test data',
      'Collaborate with manufacturing teams',
      'Research new materials and technologies',
    ],
    skills: ['Physics', 'Advanced mathematics', 'Computer modeling', 'Innovation', 'Teamwork'],
    education: "Bachelor's minimum, Master's or PhD for research positions",
    salary: '$75,000 - $170,000+',
    growth: '6% job growth expected by 2032',
    whyMatters:
      'From satellites that enable global communication to spacecraft exploring Mars, aerospace engineers expand the boundaries of human possibility.',
    realPerson: {
      name: 'Kenji Nakamura',
      role: 'Satellite Systems Engineer',
      quote:
        'I helped design satellites that bring internet to remote villages. As a kid in rural Japan, I dreamed of the stars. Now I help connect Earth.',
    },
  },
  {
    id: 'ux-researcher',
    title: 'UX Researcher',
    field: 'Design & Technology',
    icon: <Palette className="size-6" />,
    color: 'bg-accent',
    description:
      'Study how people use technology and design better experiences. Bridge the gap between human needs and technical solutions.',
    dayInLife: [
      'Conduct user interviews and observation sessions',
      'Analyze research data for patterns',
      'Create personas and journey maps',
      'Present insights to design and engineering teams',
      'Test prototypes with real users',
    ],
    skills: ['Empathy', 'Research methods', 'Communication', 'Psychology', 'Critical analysis'],
    education: "Bachelor's in Psychology, HCI, Design, or related field",
    salary: '$70,000 - $150,000+',
    growth: '23% job growth expected by 2032',
    whyMatters:
      'UX researchers ensure technology works for everyone - including people with disabilities, elderly users, and communities often ignored by tech.',
    realPerson: {
      name: 'Taylor Williams',
      role: 'Accessibility UX Researcher',
      quote:
        "My brother is blind, and watching him struggle with apps drove me to this field. Good design isn't about making things pretty - it's about making them work for everyone.",
    },
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Engineer',
    field: 'Energy',
    icon: <Zap className="size-6" />,
    color: 'bg-chart-3',
    description:
      'Design and implement clean energy systems - solar, wind, hydroelectric. Build the sustainable infrastructure our future depends on.',
    dayInLife: [
      'Analyze site conditions for solar or wind installation',
      'Design energy system layouts',
      'Monitor performance of existing systems',
      'Calculate energy output and cost savings',
      'Research emerging clean technologies',
    ],
    skills: ['Electrical engineering', 'Environmental awareness', 'Problem-solving', 'Project management', 'Innovation'],
    education: "Bachelor's in Electrical, Mechanical, or Environmental Engineering",
    salary: '$70,000 - $140,000+',
    growth: '8% job growth expected by 2032',
    whyMatters:
      'The transition to clean energy is essential for our planet. Renewable energy engineers are building the power systems that will sustain future generations.',
    realPerson: {
      name: 'Fatima Al-Hassan',
      role: 'Solar Systems Engineer',
      quote:
        'I grew up in a refugee camp where electricity was scarce. Now I design solar microgrids for off-grid communities. Energy access changes everything.',
    },
  },
  {
    id: 'lab-scientist',
    title: 'Research Scientist',
    field: 'Science',
    icon: <Beaker className="size-6" />,
    color: 'bg-chart-4',
    description:
      'Conduct experiments to expand human knowledge. From developing new medicines to understanding the universe, research scientists push boundaries.',
    dayInLife: [
      'Design and run laboratory experiments',
      'Analyze results and document findings',
      'Read and review scientific literature',
      'Write papers and grant proposals',
      'Mentor students and junior researchers',
    ],
    skills: ['Scientific method', 'Patience', 'Attention to detail', 'Writing', 'Collaboration'],
    education: 'PhD typically required for independent research positions',
    salary: '$60,000 - $150,000+',
    growth: '8% job growth expected by 2032',
    whyMatters:
      'Every medical breakthrough, every new understanding of our world, starts with research scientists asking questions and seeking answers.',
    realPerson: {
      name: 'Dr. Samuel Obi',
      role: 'Cancer Research Scientist',
      quote:
        'I lost my father to cancer when I was young. Now I spend my days in the lab working on treatments that might save other families from that pain.',
    },
  },
]

const fields = ['All', 'Technology', 'Healthcare', 'Engineering', 'Earth Sciences', 'Energy', 'Design & Technology', 'Science']

export function StemCareersSection() {
  const [selectedField, setSelectedField] = useState('All')
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)

  const filteredCareers =
    selectedField === 'All' ? careers : careers.filter((career) => career.field === selectedField)

  return (
    <section id="careers" className="relative py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Explore Possibilities
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            STEM Careers That Shape Tomorrow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the diverse paths in science, technology, engineering, and math. 
            Each career offers a unique way to solve problems and make an impact.
          </p>
        </motion.div>

        {/* Field Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {fields.map((field) => (
            <Button
              key={field}
              variant={selectedField === field ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedField(field)}
              className="rounded-full"
            >
              {field}
            </Button>
          ))}
        </motion.div>

        {/* Career Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCareers.map((career, index) => (
              <motion.div
                key={career.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="group p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card"
                  onClick={() => setSelectedCareer(career)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${career.color} text-primary-foreground`}>
                      {career.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {career.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{career.field}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{career.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="size-3" />
                        {career.growth.split(' ')[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="size-3" />
                        {career.salary.split(' - ')[0]}+
                      </span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Career Detail Modal */}
        <AnimatePresence>
          {selectedCareer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
              onClick={() => setSelectedCareer(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25 }}
                className="bg-card rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`${selectedCareer.color} p-6 rounded-t-2xl`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-card/20 text-primary-foreground">
                        {selectedCareer.icon}
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-primary-foreground">
                          {selectedCareer.title}
                        </h3>
                        <p className="text-primary-foreground/80">{selectedCareer.field}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedCareer(null)}
                      className="text-primary-foreground hover:bg-card/20"
                    >
                      <X className="size-5" />
                    </Button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <p className="text-foreground text-lg">{selectedCareer.description}</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-secondary rounded-xl p-4 text-center">
                      <TrendingUp className="size-5 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-muted-foreground mb-1">Job Growth</p>
                      <p className="font-semibold text-foreground text-sm">{selectedCareer.growth.split(' ')[0]}</p>
                    </div>
                    <div className="bg-secondary rounded-xl p-4 text-center">
                      <GraduationCap className="size-5 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-muted-foreground mb-1">Salary Range</p>
                      <p className="font-semibold text-foreground text-sm">{selectedCareer.salary.split(' - ')[0]}+</p>
                    </div>
                    <div className="bg-secondary rounded-xl p-4 text-center">
                      <Users className="size-5 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-muted-foreground mb-1">Education</p>
                      <p className="font-semibold text-foreground text-sm">
                        {selectedCareer.education.includes('Bachelor') ? "Bachelor's+" : selectedCareer.education.split(' ')[0]}
                      </p>
                    </div>
                  </div>

                  {/* A Day in the Life */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      A Day in the Life
                    </h4>
                    <ul className="space-y-2">
                      {selectedCareer.dayInLife.map((activity, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                          <span className="text-primary font-mono text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Why It Matters */}
                  <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Heart className="size-4 text-accent" />
                      Why This Work Matters
                    </h4>
                    <p className="text-muted-foreground">{selectedCareer.whyMatters}</p>
                  </div>

                  {/* Real Person Quote */}
                  <div className="border-l-4 border-primary pl-5">
                    <blockquote className="text-foreground italic mb-3">
                      &ldquo;{selectedCareer.realPerson.quote}&rdquo;
                    </blockquote>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{selectedCareer.realPerson.name}</span>
                      <span className="mx-2">•</span>
                      {selectedCareer.realPerson.role}
                    </p>
                  </div>

                  {/* Education Path */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      Education Path
                    </h4>
                    <p className="text-muted-foreground text-sm">{selectedCareer.education}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
