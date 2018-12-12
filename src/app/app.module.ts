import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebasConfig } from './credentials';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(firebasConfig),
		AngularFirestoreModule,
	],
	providers: [StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
	bootstrap: [AppComponent],
})
export class AppModule {}
