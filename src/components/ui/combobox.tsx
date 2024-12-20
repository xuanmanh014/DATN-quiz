"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Command, CommandGroup, CommandItem, CommandList } from "./command"

export interface IOption {
    value: string
    label: string
}

interface IComboboxProps {
    options?: IOption[]
    placeholder?: string
    defaultValue?: string
    onSelect?: (currentValue?: string) => void
    className?: string
}

export const Combobox: React.FC<IComboboxProps> = ({ options = [], placeholder = "", defaultValue = options[0]?.value, onSelect = (currentValue) => { }, className }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-[200px] justify-between ${className}`}
                >
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : (placeholder || "Select option...")}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-[200px] p-0`}>
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                        onSelect(currentValue);
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Combobox;