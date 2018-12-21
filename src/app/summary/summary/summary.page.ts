import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Person } from '../../models/person.interface';
import { BloodGroup } from '../../models/blood-group.interface';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.page.html',
	styleUrls: ['./summary.page.scss']
})
export class SummaryPage implements OnInit {
	public personId: string;
	public groupId: string;
	public phoneNumber: number;
	public groupName: string;
	public imagePath: string;
	public person: Observable<Person>;
	public group: Observable<BloodGroup>;

	constructor(
		private fireStoreService: FirestoreService,
		private route: ActivatedRoute,
		private callNumber: CallNumber
	) {
		this.personId = this.route.snapshot.paramMap.get('id');
		this.groupId = this.route.snapshot.paramMap.get('groupId');
	}

	ngOnInit() {
		this.person = this.fireStoreService
			.getPersonDetails(this.personId)
			.valueChanges();
		this.person.subscribe(val => {
			this.phoneNumber = val.phone;
		});
		this.group = this.fireStoreService
			.getBloodGroupName(this.groupId)
			.valueChanges();
		this.group.subscribe(val => {
			this.groupName = val.group.replace(/ /g, '');
			this.imagePath = 'assets/img/' + this.groupName + '.png';
		});
	}

	call(num) {
		this.callNumber
			.callNumber(num, true)
			.then(res => console.log('Launched dialer', res))
			.catch(err => console.log('Error launching dialer', err));
	}
}
