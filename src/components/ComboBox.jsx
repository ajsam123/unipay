import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";

const Combobox = ({
  label,
  hint,
  error,
  options = [], // [{ code: string | number, name: string }]
  value,
  onChange,
  placeholder = "Select option...",
  className = "",
  searchable = true,
}) => {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  const selected = options.find((opt) => opt.code === value);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.name.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 >= filteredOptions.length ? 0 : prev + 1,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev <= 0 ? filteredOptions.length - 1 : prev - 1,
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        onChange(filteredOptions[highlightedIndex].code);
        setOpen(false);
        setSearch("");
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-1.5 relative ${className}`}
    >
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-neutral-400">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800",
          error ? "border-red-500" : "border-gray-300 dark:border-neutral-600",
        )}
      >
        {/* IMPORTANT FIX HERE */}
        <span className="min-w-0 flex-1 truncate text-gray-900 dark:text-white">
          {selected ? selected.name : placeholder}
        </span>

        <ChevronsUpDown
          className={cn(
            "h-5 w-5 text-gray-400 flex-shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 shadow-lg z-50">
          {searchable && (
            <input
              type="text"
              className="w-full px-3 py-2 border-b border-gray-200 dark:border-neutral-700 focus:outline-none dark:bg-neutral-900"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
            />
          )}

          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-gray-400 dark:text-neutral-500">
              No options found.
            </div>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={option.code}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => {
                  onChange(option.code);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2 cursor-pointer",
                  highlightedIndex === index
                    ? "bg-indigo-100 dark:bg-neutral-700"
                    : "hover:bg-gray-100 dark:hover:bg-neutral-800",
                )}
              >
                <span className="block flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {option.name}
                </span>

                {value === option.code && (
                  <Check className="w-4 h-4 text-indigo-500" />
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Hint + Error */}
      <div className="flex flex-col gap-1 mt-1">
        {hint && (
          <span className="text-sm text-gray-500 dark:text-neutral-400">
            {hint}
          </span>
        )}

        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default Combobox;
