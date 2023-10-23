import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center space-x-2">
      <Button color="gray" variant="soft" size="1" disabled={currentPage == 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" size="1" disabled={currentPage == 1}>
        <ChevronLeftIcon />
      </Button>
      <Text className="font-medium text-base text-gray-700">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        size="1"
        disabled={currentPage == pageCount}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        size="1"
        disabled={currentPage == pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
