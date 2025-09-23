import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GameCard, Loading, UserAvatar } from '../components';
import type { Game, User } from '../types';
import { useData } from '../contexts/DataContext';
import { PAGINATION } from '../constants';


const UserDev = () => {
  const { user } = useParams<{ user: string }>();
  const { users, games, loading } = useData();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const foundUser = users.find(u => u.name.toLowerCase() === user.toLowerCase());
      if (foundUser) {
        setCurrentUser(foundUser);
        const gamesByUser = games.filter(game => game.user === foundUser.id);
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
  }, [hasMore, visibleGames.length]);

  const loadMoreGames = () => {
    const currentLength = visibleGames.length;
    const nextGames = userGames.slice(currentLength, currentLength + PAGINATION.gamesPerLoad);

    if (nextGames.length > 0) {
      setVisibleGames(prev => [...prev, ...nextGames]);
      setHasMore(currentLength + nextGames.length < userGames.length);
    } else {
      setHasMore(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>Developer: {currentUser.name}</h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <UserAvatar user={currentUser} />
        </div>
        <div className="col-md-9">
          <h3>{currentUser.name}</h3>
          <p>Joined: {new Date(currentUser.date).toLocaleDateString()}</p>
        </div>
      </div>
      <h3>Games by {currentUser.name}</h3>
      <div className="row">
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} userName={currentUser.name.toLowerCase()} />
        ))}
      </div>
    </div>
  );
};

export default UserDev;
