import createColumn from "@/actions/create-column";
import toast from "@/components/toast";
import { Column } from "@/interfaces/column";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";

interface CreateColumnProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  strartTransition: (callback: () => void) => void;
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
}

const CreateColumn = ({
  open,
  setOpen,
  strartTransition,
  columns,
  setColumns,
}: CreateColumnProps) => {
  const params = useParams();
  const { id } = params;

  const [newColumn, setNewColumn] = useState("");
  const handleCreateColumn = () => {
    const payload = {
      name: newColumn,
      position: columns.length + 1,
    };

    strartTransition(() => {
      createColumn({ projectId: id as string, payload })
        .then(({ data }) => {
          toast({
            type: "success",
            message: "Column created successfully",
          });

          setColumns((prev) => [...prev, data]);
        })
        .catch(() => {
          toast({
            type: "error",
            message: "Something went wrong",
          });
        })
        .finally(() => {
          setNewColumn("");
          setOpen(false);
        });
    });
  };

  if (!open) {
    return null;
  }

  return (
    <div className="flex flex-col bg-gray-100 p-2 rounded-lg h-28 justify-between">
      <input
        type="text"
        value={newColumn}
        onChange={(e) => setNewColumn(e.target.value)}
        className="w-40 lg:w-60 xl:w-80 p-2 bg-white rounded-lg shadow-md text-black focus:outline-none"
      />
      <div className="flex flex-row justify-end gap-x-2">
        <button
          onClick={handleCreateColumn}
          className="p-2 bg-white rounded-lg text-gray-800 text-left mt-2 shadow-md"
        >
          <CheckIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setOpen(false)}
          className="p-2 bg-white rounded-lg text-gray-800 text-left mt-2 shadow-md"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface useCreateColumnProps {
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
}

export default function useCreateColumn({
  columns,
  setColumns,
}: useCreateColumnProps) {
  const [open, setOpen] = useState(false);
  const [isPending, strartTransition] = useTransition();

  const CreateColumnCallback = useCallback(() => {
    return (
      <CreateColumn
        open={open}
        setOpen={setOpen}
        strartTransition={strartTransition}
        columns={columns}
        setColumns={setColumns}
      />
    );
  }, [open, setOpen, strartTransition, columns, setColumns]);

  return useMemo(() => {
    return {
      open,
      setOpen,
      CreateColumn: CreateColumnCallback,
      isLoading: isPending,
    };
  }, [open, setOpen, CreateColumnCallback, isPending]);
}
