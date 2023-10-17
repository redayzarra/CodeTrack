import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Flex, Card, Box, Badge } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl mt-[5px]">
      <Skeleton width="13rem" />
      <Flex gap="3" my="2">
        <Badge color="gray">$$$$</Badge>
        <Skeleton width="13.5rem" />
      </Flex>

      <Card className="mt-[26px]">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
