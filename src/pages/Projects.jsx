import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MobileNav from '../components/MobileNav.jsx';
import DesktopNav from '../components/DesktopNav';
import { useSupabase } from '../SupabaseContext';

const ProjectCard = ({ project }) => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-xl md:text-2xl font-bold">{project.project_name}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={project.image_url} alt={project.project_name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <div className="space-y-2 text-sm md:text-base">
        <p><span className="font-semibold">Company:</span> {project.company_name || "Unknown"}</p>
        <p><span className="font-semibold">Project Start Date:</span> {project.pstart_date || "Unknown"}</p>
        <p><span className="font-semibold">In Service Date:</span> {project.service_date || "Unknown"}</p>
        <p><span className="font-semibold">Project Status:</span> {project.status || "Unknown"}</p>
        <p><span className="font-semibold">Project Type:</span> {project.type || "Unknown"}</p>
        <p><span className="font-semibold">Project Scale:</span> {project.p_scale || "Unknown"}</p>
        <p><span className="font-semibold">Notes:</span> {project.Notes || "Unknown"}</p>
        <p><span className="font-semibold">Target Date for Service:</span> {project.target_date || "Unknown"}</p>
        <p><span className="font-semibold">Total in Service:</span> {project.total_in_service || "Unknown"}</p>
        <p><span className="font-semibold">Is Exported:</span> {project.export ? "Yes" : "No"}</p>
        <p><span className="font-semibold">Export Countries:</span> {project.export_country ? JSON.stringify(project.export_country) : "N/A"}</p>
        <p><span className="font-semibold">Last Updated:</span> {project.last_updated || "Unknown"}</p>
        <p>
          <span className="font-semibold">Company Site:</span>{' '}
          <a href={project.company_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Visit Official Site
          </a>
        </p>
      </div>
    </CardContent>
  </Card>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 15;
  const supabase = useSupabase();

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

  useEffect(() => {
    const results = projects.filter(project =>
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
    setCurrentPage(1);
  }, [searchTerm, projects]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Military Projects</h1>
          <DesktopNav />
          <MobileNav />
        </div>
        <Card className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">Projects Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Service Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total In Service</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Export</TableHead>
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
                      <TableCell>{project.pstart_date || "Unknown"}</TableCell>
                      <TableCell>{project.service_date || "Unknown"}</TableCell>
                      <TableCell>{project.status || "Unknown"}</TableCell>
                      <TableCell>{project.total_in_service || "Unknown"}</TableCell>
                      <TableCell>{project.company_name || "Unknown"}</TableCell>
                      <TableCell>{project.export ? "Yes" : "No"}</TableCell>
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
              <DialogTitle>Project Details</DialogTitle>
            </DialogHeader>
            {selectedProject && <ProjectCard project={selectedProject} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Projects;
