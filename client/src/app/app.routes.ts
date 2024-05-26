import { AboutlayoutComponent } from './components/aboutlayout/aboutlayout.component';
import { ContactlayoutComponent } from './components/contactlayout/contactlayout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'contact',component:ContactlayoutComponent},
  {path: 'about',component:AboutlayoutComponent}
];
