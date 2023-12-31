function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function shouldUseAlternativeTheme() {
  return getCookie('alternativeTheme');
}

function shouldUseMoreButtons() {
  return getCookie('moreButtons');
}

function getBookmarks() {
  return JSON.parse(getCookie('bookmarks') || '[]');
}

function addBookmark(id, name) {
  const marks = getBookmarks();
  marks.push({
    id,
    name,
  });
  setCookie('bookmarks', JSON.stringify(marks));
}

function isBookmark(id) {
  return getBookmarks().some((v) => v.id == id);
}

function removeBookmark(id) {
  const marks = getBookmarks().filter((v) => v.id !== id);
  setCookie('bookmarks', JSON.stringify(marks));
}

function setUseMoreButtons(to) {
  setCookie('moreButtons', to, 265);
}

function setUseAlternativeTheme(to) {
  setCookie('alternativeTheme', to, 265);
}

export {
  shouldUseAlternativeTheme,
  shouldUseMoreButtons,
  setUseAlternativeTheme,
  setUseMoreButtons,
  addBookmark,
  getBookmarks,
  isBookmark,
  removeBookmark,
};
