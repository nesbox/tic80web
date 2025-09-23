import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Loading } from '../components';

const gameBorderStyle: React.CSSProperties = {
  width: '100%',
  overflow: 'hidden'
};

const gameCoverStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: '#1a1c2c',
  cursor: 'pointer',
  textAlign: 'center',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const coverImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  opacity: 0.2
};

const clickToPlayStyle: React.CSSProperties = {
  fontSize: '34px',
  position: 'absolute'
};

const canvasStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  imageRendering: 'pixelated',
  display: 'none'
};

const GameDev = () => {
  const { user: userParam, game: gameParam } = useParams<{ user: string; game: string }>();
  const { games, users, loading } = useData();

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
  const uploadedDate = formatDate(game.updated);

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
          <a href="/play">Games</a> <span className="text-muted">{'>'}</span> {game.title}
        </h1>
        <hr />
        <div>{game.desc || 'No description available'}</div>
        <div>made by {game.author}</div>
        <div>
          <span className="text-muted">uploaded by </span>
          <a href={`/dev/${user.name.toLowerCase()}`}>{user.name}</a>
        </div>
        <div className="text-muted">
          added: <span className="date">{addedDate}</span>
        </div>
        <div className="text-muted">
          uploaded: <span className="date">{uploadedDate}</span>
        </div>
        <div>
          <a href={`https://tic80.com/cart/${game.hash}/${game.name}.tic`}>download cartridge</a>
        </div>
        <div style={gameBorderStyle} id="game-border">
          <div style={gameCoverStyle} id="game-cover">
            <div style={coverImageStyle}>
              <img
                width="100%"
                height="100%"
                className="pixelated"
                src={`https://tic80.com/cart/${game.hash}/cover.gif`}
              />
            </div>
            <div style={clickToPlayStyle}>- CLICK TO PLAY -</div>
          </div>
          <canvas
            style={canvasStyle}
            id="canvas"
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={() => window.focus()}
          ></canvas>
        </div>
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
      <hr />
      <div dangerouslySetInnerHTML={{ __html: formatGameText(game.text) }} />
    </div>
  );
};

export default GameDev;
