import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './photos.component';
import { UploadComponent } from './upload-page/upload-page.component';

const routes: Routes = [
  { path: '', component: PhotosComponent, pathMatch: 'full' },
  { path: 'upload', component: UploadComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosRoutingModule {}
