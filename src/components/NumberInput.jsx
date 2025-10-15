import { useState, useEffect } from "react";

export default function NumberInput({
  value,
  onChange,
  placeholder,
  min = 0,
  className = "",
  ...rest
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (value == null || value === undefined) {
      setText("");
    } else if (document.activeElement !== inputRef?.current) {
      setText(String(value ?? ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const inputRef = (rest && rest.inputRef) || { current: null };

  const handleChange = (e) => {
    const raw = e.target.value;
    // allow empty while typing, will parse onBlur
    if (raw === "") {
      setText("");
      onChange?.(undefined);
      return;
    }
    // strip non-digits
    const digits = raw.replace(/\D+/g, "");
    // remove leading zeros
    const normalized = digits.replace(/^0+(\d)/, "$1");
    setText(normalized);
  };

  const handleBlur = () => {
    if (text === "") {
      onChange?.(undefined);
      return;
    }
    const num = Math.max(min, Number(text || 0));
    setText(String(num));
    onChange?.(num);
  };

  return (
    <input
      {...rest}
      ref={inputRef}
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all ${className}`}
    />
  );
}
