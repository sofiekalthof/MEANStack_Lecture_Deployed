import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from './password-store.service';
import { Password } from './password.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'password-manager'; // Represents the title of the application
  id!: 0; // Represents the ID parameter, but it's not properly initialized and may cause issues
  password: Password[] | null = null;
  editingPassword: Password | null = null;

  constructor(private passwordStoreService: PasswordService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updatePasswords();
  }

  updatePasswords() {
    this.passwordStoreService.getAllPasswords().subscribe((password: Password[]) => {
      this.password = password;
    });
  }

  addPassword() {
    const newPassword: Password = {
      _id: '',
      category: '',
      app: '',
      userName: '',
      encryptedPassword: '',
    };

    this.passwordStoreService.addPassword(newPassword).subscribe((data: any) => {
      this.updatePasswords();
      this.editingPassword = {
        ...newPassword,
        _id: data._id,
      };
    });
  }

  editPassword(password: Password) {
    this.editingPassword = password;
  }

  doneEditing() {
    if (!this.editingPassword) return;

    this.updatePassword(this.editingPassword);

    this.editingPassword = null;
  }  

  updatePassword(password: Password) {
    this.passwordStoreService
      .updatePassword(password._id!, { ...password, _id: '' })
      .subscribe(() => {
        this.updatePasswords();
      });
  }

  deletePassword(password: Password) {
    this.passwordStoreService.deletePassword(password._id!).subscribe(() => {
      this.updatePasswords();
    });
  }
}
// Comment explanations:
// The code represents the root component of the application.
// It imports necessary dependencies from Angular core, including Location and ActivatedRoute.
// The component class is defined with the necessary properties and methods.
// The title property represents the title of the application.
// The id property is not properly initialized and may cause issues.
// The constructor injects the Location and ActivatedRoute services for handling navigation and route information.
// The ngOnInit() method is called when the component is initialized and retrieves the 'id' parameter from the current route.
// The refreshPage() method is called to refresh the page. If the id is not 0, it uses the Location service to navigate to the current path and then reloads the page using window.location.reload().
// Overall, this code manages the root component of the application, including navigation and page refreshing.