import styles, { stylesheet } from './css/style.module.css';
import { isPastePage, onPastePage } from './pages/paste';
import { isOwnProfile, onOwnProfile } from './pages/ownProfile';
import { createPanel } from './helpers/panel';
import {
  setUseAlternativeTheme,
  setUseMoreButtons,
  shouldUseAlternativeTheme,
  shouldUseMoreButtons,
} from './helpers/config';

document.head.append(VM.m(<style>{stylesheet}</style>));

const moreButtons = shouldUseMoreButtons() == 'true';
const alternativeTheme = shouldUseAlternativeTheme() == 'true';

console.table({
  'More buttons': moreButtons,
  'Alternative theme': alternativeTheme,
  'Alternative theme type': typeof !!alternativeTheme,
});

if (isPastePage(location.href)) {
  console.log('Loading paste page.');
  onPastePage(moreButtons, alternativeTheme);
} else if (isOwnProfile()) {
  console.log('Loading own profile');
  onOwnProfile();
}

document.querySelector('nav > h1').replaceWith(
  VM.m(
    <div className={styles.branding} id="branding">
      <h1>SCPaste</h1>
      <p>Utils</p>
    </div>
  )
);

document.querySelector('#branding > p').addEventListener('click', () => {
  createPanel(
    <div>
      <h1>SCPasteUtils 😸</h1>

      <div class="settings">
        <div class="setting">
          <input id="more-buttons" type="checkbox" />
          <label for="more-buttons">Better buttons</label>
        </div>

        <div class="setting">
          <input id="alternative-theme" type="checkbox" />
          <label for="alternative-theme">Alternative theme</label>
        </div>
      </div>

      <p>Thanks for using SCPasteUtils</p>
    </div>,

    () => {
      setUseMoreButtons(moreButtonsElm.checked);
      setUseAlternativeTheme(alternativeThemeElm.checked);
      location.reload();
    }
  );

  const moreButtonsElm = document.querySelector('#more-buttons');
  const alternativeThemeElm = document.querySelector('#alternative-theme');

  moreButtonsElm.checked = moreButtons;
  alternativeThemeElm.checked = alternativeTheme;
});
