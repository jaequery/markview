const capabilities = [
  { title: "Product engineering", text: "I take an idea from a rough brief to software people can use. I work across the stack and stay close to the people on the other side of the screen." },
  { title: "Backend & systems", text: "I build APIs, data models, and background jobs that hold up under load. I like boring infrastructure, useful logs, and knowing why something broke." },
  { title: "Developer experience", text: "I make the path from a fresh checkout to production shorter. That means clear tooling, fast feedback, and documentation someone will actually read." },
  { title: "Technical direction", text: "I help small teams decide what to build and what to leave out. I write down the trade-offs, ship a small version, and let real usage inform the next one." },
];
const projects = [
  { name: "Relay", role: "Founding engineer", text: "A shared inbox for small support teams. Built the product from first commit to launch in 12 weeks; routing and saved replies reduced weekly ticket handling time by 32% in the pilot.", stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"] },
  { name: "Trace", role: "Backend lead", text: "An event pipeline that makes application activity searchable. Reworked ingestion and indexing to bring p95 query latency from 1.8 seconds to 140 milliseconds across 20 million events.", stack: ["Go", "ClickHouse", "Kafka", "Docker"] },
  { name: "Shipyard", role: "Solo developer", text: "A release dashboard for teams with too many tabs open. Connected pull requests, deployments, and release notes in one view, cutting the weekly release checklist from 45 minutes to 8.", stack: ["React", "Node.js", "SQLite", "GitHub API"] },
];
function SectionHeading({ id, children, index }: { id: string; children: React.ReactNode; index: string }) {
  return <div className="section-heading"><h2 id={id}><span className="comment" aria-hidden="true">{"// "}</span>{children}</h2><span className="section-index" aria-hidden="true">{index}</span></div>;
}
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page-shell">
        <nav className="topbar" aria-label="Main navigation">
          <a className="wordmark" href="#home" aria-label="Alex Morgan, home">am<span aria-hidden="true">.</span></a>
          <div className="nav-links"><a href="#work">work</a><a href="#about">about</a><a href="#contact">contact <span aria-hidden="true">↗</span></a></div>
        </nav>
        <main id="main" tabIndex={-1}>
          <header className="hero" id="home">
            <p className="prompt"><span>alex@portfolio</span><span className="prompt-path">:~</span> <span aria-hidden="true">$</span> <span className="command">cat about.md</span></p>
            <h1>I’m Alex.<br />I build <span>useful software.</span></h1>
            <p className="lead">Software engineer. Systems thinker. I turn complicated problems into simple, dependable products — and care about the details that make them good to use.</p>
            <dl className="facts">
              <div><dt>location</dt><dd>Brooklyn, NY <span className="muted">/ UTC−5 · UTC−4</span></dd></div>
              <div><dt>status</dt><dd className="availability"><span className="status-dot" aria-hidden="true" />Open to thoughtful projects</dd></div>
              <div><dt>stack</dt><dd>TypeScript · React · Node.js · Go</dd></div>
              <div><dt>email</dt><dd><a href="mailto:alex@example.com">alex@example.com <span aria-hidden="true">↗</span></a></dd></div>
            </dl>
          </header>
          <section aria-labelledby="what-i-do">
            <SectionHeading id="what-i-do" index="01">What I do</SectionHeading>
            <div className="capability-grid">{capabilities.map(item => <article className="panel capability" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </section>
          <section aria-labelledby="work">
            <SectionHeading id="work" index="02">Selected work</SectionHeading>
            <div className="project-list">{projects.map(item => <article className="panel project" key={item.name}><div className="project-heading"><h3>{item.name}</h3><span className="role">{item.role}</span></div><p>{item.text}</p><ul className="chips" aria-label={`${item.name} technology stack`}>{item.stack.map(tech => <li key={tech}>{tech}</li>)}</ul></article>)}</div>
          </section>
          <section className="about" aria-labelledby="about">
            <SectionHeading id="about" index="03">A little about me</SectionHeading>
            <p>I like being close to the whole problem: the person using the product, the code behind it, and the decision that connected the two. Small teams and a clear reason to build something are where I do my best work.</p>
            <p>My default is to make it work, make it understandable, then make it faster if it needs to be. I’d rather leave behind a short document and a system someone can reason about than a clever solution only I can maintain.</p>
            <p>Away from the keyboard, I’m usually walking without a destination, finding a new place for coffee, or reading a book slower than I’d like to admit. A little distance tends to make the next problem easier.</p>
          </section>
          <section className="contact" aria-labelledby="contact">
            <SectionHeading id="contact" index="04">Let’s talk</SectionHeading>
            <p>I’m open to focused consulting work and the right full-time team.</p>
            <a className="contact-button" href="mailto:alex@example.com">alex@example.com <span aria-hidden="true">↗</span></a>
            <p className="fine-print">A little context goes a long way. Tell me what you’re working on.</p>
          </section>
        </main>
        <footer><span>© {new Date().getFullYear()} Alex Morgan</span><span>Built with care. Kept simple.</span></footer>
      </div>
    </>
  );
}
