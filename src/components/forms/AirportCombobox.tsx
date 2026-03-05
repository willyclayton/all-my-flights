'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { searchAirports, getAirport } from '@/lib/airports'

interface AirportComboboxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function AirportCombobox({ value, onChange, placeholder = 'Select airport...' }: AirportComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')

  const results = React.useMemo(() => searchAirports(query, 8), [query])
  const selected = value ? getAirport(value) : undefined

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
              <span className="text-muted-foreground text-xs truncate">{selected.city}, {selected.country}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search airport, city, or IATA..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>No airports found.</CommandEmpty>
            <CommandGroup>
              {results.map((airport) => (
                <CommandItem
                  key={airport.iata}
                  value={airport.iata}
                  onSelect={(v) => {
                    onChange(v.toUpperCase())
                    setOpen(false)
                    setQuery('')
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === airport.iata ? 'opacity-100' : 'opacity-0')} />
                  <span className="font-mono font-bold text-blue-400 w-10">{airport.iata}</span>
                  <span className="flex flex-col ml-2">
                    <span className="text-sm">{airport.city}</span>
                    <span className="text-xs text-muted-foreground">{airport.name}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
