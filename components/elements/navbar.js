import { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

import { getButtonAppearance } from "utils/button"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import NextImage from "./image"
import NavLink from "./nav-link.js"

const Navbar = ({ navbar, pageContext }) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)

  return (
    <>
      {/* The actual navbar */}
      <nav className="border-gray-200 border-b-2 text-center ">
        <div className="container relative flex flex-row-reverse items-center justify-between">
          {/* Content aligned to the right */}
          <div className="flex flex-row-reverse items-center h-10">
            <Link href="/spa">
              <a className="h-8 w-32">
                {navbar.logo && (
                  <NextImage width="120" height="33" media={navbar.logo} />
                )}
              </a>
            </Link>
            {/* List of links on desktop */}
            <ul className="hidden list-none md:flex flex-row-reverse gap-1 items-baseline justify-items w-full mr-10 h-full">
              {navbar.links.map((navLink) => (
                <NavLink key={navLink.id + "navlink"} navLink={navLink} />
              ))}
            </ul>
          </div>
          <div className="flex flex-row-reverse">
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block md:hidden"
            >
              <MdMenu className="h-8 w-auto" />
            </button>
            {/* CTA button on desktop */}
            {navbar.button && (
              <div className="hidden md:block">
                <ButtonLink
                  button={navbar.button}
                  appearance={getButtonAppearance(navbar.button.type, "light")}
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )
}

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.shape({
      image: mediaPropTypes,
      url: PropTypes.string,
    }),
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  initialLocale: PropTypes.string,
}

export default Navbar
