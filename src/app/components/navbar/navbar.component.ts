import { Component } from '@angular/core';
import { faBars, faHouse, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faBars = faBars;
  faHouse = faHouse;
  faPeopleArrows = faPeopleArrows;

}
