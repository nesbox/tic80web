import { Link } from 'react-router-dom';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  userName: string;
  className?: string;
}

const GameCard = ({ game, userName, className = "col-md-4" }: GameCardProps) => {
  return (
    <div className={className}>
      <div className="cart">
        <div className="thumbnail">
          <Link to={`/dev/${userName}/${game.name}`}>
            <img className="pixelated" width="100%" src={`https://tic80.com/cart/${game.hash}/cover.gif`} alt={game.title} />
          </Link>
        </div>

        <div>
          <h2>{game.title.toUpperCase()}</h2>
          <div className="text-muted">{game.desc}</div>
          <div className="text-muted">by {game.author}</div>

          {game.rating > 0 && (
            <div>
              <img width="16" height="16" src="/img/love.png" /> <span className="tiny-label">{game.rating} </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
export type { Game };
