import { useInView } from '../hooks/useInView'
import { SectionLabel } from './About'

const projects = [
  {
    title: 'Online Record Management with Canine Breed Identification',
    description:
      'A web-based record management system for a veterinary clinic integrated with a machine learning–based canine breed identification module. Enables efficient pet record handling and accurate breed recognition from uploaded images.',
    tags: ['React', 'Node.js', 'Python', 'MySQL', 'Machine Learning', 'REST API'],
    type: 'Capstone Project',
    year: '2024',
    highlight: true,
  },
]

export default function Projects() {
  const { ref, inView } = useInView()

  return (
    <section id="projects" className="py-16 section-line" ref={ref}>
      <div
        className="transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
      >
        <SectionLabel>Projects</SectionLabel>

        <div className="mt-6 space-y-4">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative border rounded-2xl p-6 transition-all duration-300 hover:shadow-md cursor-default ${
                project.highlight
                  ? 'border-accent/30 bg-white/60 hover:bg-white/80'
                  : 'border-border bg-white/40 hover:bg-white/70'
              }`}
            >
              {project.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 bg-accent text-cream text-xs font-mono rounded-full">
                    Featured
                  </span>
                </div>
              )}

              <div className="flex items-start gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C84B31" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0 pr-16">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-mono text-muted">{project.type}</span>
                    <span className="text-xs text-border">·</span>
                    <span className="text-xs font-mono text-muted">{project.year}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-ink leading-snug">
                    {project.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm font-body text-ink/70 leading-relaxed mt-3 mb-4 ml-11">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 ml-11">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon placeholder */}
        <div className="mt-4 border border-dashed border-border rounded-2xl p-6 flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg border border-dashed border-border flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-body text-muted">More projects coming soon</p>
            <p className="text-xs font-mono text-muted/60 mt-0.5">Currently building...</p>
          </div>
        </div>
      </div>
    </section>
  )
}
