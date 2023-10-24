"use client";

import { Spinner } from "@/app/components";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Status } from "@prisma/client";

interface Props {
  issueId: number;
  status: Status;
}

const CompleteIssueButton = ({ issueId, status }: Props) => {
  const [isCompleting, setCompleting] = useState(false);
  const router = useRouter();

  const completeIssue = async () => {
    try {
      setCompleting(true);

      await axios.patch("/api/issues/" + issueId, {
        status: "CLOSED",
        assignedToUserId: null,
      });

      setCompleting(false);
      toast.success("Issue is marked as completed!");

      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setCompleting(false);
      toast.error("Issue could not be marked as completed.");
    }
  };

  if (status == "CLOSED") {
    return (
      <Button disabled={true} color="gray">
        <FaCheckCircle /> Completed
      </Button>
    );
  } else {
    return (
      <Button disabled={isCompleting} color="grass" onClick={completeIssue}>
        {isCompleting ? (
          <>
            Loading <Spinner />
          </>
        ) : (
          <>
            <FaCheckCircle /> Complete
          </>
        )}
      </Button>
    );
  }
};
export default CompleteIssueButton;
