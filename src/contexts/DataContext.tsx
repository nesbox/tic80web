import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Game, User } from '../types';

interface DataContextType {
  games: Game[];
  users: User[];
  usersMap: Record<number, string>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [usersMap, setUsersMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [gamesModule, usersModule] = await Promise.all([
          import('../data/games.json'),
          import('../data/users.json')
        ]);

        const gamesData = gamesModule.default;
        const usersData = usersModule.default;

        setGames(gamesData);
        setUsers(usersData);

        const map = usersData.reduce((acc: Record<number, string>, user: User) => {
          acc[user.id] = user.name.toLowerCase();
          return acc;
        }, {});
        setUsersMap(map);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ games, users, usersMap, loading }}>
      {children}
    </DataContext.Provider>
  );
};
