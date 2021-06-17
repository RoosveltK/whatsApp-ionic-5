import { LanguageService } from './services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private serviceLangue: LanguageService) {
    this.serviceLangue.setInitialAppLanguage();
  }
}
