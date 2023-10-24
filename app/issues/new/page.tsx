import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "New Issue",

  description:
    "Create and report new issues seamlessly. Intuitive interface to input details, set priorities, and start the resolution process.", // Description focusing on the creation of new issues.

  viewport: "width=device-width, initial-scale=1.0",

  applicationName: "Issue Tracker",

  abstract:
    "A dedicated space for users to report new project issues, ensuring they are logged, categorized, and addressed promptly.", // Abstract focusing on the importance and ease of reporting new issues.

  category: "Project Management",

  classification: "Web Application",

  keywords:
    "issue tracker, project management, new issue, report issue, create task, log bug, issue reporting", // Keywords tailored to creating and reporting new issues.
};

export default NewIssuePage;
