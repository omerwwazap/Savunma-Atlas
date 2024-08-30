import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("about.title")}
          </h1>
          <DesktopNav />
          <MobileNav />
        </div>
        <Card className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {t("about.cardTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{t("about.paragraph1")}</p>
            <p className="text-gray-600 mb-4">{t("about.paragraph2")}</p>
            <p className="text-gray-600">{t("about.paragraph3")}</p>
          </CardContent>
        </Card>
        <div className="mt-8">
          <AdBanner
            adClient="ca-pub-XXXXXXXXXXXXXXXX"
            adSlot="XXXXXXXXXX"
            format="auto"
          />
        </div>
      </div>
      <ContactInfo />
    </div>
  );
};

export default About;
