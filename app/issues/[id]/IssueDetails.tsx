import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import ReactMarkdown from "react-markdown";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import CompleteIssueButton from "./CompleteIssueButton";

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
        <div className="flex space-x-4 items-center">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
          <CompleteIssueButton issueId={issue.id} status={issue.status} />
        </div>
      )}

      <Card className="prose max-w-full mt-5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
