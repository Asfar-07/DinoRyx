"use client"
import * as React from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"


interface CommandItemType { 
    name: string,
    component: React.FC,
    function: Function | null,
}
interface ShortcutsCommandProps {
    CommandItems:CommandItemType[],
    CustomButton:any,
}  
export default function ShortcutsCommand({CommandItems,CustomButton}:ShortcutsCommandProps) {

  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col gap-4">
      <div onClick={() => setOpen(true)} >
        {CustomButton}
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Settings">
                {CommandItems.map((item) => (
                    <CommandItem key={item.name} className=" cursor-pointer" onSelect={()=>{
                        item.function != null ? item.function() : setOpen(false);
                        setOpen(false);
                    }} >
                        <item.component />
                    </CommandItem>
                   ))} 

            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
