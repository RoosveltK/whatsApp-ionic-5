import { NotificationService } from './../services/notification.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('userInput') userInputViewChild: ElementRef;
  public userInputElement: HTMLInputElement;
  public isImageThere = false;

  public user: FormGroup;
  public image;

  public dataImage;

  constructor(
    public formBuilder: FormBuilder,
    public firebaseService: FirebaseService,
    private router: Router,
    private serviceNotification: NotificationService
  ) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      nom: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    //
  }

  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  }

  async loadImageActionSheet1(event) {
    this.userInputElement.click();
  }

  loadImageFromDevice1(e) {
    const reader = new FileReader();
    this.dataImage = this.firebaseService.getAndVerifyFile(e.target.files);

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => (this.image = reader.result as string);
    }
    this.isImageThere = true;
  }

  addUser = (userInfo) => {
    if (this.dataImage == undefined || this.dataImage == 0) {
      this.serviceNotification.dangerToast(`SIGNUP.picInput`);
      return;
    }
    this.serviceNotification.loadingController(400000);
    this.firebaseService
      .signup(userInfo.email, userInfo.password)
      .then((res) => {
        this.firebaseService
          .uploadImageAndCreateAccount(this.dataImage, userInfo, res.user)
          .then(() => {
            this.user.reset();
            this.router.navigate(['/signin']);
            this.serviceNotification.closeLoader();
          });
      })
      .catch((err) => {
        this.serviceNotification.closeLoader();
        this.serviceNotification.dangerToast(err.message);
      });
  };
  backLogin = () => this.router.navigate(['/']);
}
