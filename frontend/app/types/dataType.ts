export interface DataType {
    id: number;
    url: string;
    title: string;
    created: Date;
    createdbyid: number;
    createdby: string;
    isfavourite?: boolean;
}
