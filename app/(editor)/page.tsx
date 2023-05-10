'use client'

import { Map } from '@/components/Map/Map'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { StyledContainer } from '@/components/StyledContainer/StyledContainer'

export default function Editor() {
  return (
    <>
      {' '}
      <StyledContainer variant="layout">
        <Sidebar />
        <Map />
      </StyledContainer>
    </>
  )
}
