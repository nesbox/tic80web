import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Loading, Player } from '../components';

const GameDev = () => {
  const { user: userParam, game: gameParam } = useParams<{ user: string; game: string }>();
  const { games, users, usersMap, loading } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const user = users.find(u => u.name.toLowerCase() === userParam?.toLowerCase());
  const game = games.find(g => g.name === gameParam && g.user === user?.id);

  if (!user || !game) {
    return <div>Game not found</div>;
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toISOString().slice(0, 16).replace('T', ' ');
  };

  const addedDate = formatDate(game.added);
  const updatedDate = formatDate(game.updated);

  const formatGameText = (text: string) => {
    // Replace URLs with <a> tags first
    let formatted = text.replace(/(https?:\/\/[^)\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    // Then replace line breaks with <br>
    formatted = formatted.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
    return formatted;
  };

  return (
    <div>
      <div>
        <h1>
          <Link to="/play">Games</Link> <span className="text-muted">{'>'}</span> {game.title}
        </h1>
        <hr />
        <div>{game.desc || 'No description available'}</div>
        <div>made by {game.author}</div>
        <div>
          <span className="text-muted">uploaded by </span>
          <Link to={`/dev/${usersMap[user.id]}`}>{user.name}</Link>
        </div>
        <div className="text-muted">
          added: <span className="date">{addedDate}</span>
        </div>
        <div className="text-muted">
          updated: <span className="date">{updatedDate}</span>
        </div>
        <div>
          <a href={`/dev/${usersMap[user.id]}/${game.name}/${game.name}.tic`}>download cartridge</a>
        </div>
        <Player
          coverImage={`https://tic80.com/cart/${game.hash}/cover.gif`}
          showCoverImage={true}
          cart={`/dev/${usersMap[user.id]}/${game.name}/${game.name}.tic`}
        />
        <div id="add-modal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Select a file to add to the computer</p>
            <p>
              <input type="file" id="upload-input" />
            </p>
          </div>
        </div>
        <p>
          <img id="rating-icon" width="32" height="32" src="/img/love.png" />
          <span id="rating-label"> {game.rating}</span>
        </p>
      </div>
      {game.text && <hr />}
      <div dangerouslySetInnerHTML={{ __html: formatGameText(game.text) }} />
    </div>
  );
};

export default GameDev;
