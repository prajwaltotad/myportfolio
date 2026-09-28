import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Project = {
  number: string
  title: string
  description: string
  technologies: string[]
  github: string | null
  demo: string | null
  details: {
    architecture: string
    learned: string
  }
}

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ACTIVITY', href: '#activity' },
  { label: 'JOURNEY', href: '#education' },
  { label: 'CONTACT', href: '#contact' },
]

const skillGroups = [
  { title: 'PROGRAMMING', items: ['C', 'Java', 'Python'] },
  { title: 'WEB', items: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'DATABASE', items: ['SQL'] },
  { title: 'TOOLS', items: ['Git', 'GitHub'] },
  { title: 'LEARNING', items: ['DSA', 'AI / ML', 'Data Analysis'] },
]

const projects: Project[] = [
  {
    number: '01',
    title: 'IoT-Based Smart Parking System',
    description:
      'An IoT-based parking system using Arduino, sensors and display components with a practical real-world application.',
    technologies: ['Arduino', 'C', 'Sensors', 'Servo Motor'],
    github: null,
    demo: null,
    details: {
      architecture: 'Vehicle → IR Sensor → Arduino UNO → Servo + LCD → Slot status update',
      learned:
        'This project helped me connect hardware concepts with software logic and reinforced the value of practical problem-solving in embedded systems.',
    },
  },
  {
    number: '02',
    title: 'Line Editor',
    description:
      'A command-line text editor built in C to practice data structures, file handling and problem-solving fundamentals.',
    technologies: ['C', 'CLI', 'Data Structures'],
    github: 'https://github.com/prajwaltotad/line-editor',
    demo: null,
    details: {
      architecture: 'Command input → editor logic → file handling → terminal output',
      learned:
        'The project strengthened my understanding of buffering, text operations and how structured programs can still stay compact and efficient.',
    },
  },
  {
    number: '03',
    title: 'Portfolio Website',
    description:
      'A personal portfolio built to showcase learning, projects and technical interests through a clean developer-first interface.',
    technologies: ['React', 'TypeScript', 'CSS'],
    github: 'https://github.com/prajwaltotad',
    demo: 'https://prajwal-portfolio-zeta.vercel.app/',
    details: {
      architecture: 'Content → React sections → styled UI → responsive portfolio experience',
      learned:
        'This project helped me apply design thinking to the frontend and make content presentation as important as the code behind it.',
    },
  },
]

const learningTracks = [
  {
    title: 'DSA',
    description: 'Improving problem-solving and algorithmic thinking through consistent practice.',
  },
  {
    title: 'AI / ML',
    description: 'Exploring models, fundamentals and practical applications in intelligent systems.',
  },
  {
    title: 'Software Development',
    description: 'Building cleaner interfaces, better architecture and stronger engineering habits.',
  },
  {
    title: 'Data Analysis',
    description: 'Working with data-driven thinking to better interpret patterns and insights.',
  },
]

const profileLinks = [
  {
    label: 'GitHub',
    value: 'github.com/prajwaltotad',
    href: 'https://github.com/prajwaltotad',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/prajwaltotad',
    href: 'https://www.linkedin.com/in/prajwaltotad',
  },
]

const commandItems = [
  { label: 'About', href: '#about', shortcut: 'A', keywords: ['about', 'bio', 'profile'] },
  { label: 'Skills', href: '#skills', shortcut: 'S', keywords: ['skills', 'toolkit', 'stack'] },
  { label: 'Projects', href: '#projects', shortcut: 'P', keywords: ['projects', 'work', 'case studies'] },
  { label: 'Activity', href: '#activity', shortcut: 'G', keywords: ['github', 'activity', 'build'] },
  { label: 'Journey', href: '#education', shortcut: 'J', keywords: ['journey', 'education', 'timeline'] },
  { label: 'Contact', href: '#contact', shortcut: 'C', keywords: ['contact', 'email', 'message'] },
  { label: 'GitHub', href: 'https://github.com/prajwaltotad', shortcut: '⇧G', keywords: ['github', 'repo', 'profile'] },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prajwaltotad', shortcut: '⇧L', keywords: ['linkedin', 'social'] },
  { label: 'Back to top', href: '#home', shortcut: '↑', keywords: ['top', 'home'] },
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')

  const filteredCommands = useMemo(() => {
    const query = paletteQuery.trim().toLowerCase()
    if (!query) return commandItems

    return commandItems.filter((item) => {
      const label = item.label.toLowerCase()
      const keywords = item.keywords.join(' ').toLowerCase()
      return label.includes(query) || keywords.includes(query)
    })
  }, [paletteQuery])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    revealItems.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.ctrlKey || event.metaKey
      if (isModifier && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsCommandPaletteOpen(true)
      }

      if (event.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCommandPaletteOpen])

  return (
    <div className="portfolio-shell">
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar container" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="Prajwal Totad home">
            <span className="brand-text">PRAJWAL.TOTAD</span>
          </a>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            id="primary-navigation"
            className={`nav-links ${isMenuOpen ? 'open' : ''}`}
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section className="hero container reveal" id="home">
          <div className="hero-copy">
            <p className="terminal-prompt compact">
              <span className="prompt">prajwal@portfolio:~$</span>
              <span className="command">whoami</span>
              <span className="cursor" aria-hidden="true">
                ▌
              </span>
            </p>

            <h1 className="hero-name" aria-label="Prajwal Totad">
              {['PRAJWAL', 'TOTAD'].map((word, wordIndex) => (
                <span className="hero-name-word" aria-hidden="true" key={word}>
                  {word.split('').map((character, characterIndex) => {
                    const index = wordIndex * 7 + characterIndex
                    return (
                      <span
                        className="glitch-char"
                        key={`${character}-${index}`}
                        style={{ animationDelay: `${index * 32}ms` }}
                      >
                        {character}
                      </span>
                    )
                  })}
                </span>
              ))}
            </h1>
            <p className="hero-subtitle">B.Tech Computer Science Student</p>
            <p className="hero-text">
              I build practical projects—from Arduino-based systems to command-line tools—while strengthening my software engineering fundamentals.
            </p>

            <div className="hero-status">
              <span className="status-dot tiny" aria-hidden="true" />
              Exploring software development, embedded systems &amp; AI/ML
            </div>

          </div>

          <div className="terminal-card" aria-label="Prajwal profile overview">
            <div className="terminal-topbar">
              <span className="traffic-light red" aria-hidden="true" />
              <span className="traffic-light yellow" aria-hidden="true" />
              <span className="traffic-light green" aria-hidden="true" />
              <span className="terminal-name">~/about</span>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-row">
                <span className="dashboard-label">FOCUS</span>
                <span className="dashboard-value">Software &amp; systems</span>
              </div>
              <div className="dashboard-row">
                <span className="dashboard-label">EDUCATION</span>
                <span className="dashboard-value">B.Tech CSE</span>
              </div>
              <div className="dashboard-row">
                <span className="dashboard-label">UNIVERSITY</span>
                <a className="university-link dashboard-value" href="https://www.reva.edu.in/" target="_blank" rel="noreferrer">REVA University</a>
              </div>
              <div className="dashboard-row full">
                <span className="dashboard-label">AREAS OF INTEREST</span>
                <div className="dashboard-list">
                  <span>DSA</span>
                  <span>AI / ML</span>
                  <span>Software Development</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section reveal" id="about">
          <div className="section-label">01 / ABOUT</div>
          <div className="about-layout">
            <div className="about-copy">
              <h2>
                I build to understand.
                <span>Then make it useful.</span>
              </h2>
              <p>
                I am a Computer Science undergraduate at <strong><a className="university-link" href="https://www.reva.edu.in/" target="_blank" rel="noreferrer">REVA University</a></strong>, building a strong foundation in programming and software development.
              </p>
              <p>
                My projects include an Arduino smart parking system and a command-line line editor in C. They reflect what I enjoy most: understanding how a system works, then applying that knowledge to solve a practical problem.
              </p>
            </div>

            <div className="terminal-aside">
              <p className="terminal-prompt">
                <span className="prompt">$</span>
                <span className="command">focus_areas</span>
              </p>
              <ul>
                <li>Programming: C, Java, Python</li>
                <li>Building: web and embedded projects</li>
                <li>Practicing: data structures &amp; algorithms</li>
                <li>Exploring: AI / ML and data analysis</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section-shell section reveal" id="skills">
          <div className="section-label">02 / SKILLS</div>
          <div className="section-heading-row">
            <h2>My current toolkit.</h2>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-group">
                <p className="skill-group-title">{group.title}</p>
                <div className="skill-items">
                  {group.items.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="terminal-panel">
            <p className="terminal-prompt">
              <span className="prompt">prajwal@portfolio:~$</span>
              <span className="command">skills --list</span>
            </p>

            <div className="tree-block">
              <p>Programming</p>
              <p>├── C</p>
              <p>├── Java</p>
              <p>└── Python</p>
              <p>Database</p>
              <p>└── SQL</p>
              <p>Tools</p>
              <p>├── Git</p>
              <p>└── GitHub</p>
              <p>Currently Learning</p>
              <p>├── DSA</p>
              <p>├── AI / ML</p>
              <p>└── Data Analysis</p>
            </div>
          </div>
        </section>

        <section className="section-shell section reveal" id="projects">
          <div className="section-label">03 / PROJECTS</div>
          <div className="section-heading-row">
            <h2>
              Things I&apos;ve built
              <span>while learning.</span>
            </h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-topline">
                  <span className="project-number">{project.number}</span>
                  <span className="project-pill">BUILD</span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="technology-row">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      View <span aria-hidden="true">→</span>
                    </a>
                  ) : null}
                  <button type="button" className="project-details-trigger" onClick={() => setSelectedProject(project)}>
                    Details <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell section reveal" id="activity">
          <div className="section-label">04 / ACTIVITY</div>
          <div className="section-heading-row">
            <h2>Building in public.</h2>
          </div>

          <div className="activity-grid">
            <div className="activity-card profile-card">
              <div className="mini-label">FOCUS</div>
              <h3>Shipping progress.</h3>
              <p>Learning, experimenting and building practical projects through code, systems and problem solving.</p>
            </div>

            <div className="activity-card stats-card">
              <div className="mini-label">STATUS</div>
              <div className="stat-line">
                <span>Code</span>
                <strong>Active</strong>
              </div>
              <div className="stat-line">
                <span>Focus</span>
                <strong>Learning</strong>
              </div>
              <div className="stat-line">
                <span>Work</span>
                <strong>Projects</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section reveal" id="learning">
          <div className="section-label">05 / CURRENTLY BUILDING</div>
          <div className="section-heading-row">
            <h2>Still building.</h2>
          </div>

          <div className="learning-grid">
            {learningTracks.map((track) => (
              <article key={track.title} className="learning-card">
                <span className="learning-tag">LEARNING</span>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell section reveal" id="education">
          <div className="section-label">06 / JOURNEY</div>
          <div className="section-heading-row">
            <h2>How I&apos;m building.</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-year">CURRENT</span>
              <div className="timeline-content">
                <h3>B.Tech</h3>
                <p>Computer Science Engineering</p>
                <p className="timeline-school"><a className="university-link" href="https://www.reva.edu.in/" target="_blank" rel="noreferrer">REVA University</a></p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">FOCUS</span>
              <div className="timeline-content">
                <h3>Programming &amp; systems</h3>
                <p>Building a strong foundation in problem-solving, software development, DSA and practical projects.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section reveal" id="profiles">
          <div className="section-label">PROFILE</div>
          <div className="profile-panel">
            {profileLinks.map((link) => (
              <a key={link.label} className="profile-item" href={link.href} target="_blank" rel="noreferrer">
                <span className="profile-label">{link.label}</span>
                <span className="profile-value">{link.value}</span>
                <span className="profile-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="section-shell section reveal" id="contact">
          <div className="section-label">07 / CONTACT</div>
          <div className="section-heading-row compact">
            <h2>Let&apos;s build something.</h2>
          </div>

          <div className="contact-layout">
            <div className="contact-meta">
              <p className="contact-copy">
                Have an idea, a project in mind, or just want to connect? I&apos;d love to
                hear about it.
              </p>
              <div className="mini-links">
                <a className="contact-email" href="mailto:prajwaltotad2006@gmail.com">
                  <span className="contact-email-text">prajwaltotad2006@gmail.com</span>
                  <span className="contact-email-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <form
              className="contact-form"
              action="https://formsubmit.co/prajwaltotad2006@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New portfolio contact message" />
              <input type="hidden" name="_captcha" value="false" />

              <label htmlFor="name">NAME</label>
              <input id="name" name="name" type="text" required />

              <label htmlFor="email">EMAIL</label>
              <input id="email" name="email" type="email" required />

              <label htmlFor="message">MESSAGE</label>
              <textarea id="message" name="message" rows={5} required />

              <button type="submit" className="contact-button" aria-label="Send message">
                <span className="contact-button-text">SEND</span>
                <span className="contact-button-icon" aria-hidden="true">
                  🚀
                </span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-terminal">
            <p className="terminal-prompt compact">
              <span className="prompt">prajwal@portfolio:~$</span>
              <span className="command">exit</span>
            </p>
            <p className="footer-message">Thanks for visiting.</p>
          </div>

          <div className="footer-meta">
            <div className="footer-links">
              <a href="mailto:prajwaltotad2006@gmail.com">Email</a>
            </div>
            <p>© 2026 Prajwal Totad</p>
            <a href="#home" className="back-to-top">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {selectedProject ? (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details">
              ×
            </button>

            <div className="modal-header">
              <span className="project-number">PROJECT / {selectedProject.number}</span>
              <span className="project-pill">CASE STUDY</span>
            </div>

            <h3>{selectedProject.title}</h3>
            <p className="modal-description">{selectedProject.description}</p>

            <div className="modal-section">
              <span className="modal-label">ARCHITECTURE</span>
              <p>{selectedProject.details.architecture}</p>
            </div>

            <div className="modal-section">
              <span className="modal-label">TECH STACK</span>
              <div className="technology-row">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <span className="modal-label">WHAT I LEARNED</span>
              <p>{selectedProject.details.learned}</p>
            </div>

          </div>
        </div>
      ) : null}

      {isCommandPaletteOpen ? (
        <div className="palette-overlay" onClick={() => setIsCommandPaletteOpen(false)}>
          <div className="command-palette" onClick={(event) => event.stopPropagation()}>
            <div className="palette-input-row">
              <span className="palette-icon">⌕</span>
              <input
                type="text"
                value={paletteQuery}
                onChange={(event) => setPaletteQuery(event.target.value)}
                placeholder="Search portfolio..."
                aria-label="Search portfolio"
                autoFocus
              />
            </div>

            <div className="palette-results">
              {filteredCommands.map((command) => (
                <a key={command.label} href={command.href} onClick={() => setIsCommandPaletteOpen(false)} className="palette-item">
                  <span>{command.label}</span>
                  <span className="palette-shortcut">{command.shortcut}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
