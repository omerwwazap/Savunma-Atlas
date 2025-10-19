import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import ContactInfo from "../components/ContactInfo";
import AdBanner from "../components/AdBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="guide">How-To Guide</TabsTrigger>
            <TabsTrigger value="schema">Project Schema</TabsTrigger>
            <TabsTrigger value="contact">Contact & Docs</TabsTrigger>
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

          {/* How-To Guide Tab */}
          <TabsContent value="guide">
            <div className="space-y-6">
              {/* Add Projects Section */}
              <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ➕ How to Add New Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Step 1: Prepare Your Data
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Gather the following information about the military project:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-2">
                      <li>Project name and description</li>
                      <li>Manufacturing company</li>
                      <li>Project type (Land, Sea, Air, Space)</li>
                      <li>Start date and target completion date</li>
                      <li>Current status (In Development, In Progress, Active, In Service, Completed)</li>
                      <li>Project scale (Minor, Major, Critical)</li>
                      <li>Number of units in service</li>
                      <li>Project notes and specifications</li>
                      <li>Export status and countries</li>
                      <li>Project image URL</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Step 2: Format Your Entry
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Create a JSON entry following the project schema (see "Project Schema" tab).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Step 3: Submit Your Entry
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Two ways to submit:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-2">
                      <li>
                        <strong>GitHub:</strong> Submit a pull request to the repository with your JSON entry added to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">src/data/projects.json</code>
                      </li>
                      <li>
                        <strong>Email:</strong> Send your project data to the project maintainers
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Update Projects Section */}
              <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ✏️ How to Update Existing Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Step 1: Locate the Project
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Find the project in <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">src/data/projects.json</code> by its ID or name.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Step 2: Modify the Fields
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Update the following fields as needed:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-2">
                      <li><strong>status:</strong> Update project status</li>
                      <li><strong>service_date:</strong> When project entered service</li>
                      <li><strong>total_in_service:</strong> Current number of units deployed</li>
                      <li><strong>notes:</strong> Add latest developments</li>
                      <li><strong>last_updated:</strong> Set to today's date (YYYY-MM-DD format)</li>
                      <li><strong>export_country:</strong> Add new export destinations</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Step 3: Submit Changes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Submit a pull request with your changes or send the updated data to maintainers.
                    </p>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>⚠️ Important:</strong> Always update the <code>last_updated</code> field when making changes. This helps track when information was last verified.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Project Schema Tab */}
          <TabsContent value="schema">
            <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Project Data Schema</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Use this JSON template when adding or updating projects:
                </p>
                <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs md:text-sm font-mono">
{`{
  "id": 1,
  "created_at": "2024-10-19",
  "project_name": "Project Name",
  "image_url": "https://example.com/image.jpg",
  "pstart_date": "2020-01-15",
  "service_date": "2022-06-01",
  "status": "In Service",
  "company_name": "Company Name",
  "company_url": "https://company.com",
  "type": "Air",
  "p_scale": "Major",
  "Notes": "Project description and notes",
  "total_in_service": 10,
  "last_updated": "2024-10-19",
  "target_date": "2025-12-31",
  "is_exported": true,
  "export_country": ["USA", "EU", "NATO"]
}`}
                  </pre>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      Field Descriptions
                    </h3>
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">id <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">Required</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Unique project identifier (integer)</p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">type <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Options</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Land, Sea, Air, Space</p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">status <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Options</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Concept, Development, In Progress, Active, In Service, Completed</p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">p_scale <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Options</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Minor, Major, Critical</p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">is_exported <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Boolean</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">true or false - whether project has been exported</p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">export_country</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Array of ISO country codes or country names</p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Date Fields</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Use YYYY-MM-DD format (e.g., 2024-10-19)</p>
                      </div>
                    </div>
                  </div>
                </div>
          </CardContent>
        </Card>
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
                          href="https://github.com/omerwwazap/Savunma-Atlas/issues/new" 
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
