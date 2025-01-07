import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

type ApiResponse = {
  data: User[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

const CustomTable: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (page: number, query: string, perPage: number) => {
    try {
      const response = await fetch(
        `https://api.razzakfashion.com/?paginate=${perPage}&search=${query}&page=${page}`,
      );
      const result: ApiResponse = await response.json();

      setData(result.data);
      setPerPage(result.per_page);
      setCurrentPage(result.current_page);
      setTotalPages(result.last_page);
      setTotalItems(result.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery, perPage);
  }, [currentPage, searchQuery, perPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Math.max(1, parseInt(event.target.value, 10)); // Prevent 0 or negative numbers
    setPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  const rangeStart = (currentPage - 1) * perPage + 1;
  const rangeEnd = Math.min(currentPage * perPage, totalItems);

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">Custom Table</h1>
      <div className="bg-gray-800 p-6 text-white">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="rounded-md p-2 text-black"
            placeholder="Search by name"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-left text-sm">
            <thead className="bg-gray-700 text-center">
              <tr>
                <th className="border border-gray-600 px-4 py-2">ID</th>
                <th className="border border-gray-600 px-4 py-2">Name</th>
                <th className="border border-gray-600 px-4 py-2">Email</th>
                <th className="border border-gray-600 px-4 py-2">Created At</th>
                <th className="border border-gray-600 px-4 py-2">
                  Verified At
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user) => (
                  <tr
                    key={user.id}
                    className="text-center odd:bg-gray-800 even:bg-gray-700"
                  >
                    <td className="border border-gray-600 px-4 py-2">
                      {user.id}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {user.created_at}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {user.email_verified_at}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-600 px-4 py-2 text-center"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Control */}
        <div className="mt-4 flex items-center justify-end gap-4">
          {/* Rows per page input with up/down buttons */}
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={perPage}
                onChange={handleRowsPerPageChange}
                className="w-16 rounded-md bg-gray-700 p-2 text-center text-white"
                min="1"
              />
            </div>
          </div>

          {/* Pagination Text */}
          <span>
            {rangeStart}-{rangeEnd} of {totalItems}
          </span>

          {/* Pagination Buttons */}
          <div className="flex space-x-2">
            <button
              className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </button>
            <button
              className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <button
              className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
            <button
              className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
