import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./photos/photos.module').then((m) => m.PhotosModule),
    pathMatch: 'full',
  },
  {
    path: 'account',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
    pathMatch: 'full',
  },
  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
