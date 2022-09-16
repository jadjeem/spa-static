import PropTypes from "prop-types"
import Markdown from "react-markdown"
// import rehypeRaw from "rehype-raw"

const RichText = ({ data }) => {
  return (
    <div className="prose prose-lg container py-12 px-4 md:px-0">
      {/* <Markdown rehypePlugins={[rehypeRaw]}>{data.content}</Markdown> */}
      {/* TODO: get rid of the dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  )
}

RichText.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
  }),
}

export default RichText
