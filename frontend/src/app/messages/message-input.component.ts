import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent {

  constructor (private messageService: MessageService) { }

  onSubmit(form: NgForm) {

    const emailUser = localStorage.getItem('email')!
    console.log(emailUser)
    const messageAux = new Message(form.value.myContentngForm, emailUser);
    this.messageService.addMessage(messageAux).subscribe(() => {
      console.log("Message sent.");   
    });
    console.log(form);
    form.resetForm();
  }
}