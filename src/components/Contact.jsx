import { useInView } from '../hooks/useInView'
import { SectionLabel } from './About'

const contactLinks = [
  {
    label: 'Email',
    value: 'deitheramurao@gmail.com',
    href: 'mailto:deitheramurao@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '0921-592-1673',
    href: 'tel:09215921673',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.44 2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Calamba City, Laguna',
    href: 'https://maps.google.com/?q=Calamba+City+Laguna',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export default function Contact() {
  const { ref, inView } = useInView()

  return (
    <section id="contact" className="py-16 section-line" ref={ref}>
      <div
        className="transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
      >
        <SectionLabel>Get In Touch</SectionLabel>

        <div className="mt-6 grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="font-display font-bold text-2xl text-ink mb-3 leading-snug">
              Looking for an OJT opportunity
            </h2>
            <p className="text-base font-body text-ink/70 leading-relaxed mb-6">
              I'm currently seeking a software development internship where
              I can apply my skills, contribute to real projects, and grow
              as a developer. Let's connect!
            </p>

            <a
              href="mailto:deitheramurao@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-cream font-body text-sm rounded-full hover:bg-ink transition-colors duration-200"
            >
              Send a Message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="space-y-3">
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'Location' ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 border border-border rounded-xl p-4 bg-white/40 hover:bg-white/70 hover:border-ink/20 transition-all duration-200 group"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateX(12px)',
                  transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms, background-color 0.2s, border-color 0.2s`,
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D0] border border-border flex items-center justify-center text-muted group-hover:text-accent transition-colors flex-shrink-0">
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs font-mono text-muted">{link.label}</p>
                  <p className="text-sm font-body text-ink">{link.value}</p>
                </div>
                <div className="ml-auto text-muted group-hover:text-ink transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
