import { Player, usePageTitle } from '../components';

const Create = () => {
  usePageTitle();

  return (
    <div>
      <h1>Create Your Game</h1>
      <hr />

      <h2>In the Browser</h2>
      <Player />

      <div id="add-modal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Select a file to add to the computer</p>
          <p>
            <input type="file" id="upload-input" />
          </p>
        </div>
      </div>

      <h2>Download</h2>
      <hr />

      <div>
        <a href="/download/tic80-windows.zip" download>Download TIC-80 for Windows (.zip)</a>
      </div>

      <hr />

      <h2 id="pro">
        PRO version <span className="text-muted">(has some extra features)</span>
      </h2>

      <div>
        <div>
          <div>CARTRIDGES IN TEXT FORMAT</div>
          <div className="text-muted">
            you can save / load cartridges in text format, and create your game in any editor you want, also useful for
            version control systems
          </div>
        </div>

        <div>
          <div>EXPORT WITHOUT EDITORS</div>
          <div className="text-muted">
            you can export your game only without editors, and then publish it to app stores
          </div>
        </div>

        <div>
          <div>SUPPORT AUTHOR</div>
          <div className="text-muted">
            You can support developer and future development if you liked TIC-80 :)
          </div>
        </div>

        <div>and more...</div>
      </div>

      <h2>
        <a href="https://nesbox.itch.io/tic80/purchase">Buy PRO on itch.io for $10</a>
      </h2>

      <hr />

      <h2>Also available on</h2>

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
