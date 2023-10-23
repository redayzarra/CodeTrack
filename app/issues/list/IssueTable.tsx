import { IssueStatusBadge, Link as NextLink } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
              <NextLink href={`/issues/${issue.id}`}>{issue.title}</NextLink>
            </Table.Cell>
            <Table.Cell>
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; classname: string }[] = [
  { label: "Issue", value: "title", classname: "text-base" },
  { label: "Status", value: "status", classname: "text-base" },
  {
    label: "Created",
    value: "createdAt",
    classname: "hidden md:table-cell text-base",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
