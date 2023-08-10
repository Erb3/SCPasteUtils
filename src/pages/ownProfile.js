import styles from '../css/style.module.css';
import { getBookmarks } from '../helpers/config';

function onOwnProfile() {
  const base = document.querySelector('table').insertAdjacentElement(
    'afterend',
    VM.m(
      <table className={styles.myTable}>
        <tr>
          <th className={styles.center}>Bookmarked pastes</th>
        </tr>
      </table>
    )
  );

  const bookmarks = getBookmarks();
  for (const bookmark of bookmarks) {
    base.appendChild(
      VM.m(
        <tr>
          <td className={styles.center}>
            <a href={`/${bookmark.id}`}>{bookmark.name}</a>
          </td>
        </tr>
      )
    );
  }
}

function isOwnProfile() {
  return document?.querySelector('section>span')?.innerHTML.includes('(You)');
}

export { onOwnProfile, isOwnProfile };
