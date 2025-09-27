import { useEffect, useRef, useState } from 'react';

interface PlayerProps {
  coverImage?: string;
  showCoverImage?: boolean;
  cart?: string;
}

const Player = ({ coverImage, showCoverImage = false, cart: _cart }: PlayerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameBorderRef = useRef<HTMLDivElement>(null);
  const [tic80Module, setTic80Module] = useState<any>(null);

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
      // Cleanup tic80 module when component unmounts
      if (tic80Module) {
        // Add cleanup logic here if tic80 module has a cleanup method

        tic80Module._force_exit();
      }
    };
  }, [tic80Module]);

  const handleClickToPlay = async () => {
    const canvasElement = document.getElementById('canvas');
    const gameCoverElement = document.getElementById('game-cover');

    if (canvasElement) canvasElement.style.display = 'block';
    if (gameCoverElement) gameCoverElement.style.display = 'none';

    // Initialize tic80 module if not already initialized
    if (!tic80Module && canvasRef.current) {
      try {
        // Load tic80.js as a module from public folder
        const response = await fetch('/tic80.js');
        const scriptText = await response.text();

        // Create a blob URL for the module
        const blob = new Blob([scriptText], { type: 'application/javascript' });
        const moduleUrl = URL.createObjectURL(blob);

        // Import the module
        const tic80 = await import(moduleUrl);
        const module = await tic80.default({
          canvas: canvasRef.current,
          locateFile: (path: string) => {
            if (path === 'tic80.wasm') {
              return '/tic80.wasm';
            }
            return path;
          },
          // Add any other configuration options as needed
        });
        setTic80Module(module);

        // Clean up the blob URL
        URL.revokeObjectURL(moduleUrl);
      } catch (error) {
        console.error('Failed to initialize TIC-80 module:', error);
      }
    }
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
