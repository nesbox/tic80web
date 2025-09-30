import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GameCard, Loading, UserAvatar, usePageTitle } from '../components';
import type { Game, User } from '../types';
import { useData } from '../contexts/DataContext';
import { PAGINATION } from '../constants';

const UserDev = () => {
  usePageTitle();
  const { user } = useParams<{ user: string }>();
  const { users, games, loading } = useData();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const loadMoreGames = useCallback(() => {
    const currentLength = visibleGames.length;
    const nextGames = userGames.slice(currentLength, currentLength + PAGINATION.gamesPerLoad);

    if (nextGames.length > 0) {
      setVisibleGames(prev => [...prev, ...nextGames]);
      setHasMore(currentLength + nextGames.length < userGames.length);
    } else {
      setHasMore(false);
    }
  }, [visibleGames.length, userGames, PAGINATION.gamesPerLoad]);

  useEffect(() => {
    if (!loading && user) {
      const foundUser = users.find(u => u.name.toLowerCase() === user.toLowerCase());
      if (foundUser) {
        setCurrentUser(foundUser);
        const gamesByUser = games.filter(game => game.user === foundUser.id).sort((a, b) => b.updated - a.updated);
        setUserGames(gamesByUser);
        setVisibleGames(gamesByUser.slice(0, PAGINATION.gamesPerLoad));
        setHasMore(gamesByUser.length > PAGINATION.gamesPerLoad);
      }
    }
  }, [user, users, games, loading]);

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
  }, [hasMore, visibleGames.length, loadMoreGames]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2><Link to="/dev">Devs</Link> <span className="text-muted">&gt;</span> {currentUser.name}</h2>
      <hr/>
      <p>
        <UserAvatar user={currentUser} />
      </p>
      <h4 className="text-muted">Recent games</h4>
      <hr/>
      <div className="row">
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} userName={currentUser.name.toLowerCase()} />
        ))}
      </div>
    </div>
  );
};

export default UserDev;
