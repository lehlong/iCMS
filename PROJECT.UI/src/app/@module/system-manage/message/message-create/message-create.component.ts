import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
})
export class MessageCreateComponent {
  constructor(private router: Router) { }
}
