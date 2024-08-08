"use client";

import getProjectList from "@/actions/get-project-list";
import toast from "@/components/toast";
import { Project } from "@/interfaces/project";
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from "@/utils/constants";
import { Pagination } from "@nextui-org/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const YourWorkProjects = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 0 });
  const [page, setPage] = useState(DEFAULT_PAGINATION_PAGE);
  const [limit] = useState(DEFAULT_PAGINATION_LIMIT);
  const [keyword] = useState("");

  const fetchProjects = () => {
    getProjectList({
      page,
      limit,
      keyword,
    })
      .then((response) => {
        if (response.success) {
          setProjects(response.data);
          setMeta(response.meta);
        }
      })
      .catch(() => {
        toast({
          type: "error",
          message: "Failed to fetch projects",
        });
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [page, limit, keyword]);

  const handleRedirect = useCallback(
    (id: string) => {
      router.push(`/projects/${id}`);
    },
    [router],
  );

  return (
    <>
      <div
        className={clsx(
          projects.length !== 0 && "xlh-80",
          "grid grid-cols-1 gap-8 mt-6 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4",
        )}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg h-36 cursor-pointer"
            onClick={() => handleRedirect(project.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-800">{project.name}</span>
                <span className="text-lg font-semibold text-gray-400">
                  100,221
                </span>
              </div>
              <div className="p-10 bg-gray-200 rounded-md"></div>
            </div>
            <div className="truncate text-gray-600">{project.description}</div>
          </div>
        ))}
      </div>
      {projects.length > 0 && (
        <div className="flex justify-end mt-6">
          <Pagination
            isCompact
            showControls
            total={meta.totalPages}
            initialPage={DEFAULT_PAGINATION_PAGE}
            page={page}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
    </>
  );
};

export default YourWorkProjects;
