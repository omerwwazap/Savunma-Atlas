import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileNav from '../components/MobileNav.jsx';
import DesktopNav from '../components/DesktopNav';

const projectsData = [
  {
    id: 1,
    name: "Project Alpha",
    image: "/placeholder.svg",
    startDate: "2023-01-15",
    serviceDate: "2025-01-15",
    status: "In Progress",
    companyLink: "https://example.com/alpha",
    type: "air",
    projectScale: "major",
    notes: "Developing new stealth technology"
  },
  {
    id: 2,
    name: "Project Beta",
    image: "/placeholder.svg",
    startDate: "2023-03-01",
    serviceDate: "2025-06-30",
    status: "Planning",
    companyLink: "https://example.com/beta",
    type: "land",
    projectScale: "singular",
    notes: "Advanced radar system development"
  },
  // Add more project data as needed
];

const ProjectCard = ({ project }) => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-xl md:text-2xl font-bold">{project.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={project.image} alt={project.name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <div className="space-y-2 text-sm md:text-base">
        <p><span className="font-semibold">Start Date:</span> {project.startDate}</p>
        <p><span className="font-semibold">Service Date:</span> {project.serviceDate}</p>
        <p><span className="font-semibold">Status:</span> {project.status}</p>
        <p><span className="font-semibold">Type:</span> {project.type}</p>
        <p><span className="font-semibold">Project Scale:</span> {project.projectScale}</p>
        <p><span className="font-semibold">Notes:</span> {project.notes}</p>
        <p>
          <span className="font-semibold">Company Site:</span>{' '}
          <a href={project.companyLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Visit Official Site
          </a>
        </p>
      </div>
    </CardContent>
  </Card>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Military Projects</h1>
          <DesktopNav />
          <MobileNav />
        </div>
        <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">Projects Table</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Service Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Company Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsData.map((project) => (
                  <TableRow 
                    key={project.id} 
                    className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => setSelectedProject(project)}
                  >
                    <TableCell>
                      <img src={project.image} alt={project.name} className="w-12 h-12 object-cover rounded-full" />
                    </TableCell>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.startDate}</TableCell>
                    <TableCell>{project.serviceDate}</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell>
                      <a href={project.companyLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                        Official Site
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
