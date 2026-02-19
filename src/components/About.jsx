import { useInView } from '../hooks/useInView'

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-16 section-line" ref={ref}>
      <div
        className="transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
      >
        <SectionLabel>About</SectionLabel>

        <div className="mt-6 grid sm:grid-cols-5 gap-8 items-start">
          {/* Avatar placeholder */}
          <div className="sm:col-span-2">
            <div className="aspect-square max-w-[180px] rounded-2xl bg-gradient-to-br from-[#E8E0D0] to-[#D4C9B8] border border-border overflow-hidden flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center">
                  <span className="font-display font-bold text-3xl text-accent">DA</span>
                </div>
              </div>
              {/* decorative corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent/40 rounded-tl" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-accent/40 rounded-br" />
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-sm font-body font-medium text-ink">Deither Manaog Amurao</p>
              <p className="text-xs font-mono text-muted">deitheramurao@gmail.com</p>
              <p className="text-xs font-mono text-muted">0921-592-1673</p>
            </div>
          </div>

          {/* Bio */}
          <div className="sm:col-span-3 space-y-4">
            <p className="text-base font-body text-ink/80 leading-relaxed">
              I'm a BS Information Technology student at STI College Calamba,
              building practical expertise in web development and software
              engineering. My passion lies in creating clean, functional
              applications that solve real problems.
            </p>
            <p className="text-base font-body text-ink/80 leading-relaxed">
              I recently developed an{' '}
              <span className="text-ink font-medium">Online Record Management System</span>{' '}
              with a machine learning–based canine breed identification module
              for a veterinary clinic — combining full-stack web development
              with computer vision.
            </p>
            <p className="text-base font-body text-ink/80 leading-relaxed">
              I'm currently seeking an OJT opportunity where I can contribute,
              learn, and grow alongside experienced engineers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-accent uppercase tracking-widest">
        {children}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}
