import { Table } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import IssueActions from "./IssueActions";

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="mb-4">
        <IssueActions />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="font-semibold text-slate-800 text-base">
              Issue
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="font-semibold text-slate-800 hidden md:table-cell text-base">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="font-semibold text-slate-800 hidden md:table-cell text-base">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingIssuesPage;
