import { useInView } from '../hooks/useInView'
import { SectionLabel } from './About'

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'PHP', 'Java', 'C#', 'MySQL'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'VPS Deployment', 'Shared Hosting', 'VS Code'],
  },
  {
    category: 'Professional',
    skills: ['Microsoft Office', 'Communication', 'Critical Thinking', 'Team Collaboration', 'Time Management'],
  },
]

const proficiencyColors = {
  'HTML': 92, 'CSS': 88, 'JavaScript': 78, 'React JS': 72,
  'PHP': 75, 'MySQL': 75, 'Node.js': 70, 'Java': 68,
  'C#': 65, 'Git': 80,
}

export default function Skills() {
  const { ref, inView } = useInView()

  return (
    <section id="skills" className="py-16 section-line" ref={ref}>
      <div
        className="transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
      >
        <SectionLabel>Tech Stack</SectionLabel>

        <p className="mt-4 mb-8 text-sm text-muted font-body">
          Intermediate proficiency across the full web stack.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className="border border-border rounded-xl p-5 bg-white/40 hover:bg-white/70 transition-colors duration-200"
              style={{
                transitionDelay: `${gi * 80}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${gi * 80}ms, transform 0.5s ease ${gi * 80}ms, background-color 0.2s`,
              }}
            >
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
