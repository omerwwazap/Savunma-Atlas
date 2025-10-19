# Contributing to Savunma-Atlas

Thank you for your interest in contributing to Savunma-Atlas! Your help is appreciated. This document provides guidelines for contributing to the project.

There are two main ways to contribute:

1.  **For developers:** Using a Pull Request (PR) to directly add or edit `src/data/projects.json`.
2.  **For everyone:** Opening an Issue using one of our templates.

---

## How to Contribute

### Using Pull Requests (For Developers)

If you are comfortable with Git and GitHub, this is the most direct way to contribute.

1.  **Fork the repository:** Create a fork of the project to your own GitHub account.
2.  **Clone your fork:** `git clone https://github.com/YOUR_USERNAME/Savunma-Atlas.git`
3.  **Create a new branch:** `git checkout -b your-branch-name`
4.  **Make your changes:** Add or edit the `src/data/projects.json` file.
5.  **Commit your changes:** `git commit -m "Your meaningful commit message"`
6.  **Push to your branch:** `git push origin your-branch-name`
7.  **Open a Pull Request:** Go to the original repository and open a new Pull Request.

### Using Issues (For Everyone)

If you are not a developer or prefer a simpler method, you can submit new projects or suggest changes through GitHub Issues.

-   **[Submit a new project &gt;](https://github.com/omerwwazap/Savunma-Atlas/issues/new?assignees=&labels=enhancement&template=new-project-template.md&title=%5BNEW+PROJECT%5D%3A+Project+Name)**
-   **[Update an existing project &gt;](https://github.com/omerwwazap/Savunma-Atlas/issues/new?assignees=&labels=bug&template=update-project-template.md&title=%5BUPDATE+PROJECT%5D%3A+Project+Name)**

Simply click on one of the links above, fill out the form, and submit. We will handle the rest.

---

## `projects.json` Data Structure

When adding or editing a project, please adhere to the following data structure.

| Field              | Type      | Description                                                                 | Example                                     |
| ------------------ | --------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| `id`               | `Number`  | Unique identifier. Please use the next available integer.                   | `21`                                        |
| `created_at`       | `String`  | The date the entry was created. Format: `YYYY-MM-DD`.                       | `"2024-08-30"`                              |
| `project_name`     | `String`  | The official name of the project.                                           | `"KAAN"`                                    |
| `image_url`        | `String`  | A direct URL to an image of the project.                                    | `"https://www.tusas.com/..."`               |
| `pstart_date`      | `String`  | The official start date of the project. Format: `YYYY-MM-DD`.               | `"2010-12-15"`                              |
| `service_date`     | `String`  | The date the project entered service. Format: `YYYY-MM-DD`. Leave empty if not in service. | `"2011-08-17"`                              |
| `status`           | `String`  | Current status. (e.g., `In Progress`, `Serial Production`, `Completed`)     | `"In Progress"`                             |
| `company_name`     | `String`  | The primary company/contractor responsible.                                 | `"TAI"`                                     |
| `company_url`      | `String`  | The official URL for the project or company page.                           | `"https://www.tusas.com/..."`               |
| `type`             | `String`  | The domain of the project (e.g., `Air`, `Sea`, `Land`).                     | `"Air"`                                     |
| `p_scale`          | `String`  | The scale of the project (e.g., `Major`, `Minor`).                          | `"Major"`                                   |
| `Notes`            | `String`  | Any relevant notes, such as first flight or launch dates.                   | `"First flight : 21 Feb 2024"`              |
| `total_in_service` | `Number`  | The total number of units currently in service.                             | `80`                                        |
| `last_updated`     | `String`  | The date this entry was last updated. Format: `YYYY-MM-DD`.                 | `"2024-08-30"`                              |
| `target_date`      | `String`  | The target date for a milestone (e.g., service entry). Format: `YYYY-MM-DD`. | `"2028-12-01"`                              |
| `is_exported`      | `Boolean` | `true` if the project has been exported, otherwise `false`.                 | `true`                                      |
| `export_country`   | `Array`   | A list of 3-letter country codes for export countries.                      | `["POL", "QAT", "GBR"]`                     |
