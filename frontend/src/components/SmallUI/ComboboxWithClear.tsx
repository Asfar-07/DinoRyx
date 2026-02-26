import React from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
type ComboboxWithClearProps={
    frameworks:any,
    defaultValue:any,
    callBackFun:Function
}
export default function ComboboxWithClear({frameworks,defaultValue,callBackFun}:ComboboxWithClearProps) {
  return (
    
      <Combobox items={frameworks} defaultValue={defaultValue} >
          <ComboboxInput placeholder="Select a framework" showClear />
          <ComboboxContent className="w-24 absolute">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList >
                  {(item) => (
                      <ComboboxItem key={item} value={item} onClick={() => {
                          callBackFun(item)
                      }} >
                          {item}
                      </ComboboxItem>
                  )}
              </ComboboxList>
          </ComboboxContent>
      </Combobox>

  )
}
