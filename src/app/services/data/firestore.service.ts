import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BloodGroup } from '../../models/blood-group.interface';
import { Person } from '../../models/person.interface';

@Injectable({
	providedIn: 'root',
})
export class FirestoreService {
	constructor(public fireStore: AngularFirestore) {}

	addPerson(name: string, address: string, phone: number, last_donation_date: any, groupId: string): Promise<void> {
		const id = this.fireStore.createId();
		return this.fireStore.doc(`persons/${id}`).set({ id, name, last_donation_date, phone, address, groupId });
	}

	getBloodGroupList(): AngularFirestoreCollection<BloodGroup> {
		return this.fireStore.collection(`bloodGroups`);
	}

	getBloodGroupName(groupId: string): AngularFirestoreDocument<BloodGroup> {
		return this.fireStore.collection('bloodGroups').doc(groupId);
	}

	getBloodGroupPersons(groupId: string): AngularFirestoreCollection<Person> {
		return this.fireStore.collection(`persons`, ref =>
			ref.where('groupId', '==', groupId).orderBy('last_donation_date', 'asc')
		);
	}

	getBloodGroupPersonsByName(groupId: string, text: string): AngularFirestoreCollection<Person> {
		return this.fireStore.collection(`persons`, ref =>
			ref
				.where('groupId', '==', groupId)
				.where('name', '==', text)
				.orderBy('last_donation_date', 'asc')
		);
	}

	updateUserCount(groupId, userCount) {
		return this.fireStore
			.collection(`bloodGroups`)
			.doc(groupId)
			.update({ userCount });
	}

	removePerson(personId: String): Promise<void> {
		return this.fireStore.doc(`persons/${personId}`).delete();
	}
}
