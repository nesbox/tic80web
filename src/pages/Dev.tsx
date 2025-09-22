
import { useState, useEffect } from 'react';
import { GameCard, Loading, AvatarCanvas } from '../components';
import type { Game, User } from '../types';
import { useData } from '../contexts/DataContext';
import { PAGINATION } from '../constants';

const Dev = () => {
  const { users, games, loading } = useData();
  const [userGamesMap, setUserGamesMap] = useState<Record<number, Game[]>>({});
  const [usersWithGames, setUsersWithGames] = useState<User[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!loading && users.length > 0 && games.length > 0) {
      const map: Record<number, Game[]> = {};
      users.forEach(user => {
        map[user.id] = games.filter(game => game.user === user.id);
      });
      setUserGamesMap(map);

      const ratings: Record<number, number> = {};
      const currentTime = Date.now() / 1000; // current time in seconds
      const oneYear = 365 * 24 * 3600; // seconds in a year
      const minRating = 3;
      users.forEach(user => {
        const userGames = map[user.id];
        const totalRating = userGames.reduce((sum, game) => sum + (game.rating > minRating ? game.rating : 0), 0);
        const weightedRating = totalRating * 2;
        const activityBonus = userGames.filter(game => game.rating > minRating).reduce((sum, game) => {
          const recencyFactor = Math.max(0.1, 1 - (currentTime - game.updated) / oneYear);
          return sum + 3 * recencyFactor;
        }, 0);
        ratings[user.id] = Math.round(weightedRating + activityBonus);
      });

      const usersWithGamesList = users.filter(user => map[user.id].length > 0).sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));
      setUsersWithGames(usersWithGamesList);

      setVisibleUsers(usersWithGamesList.slice(0, PAGINATION.usersPerLoad));
      setHasMore(usersWithGamesList.length > PAGINATION.usersPerLoad);
    }
  }, [users, games, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Load more when user is within 200px of the bottom
      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMoreUsers();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, visibleUsers.length]);

  const loadMoreUsers = () => {
    const currentLength = visibleUsers.length;
    const nextUsers = usersWithGames.slice(currentLength, currentLength + PAGINATION.usersPerLoad);

    if (nextUsers.length > 0) {
      setVisibleUsers(prev => [...prev, ...nextUsers]);
      setHasMore(currentLength + nextUsers.length < usersWithGames.length);
    } else {
      setHasMore(false);
    }
  };

  const getUserGames = (userId: number) => {
    return (userGamesMap[userId] || []).slice(0, 3);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h2>Developers</h2>

      <hr/>

      {visibleUsers.map((user, index) => {
        return (
          <div key={user.id}>
            <div className="row mb-4">
              <div className="col-md-3">
                <h2>{index + 1}. {user.name}</h2>
              <p>
                <a href={`/dev/${user.name.toLowerCase()}`}>
                  <AvatarCanvas user={user} />
                </a>
              </p>
            </div>

            {getUserGames(user.id).map((game) => <GameCard key={game.id} game={game} userName={user.name.toLowerCase()} className="col-md-3" />)}
          </div>
          {index < visibleUsers.length - 1 && <hr/>}
        </div>
        );
      })}
    </>
  );
};

export default Dev;
