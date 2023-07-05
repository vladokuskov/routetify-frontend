import clsx from 'clsx'

const Contributors = () => {
  return (
    <a
      className={clsx(
        'hocus:underline font-roboto absolute left-0 top-0 p-1 bg-neutral-200  dark:bg-opacity-50 bg-opacity-50 cursor-pointer text-neutral-500 text-sm pointer-events-auto rounded-md m-1',
        'max-hsm:right-1 max-hsm:bottom-1 max-hsm:top-auto max-hsm:left-auto',
        'dark:bg-neutral-500 dark:text-neutral-300',
      )}
      href="https://www.openstreetmap.org/about"
      target="_blank"
      title="OpenStreetMap contributors"
      aria-label="OpenStreetMap contributors"
    >
      OpenStreetMap contributors
    </a>
  )
}

export { Contributors }
