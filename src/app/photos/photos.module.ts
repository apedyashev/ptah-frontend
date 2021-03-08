import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { UploadComponent } from './upload-page/upload-page.component';

@NgModule({
  declarations: [PhotosComponent, UploadComponent],
  imports: [CommonModule, PhotosRoutingModule],
})
export class PhotosModule {}
