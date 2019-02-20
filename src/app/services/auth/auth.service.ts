import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

const TOKEN_KEY = 'auth-token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authenticationState = new BehaviorSubject(false);
	private user: firebase.User;
	private User: Observable<firebase.User>;

	constructor(
		private storage: Storage,
		private plt: Platform,
		private afAuth: AngularFireAuth,
		private gplus: GooglePlus,
		private loadingController: LoadingController
	) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
		this.plt.ready().then(() => this.checkToken());
	}

	login() {
		if (this.plt.is('cordova')) {
			return this.nativeLogin();
		} else {
			return this.webLogin();
		}
		// the token that you get from google
		// // return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
		// return this.storage.set(TOKEN_KEY, 'googletokengoeshere').then(res => {
		// 	this.authenticationState.next(true);
		// });
	}

	async presentLoading(loading) {
		return await loading.present();
	}

	async nativeLogin(): Promise<any> {
		try {
			const loading = await this.loadingController.create({
				message: 'Please wait...',
				mode: 'ios',
				spinner: 'crescent',
				translucent: true
			});

			this.presentLoading(loading);

			const gplusUser = await this.gplus.login({
				webClientId:
					'1060060153730-ui25v1oq5r2k9rjg891bjrb5qinae109.apps.googleusercontent.com',
				offline: true,
				scopes: 'profile email'
			});
			const credential = await this.afAuth.auth
				.signInWithCredential(
					firebase.auth.GoogleAuthProvider.credential(
						gplusUser.idToken
					)
				)
				.then(res => {
					loading.dismiss();
					const that = this;
					this.storage
						.set(TOKEN_KEY, res.refreshToken)
						.then(result => {
							loading.dismiss();
							that.authenticationState.next(true);
						});
				});
			return credential;
		} catch (err) {
			console.log(err);
		}
	}

	async webLogin(): Promise<any> {
		try {
			const provider = new firebase.auth.GoogleAuthProvider();
			const credential = await this.afAuth.auth
				.signInWithPopup(provider)
				.then(res => {
					this.storage
						.set(TOKEN_KEY, res.user.refreshToken)
						.then(result => {
							this.authenticationState.next(true);
						});
				});
			return credential;
		} catch (err) {
			console.log(err);
		}
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider).then(res => {
				this.storage
					.set(TOKEN_KEY, res.user.refreshToken)
					.then(result => {
						this.authenticationState.next(true);
					});
			});
		} else {
			return this.afAuth.auth.signInWithRedirect(provider).then(() => {
				return this.afAuth.auth
					.getRedirectResult()
					.then(result => {
						console.log(result);
						const that = this;
						this.storage
							.set(TOKEN_KEY, result.user.refreshToken)
							.then(res => {
								that.authenticationState.next(true);
							});
					})
					.catch(function(error) {
						alert(error.message);
					});
			});
		}
	}

	logout() {
		this.afAuth.auth.signOut();
		if (this.plt.is('cordova')) {
			this.gplus.logout();
		}
		return this.storage.remove(TOKEN_KEY).then(() => {
			this.authenticationState.next(false);
		});
	}
	isAuthenticated() {
		return this.authenticationState.value;
	}
	checkToken() {
		// need to check if the token is valid or not expired etc.
		return this.storage.get(TOKEN_KEY).then(res => {
			if (res) {
				this.authenticationState.next(true);
			}
		});
	}
}
