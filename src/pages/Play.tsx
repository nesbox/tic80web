
import { useState, useEffect } from 'react';
import { GameCard, Loading } from '../components';
import type { Game } from '../types';
import { useData } from '../contexts/DataContext';
import { PAGINATION } from '../constants';

const Play = () => {
  const { games: contextGames, usersMap, loading } = useData();
  const [games, setGames] = useState<Game[]>([]);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!loading && contextGames.length > 0) {
      setGames(contextGames);
      setVisibleGames(contextGames.slice(0, PAGINATION.gamesPerLoad));
      setHasMore(contextGames.length > PAGINATION.gamesPerLoad);
    }
  }, [contextGames, loading]);

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
    const nextGames = games.slice(currentLength, currentLength + PAGINATION.gamesPerLoad);

    if (nextGames.length > 0) {
      setVisibleGames(prev => [...prev, ...nextGames]);
      setHasMore(currentLength + nextGames.length < games.length);
    } else {
      setHasMore(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="row">
      {visibleGames.map((game) => (
        <GameCard key={game.id} game={game} userName={usersMap[game.user] || ''} />
      ))}
    </div>
  );
};

export default Play;
