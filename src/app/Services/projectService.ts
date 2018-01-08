import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'

import {Iproject} from '../Objects/Iproject'

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = 'http://localhost:55140//api/project';
//private baseUrl: string = 'http://dev.lrs.liebert.com/ecntrackerapi/api/project';

 getProjects(): Observable<Iproject[]>{
    let endUrl = "all"
      let url = `${this.baseUrl}/${endUrl}`
      return this.http.get<Iproject[]>(url)
 }

}
