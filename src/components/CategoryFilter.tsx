
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories = [],
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search category..." />
      <CommandList>
        <CommandEmpty>No category found.</CommandEmpty>
        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              key={category}
              onSelect={() => onCategoryChange(category === selectedCategory ? "" : category)}
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
      </CommandList>
    </Command>
  );
}
