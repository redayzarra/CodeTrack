import prisma from "@/prisma/client";
import IssueSummary from "./Home/IssueSummary";
import LatestIssues from "./Home/LatestIssues";
import IssueChart from "./Home/IssueChart";
import { Grid, Text } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <div className="flex flex-col space-y-3">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <LatestIssues />
      </div>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </Grid>
  );
}
