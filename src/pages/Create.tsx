import { Player, usePageTitle } from '../components';
import hashes from '../data/hashes.json';

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

      {Object.entries(hashes).map(([filename, hash]) => {
        const getDisplayName = (file: string) => {
          if (file.includes('.zip')) return 'Windows (.zip)';
          if (file.includes('.dmg')) return 'macOS (.dmg)';
          if (file.includes('.deb')) return 'Linux (.deb)';
          return file; // fallback
        };

        return (
          <div key={filename}>
            <a href={`/download/${filename}`} download>{getDisplayName(filename)}</a>
            <div className="text-muted small mt-1">
              SHA256: {hash}
            </div>
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
