import { EraserIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <EraserIcon />
      Delete
    </Button>
  );
};

export default DeleteIssueButton;
