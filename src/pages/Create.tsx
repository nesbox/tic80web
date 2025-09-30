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

      <h2>Latest Stable Version 1.1.2837</h2>
      <p>
        <a href="https://github.com/nesbox/TIC-80/releases/tag/v1.1.2837">Changelog</a>
      </p>

      <h2>Download</h2>
      <hr />

      <div>
        <h3>Windows</h3>
        <div>
          <a href="https://github.com/nesbox/TIC-80/releases/download/v1.1.2837/tic80-v1.1-win.zip">
            tic80-v1.1-win.zip
          </a>{' '}
          (1.71 MB)
        </div>
        <div className="text-muted text-small">
          SHA256 125e30c86dd475b1c25afe4f7a110b655e0c50d956204a9b34ade7615397970e
        </div>
      </div>

      <div>
        <h3>Linux</h3>
        <div>
          <a href="https://github.com/nesbox/TIC-80/releases/download/v1.1.2837/tic80-v1.1-linux.deb">
            tic80-v1.1-linux.deb
          </a>{' '}
          (1.81 MB)
        </div>
        <div className="text-muted text-small">
          SHA256 5c0d6cd62396100d730e68543e40fc3b6fd6c53209cf8a66c5d9a3e11e19d9ec
        </div>
      </div>

      <div>
        <h3>Mac OS X</h3>
        <div>
          <a href="https://github.com/nesbox/TIC-80/releases/download/v1.1.2837/tic80-v1.1-mac.dmg">
            tic80-v1.1-mac.dmg
          </a>{' '}
          (1.7 MB)
        </div>
        <div className="text-muted text-small">
          SHA256 343b5f75827dd4cb3f5e7dfa2809e9f68b02d64bf601694acef0b08aafd5f230
        </div>
      </div>

      <div>
        <h3>Android</h3>
        <div>
          <a href="https://github.com/nesbox/TIC-80/releases/download/v1.1.2837/tic80-v1.1-android.apk">
            tic80-v1.1-android.apk
          </a>{' '}
          (7.37 MB)
        </div>
        <div className="text-muted text-small">
          SHA256 32933567fa471dbe667c8cef97013cff2a52d5f29035704e10ba07b2008bb378
        </div>
      </div>

      <div>
        <h3>Raspberry PI</h3>
        <div>
          <a href="https://github.com/nesbox/TIC-80/releases/download/v1.1.2837/tic80-v1.1-rpi.deb">
            tic80-v1.1-rpi.deb
          </a>{' '}
          (3.1 MB)
        </div>
        <div className="text-muted text-small">
          SHA256 65d1a31ab2d2dc8f93767d6adc0d47a3ead6b57c99058ba29f93d615f7b528d5
        </div>
      </div>

      <h3>
        <a href="https://github.com/nesbox/TIC-80/releases/tag/v1.1.2837">
          Downloads for other platforms
        </a>{' '}
        (3DS, WASM, RPI baremetal...)
      </h3>

      <hr />

      <h2>
        <a href="https://github.com/nesbox/TIC-80/actions?query=branch%3Amain">
          Development version on Github
        </a>
      </h2>

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
        <a href="https://github.com/sponsors/nesbox">Sponsor Nesbox on Github</a> or{' '}
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
