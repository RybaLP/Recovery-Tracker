import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useFormStore from "@/store/formStore"


const addictions = [

  {
    value: "alcochol",
    label: "Alcochol🍾",
  },
  {
    value: "smoking",
    label: "Smoking🚬",
  },
  {
    value: "fastfood",
    label: "Fastfood🍔",
  },
  {
    value: "videogames",
    label: "Video Games🎮",
  },
  {
    value: "energydrinks",
    label: "Energydrinks⚡",
  },
  {
    value : "narcotics",
    label : "Narcotics💊"
  },
  {
    value : "gambling",
    label : "Gambling💸"
  },
  {
    value : "scrolling",
    label : "Scrolling📱"
  }
]

export function ComboboxDemo() {
  const addiction = useFormStore((state)=>state.addictionName);
  const setAddiction = useFormStore((state)=>state.setAddictionName);

  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {addiction
            ? addictions.find((a) => a.value === addiction)?.label
            : "Select addiction..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search addiction..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {addictions.map((a) => (
                <CommandItem
                  key={a.value}
                  value={a.value}
                  onSelect={(currentValue) => {
                    setAddiction(currentValue === addiction ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      addiction === a.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {a.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
