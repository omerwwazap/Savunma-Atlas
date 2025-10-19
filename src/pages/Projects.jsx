import React, { useState, useEffect, useMemo } from "react";
import DOMPurify from 'dompurify';
import { useData, rateLimit } from '../DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MobileNav from "../components/MobileNav.jsx";
import DesktopNav from "../components/DesktopNav";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";
import ExportCountryMap from "../components/ExportCountryMap";
import OptimizedImage from "../components/OptimizedImage";
import { ProjectCardSkeleton, ProjectTableSkeleton } from "../components/ProjectSkeleton";
import SearchableSelect from "../components/SearchableSelect";

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Convert export_country to ISO Alpha-3 codes
  const exportCountries = project.is_exported && project.export_country
    ? Array.isArray(project.export_country)
      ? project.export_country
      : typeof project.export_country === 'string'
        ? JSON.parse(project.export_country)
        : []
    : [];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      <div className="lg:sticky lg:top-0">
        <OptimizedImage
          src={project.image_url}
          alt={project.project_name}
          className="w-full h-[300px] object-contain rounded-lg shadow-md"
          width="100%"
          height="300px"
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">{project.project_name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InfoItem label={t("projects.company")} value={project.company_name} />
            <InfoItem label={t("projects.startDate")} value={project.pstart_date} />
            <InfoItem label={t("projects.serviceDate")} value={project.service_date} />
            <InfoItem label={t("projects.status")} value={project.status} />
            <InfoItem label={t("projects.type")} value={project.type} />
            <InfoItem label={t("projects.scale")} value={project.p_scale} />
          </div>
          <div className="space-y-2">
            <InfoItem label={t("projects.notes")} value={project.Notes} />
            <InfoItem label={t("projects.targetDate")} value={project.target_date} />
            <InfoItem label={t("projects.totalInService")} value={project.total_in_service} />
            <InfoItem
              label={t("projects.isExported")}
              value={typeof project.is_exported === 'boolean' ? (project.is_exported ? t("projects.yes") : t("projects.no")) : t("projects.unknown")}
            />
      <div>
        <InfoItem
          label={t("projects.exportCountries")}
          value={
            project.is_exported && project.export_country ? (
              <button
                onClick={() => setIsMapOpen(true)}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {t("projects.viewExportCountries")}
              </button>
            ) : (
              t("projects.na")
            )
          }
        />
        {project.is_exported && project.export_country && (
          <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
            <DialogPortal>
              <DialogContent className="w-[95vw] max-w-5xl h-[70vh] p-0 overflow-y-auto">
                <DialogHeader className="p-5 sticky top-0 bg-white z border-b">
                  <DialogTitle className="text-2xl">{t("projects.exportCountriesMap")}</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <ExportCountryMap countries={exportCountries} />
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        )}
      </div>
            <InfoItem label={t("projects.lastUpdated")} value={project.last_updated} />
          </div>
        </div>
        <div className="pt-4 border-t">
          <a
            href={project.company_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
          >
            <span className="mr-2">{t("projects.visitSite")}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  const { t } = useTranslation();
  return (
    <div>
      <span className="font-semibold">{label}:</span>{" "}
      <span>{value || t("projects.unknown")}</span>
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    status: '',
    is_exported: '',
    type: '',
    company_name: '',
  });
  const projectsPerPage = 10;
  const { getProjects } = useData();

  const handleSort = (key) => {
    // tri-state: asc -> desc -> none
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        setSortConfig({ key, direction: 'desc' });
        return;
      }
      if (sortConfig.direction === 'desc') {
        setSortConfig({ key: null, direction: 'asc' });
        return;
      }
    }
    setSortConfig({ key, direction: 'asc' });
  };

  const getSortedProjects = (projectsToSort) => {
    if (!sortConfig.key) return projectsToSort;

    return [...projectsToSort].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getUniqueValues = (key) => {
    return [...new Set(projects.map(project => project[key] || t("projects.unknown")))];
  };

  const statusOptions = useMemo(() => getUniqueValues('status'), [projects, t]);
  const typeOptions = useMemo(() => getUniqueValues('type'), [projects, t]);
  const companyOptions = useMemo(() => getUniqueValues('company_name'), [projects, t]);
  const companySelectOptions = useMemo(() => {
    const options = companyOptions.map((company) => ({
      value: company,
      label: company,
    }));
    return [
      { value: '', label: t("projects.allCompanies") },
      ...options,
    ];
  }, [companyOptions, t]);

  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return DOMPurify.sanitize(input.trim());
  };

  const handleSearch = (value) => {
    const sanitizedValue = sanitizeInput(value);
    setSearchTerm(sanitizedValue);
  };

  const handleFilterChange = (key, value) => {
    const sanitizedValue = sanitizeInput(value);
    setFilters(prev => ({ ...prev, [key]: sanitizedValue }));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        rateLimit(); // Apply rate limiting
        const { data, error } = await getProjects();

        if (error) throw error;

        // Sanitize data before setting state
        const sanitizedData = data.map(project => ({
          ...project,
          project_name: sanitizeInput(project.project_name),
          company_name: sanitizeInput(project.company_name),
          status: sanitizeInput(project.status),
          type: sanitizeInput(project.type),
          Notes: sanitizeInput(project.Notes),
          company_url: sanitizeInput(project.company_url)
        }));

        setProjects(sanitizedData);
        setFilteredProjects(sanitizedData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [getProjects]);

  useEffect(() => {
    let results = projects.filter((project) =>
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    if (filters.status) {
      results = results.filter(project => (project.status || t("projects.unknown")) === filters.status);
    }
    
    // Apply multi-select type filter
    if (filters.type) {
      results = results.filter(project => (project.type || t("projects.unknown")) === filters.type);
    }
    
    // Apply company filter
    if (filters.company_name) {
      results = results.filter(project => (project.company_name || t("projects.unknown")) === filters.company_name);
    }

    // Apply sorting
    results = getSortedProjects(results);

    setFilteredProjects(results);
    setCurrentPage(1);
  }, [searchTerm, projects, filters, sortConfig, t]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded"></div>
            <div className="hidden md:block">
              <div className="h-10 w-48 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="md:hidden">
              <div className="h-10 w-10 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
          <ProjectTableSkeleton />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative max-w-lg w-full" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("projects.title")}
          </h1>
          <DesktopNav />
          <MobileNav />
        </div>
        <div className="flex flex-col">
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 flex-grow">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold flex items-center justify-between">
                <span>{t("projects.tableTitle")}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {filteredProjects.length} {t("projects.totalProjects")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-4">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <Input
                    type="text"
                    placeholder={t("projects.searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-sm"
                    maxLength={100} // Prevent excessive long input
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {t("projects.status")}
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">{t("projects.allStatuses")}</option>
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {t("projects.type")}
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">{t("projects.allTypes")}</option>
                      {typeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {t("projects.company")}
                    </label>
                    <SearchableSelect
                      value={filters.company_name}
                      onChange={(value) => setFilters(prev => ({ ...prev, company_name: value }))}
                      options={companySelectOptions}
                      placeholder={t("projects.allCompanies")}
                      searchPlaceholder={t("projects.searchCompanies", "Search companies...")}
                      emptyMessage={t("projects.noCompanyResults", "No companies found")}
                    />
                  </div>
                </div>
                
                {(filters.status || filters.type || filters.company_name) && (
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setFilters({
                          status: '',
                          is_exported: '',
                          type: '',
                          company_name: '',
                        });
                      }}
                    >
                      {t("projects.clearFilters", "Clear Filters")}
                    </Button>
                  </div>
                )}
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        {t("projects.image")}
                      </TableHead>
                      <TableHead onClick={() => handleSort('project_name')} className="cursor-pointer hover:bg-gray-50">
                        {t("projects.projectName")}
                        {sortConfig.key === 'project_name' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </TableHead>
                      <TableHead onClick={() => handleSort('pstart_date')} className="cursor-pointer hover:bg-gray-50">
                        {t("projects.startDate")}
                        {sortConfig.key === 'pstart_date' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </TableHead>
                      <TableHead onClick={() => handleSort('service_date')} className="cursor-pointer hover:bg-gray-50">
                        {t("projects.serviceDate")}
                        {sortConfig.key === 'service_date' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </TableHead>
                      <TableHead onClick={() => handleSort('status')} className="cursor-pointer hover:bg-gray-50">
                        {t("projects.status")}
                        {sortConfig.key === 'status' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </TableHead>
                      <TableHead onClick={() => handleSort('total_in_service')} className="cursor-pointer hover:bg-gray-50">
                        {t("projects.totalInService")}
                        {sortConfig.key === 'total_in_service' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </TableHead>
                      <TableHead onClick={() => handleSort('company_name')} className="cursor-pointer hover:bg-gray-50">
                        {t("projects.company")}
                        {sortConfig.key === 'company_name' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </TableHead>
                      <TableHead onClick={() => handleSort('is_exported')} className="cursor-pointer hover:bg-gray-50">
                        {t("projects.isExported")}
                        {sortConfig.key === 'is_exported' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </TableHead>
                      <TableHead>{t("projects.companyLink")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProjects.map((project) => (
                      <TableRow
                        key={project.id}
                        className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setSelectedProject(project)}
                      >
                        <TableCell>
                          <OptimizedImage
                            src={project.image_url}
                            alt={project.project_name}
                            className="w-12 h-12 object-cover rounded-full"
                            width="48px"
                            height="48px"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {project.project_name}
                        </TableCell>
                        <TableCell>
                          {project.pstart_date || t("projects.unknown")}
                        </TableCell>
                        <TableCell>
                          {project.service_date || t("projects.unknown")}
                        </TableCell>
                        <TableCell>
                          {project.status || t("projects.unknown")}
                        </TableCell>
                        <TableCell>
                          {project.total_in_service}
                        </TableCell>
                        <TableCell>
                          {project.company_name || t("projects.unknown")}
                        </TableCell>
                        <TableCell>
                          {typeof project.is_exported === 'boolean'
                            ? (project.is_exported ? t("projects.yes") : t("projects.no"))
                            : t("projects.unknown")}
                        </TableCell>
                        <TableCell>
                          <a
                            href={project.company_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("projects.officialSite")}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                {Array.from(
                  {
                    length: Math.ceil(
                      filteredProjects.length / projectsPerPage
                    ),
                  },
                  (_, i) => (
                    <Button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className="mx-1"
                    >
                      {i + 1}
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Dialog
            open={!!selectedProject}
            onOpenChange={() => setSelectedProject(null)}
          >
            <DialogPortal>
              <DialogContent className="w-[95vw] max-w-5xl h-[70vh] p-0 overflow-y-auto">
                <DialogHeader className="p-5 sticky top-0 bg-white z border-b">
                  <DialogTitle className="text-2xl">{t("projects.projectDetails")}</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  {selectedProject ? <ProjectCard project={selectedProject} /> : <ProjectCardSkeleton />}
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
        <div className="mt-8">
          <AdBanner
            data-ad-client="ca-pub-5614882338601871"
            data-ad-slot="7210556660"
            format="auto"
          />
        </div>
      </div>
      <ContactInfo />
    </div>
  );
};

export default Projects;
