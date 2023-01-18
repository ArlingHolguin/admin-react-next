export interface IFiltersRequestBody {
	id_list: string[];
	params: IFilterParams;
}

export interface IFilterParams {
	price?: Object;
	airlines?: string[];
	segments?: string[] | number[];
	departure_time?: Object;
}
