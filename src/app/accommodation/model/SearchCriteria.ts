export interface SearchCriteria {
    location: string | null;
    numberOfGuests: number;
    dateStart: Date | null;
    dateEnd: Date | null;
    contents: string[] | [];
    type: string;
    minPrice: number;
    maxPrice: number;
}
  