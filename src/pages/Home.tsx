import { APP_CONFIG, IMAGES } from '../constants';

const Home = () => {
  return (
    <main>
      <header className="text-center">
        <img 
          src={IMAGES.logo}
          alt={`${APP_CONFIG.name} Logo`}
          width="64" 
          height="64"
        />
        <h1>
          {APP_CONFIG.name} tiny computer{' '}
          <span className="text-muted">{APP_CONFIG.version}</span>
        </h1>   
      </header>

      <hr/>

      <section className="row">
        <div className="col-md-8 offset-md-2">
          <img 
            width="100%" 
            src={IMAGES.demo}
            alt={`${APP_CONFIG.name} Demo Animation showing game development interface`}
          />
        </div>
      </section>

      <section>
        <p>
          {APP_CONFIG.name} is a free and open source <em>fantasy computer</em> for making, playing and sharing tiny games.
        </p>
        <p>
          There are built-in tools for development: code, sprites, maps, sound editors and the command line, which is enough to create a mini retro game. At the exit you will get a cartridge file, which can be stored and played on the website.
        </p>
        <p>
          Also, the game can be packed into a player that works on all popular platforms and distribute as you wish. To make a retro styled game the whole process of creation takes place under some technical limitations: 240x136 pixels display, 16 color palette, 256 8x8 color sprites, 4 channel sound and etc.
        </p>
      </section>
    </main>
  );
};

export default Home;
