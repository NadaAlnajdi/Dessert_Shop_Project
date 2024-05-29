import { Component } from '@angular/core';
import { HeadrComponent } from '../headr/headr.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeadrComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
