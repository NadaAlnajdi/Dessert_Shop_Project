import { AboutlayoutComponent } from './components/aboutlayout/aboutlayout.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/About/about/about.component';
import { TestimonialComponent } from './components/About/testimonial/testimonial.component';
import { TeamComponent } from './components/About/team/team.component';
import { ContactlayoutComponent } from './components/contactlayout/contactlayout.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AboutComponent,TeamComponent,TestimonialComponent,ContactlayoutComponent,AboutlayoutComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}

