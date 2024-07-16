const Sidebar = () => {
  return (
    <aside className="text-black fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none">
      <div className="flex items-center justify-between flex-shrink-0 p-2">
        <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
          K<span>-WD</span>
        </span>
        <button className="p-2 rounded-md lg:hidden">
          <svg
            className="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
        <ul className="p-2 overflow-hidden">
          <li>
            <a
              href="#"
              className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100"
            >
              <span>
                <svg
                  className="w-6 h-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span>Dashboard</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
