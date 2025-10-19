import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchableSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  buttonClassName,
}) => {
  const [open, setOpen] = useState(false);

  const displayValue = useMemo(() => {
    const found = options.find((option) => option.value === value);
    return found ? found.label : placeholder;
  }, [options, value, placeholder]);

  const handleSelect = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", buttonClassName)}
        >
          <span className="truncate">{displayValue}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value ?? "__empty"}
                  value={option.label}
                  onSelect={() => handleSelect(option)}
                  onMouseDown={(e) => {
                    // Prevent focus loss before selection registers in some browsers
                    e.preventDefault();
                    handleSelect(option);
                  }}
                  className="flex items-center justify-between"
                >
                  <span className="truncate mr-2">{option.label}</span>
                  <Check
                    className={cn(
                      "h-4 w-4 transition-opacity",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableSelect;

