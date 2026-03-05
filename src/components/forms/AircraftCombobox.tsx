'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import aircraftData from '@/data/aircraft-types.json'
import type { AircraftType } from '@/types'

const aircraft = aircraftData as AircraftType[]

interface AircraftComboboxProps {
  value: string
  onChange: (icao: string, name: string) => void
  placeholder?: string
}

export function AircraftCombobox({ value, onChange, placeholder = 'Select aircraft...' }: AircraftComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')

  const results = React.useMemo(() => {
    if (!query) return aircraft.slice(0, 12)
    const q = query.toLowerCase()
    return aircraft.filter(a =>
      a.icao.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.manufacturer.toLowerCase().includes(q)
    ).slice(0, 12)
  }, [query])

  const selected = aircraft.find(a => a.icao === value)

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
              <span className="font-mono font-bold text-blue-400">{selected.icao}</span>
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
            placeholder="Search aircraft type..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>No aircraft found.</CommandEmpty>
            <CommandGroup>
              {results.map((ac) => (
                <CommandItem
                  key={ac.icao}
                  value={ac.icao}
                  onSelect={() => {
                    onChange(ac.icao, ac.name)
                    setOpen(false)
                    setQuery('')
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === ac.icao ? 'opacity-100' : 'opacity-0')} />
                  <span className="font-mono font-bold text-blue-400 w-10">{ac.icao}</span>
                  <span className="ml-2 text-sm">{ac.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
