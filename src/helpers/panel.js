import styles from '../css/style.module.css';

function createPanel(contents, cb) {
  document.querySelector('body').appendChild(
    VM.m(
      <div id="panel" className={styles.panelContainer}>
        {contents}
        <button id="closePanel" className={styles.button}>
          Save & Close
        </button>
      </div>
    )
  );

  document.querySelector('#closePanel').addEventListener('click', () => {
    document.querySelector('#panel').remove();
    cb();
  });
}

export { createPanel };
