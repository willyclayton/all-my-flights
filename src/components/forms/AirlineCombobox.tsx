'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import airlinesData from '@/data/airlines.json'
import type { Airline } from '@/types'

const airlines = airlinesData as Airline[]

interface AirlineComboboxProps {
  value: string
  onChange: (iata: string, name: string) => void
  placeholder?: string
}

export function AirlineCombobox({ value, onChange, placeholder = 'Select airline...' }: AirlineComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')

  const results = React.useMemo(() => {
    if (!query) return airlines.slice(0, 12)
    const q = query.toLowerCase()
    return airlines.filter(a =>
      a.iata.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
    ).slice(0, 12)
  }, [query])

  const selected = airlines.find(a => a.iata === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selected ? (
            <span className="flex items-center gap-2">
              <span className="font-mono font-bold text-blue-400">{selected.iata}</span>
              <span className="text-muted-foreground text-xs">{selected.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search airline or IATA code..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>No airlines found.</CommandEmpty>
            <CommandGroup>
              {results.map((airline) => (
                <CommandItem
                  key={airline.iata}
                  value={airline.iata}
                  onSelect={() => {
                    onChange(airline.iata, airline.name)
                    setOpen(false)
                    setQuery('')
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === airline.iata ? 'opacity-100' : 'opacity-0')} />
                  <span className="font-mono font-bold text-blue-400 w-8">{airline.iata}</span>
                  <span className="ml-2 text-sm">{airline.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
