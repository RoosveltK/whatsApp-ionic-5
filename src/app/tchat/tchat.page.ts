import { InfoDiscussionService } from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tchat',
  templateUrl: 'tchat.page.html',
  styleUrls: ['tchat.page.scss'],
})
export class TchatPage implements OnInit {
  public user;
  stopLoader = false;
  public userData;
  public allTchat = [];
  public herTchat = [];
  public allUsers = [];
  constructor(
    public router: Router,
    private serviceDiscussion: InfoDiscussionService
  ) {}

  ngOnInit() {
    this.user = this.serviceDiscussion.getActifUser();
    this.serviceDiscussion
      .getAllTchats()
      .snapshotChanges()
      .subscribe((res) => {
        this.allTchat = [];
        res.map((element: any) => {
          this.allTchat.push(element.payload.doc.data());
        });
        this.herTchat = this.verifyConcerneTchat(this.allTchat);
      });
    this.serviceDiscussion.getAllUsers(this.allUsers);
  }

  public viewConversation(tchatId, id) {
    let arrayMsg;
    localStorage.setItem(
      'USER_OF_TCHAT',
      JSON.stringify(this.serviceDiscussion.searchUserById(id, this.allUsers))
    );
    this.router.navigate(['conversation', tchatId]);
  }

  public viewConversationGroup(groupTchatId) {
    localStorage.setItem('GROUP_OF_TCHAT', JSON.stringify(groupTchatId));
    this.router.navigate(['conversationgroupe', groupTchatId.id]);
  }

  openNewDisc() {
    this.router.navigate(['/newdisc']);
  }

  verifyConcerneTchat = (tchats) => {
    let onlyHerTchat = [];
    tchats.forEach((element) => {
      element.users.forEach((elt: string) => {
        if (elt.localeCompare(this.user.id) == 0) onlyHerTchat.push(element);
      });
    });
    return onlyHerTchat;
  };
}
