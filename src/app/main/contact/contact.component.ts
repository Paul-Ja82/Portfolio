import { Component, ElementRef, HostListener, inject, ViewChild, OnInit, OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ CommonModule, RouterModule, FooterComponent, FormsModule, ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  mailTest = false;

  post = {
  endPoint: 'https://pauljdietrich.com/sendMail.php',
  body: (payload: any) => JSON.stringify(payload),
  options: {
    headers: {
      'Content-Type': 'text/plain'
    },
    responseType: 'text' as const
  }
};

  invalidName = false;
  invalidEmail = false;
  invalidMessage = false;

  @ViewChild('contactFormWrapper', { static: true }) contactFormWrapper!: ElementRef;

  private boundGlobalClick = this.onGlobalClick.bind(this);

  ngOnInit(): void {
    document.addEventListener('click', this.boundGlobalClick);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.boundGlobalClick);
  }

  onGlobalClick(event: MouseEvent): void {
    const clickedInside = this.contactFormWrapper.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clearForm();
    }
  }

  handleInvalidClick(form: NgForm, isChecked: boolean): void {
  Object.keys(form.controls).forEach((key) => {
    const control = form.controls[key];
    control?.markAsTouched({ onlySelf: true });
    control?.markAsDirty({ onlySelf: true });
    control?.updateValueAndValidity({ onlySelf: true });
  });

  const nameControl = form.controls['name'];
  const emailControl = form.controls['email'];
  const messageControl = form.controls['message'];

  this.invalidName = nameControl?.invalid || false;
  this.invalidEmail = emailControl?.invalid || false;
  this.invalidMessage = messageControl?.invalid || false;

  if (this.invalidName) this.contactData.name = '';
  if (this.invalidEmail) this.contactData.email = '';
  if (this.invalidMessage) this.contactData.message = '';

  const forgetBox = document.getElementById('forgetBox') as HTMLElement | null;
  if (forgetBox) {
    forgetBox.style.opacity = isChecked ? '0' : '1';
  }
}


  onCheckboxChange(isChecked: boolean): void {
    const forgetBox = document.getElementById('forgetBox') as HTMLElement | null;
    if (forgetBox) {
      forgetBox.style.opacity = isChecked ? '0' : '1';
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
        .subscribe({
          next: () => {
            this.clearForm();
            this.showSentMessage();
          }
        });
  }
}

  private showSentMessage(): void {
  const sentMsgEn = document.querySelector('.sent-msg') as HTMLElement;
  const sentMsgDe = document.querySelector('.sent-msg-de') as HTMLElement;

  [sentMsgEn, sentMsgDe].forEach((element) => {
    if (element) {
      element.style.opacity = '1';
      setTimeout(() => {
        element.style.opacity = '0';
      }, 5000);
    }
  });
}

  clearForm(): void {
    this.resetContactData();
    this.resetInputFields();
    this.resetCheckboxesAndWarnings();

    this.invalidName = false;
    this.invalidEmail = false;
    this.invalidMessage = false;

    const forgetBox = document.getElementById('forgetBox') as HTMLElement | null;
    if (forgetBox) forgetBox.style.opacity = '0';
  }

  private resetContactData(): void {
    this.contactData = {
      name: '',
      email: '',
      message: ''
    };
  }

  private resetInputFields(): void {
  }

  private resetCheckboxesAndWarnings(): void {
    const checkbox = document.getElementById('customCheckbox') as HTMLInputElement | null;
    if (checkbox) checkbox.checked = false;

    const forgetBox = document.getElementById('forgetBox') as HTMLElement | null;
    if (forgetBox) forgetBox.style.opacity = '0';
  }

  removeReadonly(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.removeAttribute('readonly');
}

}
