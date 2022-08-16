import classNames from "classnames"
import NextImage from "../elements/image"
import Video from "../elements/video"
import CustomLink from "../elements/custom-link"
import { formatPrice } from "../../utils/formater"

const FeatureRowsGroup = ({ data }) => {
  return (
    <div className="container flex flex-col gap-20 py-12">
      {data.features.map((feature, index) => (
        <div
          className={classNames(
            // Common classes
            "flex flex-col justify-start md:justify-between md:items-center gap-10",
            {
              "lg:flex-row-reverse": index % 2 === 0,
              "lg:flex-row": index % 2 === 1,
            }
          )}
          key={feature.id}
        >
          {/* Text section */}
          <div className="w-full lg:w-6/12 lg:pr-6 text-lg">
            <h3 className="title">{feature.title}</h3>
            <p className="my-6">{feature.description}</p>
            {feature.link && (
              <CustomLink link={feature.link}>
                <div className="text-blue-600 with-arrow hover:underline">
                  {feature.link.text}
                </div>
              </CustomLink>
            )}
            <span className="text-3xl font-bold mr-8">
              {formatPrice(feature.price) || ""}
            </span>
          </div>
          {/* Media section */}
          {feature.media.data && (
            <div className="w-full sm:9/12 lg:w-5/12 max-h-full">
              {/* Images */}
              {feature.media.data.attributes.mime.startsWith("image") && (
                <div className="w-full h-auto">
                  <NextImage media={feature.media} />
                </div>
              )}
              {/* Videos */}
              {feature.media.data.attributes.mime.startsWith("video") && (
                <Video
                  media={feature.media}
                  className="w-full h-auto"
                  autoPlay
                  controls={false}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FeatureRowsGroup
