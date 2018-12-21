import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Person } from '../../models/person.interface';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
	public editPersonForm: FormGroup;
	public personId: string;
	public person: Observable<Person>;
	constructor(
		private fireStoreService: FirestoreService,
		private router: Router,
		private route: ActivatedRoute,
		formBuilder: FormBuilder,
		public loadingCtrl: LoadingController
	) {
		this.personId = this.route.snapshot.paramMap.get('id');
		this.editPersonForm = formBuilder.group({
			name: ['', Validators.required],
			place: ['', Validators.required],
			address: ['', Validators.required],
			contact: ['', Validators.required],
			bleedDate: ['']
		});
	}

	ngOnInit() {
		this.fireStoreService
			.getPersonDetails(this.personId)
			.valueChanges()
			.subscribe(data => {
				this.editPersonForm.setValue({
					name: data.name,
					place: data.place,
					address: data.address,
					contact: data.phone,
					bleedDate: data.last_donation_date
				});
			});
	}

	async editPerson() {
		const loading = await this.loadingCtrl.create();

		const name = this.editPersonForm.value.name;
		const address = this.editPersonForm.value.address;
		const contact = this.editPersonForm.value.contact;
		const place = this.editPersonForm.value.place;
		const bleedDate = this.editPersonForm.value.bleedDate;

		const that = this;
		this.fireStoreService
			.editPerson(name, address, place, contact, bleedDate, this.personId)
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
		return await loading.present();
	}
}
