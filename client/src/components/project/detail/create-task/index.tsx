import createTask from "@/actions/create-task";
import toast from "@/components/toast";
import { Column } from "@/interfaces/column";
import { CreateTaskSchema } from "@/schemas/task";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateTaskProps {
  column: Column;
  open: boolean;
  setOpen: (open: boolean) => void;
  startTransition: (callback: () => void) => void;
  setColumns: Dispatch<SetStateAction<Column[]>>;
  formRef: React.RefObject<HTMLFormElement>;
}

function CreateTask({
  column,
  open,
  setOpen,
  startTransition,
  setColumns,
  formRef,
}: CreateTaskProps) {
  const params = useParams();
  const { id } = params;

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      columnId: column.id,
      assigneeId: null,
      title: "",
      description: "",
      position: column.tasks.length + 1,
      priority: 1,
      dueDate: Math.floor(new Date().getTime() / 1000),
    },
  });

  const onSubmit = (values: z.infer<typeof CreateTaskSchema>) => {
    startTransition(() => {
      createTask({ projectId: id as string, payload: values })
        .then(({ data }) => {
          toast({
            type: "success",
            message: "Project created successfully",
          });

          setColumns((prev) => {
            const newColumn = prev.find((col) => col.id === column.id);
            if (!newColumn) {
              return prev;
            }
            newColumn.tasks.push(data);
            return prev.map((col) => (col.id === column.id ? newColumn : col));
          });
        })
        .catch(() => {
          toast({
            type: "error",
            message: "Something went wrong",
          });
        })
        .finally(() => {
          reset();
          setOpen(false);
        });
    });
  };

  useEffect(() => {
    const element = formRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (element) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (element) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [formRef, setOpen]);

  if (!open) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        !open ? "hidden" : "flex",
        "flex-col bg-white p-2 rounded h-28 justify-between border-2 border-primary-500",
      )}
      ref={formRef}
    >
      <input
        type="text"
        className="p-2 bg-white text-black focus:outline-none"
        onChange={(e) => setValue("title", e.target.value)}
      />
      <div className="flex flex-row justify-end gap-x-2">
        <button
          type="submit"
          className="py-1 px-2 bg-primary-500 rounded text-white text-left shadow-md"
        >
          Create
        </button>
      </div>
    </form>
  );
}

interface useCreateTaskProps {
  column: Column;
  setColumns: Dispatch<SetStateAction<Column[]>>;
}

export default function useCreateTask({
  column,
  setColumns,
}: useCreateTaskProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const CreateTaskCallback = useCallback(() => {
    return (
      <CreateTask
        column={column}
        open={open}
        setOpen={setOpen}
        startTransition={startTransition}
        setColumns={setColumns}
        formRef={formRef}
      />
    );
  }, [column, open, setOpen, startTransition, setColumns, formRef]);

  return useMemo(() => {
    return {
      open,
      setOpen,
      isLoading: isPending,
      CreateTask: CreateTaskCallback,
      formRef,
    };
  }, [open, setOpen, isPending, CreateTaskCallback, formRef]);
}
