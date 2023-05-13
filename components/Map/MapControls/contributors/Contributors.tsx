import { StyledContributorsLink } from './Contributors.styles'

const Contributors = () => {
  return (
    <StyledContributorsLink
      href="https://www.openstreetmap.org/about"
      target="_blank"
      title="OpenStreetMap contributors"
      aria-label="OpenStreetMap contributors"
    >
      OpenStreetMap contributors
    </StyledContributorsLink>
  )
}

export { Contributors }
