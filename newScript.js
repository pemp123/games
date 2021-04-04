/* ----------------------------

	CustomValidation prototype

	- Keeps track of the list of invalidity messages for this input
	- Keeps track of what validity checks need to be performed for this input
	- Performs the validity checks and sends feedback to the front end
	
---------------------------- */

function CustomValidation() {
	//this.invalidities = [];
	this.validityChecks = [];
}

CustomValidation.prototype = {
	// addInvalidity: function(message) {
	// 	this.invalidities.push(message);
	// },
	// getInvalidities: function() {
	// 	return this.invalidities.join('. \n');
	// },
	checkValidity: function(input) {
    var flag = 1;
		for ( var i = 0; i < this.validityChecks.length; i++ ) {
      
			var isInvalid = this.validityChecks[i].isInvalid(input);
			// if (isInvalid) {
			// 	this.addInvalidity(this.validityChecks[i].invalidityMessage);
			// } 
      
			var requirementElement = this.validityChecks[i].element;
      
      if(this.validityChecks[i].invalidityMessage == 'Пароли не совпадают')
      {
         if (requirementElement) {
          if (isInvalid) {
            if(this.validityChecks.length == 1)
              flag = 0;
            this.validityChecks[i].element2.classList.add('invalid');
            this.validityChecks[i].element2.classList.remove('valid');
            requirementElement.classList.add('invalid');
            requirementElement.innerText = this.validityChecks[i].invalidityMessage
            requirementElement.classList.remove('valid');
            
          }
          else 
          {
            this.validityChecks[0].element2.classList.add('valid');
            this.validityChecks[0].element2.classList.remove('invalid');
            requirementElement.innerText = "Условия выполнены";
            requirementElement.classList.remove('invalid');
            requirementElement.classList.add('valid');
          }
       }
      }
      else if (flag) {
        if (requirementElement) {
          if (isInvalid) {
            flag = 0;
            this.validityChecks[i].element2.classList.add('invalid');
            this.validityChecks[i].element2.classList.remove('valid');
            requirementElement.classList.add('invalid');
            requirementElement.innerText = this.validityChecks[i].invalidityMessage
            requirementElement.classList.remove('valid');
        }
      }
			} // end if requirementElement
		} // end for
    if (flag) {
      this.validityChecks[0].element.innerText = "Условия выполнены";
      this.validityChecks[0].element2.classList.add('valid');
      this.validityChecks[0].element2.classList.remove('invalid');
      this.validityChecks[0].element.classList.remove('invalid');
			this.validityChecks[0].element.classList.add('valid');
    }
	}
};



/* ----------------------------

	Validity Checks

	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement
	
---------------------------- */

var usernameValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'Минимум 3 символа в длину',
		element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)'),
    element2: document.querySelector('label[for="username"] .tst1 input:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Должно содержать только латинские буквы и цифры',
		element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)'),
    element2: document.querySelector('label[for="username"] .tst1 input:nth-child(1)')
	}
];

var passwordValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 8 | input.value.length > 100;
		},
		invalidityMessage: 'Минимум 8 символов в длину',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)'),
    element2: document.querySelector('label[for="password"] .tst1 input:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[0-9]/g);
		},
		invalidityMessage: 'Должен содержать 1 цифру',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)'),
    element2: document.querySelector('label[for="password"] .tst1 input:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[a-z]/g);
		},
		invalidityMessage: 'Должен содержать 1 строчную букву',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)'),
    element2: document.querySelector('label[for="password"] .tst1 input:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[A-Z]/g);
		},
		invalidityMessage: 'Должен содержать 1 прописную букву',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)'),
    element2: document.querySelector('label[for="password"] .tst1 input:nth-child(1)')
	},
  {
		isInvalid: function(input) {
			return passwordRepeatInput.value != passwordInput.value;
		},
		invalidityMessage: 'Пароли не совпадают',
		element: document.querySelector('label[for="password_repeat"] .input-requirements li:nth-child(1)'),
    element2: document.querySelector('label[for="password_repeat"] .tst1 input:nth-child(1)')
	}
];

var passwordRepeatValidityChecks = [
		{
		isInvalid: function() {
			return passwordRepeatInput.value != passwordInput.value;
		},
		invalidityMessage: 'Пароли не совпадают',
		element: document.querySelector('label[for="password_repeat"] .input-requirements li:nth-child(1)'),
    element2: document.querySelector('label[for="password_repeat"] .tst1 input:nth-child(1)')
	}
];



/* ----------------------------

	Check this input

	Function to check this particular input
	If input is invalid, use setCustomValidity() to pass a message to be displayed

---------------------------- */

function checkInput(input) {

	input.CustomValidation.invalidities = [];
	input.CustomValidation.checkValidity(input);

	if ( input.CustomValidation.invalidities.length == 0 && input.value != '' ) {
		input.setCustomValidity('');
	} else {
		var message = input.CustomValidation.getInvalidities();
		input.setCustomValidity(message);
	}
}



/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */

var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var passwordRepeatInput = document.getElementById('password_repeat');

usernameInput.CustomValidation = new CustomValidation();
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

passwordInput.CustomValidation = new CustomValidation();
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

passwordRepeatInput.CustomValidation = new CustomValidation();
passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;




/* ----------------------------

	Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('input:not([type="submit"])');
//var submit = document.querySelector('input[type="submit"');

for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('keyup', function() {
		checkInput(this);
	});
}

// submit.addEventListener('click', function() {
// 	for (var i = 0; i < inputs.length; i++) {
// 		checkInput(inputs[i]);
// 	}
// });
