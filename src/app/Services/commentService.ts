import {Component, Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'

import  'rxjs/add/operator/do'      //for debugging
import 'rxjs/add/operator/catch'    //for error handling
import 'rxjs/add/operator/map'      //for mapping http response to entity
import 'rxjs/add/observable/throw'  //for error handling
import 'rxjs/add/observable/of'

import {Icomment} from '../Objects/Icomment'

@Injectable()
export class CommentService
{
    constructor(private http: HttpClient){}

   private baseUrl: string = 'http://localhost:55140//api/comment';
    //private baseUrl: string = 'http://dev.lrs.liebert.com/ecntrackerapi/api/comment';


    saveComment(comment: Icomment): Observable<{comment:Icomment, ok:boolean}>{
        let headers = new HttpHeaders({'content-type':'application/JSON'});
        let options =  {headers: headers};
        return this.createComment(comment, options);
    }

//Call to create a new comment or update an existing one
createComment(comment: Icomment, options:  {headers:HttpHeaders}): Observable<{comment:Icomment, ok:boolean}>{
  let url = `${this.baseUrl}`

  return this.http.post<{comment:Icomment, ok:boolean}>(url,comment,options)
 // .do(data=>console.log('New Comment: ' + JSON.stringify(data)))
}


deleteComment(id:number): Observable<boolean>
{
    let url = `${this.baseUrl}/${id}`
    let headers = new HttpHeaders({'content-type': 'text'})
    let options =  ({headers: headers});

    return this.http.post<boolean>(url, options)
 //   .do(data=>console.log("delete: " + JSON.stringify(data)))
}

    updateComment(comment: Icomment, options: {headers:HttpHeaders}): Observable<{comment:Icomment, ok:boolean}>{
    let url = `${this.baseUrl}`;
    return this.http.put<{comment:Icomment, ok:boolean}>(url, comment, options)
           // .do(data=>{})
}

}