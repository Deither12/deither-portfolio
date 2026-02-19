import { useInView } from '../hooks/useInView'
import { SectionLabel } from './About'

const certs = [
  { title: 'Toshiba Workshop', issuer: 'Toshiba', icon: '🔧' },
  { title: 'Java Fundamentals', issuer: 'Certification Program', icon: '☕' },
  { title: 'System Administration', issuer: 'Certification Program', icon: '🖥️' },
  { title: 'SAP Basic', issuer: 'SAP', icon: '📊' },
  { title: 'Advance SAP', issuer: 'SAP', icon: '📈' },
]

export default function Certifications() {
  const { ref, inView } = useInView()

  return (
    <section id="certifications" className="py-16 section-line" ref={ref}>
      <div
        className="transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
      >
        <SectionLabel>Certifications</SectionLabel>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {certs.map((cert, i) => (
            <div
              key={cert.title}
              className="flex items-center gap-4 border border-border rounded-xl p-4 bg-white/40 hover:bg-white/70 transition-all duration-200 hover:border-ink/20"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(10px)',
                transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms, background-color 0.2s, border-color 0.2s`,
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D0] border border-border flex items-center justify-center text-lg flex-shrink-0">
                {cert.icon}
              </div>
              <div>
                <p className="text-sm font-body font-medium text-ink">{cert.title}</p>
                <p className="text-xs font-mono text-muted">{cert.issuer}</p>
              </div>
              <div className="ml-auto">
                <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
