import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DateRange = {
  from: Date;
  to?: Date;
};

export interface Project {
  id: number;
  created_at: string;
  project_name: string;
  image_url: string;
  pstart_date: string;
  service_date: string;
  status: string;
  company_name: string;
  company_url: string;
  type: string;
  p_scale: string;
  Notes: string;
  total_in_service: number;
  last_updated: string;
  target_date: string;
  is_exported: boolean;
  export_country?: string | string[];
  image_url?: string;
}

export interface FilterState {
  searchTerm: string;
  selectedCompany?: string;
  selectedStatus?: string;
  selectedType?: string;
  dateRange?: DateRange;
}

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

/**
 * Export projects to CSV format
 * @param projects Array of projects to export
 * @param filename Optional filename for download
 */
export function exportToCSV(projects: Project[], filename: string = 'projects.csv'): void {
  if (!projects || projects.length === 0) {
    console.warn('No projects to export');
    return;
  }

  // Define CSV headers
  const headers = [
    'ID',
    'Project Name',
    'Company',
    'Company URL',
    'Type',
    'Status',
    'Scale',
    'Start Date',
    'Service Date',
    'Target Date',
    'Total in Service',
    'Notes',
    'Is Exported',
    'Export Countries',
    'Last Updated'
  ];

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...projects.map(project => {
      const row = [
        project.id,
        `"${project.project_name}"`,
        `"${project.company_name}"`,
        `"${project.company_url}"`,
        `"${project.type}"`,
        `"${project.status}"`,
        `"${project.p_scale}"`,
        project.pstart_date,
        project.service_date,
        project.target_date,
        project.total_in_service,
        `"${project.Notes}"`,
        project.is_exported ? 'Yes' : 'No',
        Array.isArray(project.export_country)
          ? `"${project.export_country.join(';')}"`
          : typeof project.export_country === 'string'
          ? `"${project.export_country}"`
          : ''
      ];
      return row.join(',');
    })
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export projects to JSON format
 * @param projects Array of projects to export
 * @param filename Optional filename for download
 */
export function exportToJSON(projects: Project[], filename: string = 'projects.json'): void {
  if (!projects || projects.length === 0) {
    console.warn('No projects to export');
    return;
  }

  const jsonContent = JSON.stringify(
    {
      exportDate: new Date().toISOString(),
      totalProjects: projects.length,
      projects: projects
    },
    null,
    2
  );

  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
