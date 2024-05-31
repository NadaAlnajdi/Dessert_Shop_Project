import { TestimonialComponent } from './../About/testimonial/testimonial.component';
import { Component } from '@angular/core';
import { AboutComponent } from '../About/about/about.component';
import { TeamComponent } from '../About/team/team.component';

@Component({
  selector: 'app-aboutlayout',
  standalone: true,
  imports: [AboutComponent,TeamComponent,TestimonialComponent],
  templateUrl: './aboutlayout.component.html',
  styleUrl: './aboutlayout.component.css'
})
export class AboutlayoutComponent {

}
