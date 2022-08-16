import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"

const Hero = ({ data }) => {
  return (
    <main className="container flex flex-col md:flex-row-reverse items-center justify-between gap-4 py-12">
      {/* Left column for content */}
      <div className="flex-1 sm:pr-8">
        {/* Hero section label */}
        {data.label && (
          <p className="uppercase tracking-wide font-semibold">{data.label}</p>
        )}
        {/* Big title */}
        <h1 className="title mt-2 sm:mt-0 mb-6 p-2 sm:mb-2">{data.title}</h1>
        {/* Description paragraph */}
        <p className="text-xl mb-6">{data.description}</p>
        {/* Buttons row */}
        <div className="flex flex-row justify-center flex-wrap gap-4">
          {data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, "light")}
              key={button.id}
            />
          ))}
        </div>
        {/* Small rich text */}
        <div className="text-base md:text-sm mt-4 sm:mt-3 rich-text-hero">
          <Markdown>{data.smallTextWithLink}</Markdown>
        </div>
      </div>
      {/* Right column for the image */}
      {data.picture && data.picture.data && (
        <div className="flex-shrink-0 w-full md:w-6/12 mt-6 md:mt-0">
          <NextImage media={data.picture} />
        </div>
      )}
    </main>
  )
}

export default Hero
