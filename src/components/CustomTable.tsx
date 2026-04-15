import React from "react";
import { Table } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { TableColumnType } from "antd";
import type { CustomTableProps } from "../types";

export type { TableColumnType };

function CustomTable<T extends object>({
  columns,
  dataSource,
  total,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  loading,
  rowKey,
  showPagination = true,
  ...rest
}: CustomTableProps<T>) {
  const totalCount = total ?? (dataSource as T[] | undefined)?.length ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const itemRender = (
    _: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    element: React.ReactNode,
  ): React.ReactNode => {
    if (type === "prev") {
      return (
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-secondary border border-border-subtle rounded-lg hover:border-primary hover:text-primary transition-colors bg-white">
          <LeftOutlined className="text-xs" />
          <span>Previous</span>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-secondary border border-border-subtle rounded-lg hover:border-primary hover:text-primary transition-colors bg-white">
          <span>Next</span>
          <RightOutlined className="text-xs" />
        </button>
      );
    }
    if (type === "page") {
      return (
        <span className="min-w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors">
          {element}
        </span>
      );
    }
    return element;
  };

  return (
    <div>
      <Table<T>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        pagination={
          showPagination && totalPages > 0
            ? {
                total: totalCount,
                pageSize,
                current: currentPage,
                onChange: onPageChange,
                itemRender,
                showSizeChanger: false,
                className: "custom-pagination",
                showTotal: () => (
                  <span className="text-sm text-text-secondary">
                    Page{" "}
                    <span className="font-medium text-text-primary">
                      {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-text-primary">
                      {totalPages}
                    </span>
                  </span>
                ),
              }
            : false
        }
        className="custom-table"
        rowClassName="border-b border-border-subtle"
        {...rest}
      />
    </div>
  );
}

export default CustomTable;
