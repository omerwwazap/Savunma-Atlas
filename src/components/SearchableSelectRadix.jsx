import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchableSelectRadix = ({
  value,
  onChange,
  options,
  placeholder = "Select",
  searchPlaceholder = "Search...",
}) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const safeOptions = (options || []).filter((o) => String(o.value).length > 0);
    if (!q) return safeOptions;
    return safeOptions.filter((o) => (o.label || "").toLowerCase().includes(q));
  }, [options, query]);

  const selectValue = value || undefined; // undefined shows placeholder

  return (
    <Select value={selectValue} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-[var(--radix-select-trigger-width)]">
        <div className="p-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </div>
        {filtered.map((o) => (
          <SelectItem key={o.value ?? "__empty"} value={String(o.value)}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SearchableSelectRadix;

