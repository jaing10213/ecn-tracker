import { Component, OnInit } from '@angular/core';
import {Iproject} from '../Objects/Iproject';
import {ProjectService} from '../Services/projectService'

@Component({
  selector: 'app-npd-project',
  templateUrl: './npd-project.component.html',
  styleUrls: ['./npd-project.component.css']
})
export class NpdProjectComponent implements OnInit {

  constructor(private _projectService: ProjectService) { }

  ngOnInit() {
  }

}
