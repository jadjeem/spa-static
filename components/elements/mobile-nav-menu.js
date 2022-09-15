import { useEffect } from "react"
import PropTypes from "prop-types"
import { MdClose, MdChevronRight, MdChevronLeft } from "react-icons/md"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { useLockBodyScroll } from "utils/hooks"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "./button-link"
import NextImage from "./image"
import CustomLink from "./custom-link"
import MobileNavLink from "./mobile-nav-link"
import { useRouter } from "next/router"
import Image from "next/image"

const MobileNavMenu = ({ navbar, closeSelf }) => {
  const router = useRouter()
  // Prevent window scroll while mobile nav menu is open
  useLockBodyScroll()
  // close after navigating
  useEffect(() => {
    router.events.on("routeChangeComplete", () => closeSelf())
  }, [])

  return (
    <div className="w-screen h-screen fixed top-0 left-0 overflow-y-scroll bg-white z-10 pb-6">
      <div className="container h-full flex flex-col justify-start">
        {/* Top section */}
        <div className="flex flex-row justify-between py-2 items-center mb-10">
          {/* Company logo */}
          {/* <NextImage width="120" height="33" media={navbar.logo} /> */}
          <Image width="120" height="33" src='/tala-logo.png' />
          {/* Close button */}
          <button onClick={closeSelf} className="py-1 px-1">
            <MdClose className="h-8 w-auto" />
          </button>
        </div>
        {/* Bottom section */}
        <div className="flex flex-col justify-end w-9/12 mx-auto">
          <ul className="flex flex-col list-none gap-6 items-baseline text-xl mb-10">
            {navbar.links.map((navLink) => (
              <li key={navLink.id} className="block w-full">
                <MobileNavLink navLink={navLink} />
              </li>
            ))}
          </ul>
          {navbar?.button && (
            <ButtonLink
              button={navbar.button}
              appearance={getButtonAppearance(navbar.button.type, "light")}
            />
          )}
        </div>
      </div>
    </div>
  )
}

MobileNavMenu.propTypes = {
  navbar: PropTypes.shape({
    logo: mediaPropTypes,
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  closeSelf: PropTypes.func,
}

export default MobileNavMenu
