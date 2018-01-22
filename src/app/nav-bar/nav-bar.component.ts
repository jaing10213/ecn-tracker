import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../Services/projectService'
import {Iproject} from '../Objects/Iproject'
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ProjectService]
})
export class NavBarComponent implements OnInit {

  constructor(private _projectService: ProjectService) {}
    
 projectList: Iproject[];

  ngOnInit() {
    this._projectService.getProjects().subscribe(
      projects=> { this.projectList = projects
    //  console.log(JSON.stringify(this.projectList));
  }
    )
  }

}
