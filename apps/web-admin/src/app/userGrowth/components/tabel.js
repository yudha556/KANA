export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto shadow-sm rounded-lg">
      <table className="min-w-full border-collapse">
        <thead className="bg-[#4EC0E60F]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-4 text-center text-sm font-semibold text-gray-700 
                           shadow-sm"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => {
                const value = row[col.key];

                if (col.type === "badge") {
                  return (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-center shadow-sm"
                    >
                      <span
                        className="text-white px-4 py-2 rounded-md text-sm text-center font-semibold inline-block"
                        style={{ backgroundColor: col.color }}
                      >
                        {value}
                      </span>
                    </td>
                  );
                }

                // Normal column
                return (
                  <td key={col.key} className="px-4 py-3 text-sm text-center shadow-sm">
                    {col.render ? col.render(value, row) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}