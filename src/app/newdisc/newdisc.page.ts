import { InfoDiscussionService } from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-newdisc',
  templateUrl: './newdisc.page.html',
  styleUrls: ['./newdisc.page.scss'],
})
export class NewdiscPage implements OnInit {
  public show = false;
  public searchText;
  public contacts = [];
  public users = [];
  public actifUser;
  constructor(
    public router: Router,
    public service: InfoDiscussionService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.actifUser = JSON.parse(localStorage.getItem('users'));
    this.service
      .recupUser()
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.contacts.push(doc.data());
        });
        this.contacts.map((element) => {
          const refImage = this.afStorage.ref(element.photo);
          refImage.getDownloadURL().subscribe((res) => {
            this.users.push({
              nom: element.nom,
              email: element.email,
              id: element.id,
              photo: res,
            });
          });
        });
      });
  }

  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  createGroup = () => {
    this.router.navigate(['/creategroup']);
  };
  showSearchBar() {
    this.show = true;
  }
}
