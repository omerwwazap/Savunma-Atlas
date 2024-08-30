import React, { useState, useEffect, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MobileNav from '../components/MobileNav.jsx';
import DesktopNav from '../components/DesktopNav';
import { useSupabase } from '../SupabaseContext';
import { useLanguage } from '../LanguageContext';

const ProjectCard = ({ project }) => {
  const { language } = useLanguage();
  const translations = {
    en: {
      company: "Company",
      projectStartDate: "Project Start Date",
      inServiceDate: "In Service Date",
      projectStatus: "Project Status",
      projectType: "Project Type",
      projectScale: "Project Scale",
      notes: "Notes",
      targetDateForService: "Target Date for Service",
      totalInService: "Total in Service",
      isExported: "Is Exported",
      exportCountries: "Export Countries",
      lastUpdated: "Last Updated",
      companySite: "Company Site",
      visitOfficialSite: "Visit Official Site",
      unknown: "Unknown",
      yes: "Yes",
      no: "No",
    },
    tr: {
      company: "Şirket",
      projectStartDate: "Proje Başlangıç Tarihi",
      inServiceDate: "Hizmete Giriş Tarihi",
      projectStatus: "Proje Durumu",
      projectType: "Proje Tipi",
      projectScale: "Proje Ölçeği",
      notes: "Notlar",
      targetDateForService: "Hedef Hizmet Tarihi",
      totalInService: "Toplam Hizmette",
      isExported: "İhraç Edildi mi",
      exportCountries: "İhraç Edilen Ülkeler",
      lastUpdated: "Son Güncelleme",
      companySite: "Şirket Sitesi",
      visitOfficialSite: "Resmi Siteyi Ziyaret Et",
      unknown: "Bilinmiyor",
      yes: "Evet",
      no: "Hayır",
    }
  };

  const t = translations[language];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">{project.project_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={project.image_url} alt={project.project_name} className="w-full h-48 object-cover mb-4 rounded-md" />
        <div className="space-y-2 text-sm md:text-base">
          <p><span className="font-semibold">{t.company}:</span> {project.company_name || t.unknown}</p>
          <p><span className="font-semibold">{t.projectStartDate}:</span> {project.pstart_date || t.unknown}</p>
          <p><span className="font-semibold">{t.inServiceDate}:</span> {project.service_date || t.unknown}</p>
          <p><span className="font-semibold">{t.projectStatus}:</span> {project.status || t.unknown}</p>
          <p><span className="font-semibold">{t.projectType}:</span> {project.type || t.unknown}</p>
          <p><span className="font-semibold">{t.projectScale}:</span> {project.p_scale || t.unknown}</p>
          <p><span className="font-semibold">{t.notes}:</span> {project.Notes || t.unknown}</p>
          <p><span className="font-semibold">{t.targetDateForService}:</span> {project.target_date || t.unknown}</p>
          <p><span className="font-semibold">{t.totalInService}:</span> {project.total_in_service || t.unknown}</p>
          <p><span className="font-semibold">{t.isExported}:</span> {project.export ? t.yes : t.no}</p>
          <p><span className="font-semibold">{t.exportCountries}:</span> {project.export_country ? JSON.stringify(project.export_country) : "N/A"}</p>
          <p><span className="font-semibold">{t.lastUpdated}:</span> {project.last_updated || t.unknown}</p>
          <p>
            <span className="font-semibold">{t.companySite}:</span>{' '}
            <a href={project.company_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {t.visitOfficialSite}
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const projectsPerPage = 15;
  const supabase = useSupabase();
  const { language } = useLanguage();

  const translations = {
    en: {
      militaryProjects: "Military Projects",
      projectsTable: "Projects Table",
      searchProjects: "Search projects...",
      image: "Image",
      projectName: "Project Name",
      startDate: "Start Date",
      serviceDate: "Service Date",
      status: "Status",
      totalInService: "Total In Service",
      company: "Company",
      export: "Export",
      companyLink: "Company Link",
      officialSite: "Official Site",
      unknown: "Unknown",
      sortBy: "Sort by",
      filterBy: "Filter by",
      type: "Type",
      companyName: "Company Name",
      yes: "Yes",
      no: "No",
      loadingProjects: "Loading projects...",
      error: "Error",
      projectDetails: "Project Details",
    },
    tr: {
      militaryProjects: "Askeri Projeler",
      projectsTable: "Projeler Tablosu",
      searchProjects: "Projelerde ara...",
      image: "Görsel",
      projectName: "Proje Adı",
      startDate: "Başlangıç Tarihi",
      serviceDate: "Hizmet Tarihi",
      status: "Durum",
      totalInService: "Toplam Hizmette",
      company: "Şirket",
      export: "İhracat",
      companyLink: "Şirket Bağlantısı",
      officialSite: "Resmi Site",
      unknown: "Bilinmiyor",
      sortBy: "Sırala",
      filterBy: "Filtrele",
      type: "Tip",
      companyName: "Şirket Adı",
      yes: "Evet",
      no: "Hayır",
      loadingProjects: "Projeler yükleniyor...",
      error: "Hata",
      projectDetails: "Proje Detayları",
    }
  };

  const t = translations[language];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('atlasprojects')
          .select('*');

        if (error) throw error;
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [supabase]);

  const sortedAndFilteredProjects = useMemo(() => {
    let result = [...projects];

    // Apply filters
    if (filterType) {
      result = result.filter(project => project.type === filterType);
    }
    if (filterCompany) {
      result = result.filter(project => project.company_name === filterCompany);
    }
    if (filterStatus) {
      result = result.filter(project => project.status === filterStatus);
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(project =>
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === 'dateAsc') {
      result.sort((a, b) => new Date(a.pstart_date) - new Date(b.pstart_date));
    } else if (sortOption === 'dateDesc') {
      result.sort((a, b) => new Date(b.pstart_date) - new Date(a.pstart_date));
    } else if (sortOption === 'statusAsc') {
      result.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortOption === 'statusDesc') {
      result.sort((a, b) => b.status.localeCompare(a.status));
    }

    return result;
  }, [projects, searchTerm, sortOption, filterType, filterCompany, filterStatus]);

  useEffect(() => {
    setFilteredProjects(sortedAndFilteredProjects);
    setCurrentPage(1);
  }, [sortedAndFilteredProjects]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>{t.loadingProjects}</div>;
  if (error) return <div>{t.error}: {error}</div>;

  const uniqueTypes = [...new Set(projects.map(project => project.type))];
  const uniqueCompanies = [...new Set(projects.map(project => project.company_name))];
  const uniqueStatuses = [...new Set(projects.map(project => project.status))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t.militaryProjects}</h1>
          <DesktopNav />
          <MobileNav />
        </div>
        <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">{t.projectsTable}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-4">
              <Input
                type="text"
                placeholder={t.searchProjects}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateAsc">Date (Ascending)</SelectItem>
                  <SelectItem value="dateDesc">Date (Descending)</SelectItem>
                  <SelectItem value="statusAsc">Status (A-Z)</SelectItem>
                  <SelectItem value="statusDesc">Status (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`${t.filterBy} ${t.type}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {uniqueTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterCompany} onValueChange={setFilterCompany}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`${t.filterBy} ${t.companyName}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Companies</SelectItem>
                  {uniqueCompanies.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`${t.filterBy} ${t.status}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {uniqueStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t.image}</TableHead>
                    <TableHead>{t.projectName}</TableHead>
                    <TableHead>{t.startDate}</TableHead>
                    <TableHead>{t.serviceDate}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.totalInService}</TableHead>
                    <TableHead>{t.company}</TableHead>
                    <TableHead>{t.export}</TableHead>
                    <TableHead>{t.companyLink}</TableHead>
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
                        <img src={project.image_url} alt={project.project_name} className="w-12 h-12 object-cover rounded-full" />
                      </TableCell>
                      <TableCell className="font-medium">{project.project_name}</TableCell>
                      <TableCell>{project.pstart_date || t.unknown}</TableCell>
                      <TableCell>{project.service_date || t.unknown}</TableCell>
                      <TableCell>{project.status || t.unknown}</TableCell>
                      <TableCell>{project.total_in_service || t.unknown}</TableCell>
                      <TableCell>{project.company_name || t.unknown}</TableCell>
                      <TableCell>{project.export ? t.yes : t.no}</TableCell>
                      <TableCell>
                      <a href={project.company_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                        {t.officialSite}
                      </a>
                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex justify-center">
              {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className="mx-1"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t.projectDetails}</DialogTitle>
            </DialogHeader>
            {selectedProject && <ProjectCard project={selectedProject} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Projects;
