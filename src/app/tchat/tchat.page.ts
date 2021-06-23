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
    if (
      localStorage.getItem(this.serviceDiscussion.INF0_USER_CAME_FROM_DB) !=
      null
    )
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
    setTimeout(() => {
      if (this.herTchat.length == 0) this.stopLoader = true;
    }, 5000);
    this.serviceDiscussion.getAllUsers(this.allUsers);
  }

  //Go to a single discussion
  viewConversation = (tchatId, id) => {
    localStorage.setItem(
      this.serviceDiscussion.USER_OF_TCHAT,
      JSON.stringify(this.serviceDiscussion.searchUserById(id, this.allUsers))
    );
    this.router.navigate(['conversation', tchatId]);
  };

  //Go to group discussion
  viewConversationGroup = (groupTchatId) => {
    localStorage.setItem(
      this.serviceDiscussion.GROUP_OF_TCHAT,
      JSON.stringify(groupTchatId)
    );
    this.router.navigate(['conversationgroupe', groupTchatId.id]);
  };

  //start Discussion or  create a group
  openNewDisc = () => this.router.navigate(['/newdisc']);

  //Get only tchat which user is concerned
  verifyConcerneTchat = (tchats) => {
    let onlyHerTchat = [];
    if (
      localStorage.getItem(this.serviceDiscussion.INF0_USER_CAME_FROM_DB) !=
      null
    )
      tchats.forEach((element) => {
        element.users.forEach((elt: string) => {
          if (elt.localeCompare(this.user.id) == 0) onlyHerTchat.push(element);
        });
      });
    return onlyHerTchat;
  };
}
