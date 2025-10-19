import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DOMPurify from "dompurify";

const ContributionForm = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      type: "project_update",
      projectName: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Sanitize input
      const sanitizedData = {
        name: DOMPurify.sanitize(data.name),
        email: DOMPurify.sanitize(data.email),
        type: DOMPurify.sanitize(data.type),
        projectName: DOMPurify.sanitize(data.projectName),
        message: DOMPurify.sanitize(data.message),
      };

      // Create mailto link with form data
      const mailtoBody = `
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Type: ${sanitizedData.type === 'project_update' ? 'Project Update' : 'New Project Suggestion'}
Project Name: ${sanitizedData.projectName}

Message:
${sanitizedData.message}

---
Submitted from Savunma Atlas Contribution Form
      `.trim();

      // Open email client
      window.location.href = `mailto:levent07@live.com?subject=Savunma Atlas Contribution&body=${encodeURIComponent(mailtoBody)}`;

      // Show success message
      setIsSubmitted(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
          ✍️ {t("contribution.formTitle") || "Contribution Form"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSubmitted && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 rounded text-green-800 dark:text-green-200">
            ✅ {t("contribution.submitSuccess") || "Thank you! Your email client has opened with the pre-filled form. Please send it to complete your contribution."}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("contribution.name") || "Full Name"} *
            </label>
            <Input
              {...register("name", { 
                required: t("contribution.nameRequired") || "Name is required",
                minLength: { value: 2, message: t("contribution.nameMinLength") || "Name must be at least 2 characters" }
              })}
              placeholder={t("contribution.namePlaceholder") || "Your name"}
              className="w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("contribution.email") || "Email"} *
            </label>
            <Input
              {...register("email", { 
                required: t("contribution.emailRequired") || "Email is required",
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("contribution.emailInvalid") || "Invalid email address"
                }
              })}
              placeholder={t("contribution.emailPlaceholder") || "your.email@example.com"}
              type="email"
              className="w-full"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Contribution Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("contribution.type") || "Contribution Type"} *
            </label>
            <select
              {...register("type", { required: t("contribution.typeRequired") || "Type is required" })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="project_update">{t("contribution.projectUpdate") || "Project Update"}</option>
              <option value="new_project">{t("contribution.newProject") || "New Project Suggestion"}</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
          </div>

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("contribution.projectName") || "Project Name"} *
            </label>
            <Input
              {...register("projectName", { 
                required: t("contribution.projectNameRequired") || "Project name is required"
              })}
              placeholder={t("contribution.projectNamePlaceholder") || "e.g., KAAN, Hürkuş, etc."}
              className="w-full"
            />
            {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName.message}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("contribution.message") || "Message"} *
            </label>
            <textarea
              {...register("message", { 
                required: t("contribution.messageRequired") || "Message is required",
                minLength: { value: 10, message: t("contribution.messageMinLength") || "Message must be at least 10 characters" },
                maxLength: { value: 2000, message: t("contribution.messageMaxLength") || "Message must not exceed 2000 characters" }
              })}
              placeholder={t("contribution.messagePlaceholder") || "Describe your contribution or suggestion..."}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-32 resize-none"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded p-3 text-sm text-blue-800 dark:text-blue-200">
            ℹ️ {t("contribution.infoMessage") || "This will open your default email client with the form data pre-filled. Please review and send the email to submit your contribution."}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            {isLoading ? (t("contribution.submitting") || "Submitting...") : (t("contribution.submit") || "Send Contribution")}
          </Button>
        </form>

        {/* Alternative Method */}
        <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {t("contribution.alternativeMethod") || "Or, you can also:"}
          </p>
          <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              📧{" "}
              <a 
                href="mailto:levent07@live.com" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t("contribution.emailDirectly") || "Email directly"}
              </a>
            </li>
            <li>
              🐙{" "}
              <a 
                href="https://github.com/omerwwazap/Savunma-Atlas/issues/new?template=new-project-template.md" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t("contribution.openGitHubIssue") || "Open a GitHub issue"}
              </a>
            </li>
            <li>
              💬{" "}
              <a 
                href="https://github.com/omerwwazap/Savunma-Atlas/discussions" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t("contribution.startDiscussion") || "Start a discussion"}
              </a>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionForm;
