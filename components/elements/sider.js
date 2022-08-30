import React, { useMemo } from "react";
import CustomLink from "./custom-link";
import SubLinks from "./sub-links";

// const PartsComponents = {
//   ComponentLinksLink: CustomLink,
//   ComponentLinksSubLinks: SubLinks,
// };

const Part = ({ data }) => {
  const PartComponent = useMemo(() => {
    if (data.__typename === "ComponentLinksLink") {
      return <CustomLink link={data}>{data.text}</CustomLink>;
    }
    if (data.__typename === "ComponentLinksSubLinks") {
      return <SubLinks title={data.title} links={data.links} />;
    }
    return <></>;
  }, [data]);

  return PartComponent;
};

const Sider = ({ sider }) => {
  if (!sider.data) return <></>;

  return (
    <div className="lg:border-l-0 lg:w-48 p-4 border-gray-300 bg-gray-50">
      <ul>
        {sider.data.attributes.content.map((c, i) => (
          <li
            key={i + "sider-link"}
            className="text-gray-600 py-1 my-2 hover:text-gray-900 border-b-2"
          >
            <Part data={c} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sider;
