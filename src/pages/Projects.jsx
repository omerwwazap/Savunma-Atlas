import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  // Add more project data as needed
];

const ProjectCard = ({ project }) => (
  <Card>
    <CardHeader>
      <CardTitle>{project.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={project.image} alt={project.name} className="w-full h-48 object-cover mb-4" />
      <p><strong>Start Date:</strong> {project.startDate}</p>
      <p><strong>Milestone Date:</strong> {project.milestoneDate}</p>
      <p><strong>Status:</strong> {project.status}</p>
      <p><strong>Last Update:</strong> {project.lastUpdate}</p>
      <p><strong>Expected Completion:</strong> {project.expectedCompletion}</p>
      <p><strong>Notes:</strong> {project.notes}</p>
    </CardContent>
  </Card>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Military Projects</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Milestone Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead>Expected Completion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectsData.map((project) => (
            <TableRow key={project.id} className="cursor-pointer hover:bg-gray-100" onClick={() => setSelectedProject(project)}>
              <TableCell>
                <img src={project.image} alt={project.name} className="w-12 h-12 object-cover" />
              </TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.milestoneDate}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.lastUpdate}</TableCell>
              <TableCell>{project.expectedCompletion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>
          {selectedProject && <ProjectCard project={selectedProject} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;