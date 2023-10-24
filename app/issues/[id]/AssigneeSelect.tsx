"use client";

import { Spinner } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = (userId: string) => {
    try {
      axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "NoValue" ? null : userId,
        status: userId === "NoValue" ? "OPEN" : "IN_PROGRESS",
      });
      router.push("/issues/" + issue.id);
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-w-[90px] flex items-center justify-center text-zinc-300">
        <Spinner />
      </div>
    );
  }

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="NoValue">None</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 50 * 100, // 6 seconds
    retry: 4,
  });

export default AssigneeSelect;
