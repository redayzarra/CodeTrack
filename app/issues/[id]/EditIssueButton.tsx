import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button className="cursor-pointer">
        <Pencil1Icon /> Edit
      </Button>
    </Link>
  );
};

export default EditIssueButton;
