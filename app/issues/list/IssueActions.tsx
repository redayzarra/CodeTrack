import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { MdCreate } from "react-icons/md";

const IssueActions = () => {
  return (
    <Link href="/issues/new">
      <Button>
        <MdCreate /> Create Issue
      </Button>
    </Link>
  );
};

export default IssueActions;
