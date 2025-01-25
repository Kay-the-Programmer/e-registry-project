import { Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {InboxComponent} from './admin/inbox/inbox.component';
import {SentComponent} from './admin/sent/sent.component';
import {DraftsComponent} from './admin/drafts/drafts.component';
import {FileRequestsComponent} from './admin/file-requests/file-requests.component';
import {FilesComponent} from './admin/files/files.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent},
  { path: 'user', component: UserComponent},
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'sent', component: SentComponent },
      { path: 'drafts', component: DraftsComponent },
      { path: 'file-requests', component: FileRequestsComponent },
      { path: 'files', component: FilesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
];
