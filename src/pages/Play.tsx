
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GameCard, Loading, usePageTitle } from '../components';
import type { Game } from '../types';
import { useData } from '../contexts/DataContext';
import { PAGINATION, SORTS } from '../constants';
import { sortGames } from '../utils';

const Play = () => {
  usePageTitle();
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

  const loadMoreGames = useCallback(() => {
    const currentLength = visibleGames.length;
    const nextGames = games.slice(currentLength, currentLength + PAGINATION.gamesPerLoad);

    if (nextGames.length > 0) {
      setVisibleGames(prev => [...prev, ...nextGames]);
      setHasMore(currentLength + nextGames.length < games.length);
    } else {
      setHasMore(false);
    }
  }, [games, visibleGames.length]);

  useEffect(() => {
    if (!loading && contextGames.length > 0) {
      let filteredGames = currentCategory === -1 ? contextGames : contextGames.filter(game => game.category === currentCategory);

      // Hide games without rating in popular category
      if (currentSortName === 'popular') {
        filteredGames = filteredGames.filter(game => game.rating > 0);
      }

      const sortedGames = sortGames(filteredGames, currentSort, RECENT_DAYS);

      setGames(sortedGames);
      setVisibleGames(sortedGames.slice(0, PAGINATION.gamesPerLoad));
      setHasMore(sortedGames.length > PAGINATION.gamesPerLoad);

      // Reset scroll position when sort/filter changes to prevent loading wrong games
      window.scrollTo(0, 0);
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
  }, [hasMore, loadMoreGames]);

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
            <Link to={sort.path === 'popular' ? (currentCategoryName === 'all' ? '/play' : `/play/${currentCategoryName}`) : `/play/${currentCategoryName}/${sort.path}`}>{sort.label}</Link>
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
