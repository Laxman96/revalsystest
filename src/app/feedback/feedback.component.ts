import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  submitted = false;
  arabicRegex = '[\u0600-\u06FF]';

  constructor(private formBuilder: FormBuilder, private route:Router) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z]{1,40}")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]{1,40}")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      phnumber: [null, [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
      feedback:['',Validators.required]

  }, {
     
  });
  }

  get f() { return this.feedbackForm.controls; }

  onSubmit() {
    // executes the conditions here if form is invalid
    this.submitted = true;
    if (this.feedbackForm.valid) {
      
      console.log("Form Submitted!"); 
      let values = this.feedbackForm.value;  
      this.feedbackForm.reset();
      this.submitted = false;
    this.feedbackForm.setErrors(null); // could be removed
    this.feedbackForm.updateValueAndValidity();
      setTimeout(() => {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));   
        this.route.navigate(['/list'], { queryParams: { sort: 'LowTohigh' } });
        }, 100);

    }
      console.log(this.submitted,'hhgh');
      // stop here if form is invalid
      if (this.feedbackForm.invalid) {
          return;
      }  
       
  }

  onkeydown($event){
    const e = <KeyboardEvent>$event;
    if ($event.key === 'Tab' || $event.key === 'TAB') {
        return;
    }
    let pattern = $event.target.attributes.getNamedItem('assig').value+'';

    const regEx = new RegExp(pattern,'g');
    console.log(regEx)
    if (!(regEx.test($event.key))) {

      console.log($event.key);
        $event.preventDefault() ;

    }
  }

  onReset() {
      this.submitted = false;
      this.feedbackForm.reset();
      this.route.navigate(['/list'], { queryParams: { sort: 'LowTohigh' } });
  }

}
