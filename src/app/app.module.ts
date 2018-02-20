import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
// import {DxChartModule, DxDataGridModule, DxPieChartModule} from 'devextreme-angular'

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
import { EcnTagsPipe } from './ecn-list/ecn-tags.pipe';
import { EcnSummaryPipe } from './ecn-list/ecn-summary.pipe';
import { ArrayTotalPipe } from './mathFilters/array-total.pipe';
import { EcnProjectPipe } from './ecn-list/ecn-project.pipe';
import { OkCancelComponent } from './common-components/ok-cancel/ok-cancel.component';
import { NpdProjectComponent } from './npd-project/npd-project.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { EcnTaskPipe } from './ecn-list/ecn-task.pipe';
import { ToggleSwitchComponent } from './common-components/toggle-switch/toggle-switch.component';
import { StatusCountPipe } from './ecn-list/status-count.pipe';
import { EcnSummaryComponent } from './ecn-summary/ecn-summary.component';

const appRoutes: Routes = [
      {path: 'home', component: HomeComponent},
      {path:':uId/:pId/ecns', component: EcnListComponent},
      {path:':uId/:pId/summary', component: EcnSummaryComponent},
      {path: ':uId/:pId/ecns/:id', component: EcnNewReactComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]

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
    EcnPriorityPipe,
    EcnTagsPipe,
    EcnSummaryPipe,
    ArrayTotalPipe,
    EcnProjectPipe,
    OkCancelComponent,
    NpdProjectComponent,
    NavBarComponent,
    HomeComponent,
    EcnTaskPipe,
    ToggleSwitchComponent,
    StatusCountPipe,
    EcnSummaryComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    // DxChartModule,
    // DxDataGridModule,
    // DxPieChartModule
   // InMemoryWebApiModule.forRoot(EcnData)   //This should be commented out if using call to an actual web api
  ],
  providers: [CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
