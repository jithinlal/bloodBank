import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BloodGroup } from '../models/blood-group.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
	public bloodGroups;
	constructor(
		private fireStoreService: FirestoreService,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.bloodGroups = this.fireStoreService
			.getBloodGroupList()
			.valueChanges();
	}

	logout() {
		this.authService.logout();
	}
}
