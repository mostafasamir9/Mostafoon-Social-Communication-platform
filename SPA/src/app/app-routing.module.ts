import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate:[AuthGuard],
    children: [
      {path: 'members',component:MemberListComponent},
      {path: 'members/:username',component:MemberDetailComponent},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists',component:ListsComponent},
      {path: 'messages',component:MessagesComponent},
      {path: 'admin',component: AdminPanelComponent, canActivate: [AdminGuard]}
    ]
  },
  {path: 'errors',component:TestErrorsComponent},
  {path: 'not-found',component:NotFoundComponent},
  {path: 'server-error',component:ServerErrorComponent},
  {path: '**', component:NotFoundComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
