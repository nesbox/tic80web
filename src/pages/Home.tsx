import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <img src="/img/logo64.png" alt="TIC-80" className="hero-logo" />
            <h1>TIC-80 tiny computer v1.1.2837</h1>
            <div className="demo-section">
              <img src="/img/demo.gif" alt="TIC-80 Demo" className="demo-gif" />
            </div>
            <p className="hero-description">
              TIC-80 is a free and open source fantasy computer for making, playing and sharing tiny games.
            </p>
            <p className="hero-details">
              There are built-in tools for development: code, sprites, maps, sound editors and the command line, 
              which is enough to create a mini retro game. At the exit you will get a cartridge file, which can 
              be stored and played on the website.
            </p>
            <p className="hero-details">
              Also, the game can be packed into a player that works on all popular platforms and distribute as 
              you wish. To make a retro styled game the whole process of creation takes place under some technical 
              limitations: 240x136 pixels display, 16 color palette, 256 8x8 color sprites, 4 channel sound and etc.
            </p>
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="container">
          <h3>You can support the development on the Github Sponsors page.</h3>
        </div>
      </section>

      <section className="featured-games">
        <div className="container">
          <h2>*** NEW & POPULAR CARTS ***</h2>
          <div className="games-grid">
            <div className="game-card">
              <img src="/cart/a420e94501eddba1a89d4970a0780c95/cover.gif" alt="Retro Gunner" className="game-cover" />
              <div className="game-info">
                <h3>RETRO GUNNER (BETA VERSION)</h3>
                <p>Shoot'em up.</p>
                <p className="game-author">by ZAP</p>
                <div className="game-stats">
                  <span className="love">❤️ 4</span>
                  <span className="comments">💬 2</span>
                </div>
              </div>
            </div>

            <div className="game-card">
              <img src="/cart/e0d56c053f8121322d461f3e28e39824/cover.gif" alt="Farmer Lovhunt" className="game-cover" />
              <div className="game-info">
                <h3>FARMER LOVHUNT</h3>
                <p>Stealth farming game made for LD41</p>
                <p className="game-author">by @librorumque</p>
                <div className="game-stats">
                  <span className="love">❤️ 3</span>
                </div>
              </div>
            </div>

            <div className="game-card">
              <img src="/cart/6b089610ffd35766522cbd3990c66f44/cover.gif" alt="Orbit Defender" className="game-cover" />
              <div className="game-info">
                <h3>ORBIT DEFENDER</h3>
                <p>Protect the orbit from invanders</p>
                <p className="game-author">by Glitchmancer</p>
                <div className="game-stats">
                  <span className="love">❤️ 3</span>
                  <span className="comments">💬 2</span>
                </div>
              </div>
            </div>

            <div className="game-card">
              <img src="/cart/fc9aecfbd7bb3dce0ad092b52144315d/cover.gif" alt="A Story for the Night" className="game-cover" />
              <div className="game-info">
                <h3>A STORY FOR THE NIGHT</h3>
                <p>topdown adventure story</p>
                <p className="game-author">by Olivier Sted</p>
                <div className="game-stats">
                  <span className="love">❤️ 3</span>
                </div>
              </div>
            </div>

            <div className="game-card">
              <img src="/cart/e1fc3f6773fab4a49464881498a32c03/cover.gif" alt="Vuk Karadzic" className="game-cover" />
              <div className="game-info">
                <h3>VUK KARADZIC</h3>
                <p>historical platformer</p>
                <p className="game-author">by Bananaft</p>
                <div className="game-stats">
                  <span className="love">❤️ 3</span>
                  <span className="comments">💬 1</span>
                </div>
              </div>
            </div>

            <div className="game-card">
              <img src="/cart/a9849114f84e295aef001085ebdc902e/cover.gif" alt="Blob" className="game-cover" />
              <div className="game-info">
                <h3>BLOB</h3>
                <p>Cool lil' blob.</p>
                <p className="game-author">by Sava</p>
                <div className="game-stats">
                  <span className="love">❤️ 2</span>
                </div>
              </div>
            </div>
          </div>
          <div className="view-all">
            <a href="/games" className="view-all-link">VIEW ALL...</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
