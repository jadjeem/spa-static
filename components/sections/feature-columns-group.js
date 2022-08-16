import NextImage from "../elements/image"

const FeatureColumnsGroup = ({ data }) => {
  return (
    <div className="container flex flex-col lg:flex-row-reverse lg:flex-wrap gap-16 justify-center align-top py-12">
      {data.features.map((feature) => (
        <div className="text-lg lg:w-5/12" key={feature.id}>
          <div className="lg:w-full">
            <NextImage media={feature.icon} />
          </div>
          <h3 className="text-4xl font-bold mt-4 mb-4">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

export default FeatureColumnsGroup
