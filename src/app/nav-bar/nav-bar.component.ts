import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../Services/projectService'
import {UserService} from '../Services/userService'
import {Iproject} from '../Objects/Iproject'
import {Iuser} from '../Objects/Iuser'
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ProjectService, UserService]
})
export class NavBarComponent implements OnInit {

  constructor(private _projectService: ProjectService,
              private _userService: UserService) {}
    
 projectList: Iproject[];
 userList: Iuser[];

  ngOnInit() {
    this._projectService.getProjects().subscribe(
      projects=> { this.projectList = projects}
    )

    this._userService.getUsers().subscribe(
      users=> {this.userList = users}
    )
  }

}
