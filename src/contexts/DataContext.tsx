import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Game, User, Category, Text } from '../types';

interface DataContextType {
  games: Game[];
  users: User[];
  categories: Category[];
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [usersMap, setUsersMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [gamesModule, usersModule, catsModule, textsModule] = await Promise.all([
          import('../data/games.json'),
          import('../data/users.json'),
          import('../data/cats.json'),
          import('../data/texts.json')
        ]);

        const gamesData = gamesModule.default;
        const usersData = usersModule.default;
        const categoriesData = catsModule.default;
        const textsData: Text[] = textsModule.default;

        // Create texts map for quick lookup
        const textsMap = textsData.reduce((acc: Record<number, string>, text: Text) => {
          acc[text.id] = text.text;
          return acc;
        }, {});

        // Filter games to only include those with existing users and add text field
        const filteredGames = gamesData
          .filter(game => usersData.some(user => user.id === game.user))
          .map(game => ({
            ...game,
            text: textsMap[game.id] || ''
          }));

        setGames(filteredGames);
        setUsers(usersData);
        setCategories([{ id: -1, name: 'All', info: 'All carts.' }, ...categoriesData]);

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
    <DataContext.Provider value={{ games, users, categories, usersMap, loading }}>
      {children}
    </DataContext.Provider>
  );
};
