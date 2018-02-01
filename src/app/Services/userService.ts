import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'

import {Iuser} from '../Objects/Iuser'
import {baseUrl} from '../Objects/baseUrl'

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  //private baseUrl: string = 'http://localhost:55140//api/user';
//private baseUrl: string = 'http://dev.lrs.liebert.com/ecntrackerapi/api/user';

private baseUrl = baseUrl.concat("api/user");

 getUsers(): Observable<Iuser[]>{
   console.log(baseUrl)
    let endUrl = "all"
      let url = `${this.baseUrl}/${endUrl}`
      return this.http.get<Iuser[]>(url)
 }

}
