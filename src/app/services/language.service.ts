import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LNG_KEY = 'SELECT_LANGUAGE';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public selected = '';
  constructor(private translate: TranslateService) {}

  setInitialAppLanguage() {
    let lang = this.translate.getBrowserLang();
    this.translate.setDefaultLang(lang);

    if (localStorage.getItem(LNG_KEY) !== null) {
      let lng = JSON.parse(localStorage.getItem(LNG_KEY));
      this.setLanguage(lng);
      this.selected = lng;
    }

    if (localStorage.getItem('ACTUEL_THEME') != null) {
      let theme = JSON.parse(localStorage.getItem('ACTUEL_THEME'));
      document.body.setAttribute('color-theme', theme);
    }
  }

  getLanguages() {
    return [
      { text: 'Anglais', value: 'en', img: 'assets/lang/en.png' },
      { text: 'Français', value: 'fr', img: 'assets/lang/fr.png' },
    ];
  }

  setLanguage(lang) {
    this.translate.use(lang);
    this.selected = lang;
    localStorage.setItem(LNG_KEY, JSON.stringify(lang));
  }

  translateInstant = (word) => this.translate.instant(word);
}
