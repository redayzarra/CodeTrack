import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { MdCreate } from "react-icons/md";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <div className="flex mb-4 space-x-4">
      <IssueStatusFilter />
      
      <Link href="/issues/new">
        <Button>
          <MdCreate /> Create Issue
        </Button>
      </Link>
    </div>
  );
};

export default IssueActions;
