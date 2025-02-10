
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <Command>
      <CommandInput placeholder="Search category..." />
      <CommandEmpty>No category found.</CommandEmpty>
      <CommandGroup>
        {categories.map((category) => (
          <CommandItem
            key={category}
            value={category}
            onSelect={(currentValue) => {
              onCategoryChange(currentValue === selectedCategory ? "" : currentValue);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedCategory === category ? "opacity-100" : "opacity-0"
              )}
            />
            {category}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
}
