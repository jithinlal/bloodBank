import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreatePage } from './create.page';

const routes: Routes = [
	{
		path: '',
		component: CreatePage,
	},
];

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), ReactiveFormsModule],
	declarations: [CreatePage],
})
export class CreatePageModule {}
