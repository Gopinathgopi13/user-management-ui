import { Table } from "antd";
import type { TableProps, TableColumnType } from "antd";

export type { TableColumnType };

interface CustomTableProps<T> extends TableProps<T> {
  total?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  showPagination?: boolean;
}

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
  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      pagination={
        showPagination
          ? {
              total,
              pageSize,
              current: currentPage,
              onChange: onPageChange,
              showTotal: (t) => `${t} user(s)`,
              size: "small",
            }
          : false
      }
      className="custom-table"
      rowClassName="border-b border-border-subtle"
      {...rest}
    />
  );
}

export default CustomTable;
