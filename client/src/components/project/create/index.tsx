"use client";

import createProject from "@/actions/create-project";
import toast from "@/components/toast";
import { CreateProjectSchema } from "@/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateProject = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateProjectSchema>) => {
    startTransition(() => {
      createProject(values)
        .then((res) => {
          toast({
            type: "success",
            message: "Project created successfully",
          });

          router.push(`/projects/${res.data.id}`);
        })
        .catch(() => {
          toast({
            type: "error",
            message: "Something went wrong",
          });
        })
        .finally(() => {
          reset();
        });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Project Name
        </label>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="text"
          placeholder="Project Name"
          {...register("name")}
          disabled={isPending}
        />
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Description
          </label>
        </div>
        <textarea
          rows={4}
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          placeholder="Description"
          {...register("description")}
          disabled={isPending}
        />
      </div>
      <div className="flex flex-row justify-end">
        <button
          className="bg-gray-700 text-white font-normal py-2 px-4 rounded hover:bg-gray-600"
          type="submit"
          disabled={isPending}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateProject;
