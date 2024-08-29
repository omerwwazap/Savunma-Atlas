import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MobileNav from '../components/MobileNav';
import DesktopNav from '../components/DesktopNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Military Projects Hub</h1>
          <DesktopNav />
          <MobileNav />
        </div>
        <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 text-center">Your central resource for military project information and news</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">View and explore military projects from around the world.</p>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/projects">View Projects</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">News</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Stay updated with the latest military news and developments.</p>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/news">Read News</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
