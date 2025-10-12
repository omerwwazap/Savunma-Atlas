import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import { useData, rateLimit } from "../DataContext";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";

const Index = () => {
  const { t } = useTranslation();
  const { getProjects } = useData();
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        rateLimit(); // Apply rate limiting
        const { data, error } = await getProjects();

        if (error) throw error;
        
        // Sanitize data if needed before setting state
        setTestData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchTestData();
  }, [getProjects]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error loading data: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("index.title")}
          </h1>
          <DesktopNav />
          <MobileNav />
        </div>
        <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 text-center">
          {t("index.subheader")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">
                {t("index.cardTitle1")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t("index.cardContent1")}</p>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/projects">{t("index.cardButton1")}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">
                {t("index.cardTitle2")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t("index.cardContent2")}</p>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/news">{t("index.cardButton2")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
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
