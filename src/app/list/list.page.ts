import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserCrudService } from '../services/user-crud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  Users: any = [];

  constructor(
    private alertController: AlertController,
    private userCrudService: UserCrudService
  ) {}

  ngOnInit() {}

  async alertUser() {
    let alert = await this.alertController.create({
      subHeader: 'Alert',
      message: 'Test',
      buttons: ['OK'],
    });
    alert.present();
    console.log('Alert');
  }

  ionViewWillEnter() {
    // this.alertUser();
  }

  ionViewDidEnter() {
    this.userCrudService.getUsers().subscribe((response) => {
      this.Users = response;
    });
  }

  removeUser(user: any, index: any) {
    if (window.confirm('Are you sure?')) {
      this.userCrudService.deleteUser(user._id).subscribe(() => {
        this.Users.splice(index, 1);
        console.log('User deleted!');
      });
    }
  }
}
