import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import { useData, rateLimit } from "../DataContext";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";
import { Search, TrendingUp, Zap, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Companies = () => {
  const { t } = useTranslation();
  const { getProjects } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("projects");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchCompanies = async () => {
      try {
        rateLimit();
        const { data, error } = await getProjects();

        if (error) throw error;

        // Group projects by company
        const companyMap = {};
        data.forEach((project) => {
          if (!companyMap[project.company_name]) {
            companyMap[project.company_name] = {
              name: project.company_name,
              url: project.company_url,
              projects: [],
              exported: 0,
              active: 0,
            };
          }
          companyMap[project.company_name].projects.push(project);
          if (project.is_exported) {
            companyMap[project.company_name].exported++;
          }
          if (project.status === "Active" || project.status === "In Progress") {
            companyMap[project.company_name].active++;
          }
        });

        setCompanies(Object.values(companyMap));
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [getProjects]);

  // Filter and sort companies
  const filteredCompanies = useMemo(() => {
    let filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort companies
    filtered.sort((a, b) => {
      if (sortBy === "projects") {
        return b.projects.length - a.projects.length;
      } else if (sortBy === "active") {
        return b.active - a.active;
      } else if (sortBy === "exported") {
        return b.exported - a.exported;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return filtered;
  }, [companies, searchTerm, sortBy]);

  const totalProjects = companies.reduce((sum, c) => sum + c.projects.length, 0);
  const totalExported = companies.reduce((sum, c) => sum + c.exported, 0);
  const totalActive = companies.reduce((sum, c) => sum + c.active, 0);

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
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-6 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              🏢 {t("nav.companies")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore {companies.length} defense contractors and their projects
            </p>
          </div>
          <div className="hidden md:block">
            <DesktopNav />
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Globe className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{companies.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Defense contractors</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Zap className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalActive}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently in development</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exported Projects</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalExported}</div>
              <p className="text-xs text-muted-foreground mt-1">Internationally deployed</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t("projects.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="projects">Sort by Projects</SelectItem>
                  <SelectItem value="active">Sort by Active</SelectItem>
                  <SelectItem value="exported">Sort by Exported</SelectItem>
                  <SelectItem value="name">Sort by Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <Link key={company.name} to={`/company/${encodeURIComponent(company.name)}`}>
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden">
                  {/* Header with gradient */}
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:via-pink-500"></div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {company.name}
                        </CardTitle>
                      </div>
                      <div className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <span className="text-xs font-semibold text-blue-800 dark:text-blue-200">
                          {company.projects.length}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {company.projects.length}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Projects</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {company.active}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Active</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {company.exported}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Exported</p>
                        </div>
                      </div>

                      {/* Button */}
                      <Button
                        variant="outline"
                        className="w-full mt-2 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                      >
                        View All Projects →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12 bg-white dark:bg-gray-800 border-0 shadow-lg">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No companies found matching "{searchTerm}"
            </p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
              className="mt-4"
            >
              Clear Search
            </Button>
          </Card>
        )}

        {/* Ad Banner */}
        <div className="mt-12">
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

export default Companies;
