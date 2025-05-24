import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
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

  @ViewChild('contactFormWrapper', { static: true }) formWrapper!: ElementRef;

  constructor(private eRef: ElementRef) {} 

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideForm = this.formWrapper.nativeElement.contains(event.target);
    if (!clickedInsideForm) {
      this.clearForm();
    }
  }

  handleClick(isChecked: boolean): void {
    const forgetBox = document.getElementById('forgetBox') as HTMLElement;
    const forgetBoxDe = document.getElementById('forgetBoxDe') as HTMLElement;

    if (!isChecked) {
      forgetBox.style.opacity = '1';
      forgetBoxDe.style.opacity = '1';
      return;
    }

    forgetBox.style.opacity = '0';
    forgetBoxDe.style.opacity = '0';
  }

  hideForgetBoxIfChecked(isChecked: boolean): void {
    const forgetBox = document.getElementById('forgetBox') as HTMLElement;
    const forgetBoxDe = document.getElementById('forgetBoxDe') as HTMLElement;
    if (isChecked) {
      forgetBox.style.opacity = '0';
      forgetBoxDe.style.opacity = '0';
    }
  }

clearForm(): void {
  this.resetContactData();
  this.resetInputFields();
  this.resetCheckboxesAndWarnings();
}

 private resetContactData(): void {
  this.contactData = {
    name: '',
    email: '',
    message: ''
  };
}

private resetInputFields(): void {
  const idsToReset = [
    'name', 'missName',
    'email', 'missEmail',
    'message', 'missMessage',
    'nameDe', 'missNameDe',
    'emailDe', 'missEmailDe',
    'messageDe', 'missMessageDe'
  ];

  idsToReset.forEach(id => {
    const el = document.getElementById(id) as HTMLInputElement;
    if (el) {
      el.value = '';
      el.style.display = id.includes('miss') ? 'none' : 'block';
    }
  });
}

private resetCheckboxesAndWarnings(): void {
  const checkboxEn = document.getElementById('customCheckbox') as HTMLInputElement;
  const checkboxDe = document.getElementById('customCheckboxDe') as HTMLInputElement;
  if (checkboxEn) checkboxEn.checked = false;
  if (checkboxDe) checkboxDe.checked = false;

  const forgetBox = document.getElementById('forgetBox') as HTMLElement;
  const forgetBoxDe = document.getElementById('forgetBoxDe') as HTMLElement;
  if (forgetBox) forgetBox.style.opacity = '0';
  if (forgetBoxDe) forgetBoxDe.style.opacity = '0';
}

validateName(event: Event): void {
  const nameInput = document.getElementById('name') as HTMLInputElement | null;
  const missNameInput = document.getElementById('missName') as HTMLElement | null;
  const nameInputDe = document.getElementById('nameDe') as HTMLInputElement | null;
  const missNameInputDe = document.getElementById('missNameDe') as HTMLElement | null;

  const namePattern = /^[A-Za-z\s\-']+$/;

  if (nameInput && missNameInput) {
    const value = nameInput.value.trim();
    const isValid = value && namePattern.test(value);
    nameInput.style.display = isValid ? 'block' : 'none';
    missNameInput.style.display = isValid ? 'none' : 'block';
  }

  if (nameInputDe && missNameInputDe) {
    const value = nameInputDe.value.trim();
    const isValid = value && namePattern.test(value);
    nameInputDe.style.display = isValid ? 'block' : 'none';
    missNameInputDe.style.display = isValid ? 'none' : 'block';
  }
}

 validateEmail(): void {
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const missEmailInput = document.getElementById('missEmail') as HTMLElement | null;
  const emailInputDe = document.getElementById('emailDe') as HTMLInputElement | null;
  const missEmailInputDe = document.getElementById('missEmailDe') as HTMLElement | null;

  const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  if (emailInput && missEmailInput) {
    const value = emailInput.value.trim();
    const isValid = value && emailPattern.test(value);
    emailInput.style.display = isValid ? 'block' : 'none';
    missEmailInput.style.display = isValid ? 'none' : 'block';
  }

  if (emailInputDe && missEmailInputDe) {
    const value = emailInputDe.value.trim();
    const isValid = value && emailPattern.test(value);
    emailInputDe.style.display = isValid ? 'block' : 'none';
    missEmailInputDe.style.display = isValid ? 'none' : 'block';
  }
}

validateMessage(): void {
  const messageInput = document.getElementById('message') as HTMLInputElement | null;
  const missMessageInput = document.getElementById('missMessage') as HTMLElement | null;
  const messageInputDe = document.getElementById('messageDe') as HTMLInputElement | null;
  const missMessageInputDe = document.getElementById('missMessageDe') as HTMLElement | null;

  if (messageInput && missMessageInput) {
    const value = messageInput.value.trim();
    const isValid = value !== '';
    messageInput.style.display = isValid ? 'block' : 'none';
    missMessageInput.style.display = isValid ? 'none' : 'block';
  }

  if (messageInputDe && missMessageInputDe) {
    const value = messageInputDe.value.trim();
    const isValid = value !== '';
    messageInputDe.style.display = isValid ? 'block' : 'none';
    missMessageInputDe.style.display = isValid ? 'none' : 'block';
  }
}

  validateInfo(event: Event): void {
    event.preventDefault();
    this.validateName(event);
    this.validateEmail();
    this.validateMessage();
  }

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: ''
  }

  mailTest = false;

  post = {
  endPoint: 'https://pauljdietrich.com/sendMail.php',
  body: (payload: any) => JSON.stringify(payload),
  options: {
    headers: {
      'Content-Type': 'text/plain',
    },
    responseType: 'text' as const
  },
};

  private sendMail(ngForm: NgForm): void {
  this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
    .subscribe({
      next: () => {
        ngForm.resetForm();
        this.resetCheckbox();
        this.showSentMessage();
      },
      error: (error) => {
        console.error('Fehler beim Senden:', error);
      }
    });
}

private resetCheckbox(): void {
  const checkboxEn = document.getElementById('customCheckbox') as HTMLInputElement;
  const checkboxDe = document.getElementById('customCheckboxDe') as HTMLInputElement;

  if (checkboxEn) checkboxEn.checked = false;
  if (checkboxDe) checkboxDe.checked = false;
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

onSubmit(ngForm: NgForm): void {
  if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
    this.sendMail(ngForm);
  } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
    ngForm.resetForm();
    this.resetCheckbox();
    this.showSentMessage();
  }
}

}
