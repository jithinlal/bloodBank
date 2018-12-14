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
	public bloodGroupId: string;
	public userCount: number;
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

	edit(id) {
		console.log(id);
	}

	async delete(id) {
		const that = this;
		this.fireStoreService
			.getBloodGroupName(this.bloodGroupId)
			.ref.get()
			.then(function(doc) {
				that.userCount = doc.data().userCount;
			});
		const alert = await this.alertController.create({
			message: 'Are you sure you want to remove this person?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: blah => {
						console.log('Confirm cancel:blah');
					},
				},
				{
					text: 'Delete',
					handler: () => {
						this.fireStoreService.removePerson(id).then(() => {
							this.fireStoreService.updateUserCount(this.bloodGroupId, this.userCount - 1).then(() => {
								that.router.navigateByUrl('');
							});
						});
					},
				},
			],
		});

		return await alert.present();
	}

	search(e) {
		this.persons = this.fireStoreService
			.getBloodGroupPersonsByName(this.bloodGroupId, e.target.value)
			.valueChanges();
	}
}
