import { Component, OnInit } from '@angular/core';
import { Password } from '../password.interface';
import { PasswordService } from '../password-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-manager.component.html',
  styleUrls: ['./password-manager.component.css']
})
export class PasswordManagerComponent implements OnInit {
  passwords!: Password[]; // Represents the list of passwords

  constructor(private passwordService: PasswordService, private router: Router) { }

  ngOnInit(): void {
    this.getPasswords(); // Retrieves the passwords when the component is initialized
  }

  getPasswords(): void {
    // Retrieves all passwords from the password service
    this.passwordService.getAllPasswords()
      .subscribe(passwords => this.passwords = passwords);
  }

  deletePassword(password: Password): void {
    if (confirm('Are you sure you want to delete this password?')) {
      // Removes the password from the list
      this.passwords = this.passwords.filter(p => p !== password);
      // Calls the password service to delete the password
      this.passwordService.deletePassword(password._id!).subscribe();
    }
  }

  editPassword(password: Password): void {
    const link = ['/edit', password._id]; // Constructs the router link for editing the password
    this.router.navigate(link); // Navigates to the password edit page
  }
}
//Comment explanations:

//The code represents a TypeScript component for managing passwords.
//It imports necessary dependencies from Angular core and custom files.
//The component class is defined with the necessary properties and methods.
//The constructor injects the required dependencies for the component.
//The ngOnInit() method is called when the component is initialized and retrieves the passwords by calling getPasswords().
//The getPasswords() method fetches all passwords from the password service and assigns them to the passwords property.
//The deletePassword() method is called when a password needs to be deleted. It removes the password from the list and calls the password service to delete it.
//The editPassword() method is called when a password needs to be edited. It constructs the router link for editing the password and navigates to the password edit page using the Router service.
//Overall, this code manages the retrieval, deletion, and editing of passwords in the password manager component.
