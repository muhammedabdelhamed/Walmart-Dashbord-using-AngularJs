export interface Subcategory {
  _id?: string;
  name: string;
  name_ar: string;
  image: string;
  parentCategory: string;
  createdAt?: Date;
  updatedAt?: Date;
}
