
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GameCard, Loading } from '../components';
import type { Game } from '../types';
import { useData } from '../contexts/DataContext';
import { PAGINATION, SORTS } from '../constants';

const Play = () => {
  const { games: contextGames, categories, usersMap, loading } = useData();
  const { categoryName, sortName } = useParams<{ categoryName: string; sortName: string }>();
  const currentCategoryName = categoryName || 'all';
  const currentSortName = sortName || 'popular';
  const currentCategoryData = categories.find(cat => cat.name.toLowerCase() === currentCategoryName);
  const currentCategory = currentCategoryData ? currentCategoryData.id : 0;
  const currentSortData = SORTS.find(s => s.path === currentSortName);
  const currentSort = currentSortData ? currentSortData.id : 0;
  const [games, setGames] = useState<Game[]>([]);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const RECENT_DAYS = 90;

  const formatTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
      }
      return part;
    });
  };

  const sortGames = (games: Game[], sortId: number) => {
    switch (sortId) {
      case 1: // most recent
        return [...games].sort((a, b) => b.updated - a.updated);
      case 2: // top rated
        return [...games].sort((a, b) => b.rating - a.rating);
      default:
        return games;
    }
  };

  useEffect(() => {
    if (!loading && contextGames.length > 0) {
      let filteredGames = currentCategory === -1 ? contextGames : contextGames.filter(game => game.category === currentCategory);
      let sortedGames: Game[];

      if (currentSort === 0) {
        // Popular: recent games sorted by rating, expand time window until we have games
        let days = RECENT_DAYS;
        let recentGames = [];
        let attempts = 0;
        const maxAttempts = 10; // Prevent infinite loop

        do {
          const recentTimestamp = Date.now() - (days * 24 * 60 * 60 * 1000);
          recentGames = filteredGames.filter(game => game.updated > recentTimestamp);
          days += RECENT_DAYS;
          attempts++;
        } while (recentGames.length === 0 && attempts < maxAttempts);

        sortedGames = [...recentGames].sort((a, b) => b.rating !== a.rating ? b.rating - a.rating : b.updated - a.updated);
      } else {
        sortedGames = sortGames(filteredGames, currentSort);
      }

      setGames(sortedGames);
      setVisibleGames(sortedGames.slice(0, PAGINATION.gamesPerLoad));
      setHasMore(sortedGames.length > PAGINATION.gamesPerLoad);
    }
  }, [contextGames, loading, currentCategory, currentSort]);

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
    <div>
      <ul className="nav nav-pills">
        {categories.map((category) => (
          <li key={category.id} role="presentation" className={category.id === currentCategory ? 'active' : ''}>
            <Link to={currentSortName === 'popular' ? (category.name.toLowerCase() == 'all' ? `/play` : `/play/${category.name.toLowerCase()}`) : `/play/${category.name.toLowerCase()}/${currentSortName}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      {currentCategoryData && (
        <p className="text-muted category-description">{formatTextWithLinks(currentCategoryData.info)}</p>
      )}
      <hr/>
      <ul className="nav nav-pills nav-small">
        {SORTS.map((sort) => (
          <li key={sort.id} role="presentation" className={sort.id === currentSort ? 'active' : ''}>
            <Link to={sort.path === 'popular' ? (currentCategoryName === 'all' ? '/play' : `/play/${currentCategoryName}`) : `/play/${currentCategoryName}/${sort.path}`}>{sort.name}</Link>
          </li>
        ))}
      </ul>

      <div className="row">
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} userName={usersMap[game.user] || ''} />
        ))}
      </div>
    </div>
  );
};

export default Play;
