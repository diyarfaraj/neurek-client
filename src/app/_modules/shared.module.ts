import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    TabsModule.forRoot(),
    FileUploadModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    FileUploadModule,
    PaginationModule,
  ],
})
export class SharedModule {}
