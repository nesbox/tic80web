import { useParams } from 'react-router-dom';

const GameDev = () => {
  const { user, game } = useParams<{ user: string; game: string }>();

  return (
    <div>
      <h1>Dev page for {user}/{game}</h1>
      <p>This is a placeholder for the game development page.</p>
    </div>
  );
};

export default GameDev;
