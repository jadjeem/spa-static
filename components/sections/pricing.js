import { MdCheckBox } from "react-icons/md"
import classNames from "classnames"
import { useCallback } from "react"
import { formatPrice } from "../../utils/formater"

const Pricing = ({ data }) => {
  const price = useCallback((p) => formatPrice(p), [data])
  const sectionId = useCallback(
    () => (data ? data.title.split(" ").join("-") : ""),
    [data]
  )

  return (
    <div id={sectionId()} className="container py-12">
      <h1 className="text-4xl text-center">{data.title}</h1>
      <div className="flex flex-col items-center lg:items-stretch lg:flex-row-reverse lg:flex-wrap gap-4 lg:justify-center mt-6">
        {data.plans.map((plan) => (
          <div
            className={classNames(
              "package-div hover:bg-primary-900",
              // Common classes
              "rounded-md border-2 py-4 px-4 md:w-lg lg:w-64",
              // Normal plan
              {
                "bg-gray-100 text-gray-900 border-gray-300":
                  !plan.isRecommended,
              },
              // Recommended plan
              {
                "bg-primary-50 text-primary-1000 border-primary-300":
                  plan.isRecommended,
              }
            )}
            key={plan.id}
          >
            <h2 className="text-2xl">{plan.name}</h2>
            <p
              className={classNames("mt-4 text-lg", {
                "text-primary-900": plan.isRecommended,
                "text-gray-700": !plan.isRecommended,
              })}
            >
              {plan.description}
            </p>
            <p className="text-center text-3xl mt-4">
              <div className="flex flex-row-reverse justify-center gap-2 font-semibold">
                <span>
                {price(plan.price)}
                <span className="text-base font-medium">{plan.pricePeriod}</span>
                </span>
                <span>ل.س</span>
              </div>
            </p>
            {plan.features && (
              <ul className="mt-4 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    className="flex flex-row justify-between items-center"
                    key={feature.id}
                  >
                    <span>{feature.name}</span>
                    <MdCheckBox
                      color="#1a5322"
                      className="h-6 w-auto text-gray-900"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
