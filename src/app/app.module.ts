import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {EcnData} from './BackendDataService/Ecn-Data';

import { AppComponent } from './app.component';
import { EcnListComponent } from './ecn-list/ecn-list.component';
import { EcnDetailsComponent } from './ecn/ecn-details.component';
import { EcnNewComponent } from './ecn-new/ecn-new.component';
import { EcnNewReactComponent } from './ecn-new-react/ecn-new-react.component';
import { ArrayLimiterPipe } from './ecn-list/array-limiter.pipe';
import { EcnCommentComponent } from './ecn-comment/ecn-comment.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { CommentService } from './Services/commentService';
import { CommentSorterPipe } from './ecn-list/comment-sorter.pipe';
import { EcnFilterPipe } from './ecn-list/ecn-filter.pipe';
import { EcnResourcePipe } from './ecn-list/ecn-resource.pipe';
import { EcnStatusPipe } from './ecn-list/ecn-status.pipe';
import { EcnPriorityPipe } from './ecn-list/ecn-priority.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EcnListComponent,
    EcnDetailsComponent,
    EcnNewComponent,
    EcnNewReactComponent,
    ArrayLimiterPipe,
    EcnCommentComponent,
    NewCommentComponent,
    CommentSorterPipe,
    EcnFilterPipe,
    EcnResourcePipe,
    EcnStatusPipe,
    EcnPriorityPipe
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'ecns', component: EcnListComponent},
      {path: 'ecns/:id', component: EcnNewReactComponent},
      {path: 'newecn', component: EcnNewReactComponent},
      {path: '', redirectTo: 'ecns', pathMatch: 'full'},
      {path: '**', redirectTo: 'ecns', pathMatch: 'full' }
    ]) 
   // InMemoryWebApiModule.forRoot(EcnData)   //This should be commented out if using call to an actual web api
  ],
  providers: [CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
