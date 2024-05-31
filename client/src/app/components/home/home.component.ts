import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import  {SliderComponent} from '../slider/slider.component'
import { CategoryComponent } from '../category/category.component';
import { ProductsWithPromotionComponent } from '../products-with-promotion/products-with-promotion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategoryComponent, ProductsWithPromotionComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
