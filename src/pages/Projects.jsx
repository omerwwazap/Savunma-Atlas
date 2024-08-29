import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projectsData = [
  {
    id: 1,
    name: "Project Alpha",
    image: "/placeholder.svg",
    startDate: "2023-01-15",
    milestoneDate: "2023-06-30",
    status: "In Progress",
    lastUpdate: "2023-05-20",
    expectedCompletion: "2024-01-15",
    notes: "Developing new stealth technology"
  },
  {
    id: 2,
    name: "Project Beta",
    image: "/placeholder.svg",
    startDate: "2023-03-01",
    milestoneDate: "2023-09-15",
    status: "Planning",
    lastUpdate: "2023-06-10",
    expectedCompletion: "2024-06-30",
    notes: "Advanced radar system development"
  },
  // Add more project data as needed
];

const ProjectCard = ({ project }) => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={project.image} alt={project.name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <div className="space-y-2">
        <p><span className="font-semibold">Start Date:</span> {project.startDate}</p>
        <p><span className="font-semibold">Milestone Date:</span> {project.milestoneDate}</p>
        <p><span className="font-semibold">Status:</span> {project.status}</p>
        <p><span className="font-semibold">Last Update:</span> {project.lastUpdate}</p>
        <p><span className="font-semibold">Expected Completion:</span> {project.expectedCompletion}</p>
        <p><span className="font-semibold">Notes:</span> {project.notes}</p>
      </div>
    </CardContent>
  </Card>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Military Projects</h1>
        <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Projects Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expected Completion</TableHead>
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
                    <TableCell>{project.status}</TableCell>
                    <TableCell>{project.expectedCompletion}</TableCell>
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