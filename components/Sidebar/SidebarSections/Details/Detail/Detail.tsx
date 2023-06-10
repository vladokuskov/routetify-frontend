import { TDetail } from './Detail.types'

const Detail = ({ title, subTitle, description }: TDetail) => {
  return (
    <div className="font-roboto w-full flex flex-col items-center justify-center gap-3 rounded-md px-1 py-2">
      <h4 className=" text-lg tracking-tighter font-bold text-neutral-800 opacity-70">
        {title}
      </h4>
      <div className="w-full flex flex-col justify-center items-center">
        <h5 className="text-lg tracking-tighter leading-5 font-bold text-neutral-800 opacity-70">
          {subTitle}
        </h5>
        <p className="text-sm tracking-tighter leading-5 font-semibold text-neutral-600 opacity-60">
          {description}
        </p>
      </div>
    </div>
  )
}

export { Detail }
