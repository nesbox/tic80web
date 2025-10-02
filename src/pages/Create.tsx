import { Player, usePageTitle } from '../components';
import hashesData from '../data/hashes.json';

type FileInfo = {
  hash: string;
  size: number;
};

const hashes = hashesData as unknown as Record<string, FileInfo>;

const Create = () => {
  usePageTitle();

  return (
    <div>
      <h1>Create Your Game</h1>
      <hr />

      <h2>Browser Editor</h2>
      <Player />

      <div id="add-modal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Select a file to add to your project</p>
          <p>
            <input type="file" id="upload-input" />
          </p>
        </div>
      </div>

      <h2>Download</h2>

      {Object.entries(hashes).map(([filename, info]: [string, { hash: string; size: number }]) => {
        const getDisplayName = (file: string) => {
          if (file.includes('.zip')) return 'Windows (.zip)';
          if (file.includes('.dmg')) return 'macOS (.dmg)';
          if (file.includes('.AppImage')) return 'Linux (AppImage)';
          return file; // fallback
        };

        const formatSize = (bytes: number) => {
          if (bytes < 1024) return `${bytes} B`;
          if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
          return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        };

        return (
          <div key={filename}>
            <a href={`/download/${filename}`} download>{getDisplayName(filename)}</a>
            <div className="text-muted small mt-1">
              Size: {formatSize(info.size)} | SHA256: {info.hash}
            </div>
            {filename.includes('.AppImage') && (
              <div className="text-muted small mt-1">
                After download: <code>chmod +x TIC-80.AppImage && ./TIC-80.AppImage</code>
              </div>
            )}
          </div>
        );
      })}

      <hr />

      <h2 id="pro">PRO Version</h2>
      <p className="text-muted">Unlock extra features for enhanced game development</p>

      <div>
        <div>
          <div>Cartridges in Text Format</div>
          <div className="text-muted">
            Save and load cartridges in text format. Create your game in any editor you want, and easily integrate with version control systems.
          </div>
        </div>

        <div>
          <div>Export Without Editors</div>
          <div className="text-muted">
            Export your game without the editors, perfect for publishing to app stores.
          </div>
        </div>

        <div>
          <div>Support the Author</div>
          <div className="text-muted">
            Support the developer and future development if you enjoyed TIC-80 :)
          </div>
        </div>

        <div>and more...</div>
      </div>

      <div className="mt-3">
        <a href="https://nesbox.itch.io/tic80/purchase" className="btn btn-primary">Buy PRO on itch.io for $10</a>
      </div>

      <hr />

      <h2>Available on Other Platforms</h2>

      <div>
        <a href="https://nesbox.itch.io/tic80">itch.io</a>
      </div>
      <div>
        <a href="https://f-droid.org/ru/packages/com.nesbox.tic/">F-Droid</a>
      </div>
    </div>
  );
};

export default Create;
