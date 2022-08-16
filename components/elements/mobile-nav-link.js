import React, { useRef, useState } from "react"
import { MdChevronLeft } from "react-icons/md"
import CustomLink from "./custom-link"
import SubLinks from "./sub-links"

const MobileNavLink = ({ navLink }) => {
  const linksListRef = useRef()
  const dropDownIconRef = useRef()
  const [isOpen, setOpen] = useState(false)
  const tabData = navLink.tab?.data || null

  const hanldeTouch = () => {
    linksListRef.current.style = isOpen ? "display: hidden" : "display: block"
    dropDownIconRef.current.style = isOpen ? "" : "transform: rotate(-90deg);"
    setOpen(!isOpen)
  }

  if (
    !tabData ||
    !tabData.attributes.subLinks ||
    !tabData.attributes.subLinks.length
  ) {
    return (
      <CustomLink link={navLink}>
        <div className="text-gray-900 py-6 flex flex-row-reverse justify-between items-center">
          <span>{navLink.text}</span>
        </div>
      </CustomLink>
    )
  }

  return (
    <div>
      <div
        className="mobile-nav-link focus:bg-blue-400 text-gray-900 py-6 flex flex-row-reverse justify-between items-center cursor-pointer"
        onClick={hanldeTouch}
      >
        <span>{navLink.text}</span>
        <span ref={dropDownIconRef}>
          <MdChevronLeft />
        </span>
      </div>
      <ul ref={linksListRef} className="hidden p-1 bg-gray-200">
        {tabData.attributes.subLinks.map((a, i) => (
          <li key={i}>
            <SubLinks title={a.title} links={a.links} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileNavLink
