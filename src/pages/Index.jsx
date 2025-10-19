import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import { useData, rateLimit } from "../DataContext";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";
import OptimizedImage from "../components/OptimizedImage";

// Statistics Card Component
const StatCard = ({ title, value, icon, description }) => (
  <Card className="bg-white dark:bg-gray-800 text-center hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="text-4xl md:text-5xl">{icon}</div>
        <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
          {value}
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-gray-200">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Category Card Component
const CategoryCard = ({ type, count, icon, description }) => (
  <Link to={`/projects?type=${type}`}>
    <Card className="bg-gradient-to-br hover:shadow-lg transition-shadow cursor-pointer h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <CardTitle className="text-lg">{type}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">{count} projects</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

// Featured Project Card
const FeaturedProjectCard = ({ project }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative h-40 bg-gray-200 dark:bg-gray-700">
      <OptimizedImage
        src={project.image_url}
        alt={project.project_name}
        className="w-full h-full object-cover"
      />
    </div>
    <CardHeader>
      <CardTitle className="text-lg line-clamp-2">{project.project_name}</CardTitle>
      <p className="text-sm text-gray-500 dark:text-gray-400">{project.company_name}</p>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
          {project.type}
        </span>
        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
          {project.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
        {project.Notes}
      </p>
      <Link to="/projects">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const Index = () => {
  const { t } = useTranslation();
  const { getProjects } = useData();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        rateLimit();
        const { data, error } = await getProjects();
        if (error) throw error;
        setProjects(data);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [getProjects]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!projects.length) return { total: 0, companies: 0, exported: 0, types: {} };

    const companies = new Set(projects.map(p => p.company_name)).size;
    const exported = projects.filter(p => p.is_exported).length;
    const types = projects.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {});

    return {
      total: projects.length,
      companies,
      exported,
      types
    };
  }, [projects]);

  // Get featured projects (latest 3)
  const featuredProjects = useMemo(() => {
    return projects.slice(0, 3).filter(p => p.image_url);
  }, [projects]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="text-red-600 dark:text-red-400">Error loading data: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t("index.title")}
          </h1>
          <DesktopNav />
          <MobileNav />
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-800 rounded-lg shadow-lg p-6 md:p-12 mb-8 text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            {t("index.heroTitle")}
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            {t("index.subheader")}
          </p>
          <p className="text-blue-100 mb-6 max-w-2xl">
            {t("index.heroDescription")}
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2">
              <Link to="/projects">{t("index.browseProjects")}</Link>
            </Button>
            <Button asChild className="bg-blue-100 text-blue-700 hover:bg-blue-50 font-semibold px-6 py-2">
              <Link to="/dashboard">{t("index.viewDashboard")}</Link>
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard 
            title={t("index.totalProjects")} 
            value={stats.total} 
            icon="📋"
            description={t("index.militaryProjects")}
          />
          <StatCard 
            title={t("index.companies")} 
            value={stats.companies} 
            icon="🏢"
            description={t("index.defenseContractors")}
          />
          <StatCard 
            title={t("index.exported")} 
            value={stats.exported} 
            icon="🌍"
            description={t("index.exportedProjects")}
          />
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {t("index.featuredProjects")}
              </h3>
              <Link to="/projects">
                <Button variant="ghost">{t("index.viewAll")} →</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map(project => (
                <FeaturedProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Project Categories */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            {t("index.browseByCategory")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stats.types).map(([type, count]) => {
              const icons = {
                'Land': '🚛',
                'Sea': '⛴️',
                'Air': '✈️',
                'Space': '🛰️'
              };
              const descriptionKeys = {
                'Land': 'index.landProjects',
                'Sea': 'index.seaProjects',
                'Air': 'index.airProjects',
                'Space': 'index.spaceProjects'
              };
              return (
                <CategoryCard
                  key={type}
                  type={type}
                  count={count}
                  icon={icons[type] || '🔧'}
                  description={t(descriptionKeys[type] || 'index.militaryProjects')}
                />
              );
            })}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            {t("index.keyFeatures")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔍 <span>{t("index.intelligentSearch")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("index.fuzzySearchDescription")}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🏢 <span>{t("index.companyProfiles")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("index.viewProjectsDescription")}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 <span>{t("index.analytics")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("index.visualizeDataDescription")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 rounded-lg shadow-lg p-6 md:p-12 mb-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("index.wantToContribute")}</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            {t("index.contributeDescription")}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-2">
              <Link to="/about">{t("index.learnHowToContribute")}</Link>
            </Button>
            <Button asChild className="bg-green-100 text-green-700 hover:bg-green-50 font-semibold px-6 py-2">
              <a href="https://github.com/omerwwazap/Savunma-Atlas" target="_blank" rel="noopener noreferrer">
                {t("index.visitGitHub")}
              </a>
            </Button>
          </div>
        </div>

        {/* Ad Banner */}
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

export default Index;
