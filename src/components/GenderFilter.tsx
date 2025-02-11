
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface GenderFilterProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
}

export function GenderFilter({
  selectedGender,
  onGenderChange,
}: GenderFilterProps) {
  const genders = ["any", "male", "female"];

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandList>
        <CommandEmpty>No gender found.</CommandEmpty>
        <CommandGroup>
          {genders.map((gender) => (
            <CommandItem
              key={gender}
              onSelect={() => onGenderChange(gender === selectedGender ? "" : gender)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedGender === gender ? "opacity-100" : "opacity-0"
                )}
              />
              <span className="capitalize">{gender}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
