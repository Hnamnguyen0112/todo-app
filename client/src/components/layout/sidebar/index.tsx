import {
  useLayout,
  useLayoutActions,
} from "@/components/providers/LayoutProvider";
import {
  ClipboardDocumentIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";

const Sidebar = () => {
  const { toggleSidebar } = useLayout();
  const { setToggleSidebar } = useLayoutActions();

  return (
    <motion.aside
      initial={{ width: "0px", x: -256 }}
      animate={{
        width: toggleSidebar ? "256px" : "0px",
        x: toggleSidebar ? 0 : -256,
      }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "text-black fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none",
      )}
    >
      <div className="flex items-center justify-between flex-shrink-0 p-2">
        <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
          K<span>-WD</span>
        </span>
        <button
          className="p-2 rounded-md lg:hidden"
          type="button"
          onClick={() => setToggleSidebar(false)}
        >
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
        <ul className="p-2 overflow-hidden">
          <li>
            <Link
              href="/your-work"
              className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 text-sm"
            >
              <HomeIcon className="w-6 h-6 text-gray-500" />
              <span>Your work</span>
            </Link>
          </li>
          <li>
            <Link
              href="/status-updates"
              className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 text-sm"
            >
              <ClipboardDocumentIcon className="w-6 h-6 text-gray-500" />
              <span>Status updates</span>
            </Link>
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
