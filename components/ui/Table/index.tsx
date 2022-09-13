/* eslint-disable max-len */
import { useTable, TableOptions } from "react-table";

type Props<T extends Record<string, unknown>> = TableOptions<T>;

const Table = <T extends Record<string, unknown>>(props: Props<T>): JSX.Element => {
  // PROPS
  const { columns, data } = props;

  // RT
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="flex flex-col mt-8">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            {/* {selectedPeople.length > 0 && (
              <div className="absolute top-0 flex items-center h-12 space-x-3 left-12 bg-gray-50 sm:left-16">
                <button
                  type="button"
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Delete all
                </button>
              </div>
            )} */}
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-300 table-fixed">
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, subIndex) => (
                      <th
                        {...column.getHeaderProps()}
                        key={subIndex}
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                {rows.map((row, index) => {
                  prepareRow(row);

                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, subIndex) => (
                        <td
                          {...cell.getCellProps()}
                          key={subIndex}
                          // key={`${index}-${subIndex}`}
                          className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
