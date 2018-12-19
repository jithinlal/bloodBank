import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
	{
		path: 'create/:id',
		loadChildren: './pages/create/create.module#CreatePageModule',
	},
	{
		path: 'detail/:id',
		loadChildren: './pages/detail/detail.module#DetailPageModule',
	},
	{
		path: 'edit/:id',
		loadChildren: './pages/edit/edit.module#EditPageModule',
	},
	{ path: 'summary/:id/:groupId', loadChildren: './summary/summary/summary.module#SummaryPageModule' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
