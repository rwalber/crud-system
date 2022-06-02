export interface IPagination {
    totalElements?: number;
	page?: number;
	size?: number;
}

export class Pagination {

    totalElements: number;
	page: number = 1;
	size: number;

	constructor(size?: number) {
		this.size = size || 5;
        this.totalElements = 0;
	}
}
