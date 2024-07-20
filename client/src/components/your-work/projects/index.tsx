"use client";

import getProjectList from "@/actions/get-project-list";
import toast from "@/components/toast";
import { Project } from "@/interfaces/project";
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from "@/utils/constants";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";

const YourWorkProjects = () => {
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

  return (
    <>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">{project.name}</span>
                <span className="text-lg font-semibold">100,221</span>
              </div>
              <div className="p-10 bg-gray-200 rounded-md"></div>
            </div>
            <div>
              <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">
                14%
              </span>
              <span>from 2019</span>
            </div>
          </div>
        ))}
      </div>
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
    </>
  );
};

export default YourWorkProjects;
