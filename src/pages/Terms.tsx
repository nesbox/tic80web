
import { usePageTitle } from '../components';

const Terms = () => {
  usePageTitle();
  return (
    <>
      <h1>Terms of Use</h1>
      <hr/>

      <ul>
        <li>All cartridges posted on the site are the property of their authors.</li>
        <li>Do not redistribute the cartridge without permission from the author.</li>
        <li>By uploading cartridges to the site, you grant Nesbox the right to freely use and distribute them. All other rights by default remain with the author.</li>
        <li>Do not post material that violates copyright, obscenity or any other laws.</li>
        <li>Nesbox reserves the right to remove or filter any material without prior notice.</li>
      </ul>

      <h1>Privacy Policy</h1>
      <hr/>
      We only store the user's email and password in encrypted form and will not transfer any personal information to third parties without explicit permission.

    </>
  );
};

export default Terms;
