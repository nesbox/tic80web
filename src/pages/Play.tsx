
import { useState, useEffect } from 'react';
import { GameCard } from '../components';
import type { Game } from '../components';

const GAMES_PER_LOAD = 9;

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
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Play;
