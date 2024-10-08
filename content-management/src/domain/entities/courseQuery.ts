export interface ICourseQuery {
  page: number;
  limit: number;
  search: string;
  sort: string;
  category?: string[];
  instructor?: string[];
  price?: string[];
  userId: string;
}
