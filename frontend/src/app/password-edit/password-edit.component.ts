import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Password } from '../password.interface';
import { PasswordService } from '../password-store.service';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  password!: Password; // Represents the password object
  decryptedPassword!: string; // Stores the decrypted password value
  isSaving = false; // Indicates if the form is currently being saved

  constructor(
    private route: ActivatedRoute, // Provides access to the current route
    private router: Router, // Used for navigation
    private passwordService: PasswordService // Service for managing passwords
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!; // Retrieves the 'id' parameter from the route
    
    if (id !== null) {
      // Fetch the password details from the password service based on the ID
      this.passwordService.getPasswordById(id).subscribe((password) => {
        this.password = password;
        this.decryptedPassword = atob(password.encryptedPassword);
        // debug line
        console.log(this.password);
      });
    } else {
      // Set default values for a new password
      this.password = {
        category: '',
        app: '',
        userName: '',
        encryptedPassword: ''
      };
    }
  }

  save(): void {
    // Check if all required fields are filled
    if (!this.password.category || !this.password.app || !this.password.userName || !this.decryptedPassword) {
      alert('Please enter all the fields!');
      return;
    }

    this.isSaving = true; // Set saving flag to true
    
    if (this.password._id === undefined) {
      // Add a new password
      this.password.encryptedPassword = btoa(this.decryptedPassword); // Encrypt the password
      this.passwordService.addPassword(this.password)
        .subscribe(() => {
          this.isSaving = false; // Set saving flag to false
          this.goBack(); // Navigate back
        });
    } else {
      // Update an existing password
      if (this.decryptedPassword) {
        this.password.encryptedPassword = btoa(this.decryptedPassword); // Encrypt the password if it exists
      }
      this.passwordService.updatePassword(this.password._id!, this.password)
        .subscribe(() => {
          this.isSaving = false; // Set saving flag to false
          this.goBack(); // Navigate back
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/passwords']); // Navigate back to the password manager page
  }

  togglePasswordVisibility(): void {
    // Toggle password visibility
    const passwordField = document.getElementById('encryptedPassword') as HTMLInputElement;
    const toggleButton = document.getElementById('togglePasswordVisibilityButton') as HTMLButtonElement;
    const toggleButtonIcon = toggleButton.querySelector('i');

    if (toggleButtonIcon) {
      if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Show the password
        toggleButtonIcon.classList.remove('fa-eye');
        toggleButtonIcon.classList.add('fa-eye-slash');
      } else {
        passwordField.type = 'password'; // Hide the password
        toggleButtonIcon.classList.remove('fa-eye-slash');
        toggleButtonIcon.classList.add('fa-eye');
      }
    }
  }
}

//Comment explanations:

//The code represents the TypeScript component for the password edit page.
//It imports necessary dependencies from Angular core and custom files.
//The component class is defined with the necessary properties and methods.
//The constructor injects the required dependencies for the component.
//The ngOnInit() method is called when the component is initialized and retrieves the password details based on the route parameter 'id'.
//The save() method is triggered when the user clicks the save button. It performs form validation and saves or updates the password accordingly.
//The goBack() method is used to navigate back to the password manager page.
//The togglePasswordVisibility() method toggles the visibility of the password field when the corresponding button is clicked.