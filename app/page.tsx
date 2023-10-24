import prisma from "@/prisma/client";
import IssueSummary from "./Home/IssueSummary";
import LatestIssues from "./Home/LatestIssues";
import IssueChart from "./Home/IssueChart";
import { Grid, Text } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="3">
      <div className="flex flex-col space-y-3">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <LatestIssues />
      </div>

      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Access a comprehensive dashboard to view, manage, and analyze project issues. Stay updated and improve project efficiency.",
  viewport: "width=device-width, initial-scale=1.0",
  applicationName: "Issue Tracker",
  abstract:
    "A user-friendly dashboard to oversee all project issues, providing insights and analytics for effective project management.",
  category: "Project Management",
  classification: "Web Application",
  keywords:
    "issue tracker, project management, dashboard, issue analytics, project efficiency, task management, bug tracking",

  // Correcting the twitter property based on the provided example
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle", // Replace with your actual Twitter handle
    creator: "@CreatorHandle", // Replace with the handle of the content creator, if different from the site handle
    images: "https://example.com/og.png", // Replace with the actual URL of your Twitter image
  },

  // Correcting the verification property based on the provided example
  verification: {
    google: "YourGoogleVerificationCode", // Replace with your actual Google verification code
    yandex: "YourYandexVerificationCode", // Replace with your actual Yandex verification code
    me: "YourMeVerificationCode", // Replace with your actual 'me' verification code, if you have one
  },
};
