import { usePathname, useRouter } from "next/navigation"
import { ArrowBack } from "@mui/icons-material"
import Breadcrumb from "../Breadcrumbs/Breadcrumb"
import useLocalStorage from "@/hooks/useLocalStorage"

const Header = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  const pathName = usePathname()
  const router = useRouter()
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "Inicio")
  return (
    <header className="sticky top-10 px-15 z-999 flex w-full">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-card-10 md:px-5 2xl:pr-10 2xl:pl-5 rounded-[10px] bg-white">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-dark delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <div className="hidden xl:block">
          <div className="flex items-center gap-2">
            <button className="flex justify-center items-center w-[40px] h-[40px] hover:bg-green-100 hover:rounded-[9999px] duration-500" onClick={router.back}>
              <ArrowBack />
            </button>
            <h1 className="text-heading-6 font-bold text-dark dark:text-white">
              {pageName.trim() && pageName.split(' ').map((text, i) => text[0].toUpperCase() + text.substring(1)).join(' ')}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <Breadcrumb mainPageName={pageName} />
        </div>
      </div>
    </header>
  )
}

export default Header
