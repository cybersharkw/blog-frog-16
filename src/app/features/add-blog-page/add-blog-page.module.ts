import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogPageComponent } from './add-blog-page.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AddBlogPageComponent,
  },
];

@NgModule({
  declarations: [AddBlogPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddBlogPageModule {}
