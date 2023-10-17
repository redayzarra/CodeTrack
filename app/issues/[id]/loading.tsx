import { Badge, Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

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
