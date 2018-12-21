import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authenticationState = new BehaviorSubject(false);
	constructor(private storage: Storage, private plt: Platform) {
		this.plt.ready().then(() => this.checkToken());
	}

	login() {
		// the token that you get from google
		return this.storage.set(TOKEN_KEY, 'googletokengoeshere').then(res => {
			this.authenticationState.next(true);
		});
	}
	logout() {
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
