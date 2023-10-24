import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <>
      <IssueActions />

      {/* Table of Issues */}
      <IssueTable searchParams={searchParams} issues={issues} />

      <div className="flex justify-center p-6">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CodeTrack - Issues",

  description:
    "Browse and manage a comprehensive list of project issues. Quickly identify, prioritize, and tackle tasks for streamlined project execution.", // Updated the description to focus on the list aspect of issues.

  viewport: "width=device-width, initial-scale=1.0",

  applicationName: "Issue Tracker",

  abstract:
    "A detailed list of all project issues, enabling users to easily track, manage, and resolve tasks for successful project completion.", // Updated the abstract to focus on the list and management of issues.

  category: "Project Management",

  classification: "Web Application",

  keywords:
    "issue tracker, project management, issue list, task list, task prioritization, bug list, task resolution", // Updated keywords to include "issue list" and other relevant terms.
};

export default IssuesPage;
