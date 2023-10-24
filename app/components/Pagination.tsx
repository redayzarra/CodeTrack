"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Calculate pageCount
  const pageCount = Math.ceil(itemCount / pageSize);

  // Change page function
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center space-x-2">
      <Button
        color="gray"
        variant="soft"
        size="1"
        disabled={currentPage == 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        size="1"
        disabled={currentPage == 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Text className="font-medium text-sm text-gray-700">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        size="1"
        disabled={currentPage == pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        size="1"
        disabled={currentPage == pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
