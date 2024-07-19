import Image from "next/image";

export default async function YourWork() {
  return (
    <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
        <h1 className="text-2xl font-semibold whitespace-nowrap">Your Work</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Users</span>
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

        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Users</span>
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

        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Users</span>
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

        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Users</span>
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
      </div>

      <h3 className="mt-6 text-xl">Users</h3>
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
              <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <tr
                      key={index}
                      className="transition-all hover:bg-gray-100 hover:shadow-lg"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <Image
                              className="rounded-full"
                              src="https://avatars0.githubusercontent.com/u/57622665?s=460"
                              alt=""
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Ahmed Kamel
                            </div>
                            <div className="text-sm text-gray-500">
                              ahmed.kamel@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Regional Paradigm Technician
                        </div>
                        <div className="text-sm text-gray-500">
                          Optimization
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        Admin
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
