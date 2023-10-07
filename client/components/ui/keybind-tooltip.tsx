'use client'

import React from 'react'

const KeybindTooltip = ({ children }: { children: string }) => {
  return (
    <span className="font-semibold bg-popover border border-popover-foreground rounded-md p-1">
      {children}
    </span>
  )
}

export { KeybindTooltip }
