import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DateRange = {
  from: Date;
  to?: Date;
};

export interface Project {
  id: string | number;
  project_name: string;
  company_name?: string;
  pstart_date?: string;
  service_date?: string;
  status?: string;
  type?: string;
  p_scale?: string;
  Notes?: string;
  target_date?: string;
  total_in_service?: number;
  is_exported?: boolean;
  export_country?: string[] | string;
  last_updated?: string;
  company_url?: string;
  image_url?: string;
}

export interface FilterState {
  status: string;
  is_exported: string;
  type: string;
  company_name: string;
  selectedTypes: string[];
  selectedCompanies: string[];
  dateRange?: DateRange;
}

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}
