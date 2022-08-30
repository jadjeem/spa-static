import { getStrapiMedia } from "utils/media"
import Image from "next/image"
import PropTypes from "prop-types"
import { mediaPropTypes } from "utils/types"

const NextImage = ({ media, ...props }) => {
  if (!media || !media.data) return <></>

  const { url, alternativeText, width, height } = media.data.attributes
  const fullUrl = url
  const loader = ({ src, width }) => {
    return getStrapiMedia(src)
  }

  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image
        loader={loader}
        src={fullUrl}
        alt={alternativeText || ""}
        {...props}
      />
    )
  }

  // The image is responsive
  return (
    <Image
      loader={loader}
      layout="responsive"
      width={width || "100%"}
      height={height || "100%"}
      objectFit="contain"
      src={fullUrl}
      alt={alternativeText || ""}
    />
  )
}

Image.propTypes = {
  // media: mediaPropTypes.isRequired,
  className: PropTypes.string,
}

export default NextImage
