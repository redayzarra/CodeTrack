import { Status } from "@prisma/client";
import { Card, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaEquals } from "react-icons/fa";

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
      className: "text-red-500 font-bold text-3xl",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      className: "text-amber-600 font-bold text-3xl",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      className: "text-lime-600 font-bold text-3xl",
    },
  ];

  const total = open + inProgress + closed;

  return (
    <div className="flex max-w-xl justify-between items-center space-x-2 sm:space-x-0">
      {/* Calculated Issues */}
      {containers.map((container) => (
        <Card key={container.label} variant="classic">
          <div className="flex flex-col items-center">
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

      {/* Total Issues */}
      <Card key={0} variant="classic" className="">
        {/* Hide on screens smaller than sm */}
        <div className="flex flex-col items-center">
          <Link className="font-medium text-gray-700" href={`/issues/list`}>
            Total Issues
          </Link>
          <Text className="text-zinc-600 font-bold text-3xl">{total}</Text>
        </div>
      </Card>
    </div>
  );
};

export default IssueSummary;
