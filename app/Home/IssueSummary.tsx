import { Status } from "@prisma/client";
import { Card, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    className: string;
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
      className: "text-red-500 font-bold text-2xl",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      className: "text-amber-600 font-bold text-2xl",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      className: "text-lime-600 font-bold text-2xl",
    },
  ];
  return (
    <div className="flex space-x-3">
      {containers.map((container) => (
        <Card key={container.label} variant="classic">
          <div className="flex flex-col">
            <Link
              className="font-medium text-gray-700"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text className={container.className}>{container.value}</Text>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;
