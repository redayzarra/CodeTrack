import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil1Icon /> <Link href={`/issues/edit/${issueId}`}>Edit</Link>
    </Button>
  );
};

export default EditIssueButton;
