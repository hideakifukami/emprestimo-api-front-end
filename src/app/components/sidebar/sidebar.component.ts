import { Component } from '@angular/core';
import { faBars, faHouse, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faBars = faBars;
  faHouse = faHouse;
  faPeopleArrows = faPeopleArrows;

}
