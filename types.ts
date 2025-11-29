export interface Product {
  id: string;
  title: string;
  image: string;
  essence: string;
  type: string;
  quality: string;
  drying: string;
  thickness: string;
  lengths: string;
  seller: string;
  stock: number;
  pricePerM3: number;
  currency: string;
}

export interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
}
