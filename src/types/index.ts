export interface Message {
	id: number;
	text: string;
	isOwner: boolean;
}

export type AuthedRequest<T = void> = T & {
	token: string;
};
