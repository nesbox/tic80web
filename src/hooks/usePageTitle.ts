import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { usePageTitle as getPageTitle } from '../utils';
import { useData } from '../contexts/DataContext';

export const usePageTitle = () => {
  const location = useLocation();
  const params = useParams();
  const { categories, games, users, usersMap } = useData();

  const title = getPageTitle(location.pathname, params, {
    categories,
    games,
    users,
    usersMap,
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  return title;
};
