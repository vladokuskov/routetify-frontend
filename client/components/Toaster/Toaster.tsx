import { Toaster as ToasterRoot } from 'react-hot-toast'

const Toaster = () => {
  return (
    <ToasterRoot
      toastOptions={{
        className: 'font-roboto font-semibold',
        position: 'top-center',
        style: {
          padding: '.5rem',
          color: '#f4f4f4',
        },
        success: {
          style: {
            background: 'green',
          },
        },
        error: {
          style: {
            background: '#ef4444',
            opacity: '70%',
          },
        },
      }}
    />
  )
}

export { Toaster }
