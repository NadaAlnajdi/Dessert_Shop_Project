import { Component } from '@angular/core';
import { ContactformComponent } from '../Contact/contactform/contactform.component';
import { ContactinfoComponent } from '../Contact/contactinfo/contactinfo.component';

@Component({
  selector: 'app-contactlayout',
  standalone: true,
  imports: [ContactformComponent,ContactinfoComponent],
  templateUrl: './contactlayout.component.html',
  styleUrl: './contactlayout.component.css'
})
export class ContactlayoutComponent {

}
