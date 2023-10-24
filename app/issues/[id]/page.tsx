import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => {
  return prisma.issue.findUnique({ where: { id: issueId } });
});

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  return <IssueDetails issue={issue} session={session} />;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: `CodeTrack - ${issue?.title}`,

    description: `Detailed insights and management options for the issue titled "${issue?.title}". Easily understand the issue's context, status, and actions required.`, // Focusing on the details of a specific issue.

    viewport: "width=device-width, initial-scale=1.0",

    applicationName: "Issue Tracker",

    abstract: `Deep dive into the specifics of the issue titled "${issue?.title}". Facilitating improved understanding, tracking, and resolution for efficient project flow.`, // Focusing on the detailed insights of an issue.

    category: "Project Management",

    classification: "Web Application",

    keywords:
      "issue tracker, project management, issue details, issue insights, issue status, issue resolution, task details",
  };
}

export default IssueDetailPage;
