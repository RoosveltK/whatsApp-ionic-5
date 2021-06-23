import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InfoDiscussionService } from '../services/info-discussion.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.page.html',
  styleUrls: ['./creategroup.page.scss'],
})
export class CreategroupPage implements OnInit {
  public show = false;
  public usersOfGroup = [];
  public searchText;

  public users = [];
  public actifUser;
  public actifUserofDB;
  constructor(
    private router: Router,
    public serviceDiscussion: InfoDiscussionService
  ) {}

  ngOnInit() {
    this.actifUser = this.serviceDiscussion.getActifUser();
    this.serviceDiscussion.getAllUsers(this.users);
  }

  addToMemberGroup(user) {
    let isTab = false;
    let indice;
    this.users.forEach((element, index) => {
      if (element.id == user.id) indice = index;
    });
    if (this.usersOfGroup.length !== 0) {
      for (let index = 0; index < this.usersOfGroup.length; index++) {
        if (this.usersOfGroup[index].id.localeCompare(user.id) == 0) {
          this.usersOfGroup.splice(index, 1);
          this.users[indice].isThere = false;
          isTab = true;
        }
      }
    }
    if (!isTab) {
      this.usersOfGroup.push(user);
      this.users[indice].isThere = true;
    }
  }

  createGroupLast() {
    localStorage.setItem(
      this.serviceDiscussion.GROUP_OF_TCHAT,
      JSON.stringify(this.usersOfGroup)
    );
    this.router.navigate(['/creategroup-last-phase']);
  }
}
