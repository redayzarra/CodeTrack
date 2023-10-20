import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import { Session } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  issue: Issue;
  session: Session | null;
}

const IssueDetails = ({ issue, session }: Props) => {
  return (
    <>
      <div className="mb-4">
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{`${issue.createdAt.toDateString()} - ${issue.createdAt.toLocaleTimeString()}`}</Text>
        </Flex>
      </div>

      {session && (
        <div className="space-x-4">
          <AssigneeSelect />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </div>
      )}

      <Card className="prose max-w-full mt-5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
