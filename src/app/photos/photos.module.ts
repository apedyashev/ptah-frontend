import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { UiCardModule } from '../ui/card/card.module';
import { PhotosComponent } from './photos.component';
import { UploadComponent } from './upload-page/upload-page.component';

@NgModule({
  declarations: [PhotosComponent, UploadComponent],
  imports: [CommonModule, UiCardModule, PhotosRoutingModule],
})
export class PhotosModule {}
