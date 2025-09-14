
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GAMES_PER_LOAD = 9;

interface Game {
  id: number;
  hash: string;
  title: string;
  name: string;
  author: string;
  desc: string | null;
  user: number;
  text: string;
  added: number;
  updated: number;
  category: number;
  rating: number;
}

const Play = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    // Dynamically import games data to enable code splitting
    import('../data/games.json').then((module) => {
      const gamesData = module.default;
      setGames(gamesData);
      setVisibleGames(gamesData.slice(0, GAMES_PER_LOAD));
      setHasMore(gamesData.length > GAMES_PER_LOAD);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Load more when user is within 200px of the bottom
      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMoreGames();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, visibleGames.length]);

  const loadMoreGames = () => {
    const currentLength = visibleGames.length;
    const nextGames = games.slice(currentLength, currentLength + GAMES_PER_LOAD);

    if (nextGames.length > 0) {
      setVisibleGames(prev => [...prev, ...nextGames]);
      setHasMore(currentLength + nextGames.length < games.length);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="row">
      {visibleGames.map((game) => (
        <div className="col-md-4" key={game.id}>
          <div className="cart">
            <div className="thumbnail">
              <Link to={`/play?cart=${game.id}`}>
                <img className="pixelated" width="100%" src={`https://tic80.com/cart/${game.hash}/cover.gif`} alt={game.title} />
              </Link>
            </div>

            <div>
              <h2>{game.title.toUpperCase()}</h2>
              <div className="text-muted">{game.desc}</div>
              <div className="text-muted">by {game.author}</div>

              <div>
                <img width="16" height="16" src="img/love.png" /> <span className="tiny-label">{game.rating} </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Play;
