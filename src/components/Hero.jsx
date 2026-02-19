import { useEffect, useState } from 'react'

const roles = ['IT Student', 'Web Developer', 'Full-Stack Learner', 'Problem Solver']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length)
        setVisible(true)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pt-16 pb-20">
      {/* Location badge */}
      <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-border rounded-full bg-white/60 animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-mono text-muted">Calamba City, Laguna · Open to OJT</span>
      </div>

      {/* Name */}
      <h1 className="font-display text-5xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight text-ink mb-4 animate-fade-up">
        Deither
        <br />
        <span className="text-accent">Amurao</span>
      </h1>

      {/* Rotating role */}
      <div className="h-8 mb-6">
        <p
          className="font-mono text-base text-muted transition-all duration-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(6px)' }}
        >
          / {roles[roleIndex]}
        </p>
      </div>

      {/* Tagline */}
      <p className="text-base text-ink/70 font-body max-w-md leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: '150ms', animationFillMode: 'both', opacity: 0 }}>
        BS Information Technology student at STI College Calamba, building
        full-stack web apps and machine learning integrations. Seeking OJT
        in software development.
      </p>

      {/* CTA row */}
      <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '250ms', animationFillMode: 'both', opacity: 0 }}>
        <a
          href="mailto:deitheramurao@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream font-body text-sm rounded-full hover:bg-accent transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Send Email
        </a>
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-ink font-body text-sm rounded-full hover:border-ink transition-colors duration-200"
        >
          View Projects
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Decorative line */}
      <div className="mt-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-mono text-muted">scroll to explore</span>
        <div className="h-px w-8 bg-border" />
      </div>
    </section>
  )
}
