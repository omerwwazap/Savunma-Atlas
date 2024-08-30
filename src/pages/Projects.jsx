import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MobileNav from "../components/MobileNav.jsx";
import DesktopNav from "../components/DesktopNav";
import { useSupabase } from "../SupabaseContext";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">
          {project.project_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={project.image_url}
          alt={project.project_name}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <div className="space-y-2 text-sm md:text-base">
          <p>
            <span className="font-semibold">{t("projects.company")}:</span>{" "}
            {project.company_name || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.startDate")}:</span>{" "}
            {project.pstart_date || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.serviceDate")}:</span>{" "}
            {project.service_date || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.status")}:</span>{" "}
            {project.status || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.type")}:</span>{" "}
            {project.type || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.scale")}:</span>{" "}
            {project.p_scale || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.notes")}:</span>{" "}
            {project.Notes || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.targetDate")}:</span>{" "}
            {project.target_date || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">
              {t("projects.totalInService")}:
            </span>{" "}
            {project.total_in_service || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.isExported")}:</span>{" "}
            {project.export ? t("projects.yes") : t("projects.no")}
          </p>
          <p>
            <span className="font-semibold">
              {t("projects.exportCountries")}:
            </span>{" "}
            {project.export_country
              ? JSON.stringify(project.export_country)
              : t("projects.na")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.lastUpdated")}:</span>{" "}
            {project.last_updated || t("projects.unknown")}
          </p>
          <p>
            <span className="font-semibold">{t("projects.companySite")}:</span>{" "}
            <a
              href={project.company_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t("projects.visitSite")}
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
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
  const projectsPerPage = 10;
  const supabase = useSupabase();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("atlasprojects")
          .select("*");

        if (error) throw error;
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [supabase]);

  useEffect(() => {
    const results = projects.filter((project) =>
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
    setCurrentPage(1);
  }, [searchTerm, projects]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <CardTitle className="text-xl md:text-2xl font-bold">
                {t("projects.tableTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder={t("projects.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        {t("projects.image")}
                      </TableHead>
                      <TableHead>{t("projects.projectName")}</TableHead>
                      <TableHead>{t("projects.startDate")}</TableHead>
                      <TableHead>{t("projects.serviceDate")}</TableHead>
                      <TableHead>{t("projects.status")}</TableHead>
                      <TableHead>{t("projects.totalInService")}</TableHead>
                      <TableHead>{t("projects.company")}</TableHead>
                      <TableHead>{t("projects.export")}</TableHead>
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
                          <img
                            src={project.image_url}
                            alt={project.project_name}
                            className="w-12 h-12 object-cover rounded-full"
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
                          {project.total_in_service || t("projects.unknown")}
                        </TableCell>
                        <TableCell>
                          {project.company_name || t("projects.unknown")}
                        </TableCell>
                        <TableCell>
                          {project.export
                            ? t("projects.yes")
                            : t("projects.no")}
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
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("projects.projectDetails")}</DialogTitle>
              </DialogHeader>
              {selectedProject && <ProjectCard project={selectedProject} />}
            </DialogContent>
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
