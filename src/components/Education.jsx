import { useInView } from '../hooks/useInView'
import { SectionLabel } from './About'

const education = [
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'STI College Calamba',
    period: '2022 — Present',
    status: 'ongoing',
    description: 'Specializing in web development, software engineering, and IT systems. Working on capstone projects involving machine learning integration.',
  },
  {
    degree: 'Senior High School — IT in Mobile App and Web Development',
    school: 'STI College Calamba',
    period: '2020 — 2022',
    status: 'completed',
    description: 'Focused on mobile application development and web technologies as a technical-vocational track.',
  },
]

export default function Education() {
  const { ref, inView } = useInView()

  return (
    <section id="education" className="py-16 section-line" ref={ref}>
      <div
        className="transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
      >
        <SectionLabel>Education</SectionLabel>

        <div className="mt-6 relative">
          {/* Timeline line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <div key={edu.degree} className="pl-10 relative">
                {/* Dot */}
                <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  edu.status === 'ongoing'
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-cream'
                }`}>
                  {edu.status === 'ongoing' ? (
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-muted" />
                  )}
                </div>

                <div
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateX(-10px)',
                    transition: `opacity 0.5s ease ${i * 150}ms, transform 0.5s ease ${i * 150}ms`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-display font-semibold text-base text-ink leading-snug">
                      {edu.degree}
                    </h3>
                    {edu.status === 'ongoing' && (
                      <span className="text-xs font-mono text-accent flex-shrink-0 mt-0.5">Current</span>
                    )}
                  </div>
                  <p className="text-sm font-body text-ink/80 mb-0.5">{edu.school}</p>
                  <p className="text-xs font-mono text-muted mb-2">{edu.period}</p>
                  <p className="text-sm font-body text-ink/60 leading-relaxed">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
