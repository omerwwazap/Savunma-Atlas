import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import { useData, rateLimit } from "../DataContext";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// Custom chart components
const ProjectStatusChart = ({ data }) => {
  const statusCounts = data.reduce((acc, project) => {
    const status = project.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const ProjectTypeChart = ({ data }) => {
  const typeCounts = data.reduce((acc, project) => {
    const type = project.type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(typeCounts).map(type => ({
    name: type,
    count: typeCounts[type]
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end"
          height={70}
          interval={0}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const ProjectTimelineChart = ({ data }) => {
  // Group projects by year
  const projectsByYear = data.reduce((acc, project) => {
    const year = project.pstart_date ? new Date(project.pstart_date).getFullYear() : 'Unknown';
    if (isNaN(year)) return acc;
    
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year]++;
    return acc;
  }, {});

  // Convert to array for chart
  const chartData = Object.keys(projectsByYear)
    .filter(year => year !== 'Unknown')
    .sort()
    .map(year => ({
      year,
      count: projectsByYear[year]
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const StatCard = ({ title, value, icon, description }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-[60px] mb-2" />
      <Skeleton className="h-3 w-[140px]" />
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { t } = useTranslation();
  const { getProjects } = useData();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        rateLimit();
        const { data, error } = await getProjects();

        if (error) throw error;
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [getProjects]);

  // Calculate stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Active' || p.status === 'In Progress').length;
  const completedProjects = projects.filter(p => p.status === 'Completed' || p.status === 'In Service').length;
  const exportedProjects = projects.filter(p => p.is_exported).length;

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
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <Skeleton className="h-6 w-[200px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <Skeleton className="h-6 w-[200px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </div>
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t("dashboard.title", "Dashboard")}
          </h1>
          <DesktopNav />
          <MobileNav />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard 
            title={t("dashboard.totalProjects", "Total Projects")}
            value={totalProjects}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            description={t("dashboard.totalProjectsDesc", "Total number of projects in database")}
          />
          <StatCard 
            title={t("dashboard.activeProjects", "Active Projects")}
            value={activeProjects}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            description={t("dashboard.activeProjectsDesc", "Projects currently in development")}
          />
          <StatCard 
            title={t("dashboard.completedProjects", "Completed Projects")}
            value={completedProjects}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            description={t("dashboard.completedProjectsDesc", "Projects in service or completed")}
          />
          <StatCard 
            title={t("dashboard.exportedProjects", "Exported Projects")}
            value={exportedProjects}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>}
            description={t("dashboard.exportedProjectsDesc", "Projects exported to other countries")}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("dashboard.projectsByStatus", "Projects by Status")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectStatusChart data={projects} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("dashboard.projectsByType", "Projects by Type")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectTypeChart data={projects} />
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{t("dashboard.projectTimeline", "Project Timeline")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectTimelineChart data={projects} />
          </CardContent>
        </Card>

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

export default Dashboard;
