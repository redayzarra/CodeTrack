import prisma from "@/prisma/client";
import { Avatar, Card, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "../components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card variant="classic">
      <h1 className="text-lg ml-3 mb-2 font-semibold">Latest Issues</h1>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  className="font-medium text-gray-600"
                  href={`/issues/${issue.id}`}
                >
                  {issue.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>
                {issue.assignedToUser && (
                  <Avatar
                    src={issue.assignedToUser.image!}
                    fallback="X"
                    size="1"
                    radius="full"
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
