import React from "react"
import CustomLink from "./custom-link"

const SubLinks = ({ title, links }) => {
  return (
    <div className="flex flex-col flex-1 items-stretch text-right pt-2">
      <span className="font-bold text-lg pr-3 mb-2">{title}</span>
      {links && (
        <ul className="sublinks-list flex flex-auto flex-col flex-wrap-reverse  md:max-h-52">
          {links.map((a, i) => (
            <li
              key={i + "sublink"}
              className="my-1 text-gray-700 hover:text-black border-r-indigo-700 border-r-2 pr-3"
            >
              <CustomLink link={a} className="hover:underline">
                {a.text}
              </CustomLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SubLinks
