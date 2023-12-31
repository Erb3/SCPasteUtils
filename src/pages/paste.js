import styles from '../css/style.module.css';
import { addBookmark, isBookmark, removeBookmark } from '../helpers/config';
import { toast, copyToClipboard } from '../utils';

function onPastePage(moreButtons, alternativeTheme) {
  if (moreButtons) {
    // Remove the "RAW" and "COPY" buttons
    document.querySelectorAll('.bookmark-button').forEach((elm) => {
      elm.remove();
    });

    // Add new buttons
    document.querySelector('section').appendChild(
      VM.m(
        <span className={styles.btnContainer}>
          <button id="bookmarkBtn" className={styles.button}>
            Bookmark
          </button>

          <a id="raw" className={styles.button}>
            Raw
          </a>

          <button id="copy" className={styles.button}>
            Copy
          </button>

          <button id="copyCC" className={styles.button}>
            Copy CC
          </button>
        </span>
      )
    );

    const pasteID = location.href.split('/').at(-1);
    let pasteName = document.querySelector('h2').innerHTML.replaceAll(' ', '_');

    document.querySelector('#raw').href = `/api/v1/pastes/${pasteID}/raw`;

    document.querySelector('#copy').addEventListener('click', () => {
      copyToClipboard(codeString || 'NO CODE FOUND'); // eslint-disable-line no-undef
    });

    document.querySelector('#copyCC').addEventListener('click', () => {
      copyToClipboard(
        `wget https://p.sc3.io/api/v1/pastes/${pasteID}/raw ${pasteName}`
      );
    });

    document.querySelector('#bookmarkBtn').addEventListener('click', () => {
      if (isBookmark(pasteID)) {
        removeBookmark(pasteID);
        toast('Removed bookmark!', true);
      } else {
        addBookmark(pasteID, pasteName);
        toast('Added bookmark!');
      }
    });
  }

  const someoneUsername = document.querySelector(
    'html body main.support-no-margin header section span b a'
  );

  const anonUsername = document.querySelector(
    'html body main.support-no-margin header section span'
  );

  // If using alternative theme
  if (alternativeTheme) {
    if (document.querySelector('.icon-pencil')) {
      document.querySelector('.icon-pencil').classList.add(styles.smallButton);
      document.querySelector('.icon-trash').classList.remove('danger');
      document.querySelector('.icon-trash').classList.add(styles.smallButton);

      someoneUsername.classList.add(styles.name);
    } else if (anonUsername) {
      anonUsername.classList.add(styles.name);
    }
  }
}

function isPastePage(loc) {
  return loc.match(/io\/[A-Za-z0-9]{10}/g);
}

export { onPastePage, isPastePage };
