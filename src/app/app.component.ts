import { Component } from '@angular/core';

import {EcnListComponent} from './ecn-list/ecn-list.component';
import {EcnService} from './Services/ecn-list.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EcnService]
})
export class AppComponent {
  title = 'app works!';
}
