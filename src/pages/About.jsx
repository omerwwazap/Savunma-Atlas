import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContributionForm from "../components/ContributionForm";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t("about.title")}
          </h1>
          <DesktopNav />
          <MobileNav />
        </div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 gap-1">
            <TabsTrigger value="about" className="text-xs md:text-sm px-2 md:px-4 py-2">
              <span className="hidden sm:inline">About</span>
              <span className="sm:hidden">About</span>
            </TabsTrigger>
            <TabsTrigger value="email-contrib" className="text-xs md:text-sm px-2 md:px-4 py-2">
              <span className="hidden sm:inline">Contribution by Email</span>
              <span className="sm:hidden">Email</span>
            </TabsTrigger>
            <TabsTrigger value="github-contrib" className="text-xs md:text-sm px-2 md:px-4 py-2">
              <span className="hidden sm:inline">Contribute by GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-xs md:text-sm px-2 md:px-4 py-2">
              <span className="hidden sm:inline">Contact & Docs</span>
              <span className="sm:hidden">Contact</span>
            </TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {t("about.cardTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t("about.paragraph1")}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t("about.paragraph2")}</p>
                <p className="text-gray-600 dark:text-gray-300">{t("about.paragraph3")}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contribution by Email Tab */}
          <TabsContent value="email-contrib">
            <div className="space-y-6 max-w-3xl mx-auto">
              <ContributionForm />
            </div>
          </TabsContent>

          {/* Contribute by GitHub Tab */}
          <TabsContent value="github-contrib">
            <div className="space-y-6">
              {/* GitHub Issue Templates */}
              <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 border-purple-500">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    🐙 {t("about.gitHubIssuesTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("about.useTemplatesInstead")}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* New Project Template */}
                    <a 
                      href="https://github.com/omerwwazap/Savunma-Atlas/issues/new?template=new-project-template.md" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="bg-green-50 dark:bg-green-900 border-2 border-green-400 dark:border-green-600 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                          <span>➕</span> {t("about.addNewProjectGitHub")}
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {t("about.addNewProjectDesc")}
                        </p>
                      </div>
                    </a>

                    {/* Update Project Template */}
                    <a 
                      href="https://github.com/omerwwazap/Savunma-Atlas/issues/new?template=update-project-template.md" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="bg-blue-50 dark:bg-blue-900 border-2 border-blue-400 dark:border-blue-600 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                          <span>✏️</span> {t("about.updateProjectGitHub")}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {t("about.updateProjectDesc")}
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded p-3 text-sm text-yellow-800 dark:text-yellow-200">
                    💡 {t("about.githubTip")}
                  </div>
                </CardContent>
              </Card>

              {/* Add Projects Section */}
              <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ➕ {t("about.addNewProjectsTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {t("about.prepareDataStep")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {t("about.prepareDataDesc")}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-2">
                      <li>{t("about.projectNameDesc")}</li>
                      <li>{t("about.companyDesc")}</li>
                      <li>{t("about.typeDesc")}</li>
                      <li>{t("about.dateDesc")}</li>
                      <li>{t("about.statusDesc")}</li>
                      <li>{t("about.scaleDesc")}</li>
                      <li>{t("about.unitsDesc")}</li>
                      <li>{t("about.notesDesc")}</li>
                      <li>{t("about.exportDesc")}</li>
                      <li>{t("about.imageDesc")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {t("about.formatEntryStep")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {t("about.formatEntryDesc")}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {t("about.submitEntryStep")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {t("about.submitEntryDesc")}
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded p-3 text-sm text-blue-800 dark:text-blue-200">
                      ℹ️ {t("about.submitEntryHint")}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Update Projects Section */}
              <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ✏️ {t("about.updateProjectsTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {t("about.locateProjectStep")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("about.locateProjectDesc")}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {t("about.modifyFieldsStep")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {t("about.modifyFieldsDesc")}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-2">
                      <li><strong>status:</strong> {t("about.statusUpdateDesc")}</li>
                      <li><strong>service_date:</strong> {t("about.serviceDateDesc")}</li>
                      <li><strong>total_in_service:</strong> {t("about.totalInServiceDesc")}</li>
                      <li><strong>notes:</strong> {t("about.notesUpdateDesc")}</li>
                      <li><strong>last_updated:</strong> {t("about.lastUpdatedDesc")}</li>
                      <li><strong>export_country:</strong> {t("about.exportCountryDesc")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {t("about.submitChangesStep")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {t("about.submitChangesDesc")}
                    </p>
                    <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded p-3 text-sm text-green-800 dark:text-green-200">
                      ℹ️ {t("about.submitChangesHint")}
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>⚠️ {t("about.importantTitle")}:</strong> {t("about.importantDesc")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact & Documentation Tab */}
          <TabsContent value="contact">
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    📧 Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* GitHub Contact */}
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        🐙 GitHub
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Visit the project repository:
                      </p>
                      <a 
                        href="https://github.com/omerwwazap/Savunma-Atlas" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold break-all"
                      >
                        github.com/omerwwazap/Savunma-Atlas
                      </a>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        • Report issues<br/>
                        • Submit pull requests<br/>
                        • Discuss improvements
                      </p>
                    </div>

                    {/* Direct Contact */}
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        💬 Direct Contact
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Reach out directly:
                      </p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">GitHub Username:</p>
                          <p className="text-gray-700 dark:text-gray-300 font-mono">@omerwwazap</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Project Issues:</p>
                          <a 
                            href="https://github.com/omerwwazap/Savunma-Atlas/issues" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            GitHub Issues Page
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documentation Resources */}
              <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    📚 Documentation & Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {/* Setup Instructions */}
                    <div className="border rounded-lg p-4 border-gray-300 dark:border-gray-600">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        🚀 Setup Instructions
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Learn how to set up and run the project locally:
                      </p>
                      <a 
                        href="#" 
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                      >
                        View SETUP_INSTRUCTIONS.md
                      </a>
                    </div>

                    {/* Contributing Guide */}
                    <div className="border rounded-lg p-4 border-gray-300 dark:border-gray-600">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        🤝 Contributing Guide
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Want to contribute? Check the contributing guidelines:
                      </p>
                      <a 
                        href="https://github.com/omerwwazap/Savunma-Atlas/blob/feature/enhancement-plan/CONTRIBUTING.md" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                      >
                        CONTRIBUTING.md
                      </a>
                    </div>

                    {/* README */}
                    <div className="border rounded-lg p-4 border-gray-300 dark:border-gray-600">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        📖 README
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Project overview and features:
                      </p>
                      <a 
                        href="https://github.com/omerwwazap/Savunma-Atlas#readme" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                      >
                        View README on GitHub
                      </a>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded p-4 mt-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                      ⚡ Quick Links
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <a 
                          href="https://github.com/omerwwazap/Savunma-Atlas/issues/new?template=new-project-template.md" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-300 hover:underline text-sm block"
                        >
                          → Report a Bug
                        </a>
                      </div>
                      <div>
                        <a 
                          href="https://github.com/omerwwazap/Savunma-Atlas/discussions" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-300 hover:underline text-sm block"
                        >
                          → Start a Discussion
                        </a>
                      </div>
                      <div>
                        <a 
                          href="https://github.com/omerwwazap/Savunma-Atlas/pulls" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-300 hover:underline text-sm block"
                        >
                          → View Pull Requests
                        </a>
                      </div>
                    </div>
                  </div>
          </CardContent>
        </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <AdBanner
            data-ad-client="ca-pub-5614882338601871"
            data-ad-slot="3055689231"
            format="auto"
          />
        </div>
      </div>
      <ContactInfo />
    </div>
  );
};

export default About;
