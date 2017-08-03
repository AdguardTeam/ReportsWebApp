import Translator from 'bazinga-translator';


export let translator;
export let onTranslationLoad = [];

let xhr = new XMLHttpRequest();
xhr.open('GET', window.translations_url);
xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        translator = Translator.fromJSON(xhr.response);
        onTranslationLoad.forEach((cb) => { cb(); });
    }
};
xhr.onerror = () => {/* some error handling */};
xhr.send();
