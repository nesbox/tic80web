import './Games.css';

const Games = () => {
  const games = [
    {
      id: 1,
      title: "RETRO GUNNER (BETA VERSION)",
      description: "Shoot'em up.",
      author: "ZAP",
      cover: "/cart/a420e94501eddba1a89d4970a0780c95/cover.gif",
      loves: 4,
      comments: 2
    },
    {
      id: 2,
      title: "FARMER LOVHUNT",
      description: "Stealth farming game made for LD41",
      author: "@librorumque",
      cover: "/cart/e0d56c053f8121322d461f3e28e39824/cover.gif",
      loves: 3,
      comments: 0
    },
    {
      id: 3,
      title: "ORBIT DEFENDER",
      description: "Protect the orbit from invanders",
      author: "Glitchmancer",
      cover: "/cart/6b089610ffd35766522cbd3990c66f44/cover.gif",
      loves: 3,
      comments: 2
    },
    {
      id: 4,
      title: "A STORY FOR THE NIGHT",
      description: "topdown adventure story",
      author: "Olivier Sted",
      cover: "/cart/fc9aecfbd7bb3dce0ad092b52144315d/cover.gif",
      loves: 3,
      comments: 0
    },
    {
      id: 5,
      title: "VUK KARADZIC",
      description: "historical platformer",
      author: "Bananaft",
      cover: "/cart/e1fc3f6773fab4a49464881498a32c03/cover.gif",
      loves: 3,
      comments: 1
    },
    {
      id: 6,
      title: "BLOB",
      description: "Cool lil' blob.",
      author: "Sava",
      cover: "/cart/a9849114f84e295aef001085ebdc902e/cover.gif",
      loves: 2,
      comments: 0
    },
    {
      id: 7,
      title: "BEACH RELAXATION",
      description: "Relax at the Beach",
      author: "T7D",
      cover: "/cart/50a2fabfe301c56c7f0e826591c20677/cover.gif",
      loves: 2,
      comments: 2
    },
    {
      id: 8,
      title: "TRASH",
      description: "A trash game",
      author: "Alvario",
      cover: "/cart/28a19362430cd517c6a3d87e9a7ad585/cover.gif",
      loves: 1,
      comments: 2
    },
    {
      id: 9,
      title: "NO INTERNET",
      description: "Google's no internet game",
      author: "Marioio333",
      cover: "/cart/4b0d769158dcf095bfdd62aa88158d1e/cover.gif",
      loves: 1,
      comments: 0
    },
    {
      id: 10,
      title: "CLASSTIC",
      description: "a recreation of when TIC-80 still used the DB-16 palette (pre-0.80)",
      author: "Ricarinium",
      cover: "/cart/bfe917c2c04bf0e014d2080a2c52e59f/cover.gif",
      loves: 1,
      comments: 0
    },
    {
      id: 11,
      title: "PLANET SURVIVOR",
      description: "Survive on an alien planet",
      author: "Beanum",
      cover: "/cart/786461d671f54309fb34da2e58f90333/cover.gif",
      loves: 1,
      comments: 0
    },
    {
      id: 12,
      title: "GEMDIGGER",
      description: "Find the Gems, Avoid the Mines!",
      author: "Olivier Sted",
      cover: "/cart/b2f18ef1b899a021651bb73a9bfe704c/cover.gif",
      loves: 1,
      comments: 0
    }
  ];

  return (
    <div className="games">
      <div className="container">
        <header className="games-header">
          <h1>*** ALL GAMES & CARTS ***</h1>
          <p>Browse and play TIC-80 games created by the community</p>
        </header>

        <div className="filters">
          <div className="filter-group">
            <label>Sort by:</label>
            <select className="filter-select">
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category:</label>
            <select className="filter-select">
              <option value="all">All Categories</option>
              <option value="action">Action</option>
              <option value="puzzle">Puzzle</option>
              <option value="platformer">Platformer</option>
              <option value="shooter">Shooter</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>
        </div>

        <div className="games-grid">
          {games.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-cover-container">
                <img src={game.cover} alt={game.title} className="game-cover" />
                <div className="play-overlay">
                  <button className="play-button">▶ PLAY</button>
                </div>
              </div>
              <div className="game-info">
                <h3>{game.title}</h3>
                <p className="game-description">{game.description}</p>
                <p className="game-author">by {game.author}</p>
                <div className="game-stats">
                  <span className="love">❤️ {game.loves}</span>
                  {game.comments > 0 && <span className="comments">💬 {game.comments}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">...</button>
          <button className="page-btn">10</button>
          <button className="page-btn next">Next →</button>
        </div>
      </div>
    </div>
  );
};

export default Games;
