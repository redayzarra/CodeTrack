"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// Type for the form data
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  // Router for redirecting to new page
  const router = useRouter();

  // React Hook Form for form validation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  // State for displaying errors
  const [error, setError] = useState("");

  // State for displaying loading spinner
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      // Use Axios to post the data to the MySQL Server
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("A strange error occurred... We're looking into it.");
    }
  });

  return (
    <div className="max-w-l">
      {/* Callout - Error Message */}
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3 prose" onSubmit={onSubmit}>
        {/* Title - Input Form */}
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* Description - Markdown Editor */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
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
            "Submit Issue"
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
