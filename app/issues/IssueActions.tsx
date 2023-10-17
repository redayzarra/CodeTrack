import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">Create Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
