import React from "react";
import { Input } from "antd";
import type { CommonInputProps } from "../types";

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  error,
  isPassword = false,
  className,
  ...props
}) => {
  const InputComponent = isPassword ? Input.Password : Input;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-text-secondary text-sm font-medium ml-1">
          {label}
        </label>
      )}

      <InputComponent
        {...(props as any)}
        className={`
          bg-gray-50 border-border-subtle text-text-primary placeholder:text-text-secondary/50
          hover:border-primary/50 hover:bg-white
          focus:border-primary focus:bg-white focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]
          transition-all duration-300 rounded-lg py-2.5 px-4
          ${error ? "border-error/50 hover:border-error focus:border-error" : ""}
          ${className || ""}
        `}
      />

      {error && (
        <span className="text-error text-xs ml-1 animate-in fade-in slide-in-from-top-1 duration-300">
          {error}
        </span>
      )}
    </div>
  );
};

export default CommonInput;
