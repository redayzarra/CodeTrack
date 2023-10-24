import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => {
  return prisma.issue.findUnique({ where: { id: issueId } });
});

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: `Edit Issue - ${issue?.title}`,

    description: `Detailed insights and management options for the issue titled "${issue?.title}". Easily understand the issue's context, status, and actions required.`,

    viewport: "width=device-width, initial-scale=1.0",

    applicationName: "Issue Tracker",

    abstract: `Deep dive into the specifics of the issue titled "${issue?.title}". Facilitating improved understanding, tracking, and resolution for efficient project flow.`, // Focusing on the detailed insights of an issue.

    category: "Project Management",

    classification: "Web Application",

    keywords:
      "issue tracker, project management, issue details, issue insights, issue status, issue resolution, task details",
  };
}

export default EditIssuePage;
