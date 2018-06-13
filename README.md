
# ContactManagementSystem

> This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## This project provide following functionality: 
 1. Add Contact
 2. List all contacts
 3. Edit contact
 4. Delete contact
 5. Sorting by following
	* First name
	* Last name
	* Email
	* Status
6. Pagination
 


### Validations

1. Add Contact
  * All fields are mandatory
  * Phone number should be of 10 digit.
  * Phone number should start from 6/7/8/9. (Mobile number validation for India)

2. Edit contact
  * Same validations as Add Contact
  * Update button will not be activate untill user changes something in Edit Form.

### To clone the repository
> Run `git clone https://github.com/thejsdeveloper/contact-management-system.git`

### Change directory
> cd `contact-management-system`

### Install dependencies
> npm install 

### Run development server

> Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

> Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
