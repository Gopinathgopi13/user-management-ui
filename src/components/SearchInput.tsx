import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "w-64",
}: SearchInputProps) {
  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined className="text-text-secondary" />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      allowClear
    />
  );
}

export default SearchInput;
