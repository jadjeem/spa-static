import React, { useMemo } from "react"
import { AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai"
import { FiAlertOctagon } from "react-icons/fi"
import classNames from "classnames"

const Icons = {
  info: AiOutlineInfoCircle,
  warning: AiOutlineWarning,
  alert: FiAlertOctagon,
}

const Notice = ({ data }) => {
  const Icon = useMemo(() => Icons[data?.type], [data])

  if (!data) {
    console.log(data)
    return <></>
  }

  return (
    <div
      className={classNames(
        "self-center flex flex-row-reverse items-center justify-between gap-2 text-righ p-8 rounded-lg my-8 font-semibold",
        {
          // Apply theme based on notification type
          "bg-blue-600 text-white": data.type === "info",
          "bg-yellow-600 text-white": data.type === "warning",
          "bg-red-600 text-white": data.type === "alert",
        }
      )}
    >
      <Icon color="white" size={30} />
      <div>
        {data.title && <h3 className="font-bold text-lg">{data.title}</h3>}
        <p>{data.content}</p>
      </div>
    </div>
  )
}

export default Notice
