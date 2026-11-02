
// search Filter interface for the child component
export interface Props {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  sortOrder: string;
  setSortOrder: (v: string) => void;
  categories: string[];
}