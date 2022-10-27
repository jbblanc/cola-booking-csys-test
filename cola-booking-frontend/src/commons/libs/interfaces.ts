import type { AccountRole } from "$datasources/account.datasource";

export interface Company {
	id: string;
	name: string;
}

export interface Room {
	id: string;
	code: string;
	floor?: string;
	companyId: string;
	companyName?: string;
}

export interface Reservation {
	id: string;
	roomId: string;
	roomDetails: {
		code: string;
		company: string;
	};
	timeSlot: Date;
	durationInMin?: number;
	ownerAccountId: string;
	ownerDetails?: {
		fullName?: string;
		company?: string;
	};
}

export interface Account {
	id: string;
	authenticationId: string;
	roles: AccountRole[];
  companyId: string;
	profile: {
		email: string;
		firstName: string;
		lastName: string;
		gender: string;
		avatarUrl: string;
		jobPosition: string;
	};
	isEmailVerified: boolean;
	hasAcceptedTerms: boolean;
	hasConsentedDataProcessing: boolean;
	createdOn: Date;
	lastModifiedOn: Date;
	status: string;
}

export interface ScheduleSlot {
	startHour: number;
}

export interface BookReservationDto {
	roomId: string;
	timeSlot: Date;
}
