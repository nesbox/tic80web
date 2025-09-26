import { useEffect, useRef } from 'react';

interface PlayerProps {
  coverImage?: string;
  showCoverImage?: boolean;
  cart?: string;
}

const Player = ({ coverImage, showCoverImage = false, cart }: PlayerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameBorderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (gameBorderRef.current) {
        const gameBorder = gameBorderRef.current;
        gameBorder.style.height = gameBorder.clientWidth * 144 / 256 + 'px';
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const handleClickToPlay = () => {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import tic80 from '/tic80.js';

      const options = {
        canvas: document.getElementById('canvas'),
        saveAs(blob, filename) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
        },
        showAddPopup(callback) {
          callback(null, null);
          const input = document.createElement('input');
          input.type = 'file';
          input.click();
          input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function(event) {
                const rom = new Uint8Array(event.target.result);
                callback(file.name, rom);
              };
              reader.readAsArrayBuffer(file);
            }
          });
        },
      };

      document.getElementById('canvas').style.display = 'block';
      document.getElementById('game-cover').style.display = 'none';

      ${cart ? `options.arguments = ['cart.tic'];
      fetch('${cart}')
        .then(rs => rs.arrayBuffer())
        .then(buffer => {
          options.preRun = module =>
            module.FS.writeFile('cart.tic', new Uint8Array(buffer));
          tic80(options);
        });` : 'tic80(options);'}`;

    document.head.appendChild(script);
  };

  return (
    <div ref={gameBorderRef} style={{ width: '100%', overflow: 'hidden' }} id="game-border">
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1c2c',
          cursor: 'pointer',
          textAlign: 'center',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        id="game-cover"
        onClick={handleClickToPlay}
      >
        {showCoverImage && coverImage && (
          <img
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.2
            }}
            className="pixelated"
            src={coverImage}
            alt="Game cover"
          />
        )}
        <div style={{ fontSize: '34px', position: 'absolute' }}>- CLICK TO PLAY -</div>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          display: 'none'
        }}
        id="canvas"
        onContextMenu={(event) => event.preventDefault()}
        onMouseDown={() => window.focus()}
      />
    </div>
  );
};

export default Player;
