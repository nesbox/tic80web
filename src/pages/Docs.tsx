import './Docs.css';

const Docs = () => {
  const docSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        'Installation',
        'First Steps',
        'Interface Overview',
        'Creating Your First Game'
      ]
    },
    {
      id: 'programming',
      title: 'Programming',
      items: [
        'Lua Basics',
        'TIC-80 API Reference',
        'Game Loop',
        'Input Handling',
        'Graphics Functions',
        'Sound Functions'
      ]
    },
    {
      id: 'graphics',
      title: 'Graphics & Sprites',
      items: [
        'Sprite Editor',
        'Color Palette',
        'Animation Techniques',
        'Map Editor',
        'Drawing Functions'
      ]
    },
    {
      id: 'audio',
      title: 'Audio & Music',
      items: [
        'Sound Editor',
        'Music Tracker',
        'SFX Creation',
        'Audio Programming'
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      items: [
        'Cartridge Format',
        'Memory Layout',
        'Performance Tips',
        'Debugging',
        'Export Options'
      ]
    }
  ];

  const quickReference = [
    { func: 'print(text, x, y, color)', desc: 'Print text on screen' },
    { func: 'spr(id, x, y, colorkey, scale, flip, rotate, w, h)', desc: 'Draw sprite' },
    { func: 'map(x, y, w, h, sx, sy, colorkey, scale)', desc: 'Draw map region' },
    { func: 'rect(x, y, w, h, color)', desc: 'Draw rectangle' },
    { func: 'rectfill(x, y, w, h, color)', desc: 'Draw filled rectangle' },
    { func: 'circ(x, y, r, color)', desc: 'Draw circle' },
    { func: 'circfill(x, y, r, color)', desc: 'Draw filled circle' },
    { func: 'line(x0, y0, x1, y1, color)', desc: 'Draw line' },
    { func: 'pix(x, y, color)', desc: 'Draw pixel' },
    { func: 'btn(id)', desc: 'Get button state' },
    { func: 'btnp(id, hold, period)', desc: 'Get button press' },
    { func: 'sfx(id, note, duration, channel, volume, speed)', desc: 'Play sound effect' },
    { func: 'music(track, frame, row, loop)', desc: 'Play music' }
  ];

  return (
    <div className="docs">
      <div className="container">
        <header className="docs-header">
          <h1>*** TIC-80 DOCUMENTATION ***</h1>
          <p>Learn how to create amazing games with TIC-80</p>
        </header>

        <div className="docs-content">
          <nav className="docs-nav">
            <h3>Documentation</h3>
            {docSections.map(section => (
              <div key={section.id} className="nav-section">
                <h4>{section.title}</h4>
                <ul>
                  {section.items.map((item, index) => (
                    <li key={index}>
                      <a href={`#${section.id}-${index}`}>{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <main className="docs-main">
            <section className="intro-section">
              <h2>Welcome to TIC-80</h2>
              <p>
                TIC-80 is a fantasy computer for making, playing and sharing tiny games. 
                It has built-in tools for development including code, sprites, maps, sound 
                editors and a command line interface.
              </p>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <h3>🎮 Game Development</h3>
                  <p>Create complete games with built-in editors for code, sprites, maps, and sound.</p>
                </div>
                <div className="feature-card">
                  <h3>📱 Cross Platform</h3>
                  <p>Export your games to run on Windows, Mac, Linux, Android, and web browsers.</p>
                </div>
                <div className="feature-card">
                  <h3>🎨 Pixel Perfect</h3>
                  <p>240x136 pixel display with a 16-color palette for authentic retro aesthetics.</p>
                </div>
                <div className="feature-card">
                  <h3>🔧 Open Source</h3>
                  <p>Free and open source software with an active community of developers.</p>
                </div>
              </div>
            </section>

            <section className="getting-started">
              <h2>Getting Started</h2>
              <div className="step-list">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Download TIC-80</h3>
                    <p>Get the latest version from the official website or GitHub releases.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Learn the Interface</h3>
                    <p>Familiarize yourself with the code editor, sprite editor, map editor, and sound tracker.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Write Your First Game</h3>
                    <p>Start with simple examples and gradually build more complex games.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Share Your Creation</h3>
                    <p>Export your game as a cartridge file and share it with the community.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="quick-reference">
              <h2>Quick Reference</h2>
              <div className="reference-grid">
                {quickReference.map((item, index) => (
                  <div key={index} className="reference-item">
                    <code className="function-name">{item.func}</code>
                    <p className="function-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="examples">
              <h2>Code Examples</h2>
              <div className="example-card">
                <h3>Basic Game Loop</h3>
                <pre className="code-block">
{`-- title:  My First Game
-- author: Your Name
-- desc:   A simple example
-- script: lua

function TIC()
  cls(0)
  print("Hello TIC-80!", 84, 64)
end`}
                </pre>
              </div>
              
              <div className="example-card">
                <h3>Moving Sprite</h3>
                <pre className="code-block">
{`x = 96
y = 24

function TIC()
  if btn(0) then y=y-1 end
  if btn(1) then y=y+1 end
  if btn(2) then x=x-1 end
  if btn(3) then x=x+1 end
  
  cls(13)
  spr(1+t%60//30, x, y, 14, 3, 0, 0, 2, 2)
  print("HELLO WORLD!", 84, 84)
  t=t+1
end`}
                </pre>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Docs;
