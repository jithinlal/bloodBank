import { Datetime } from '@ionic/angular';

export interface Person {
	id: string;
	name: string;
	phone: number;
	last_donation_date: Datetime;
	groupId: string;
	address: string;
}
