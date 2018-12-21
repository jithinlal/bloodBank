import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/guard/auth-guard.service';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	// { path: 'home', loadChildren: './home/home.module#HomePageModule' },
	// {
	// 	path: 'create/:id',
	// 	loadChildren: './pages/create/create.module#CreatePageModule'
	// },
	// {
	// 	path: 'detail/:id',
	// 	loadChildren: './pages/detail/detail.module#DetailPageModule'
	// },
	// {
	// 	path: 'edit/:id',
	// 	loadChildren: './pages/edit/edit.module#EditPageModule'
	// },
	// {
	// 	path: 'summary/:id/:groupId',
	// 	loadChildren: './summary/summary/summary.module#SummaryPageModule'
	// },
	{
		path: 'login',
		loadChildren: './pages/login/login.module#LoginPageModule'
	},
	{
		path: 'register',
		loadChildren: './pages/register/register.module#RegisterPageModule'
	},
	{
		path: 'members',
		canActivate: [AuthGuardService],
		loadChildren: './members/member-routing.module#MemberRoutingModule'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
