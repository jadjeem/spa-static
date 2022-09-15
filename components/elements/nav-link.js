import React, { useCallback } from "react"
import { useRouter } from "next/router"
import CustomLink from "./custom-link"
import SubLinks from "./sub-links"
import classNames from "classnames"

const NavLink = ({ navLink }) => {
  const router = useRouter()
  const isActive = useCallback(
    () => router.asPath.split("/")[1] === navLink.url.split("/")[1],
    [navLink, router]
  )
  const tabData = navLink.tab?.data || null

  const list =
    tabData && tabData.attributes.subLinks && tabData.attributes.subLinks.length
      ? tabData.attributes.subLinks.map((a, i) => (
          <SubLinks key={i + "sublinks-link"} title={a.title} links={a.links} />
        ))
      : null

  if (!navLink.url) {
    console.log(navLink.text, " : ", navLink.url)
    return (
      <div className="hover:text-white px-6 py-1 pt-2 h-full">
        <span>{navLink.text}</span>
        {list && <div className="absolute top-full bg-gray-500">{list}</div>}
      </div>
    )
  }

  return (
    <li
      className={classNames(
        "nav-link hover:text-white hover:bg-primary-700 h-full",
        isActive() ? "bg-primary-700 text-white" : ""
      )}
    >
      <CustomLink
        link={navLink}
        className="inline-block text-center px-6 py-1 pt-2 h-full"
      >
        {navLink.text}
      </CustomLink>
      {list && (
        <div className="drop-down absolute top-full border-t-4 border-primary-700 hidden text-black  ">
          {list}
        </div>
      )}
    </li>
  )
}

export default NavLink
