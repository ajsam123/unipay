import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import errorIcon from "../assets/error.svg";
import { cn } from "../lib/utils";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";

const Combobox = ({
  label,
  hint,
  error,
  errorBorder,
  className,
  InputClassName,
  options = [],
  value,
  onChange,
  placeholder = "Select option...",
}) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.code === value);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label className="body-small-medium dark:text-neutral-400 text-neutral-black-13">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={`px-3 py-2 gap-2 rounded-xl border focus-within:inset-shadow-custom-sm focus-within:drop-shadow-sm dark:border-neutral-600 flex w-full items-center justify-between cursor-pointer dark:text-white dark:bg-background bg-neutral-black-2 ${InputClassName} ${errorBorder} ${
              error ? "border-error-100" : "border-neutral-black-5"
            }`}
            tabIndex={0}
          >
            <span className="truncate">
              {selected ? selected.name : placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl z-9999 border-none overflow-y-scroll">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No option found.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.code}
                  value={option.name}
                  onSelect={() => {
                    onChange(option.code);
                    setOpen(false);
                  }}
                >
                  {option.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.code ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Hint + Error */}
      <div>
        {hint && (
          <span className="body-small-regular text-neutral-black-9">
            {hint}
          </span>
        )}

        {error && (
          <div className="flex gap-1">
            <img src={errorIcon} alt="" />
            <span className="body-small-regular text-destructive">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Combobox;
