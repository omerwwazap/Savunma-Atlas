import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileNav from '../components/MobileNav';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About Us</h1>
          <MobileNav />
        </div>
        <Card className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold">Military Projects Hub</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Military Projects Hub is your central resource for information on cutting-edge military projects and the latest defense news from around the world.
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is to provide accurate, up-to-date information on military technology, research, and development to keep you informed about global defense advancements.
            </p>
            <p className="text-gray-600">
              Whether you're a defense professional, researcher, or enthusiast, Military Projects Hub offers valuable insights into the ever-evolving world of military innovation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;