import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AgeRangeFilterProps {
  onAgeChange: (minAge: number | undefined, maxAge: number | undefined) => void;
}

export function AgeRangeFilter({ onAgeChange }: AgeRangeFilterProps) {
  const [minAge, setMinAge] = useState<string>("");
  const [maxAge, setMaxAge] = useState<string>("");

  const handleApply = () => {
    onAgeChange(
      minAge ? parseInt(minAge) : undefined,
      maxAge ? parseInt(maxAge) : undefined
    );
  };

  const handleClear = () => {
    setMinAge("");
    setMaxAge("");
    onAgeChange(undefined, undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minAge">Min Age</Label>
          <Input
            id="minAge"
            type="number"
            min="0"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            placeholder="Min age"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxAge">Max Age</Label>
          <Input
            id="maxAge"
            type="number"
            min="0"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            placeholder="Max age"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleApply} className="flex-1">
          Apply
        </Button>
        <Button onClick={handleClear} variant="outline" className="flex-1">
          Clear
        </Button>
      </div>
    </div>
  );
}