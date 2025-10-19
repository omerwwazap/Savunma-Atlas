import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import { useData, rateLimit } from "../DataContext";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";
import { Skeleton } from "@/components/ui/skeleton";
import OptimizedImage from "../components/OptimizedImage";

const CompanyProfile = () => {
  const { companyName } = useParams();
  const { t } = useTranslation();
  const { getProjects } = useData();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        rateLimit();
        const { data, error: fetchError } = await getProjects();

        if (fetchError) throw fetchError;

        // Filter projects by company name
        const decodedCompanyName = decodeURIComponent(companyName);
        const filteredProjects = data.filter(
          (p) => p.company_name.toLowerCase() === decodedCompanyName.toLowerCase()
        );

        setProjects(filteredProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [companyName, getProjects]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            <div className="hidden md:block">
              <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-6 md:py-12">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative max-w-lg w-full">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
          <Link to="/projects">
            <Button className="mt-4">← Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const companyNameDecoded = decodeURIComponent(companyName);
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "Active" || p.status === "In Progress").length;
  const exportedProjects = projects.filter((p) => p.is_exported).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-6 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div>
            <Link to="/projects">
              <Button variant="ghost" size="sm" className="mb-2">
                ← Back
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              {companyNameDecoded}
            </h1>
          </div>
          <DesktopNav />
          <MobileNav />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">Projects by this company</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects}</div>
              <p className="text-xs text-muted-foreground">Currently active or in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exported Projects</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{exportedProjects}</div>
              <p className="text-xs text-muted-foreground">Exported to other countries</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        {projects.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Projects by {companyNameDecoded}
            </h2>
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-6">
                  {/* Project Image */}
                  <div className="md:col-span-1">
                    <OptimizedImage
                      src={project.image_url}
                      alt={project.project_name}
                      className="w-full h-[250px] md:h-[200px] object-contain rounded-lg"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="md:col-span-3 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {project.project_name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded">
                          {project.type}
                        </span>
                        <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-3 py-1 rounded">
                          {project.status}
                        </span>
                        <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-semibold px-3 py-1 rounded">
                          {project.p_scale}
                        </span>
                        {project.is_exported && (
                          <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-semibold px-3 py-1 rounded">
                            Exported
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-semibold">Start Date:</p>
                        <p className="text-gray-800 dark:text-gray-200">{project.pstart_date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-semibold">Service Date:</p>
                        <p className="text-gray-800 dark:text-gray-200">{project.service_date || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-semibold">Total in Service:</p>
                        <p className="text-gray-800 dark:text-gray-200">{project.total_in_service}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-semibold">Last Updated:</p>
                        <p className="text-gray-800 dark:text-gray-200">{project.last_updated}</p>
                      </div>
                    </div>

                    {project.Notes && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-semibold text-sm">Notes:</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{project.Notes}</p>
                      </div>
                    )}

                    <div className="pt-2">
                      <a
                        href={project.company_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
                      >
                        View Company Website →
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found for {companyNameDecoded}
            </p>
            <Link to="/projects" className="mt-4 inline-block">
              <Button>Back to Projects</Button>
            </Link>
          </Card>
        )}

        <div className="mt-8">
          <AdBanner
            data-ad-client="ca-pub-5614882338601871"
            data-ad-slot="6976383252"
          />
        </div>
      </div>
      <ContactInfo />
    </div>
  );
};

export default CompanyProfile;
