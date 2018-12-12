import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BloodGroup } from '../../models/blood-group.interface';
import { Person } from '../../models/person.interface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.page.html',
	styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
	public bloodGroup: Observable<BloodGroup>;
	public persons: Observable<Person[]>;
	public bloodGroupId: String;
	constructor(
		private fireStoreService: FirestoreService,
		private route: ActivatedRoute,
		private alertController: AlertController,
		private router: Router
	) {}
	ngOnInit() {
		const bloodGroupId: string = this.route.snapshot.paramMap.get('id');
		this.bloodGroup = this.fireStoreService.getBloodGroupName(bloodGroupId).valueChanges();
		this.bloodGroupId = bloodGroupId;
		this.persons = this.fireStoreService.getBloodGroupPersons(bloodGroupId).valueChanges();
	}
	// async deleteSong() {
	// 	const alert = await this.alertController.create({
	// 		message: 'Are you sure you want to delete the song?',
	// 		buttons: [
	// 			{
	// 				text: 'Cancel',
	// 				role: 'cancel',
	// 				handler: blah => {
	// 					console.log('Confirm cancel:blah');
	// 				},
	// 			},
	// 			{
	// 				text: 'Okay',
	// 				handler: () => {
	// 					this.fireStoreService.deleteSong(this.songId).then(() => {
	// 						this.router.navigateByUrl('');
	// 					});
	// 				},
	// 			},
	// 		],
	// 	});
	// 	await alert.present();
	// }
}
