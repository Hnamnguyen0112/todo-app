"use client";

import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  AdjustmentsVerticalIcon,
  ArchiveBoxXMarkIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import {
  BellIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import React from "react";
import {
  useLayout,
  useLayoutActions,
} from "@/components/providers/LayoutProvider";
import signOut from "@/actions/sign-out";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { toggleSidebar } = useLayout();
  const { setToggleSidebar } = useLayoutActions();

  return (
    <header className="flex-shrink-0 border-b">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-3">
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-none"
            type="button"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            {toggleSidebar ? (
              <ChevronDoubleLeftIcon className="w-6 h-6 text-gray-500" />
            ) : (
              <ChevronDoubleRightIcon className="w-6 h-6 text-gray-500" />
            )}
          </button>
        </div>

        <div className="relative flex items-center space-x-3 px-2">
          <Menu>
            <MenuButton
              className={clsx(
                pathname.includes("/your-work")
                  ? "text-primary-500"
                  : "text-gray-500",
                "font-sans font-semibold text-sm flex px-2",
              )}
            >
              Your Work
              <ChevronDownIcon className="w-4 h-4 m-auto" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="shadow w-52 origin-top-right rounded-xl border border-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            ></MenuItems>
          </Menu>

          <Menu>
            <MenuButton
              className={clsx(
                pathname.includes("/projects")
                  ? "text-primary-500"
                  : "text-gray-500",
                "font-sans font-semibold text-sm flex px-2",
              )}
            >
              Projects
              <ChevronDownIcon className="w-4 h-4 m-auto" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="shadow w-52 origin-top-right rounded-xl border border-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            ></MenuItems>
          </Menu>

          <Menu>
            <MenuButton
              className={clsx(
                pathname.includes("/filters")
                  ? "text-primary-500"
                  : "text-gray-500",
                "font-sans font-semibold text-sm flex px-2",
              )}
            >
              Filters
              <ChevronDownIcon className="w-4 h-4 m-auto" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="shadow w-52 origin-top-right rounded-xl border border-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            ></MenuItems>
          </Menu>

          <Menu>
            <MenuButton
              className={clsx(
                pathname.includes("/dashboards")
                  ? "text-primary-500"
                  : "text-gray-500",
                "font-sans font-semibold text-sm flex px-2",
              )}
            >
              Dashboards
              <ChevronDownIcon className="w-4 h-4 m-auto" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="shadow w-52 origin-top-right rounded-xl border border-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            ></MenuItems>
          </Menu>
        </div>

        <div className="items-center hidden space-x-2 md:flex md:mr-auto">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-3 rounded-md hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border"
          />
        </div>

        <div className="relative flex items-center space-x-3">
          <div className="items-center hidden space-x-3 md:flex">
            <Menu>
              <MenuButton className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-none">
                <BellIcon className="w-6 h-6 text-gray-500" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="shadow w-52 origin-top-right rounded-xl border border-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <PencilIcon className="size-4 fill-white/30" />
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <Square2StackIcon className="size-4 fill-white/30" />
                    Duplicate
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                    Archive
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <TrashIcon className="size-4 fill-white/30" />
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

            <Menu>
              <MenuButton className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-none">
                <Squares2X2Icon className="w-6 h-6 text-gray-500" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="shadow w-96 origin-top-right rounded-xl border border-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <PencilIcon className="size-4 fill-white/30" />
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <Square2StackIcon className="size-4 fill-white/30" />
                    Duplicate
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                    Archive
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <TrashIcon className="size-4 fill-white/30" />
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

            <Menu>
              <MenuButton className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-none">
                <AdjustmentsVerticalIcon className="w-6 h-6 text-gray-500" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="shadow w-52 origin-top-right rounded-xl border border-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <PencilIcon className="size-4 fill-white/30" />
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <Square2StackIcon className="size-4 fill-white/30" />
                    Duplicate
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                    Archive
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <TrashIcon className="size-4 fill-white/30" />
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>

          <Menu>
            <MenuButton className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring-none">
              <Image
                className="object-cover w-8 h-8 rounded-full"
                src="https://avatars0.githubusercontent.com/u/57622665"
                alt="Ahmed Kamel"
                width={32}
                height={32}
              />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="shadow w-52 origin-top-right rounded-xl border border-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <form action={signOut}>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                    type="submit"
                  >
                    <PencilIcon className="size-4 fill-white/30" />
                    Logout
                  </button>
                </form>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Navbar);
