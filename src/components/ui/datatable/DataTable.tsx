'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RiSortAlphabetAsc, RiSortAlphabetDesc } from 'react-icons/ri';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    SortingState,
    RowSelectionState,
} from '@tanstack/react-table';

type DataTableProps<T extends object> = {
    data: T[];
    columns: ColumnDef<T, any>[];
    total: number;
    pageSize: number;
    pageIndex: number;
    onPaginationChange: (pageIndex: number, pageSize: number) => void;
    onRowClick?: (rowData: T) => void;
    onRowSelectionChange?: (selectedRows: T[]) => void;
    searchAble?: boolean;
    enableRowSelection?: boolean;
    getRowId?: (originalRow: T, index: number) => string;
    minWidthOfTable?: boolean;
};

export function DataTable<T extends object>({
    data,
    columns,
    total,
    pageSize,
    pageIndex,
    onPaginationChange,
    onRowClick,
    onRowSelectionChange,
    searchAble = false,
    enableRowSelection = false,
    getRowId,
    minWidthOfTable = true,
}: DataTableProps<T>) {
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const currentPageIndex = pageIndex;
    const currentPageSize = pageSize;

    const table = useReactTable({
        data,
        columns: enableRowSelection
            ? [
                {
                    id: 'select',
                    header: ({ table }) => (
                        <input
                            type="checkbox"
                            checked={table.getIsAllPageRowsSelected()}
                            onChange={table.getToggleAllPageRowsSelectedHandler()}
                        />
                    ),
                    cell: ({ row }) => (
                        <input
                            type="checkbox"
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ),
                    enableSorting: false,
                    enableHiding: false,
                },
                ...columns,
            ]
            : [...columns],
        getRowId,
        state: {
            sorting,
            globalFilter,
            columnFilters,
            rowSelection,
            pagination: {
                pageIndex: currentPageIndex,
                pageSize: currentPageSize,
            },
        },
        pageCount:
            Number.isFinite(total) && currentPageSize > 0
                ? Math.ceil(total / currentPageSize)
                : 1,
        manualPagination: true,
        enableRowSelection,
        onRowSelectionChange: (updater) => {
            const newState = typeof updater === 'function' ? updater(rowSelection) : updater;
            setRowSelection(newState);
            if (onRowSelectionChange) {
                const selectedRows = Object.keys(newState)
                    .map((key) => table.getRowModel().rowsById[key])
                    .filter(Boolean)
                    .map((row) => row.original);
                onRowSelectionChange(selectedRows);
            }
        },
        onPaginationChange: (updater) => {
            const newState =
                typeof updater === 'function'
                    ? updater({ pageIndex: currentPageIndex, pageSize: currentPageSize })
                    : updater;
            onPaginationChange(newState.pageIndex, newState.pageSize);
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            {searchAble && (
                <input
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Global Search..."
                    className="mb-4 ring ring-black/30 rounded px-3 py-2 w-full focus-within:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary"
                />
            )}

            <div className="w-full overflow-x-auto rounded-md">
                <table className={`${minWidthOfTable ? 'min-w-[1000px]' : ''} w-full text-sm text-left`}>
                    <thead className="bg-primary/40">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-2 whitespace-nowrap cursor-pointer select-none"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: <RiSortAlphabetAsc className="inline ml-1" />,
                                            desc: <RiSortAlphabetDesc className="inline ml-1" />,
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-t border-black/20 hover:bg-primary/10 cursor-pointer"
                                    onClick={() => onRowClick?.(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                                    className="px-4 py-6 text-center text-gray-500"
                                >
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 text-sm">
                <div>
                    Page {currentPageIndex + 1} of {table.getPageCount()}
                </div>

                <div className="flex gap-2 items-center">
                    <label htmlFor="pageSize">Rows per page:</label>
                    <select
                        id="pageSize"
                        value={currentPageSize}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            onPaginationChange(0, newSize);
                        }}
                        className="border rounded px-2 py-1"
                    >
                        {[10, 20, 30, 50, 100, 300, 500, 1000].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPaginationChange(currentPageIndex - 1, currentPageSize)}
                        disabled={!table.getCanPreviousPage()}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => onPaginationChange(currentPageIndex + 1, currentPageSize)}
                        disabled={!table.getCanNextPage()}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="goToPage">Go to page:</label>
                    <input
                        id="goToPage"
                        type="number"
                        min={1}
                        max={Number.isFinite(table.getPageCount()) ? table.getPageCount() : 1}
                        defaultValue={currentPageIndex + 1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const page = Number((e.target as HTMLInputElement).value) - 1;
                                if (!isNaN(page) && page >= 0 && page < table.getPageCount()) {
                                    onPaginationChange(page, currentPageSize);
                                }
                            }
                        }}
                        className="w-16 border rounded px-2 py-1"
                    />
                </div>
            </div>
        </div>
    );
}
