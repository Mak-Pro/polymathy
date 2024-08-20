"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { numberFormatter } from "@/helpers";

interface TextFieldProps {
  placeholder: string;
  type?: "input" | "textarea";
  initValue?: string | number;
  focusHandler?: (value: boolean) => void;
  changeHandler?: (value: string) => void;
  blurHandler?: (value: boolean) => void;
  name: string;
  prefix?: string;
  suffix?: string;
  numeric?: boolean;
  reset?: boolean;
}

export const TextField = ({
  placeholder,
  type,
  initValue,
  focusHandler,
  changeHandler,
  blurHandler,
  name,
  prefix,
  suffix,
  numeric,
  reset,
}: TextFieldProps) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState(initValue ? initValue : "");

  useEffect(() => {
    reset && setValue("");
  }, [reset]);

  return (
    <div
      className={`${styles.textfield} ${
        focus || value || initValue ? styles.textfield__focus : ""
      } ${prefix ? styles.textfield__pfx : ""} ${
        suffix ? styles.textfield__sfx : ""
      }`}
    >
      {type === "textarea" ? (
        <textarea
          name={name}
          className={`${styles.textfield__input} ${styles.textfield__input_area}`}
          onFocus={() => {
            setFocus(true);
            focusHandler && focusHandler(true);
          }}
          onBlur={() => {
            setFocus(false);
            blurHandler && blurHandler(false);
          }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            changeHandler && changeHandler(e.target.value);
          }}
        ></textarea>
      ) : (
        <>
          {prefix && <span className={styles.textfield__prefix}>{prefix}</span>}
          <input
            type="text"
            inputMode={numeric ? "numeric" : "text"}
            name={name}
            className={styles.textfield__input}
            onFocus={() => {
              setFocus(true);
              focusHandler && focusHandler(true);
            }}
            onBlur={() => {
              setFocus(false);
              blurHandler && blurHandler(false);
            }}
            value={value}
            onKeyDown={(e) => {
              if (numeric && e.code === "Space") e.preventDefault();
            }}
            onChange={(e) => {
              if (numeric) {
                if (e.target.value.length > 9) {
                  e.preventDefault();
                } else {
                  const rex = /^[\d\s]+$/;
                  if (e.target.value === "" || rex.test(e.target.value)) {
                    if (e.target.value === "") {
                      setValue("");
                    } else {
                      setValue(
                        numberFormatter(+e.target.value.replace(/\s/g, ""))
                      );
                    }
                  }
                }
              } else {
                setValue(e.target.value);
              }

              changeHandler && changeHandler(e.target.value);
            }}
          />
          {suffix && <span className={styles.textfield__suffix}>{suffix}</span>}
        </>
      )}

      <fieldset
        aria-hidden="true"
        className={`${styles.textfield__fieldset} ${
          focus || value || initValue ? styles.textfield__fieldset__focus : ""
        }`}
      >
        <legend className={styles.textfield__legend}>
          <span className={styles.textfield__legend_text}>{placeholder}</span>
        </legend>
      </fieldset>
    </div>
  );
};
