import React, { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  const toggleSort = (key: keyof T, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });
  }, [data, sortKey, sortOrder]);

  const toggleSelectRow = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedRows(newSelected);
    onRowSelect?.(data.filter((row) => newSelected.has(row.id)));
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const allIds = new Set(data.map((r) => r.id));
      setSelectedRows(allIds);
      onRowSelect?.(data);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (data.length === 0) return <p className="p-6 text-center">No data available</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {selectable && (
              <th className="p-3 border border-gray-300">
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length}
                  onChange={toggleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map(({ key, title, sortable, dataIndex }) => (
              <th
                key={key}
                onClick={() => toggleSort(dataIndex, sortable)}
                className={`p-3 border border-gray-300 cursor-pointer select-none ${
                  sortable ? "hover:bg-gray-200" : ""
                }`}
                aria-sort={
                  sortKey === dataIndex
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                {title}{" "}
                {sortable && (
                  <span>
                    {sortKey === dataIndex
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : "⇅"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className={`transition-colors ${
                selectedRows.has(row.id) ? "bg-blue-100" : ""
              }`}
            >
              {selectable && (
                <td className="p-2 border border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleSelectRow(row.id)}
                    aria-label={`Select row ${row.id}`}
                  />
                </td>
              )}
              {columns.map(({ key, dataIndex }) => (
                <td key={key} className="p-2 border border-gray-300">
                  {String(row[dataIndex] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
