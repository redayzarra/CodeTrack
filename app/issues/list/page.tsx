import { IssueStatusBadge, Link as NextLink } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueActions from "./IssueActions";
import { TiArrowSortedDown } from "react-icons/ti";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; classname: string }[] = [
    { label: "Issue", value: "title", classname: "text-base" },
    { label: "Status", value: "status", classname: "text-base" },
    {
      label: "Created",
      value: "createdAt",
      classname: "hidden md:table-cell text-base",
    },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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

      <div className="items-center space-y-3">
        {/* Table of Issues */}
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.classname}
                >
                  <Link
                    className="font-semibold text-slate-800"
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </Link>
                  {column.value == searchParams.orderBy && (
                    <TiArrowSortedDown className="inline text-xl" />
                  )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell className="text-sm">
                  <NextLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </NextLink>
                </Table.Cell>
                <Table.Cell className="">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

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

export default IssuesPage;
