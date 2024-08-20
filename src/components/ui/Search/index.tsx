"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDebounce } from "@/hooks";
import styles from "./style.module.scss";

interface SearchProps {
  placeholder: string;
  icon?: string;
  clear?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  reset?: boolean;
}

export const Search = ({
  placeholder,
  icon,
  clear,
  onChange,
  disabled,
  reset,
}: SearchProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onChange && onChange(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    (disabled || reset) && setValue("");
  }, [disabled, reset]);

  return (
    <div
      className={`${styles.search} ${disabled ? styles.search__disabled : ""}`}
    >
      {icon && (
        <Image
          src={icon}
          width={20}
          height={20}
          alt="search"
          className={styles.search__icon}
        />
      )}

      <input
        type="text"
        placeholder={placeholder}
        className={styles.search__field}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {clear && (
        <span
          className={`${styles.search__clear} ${
            value ? styles.search__clear_show : ""
          }`}
          onClick={() => setValue("")}
        >
          <Image
            src="/icons/x-cancel-icon.svg"
            width={20}
            height={20}
            alt="clear"
          />
        </span>
      )}
    </div>
  );
};
