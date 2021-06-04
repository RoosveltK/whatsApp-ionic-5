import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.page.html',
  styleUrls: ['./creategroup.page.scss'],
})
export class CreategroupPage implements OnInit {
  public show = false;
  public searchText;
  constructor(private router: Router) {}

  ngOnInit() {}

  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };
  showSearchBar() {
    this.show = true;
  }
}
