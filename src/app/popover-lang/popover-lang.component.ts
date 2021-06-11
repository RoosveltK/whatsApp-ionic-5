import { LanguageService } from './../services/language.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-lang',
  templateUrl: './popover-lang.component.html',
  styleUrls: ['./popover-lang.component.scss'],
})
export class PopoverLangComponent implements OnInit {
  public tableLang = [];
  public selectedLang = '';

  constructor(
    private serviceLanguage: LanguageService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.tableLang = this.serviceLanguage.getLanguages();
    this.selectedLang = this.serviceLanguage.selected;
  }

  selectLangue(evt) {
    this.serviceLanguage.setLanguage(evt);
    this.popoverController.dismiss();
  }
}
