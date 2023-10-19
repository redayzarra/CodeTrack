import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link
        href={`/issues/edit/${issueId}`}
        className="flex items-center space-x-2"
      >
        <Pencil1Icon /> <Text>Edit</Text>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
