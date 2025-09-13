
const Home = () => {
  return (
    <>
      <div className="text-center">
        <img src="img/logo64.png"/>
        <h1>TIC-80 tiny computer <span className="text-muted">v1.1.2837</span></h1>   
      </div>

      <hr/>

      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <img width="100%" src="img/demo.gif"/>
        </div>
      </div>

      <p>
        TIC-80 is a free and open source <u>fantasy computer</u> for making, playing and sharing tiny games.
      </p>
      <p>
        There are built-in tools for development: code, sprites, maps, sound editors and the command line, which is enough to create a mini retro game. At the exit you will get a cartridge file, which can be stored and played on the website.
      </p>

      <p>
        Also, the game can be packed into a player that works on all popular platforms and distribute as you wish. To make a retro styled game the whole process of creation takes place under some technical limitations: 240x136 pixels display, 16 color palette, 256 8x8 color sprites, 4 channel sound and etc.
      </p>

    </>
  );
};

export default Home;
