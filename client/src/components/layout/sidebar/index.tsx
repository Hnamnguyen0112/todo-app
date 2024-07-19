import Image from "next/image";
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
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import Link from "next/link";

const Sidebar = () => {
  const { toggleSidebar } = useLayout();
  const { setToggleSidebar } = useLayoutActions();

  const size = useWindowSize();

  return (
    <motion.aside
      animate={{
        width: toggleSidebar
          ? "256px"
          : size.width != null && size.width > 1024
            ? "64px"
            : "0",
      }}
      transition={{ duration: 0.1 }}
      className={clsx(
        "text-black fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none",
      )}
    >
      <div className="flex items-center justify-between flex-shrink-0 p-2">
        <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
          <Image
            src="https://avatars0.githubusercontent.com/u/57622665"
            alt="Vercel"
            width={30}
            height={30}
          />
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
              <HomeIcon
                className={clsx(
                  !toggleSidebar && "m-auto",
                  "w-6 h-6 text-gray-500",
                )}
              />
              <AnimatePresence>
                {toggleSidebar && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 1, delay: 0.2 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                  >
                    Your work
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </li>
          <li>
            <Link
              href="/status-updates"
              className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 text-sm"
            >
              <ClipboardDocumentIcon
                className={clsx(
                  !toggleSidebar && "m-auto",
                  "w-6 h-6 text-gray-500",
                )}
              />
              <AnimatePresence>
                {toggleSidebar && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 1, delay: 0.2 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                  >
                    Status updates
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
