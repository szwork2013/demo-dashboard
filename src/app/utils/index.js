export function isIOSApp() {
  const standalone = navigator.standalone;
  const userAgent = navigator.userAgent.toLowerCase();
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);

  if (ios) {
    if (!standalone && !safari) {
      return true;
    }
  }
  return false;
}

export function getLanguage() {
  let language;
  if (navigator.languages) {
    language = navigator.languages[0];
  }
  else {
    language = navigator.language || 'ru';
  }
  language = language.split('-')[0];
  return language;
}
