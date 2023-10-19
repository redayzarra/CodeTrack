"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

// Type for the form data
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();

  // React Hook Form for form validation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        // If we already have an issue: update it.
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        // If new issue: post the data to the MySQL Server
        await axios.post("/api/issues", data);
      }
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("A strange error occurred... We're looking into it.");
    }
  });

  return (
    <>
      {/* Callout - Error Message */}
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3 prose" onSubmit={onSubmit}>
        {/* Title - Input Form */}
        <TextField.Root className="font-medium">
          <TextField.Input
            defaultValue={issue?.title}
            size="3"
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* Description - Markdown Editor */}
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {/* Submit Button */}
        <Button disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Loading <Spinner />
            </>
          ) : (
            <>
              <FaCheckCircle /> {issue ? "Update" : "Submit"}
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default IssueForm;
