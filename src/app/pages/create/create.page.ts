import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.page.html',
	styleUrls: ['./create.page.scss']
})
export class CreatePage implements OnInit {
	public addPersonForm: FormGroup;
	public bloodGroupId: string;
	public userCount = 0;
	constructor(
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public firestoreService: FirestoreService,
		public router: Router,
		public route: ActivatedRoute,
		formBuilder: FormBuilder
	) {
		this.addPersonForm = formBuilder.group({
			name: ['', Validators.required],
			place: ['', Validators.required],
			address: ['', Validators.required],
			contact: ['', Validators.required],
			bleedDate: ['']
		});
	}

	ngOnInit() {
		const bloodGroupId: string = this.route.snapshot.paramMap.get('id');
		this.bloodGroupId = bloodGroupId;
		const that = this;
		this.firestoreService
			.getBloodGroupName(bloodGroupId)
			.ref.get()
			.then(function(doc) {
				that.userCount = doc.data().userCount;
			});
	}

	async addPerson() {
		const loading = await this.loadingCtrl.create();

		const name = this.addPersonForm.value.name;
		const address = this.addPersonForm.value.address;
		const contact = this.addPersonForm.value.contact;
		const place = this.addPersonForm.value.place;
		const bleedDate = this.addPersonForm.value.bleedDate;
		const bloodGroupId = this.bloodGroupId;
		const that = this;
		await this.firestoreService
			.addPerson(name, address, place, contact, bleedDate, bloodGroupId)
			.then(() => {
				this.firestoreService
					.updateUserCount(bloodGroupId, this.userCount + 1)
					.then(function() {
						loading.dismiss().then(
							() => {
								that.router.navigateByUrl('members/home');
							},
							error => {
								console.error(error);
							}
						);
					});
			});
		return await loading.present();
	}
}
