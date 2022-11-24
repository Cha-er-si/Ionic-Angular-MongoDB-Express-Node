import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserCrudService } from '../services/user-crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  userForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private userCrudService: UserCrudService,
    private alertController: AlertController
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      username: [''],
    });
  }

  ngOnInit() {}

  // async presentAlert() {
  //   let alert = await this.alertController.create({
  //     header: 'Alert',
  //     buttons: ['OK'],
  //   });
  //   alert.present();
  // }

  onSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      return this.userCrudService
        .createUser(this.userForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.userForm.reset();
            this.router.navigate(['/list']);
          });
        });
    }
  }
}
