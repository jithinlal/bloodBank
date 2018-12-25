import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { firebaseConfig } from './credentials';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		IonicStorageModule.forRoot()
	],
	providers: [
		StatusBar,
		CallNumber,
		SplashScreen,
		GooglePlus,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		AngularFireAuth
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
