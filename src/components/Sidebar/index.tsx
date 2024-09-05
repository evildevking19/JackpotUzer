"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import SidebarItem from "@/components/Sidebar/SidebarItem"
import ClickOutside from "@/components/ClickOutside"
import useLocalStorage from "@/hooks/useLocalStorage"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

const menuGroups = [
  {
    menuItems: [
      {
        icon: (
          <svg
            className="text- fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M16.6666 6.66666L11.6666 2.28333C11.2083 1.87337 10.6149 1.64672 9.99996 1.64672C9.38501 1.64672 8.79164 1.87337 8.33329 2.28333L3.33329 6.66666C3.0686 6.90339 2.85737 7.19379 2.71368 7.51853C2.56999 7.84327 2.49713 8.1949 2.49996 8.55V15.8333C2.49996 16.4964 2.76335 17.1323 3.23219 17.6011C3.70103 18.0699 4.33692 18.3333 4.99996 18.3333H15C15.663 18.3333 16.2989 18.0699 16.7677 17.6011C17.2366 17.1323 17.5 16.4964 17.5 15.8333V8.54166C17.5016 8.18797 17.4282 7.83795 17.2845 7.51473C17.1409 7.19152 16.9303 6.90246 16.6666 6.66666ZM11.6666 16.6667H8.33329V12.5C8.33329 12.279 8.42109 12.067 8.57737 11.9107C8.73365 11.7545 8.94561 11.6667 9.16662 11.6667H10.8333C11.0543 11.6667 11.2663 11.7545 11.4225 11.9107C11.5788 12.067 11.6666 12.279 11.6666 12.5V16.6667ZM15.8333 15.8333C15.8333 16.0543 15.7455 16.2663 15.5892 16.4226C15.4329 16.5789 15.221 16.6667 15 16.6667H13.3333V12.5C13.3333 11.837 13.0699 11.2011 12.6011 10.7322C12.1322 10.2634 11.4963 10 10.8333 10H9.16662C8.50358 10 7.8677 10.2634 7.39886 10.7322C6.93002 11.2011 6.66662 11.837 6.66662 12.5V16.6667H4.99996C4.77894 16.6667 4.56698 16.5789 4.4107 16.4226C4.25442 16.2663 4.16662 16.0543 4.16662 15.8333V8.54166C4.16677 8.42334 4.19212 8.30641 4.24097 8.19865C4.28982 8.09088 4.36107 7.99476 4.44996 7.91666L9.44996 3.54166C9.60203 3.40806 9.79753 3.33439 9.99996 3.33439C10.2024 3.33439 10.3979 3.40806 10.55 3.54166L15.55 7.91666C15.6388 7.99476 15.7101 8.09088 15.7589 8.19865C15.8078 8.30641 15.8331 8.42334 15.8333 8.54166V15.8333Z" fill=""/>
          </svg>
        ),
        label: "Inicio",
        route: "/"
      },
      {
        icon: (
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M14.1126 8.784C14.1455 8.528 14.1701 8.272 14.1701 8C14.1701 7.728 14.1455 7.472 14.1126 7.216L15.8479 5.896C16.0042 5.776 16.0453 5.56 15.9466 5.384L14.3017 2.616C14.203 2.44 13.981 2.376 13.8 2.44L11.7522 3.24C11.3245 2.92 10.8639 2.656 10.3622 2.456L10.0497 0.336C10.025 0.144 9.85231 0 9.6467 0H6.35693C6.15132 0 5.97861 0.144 5.95393 0.336L5.64141 2.456C5.13972 2.656 4.67915 2.928 4.25148 3.24L2.2036 2.44C2.01443 2.368 1.8006 2.44 1.70191 2.616L0.0570212 5.384C-0.0498963 5.56 -0.00054964 5.776 0.155714 5.896L1.89107 7.216C1.85817 7.472 1.8335 7.736 1.8335 8C1.8335 8.264 1.85817 8.528 1.89107 8.784L0.155714 10.104C-0.00054964 10.224 -0.0416719 10.44 0.0570212 10.616L1.70191 13.384C1.8006 13.56 2.02266 13.624 2.2036 13.56L4.25148 12.76C4.67915 13.08 5.13972 13.344 5.64141 13.544L5.95393 15.664C5.97861 15.856 6.15132 16 6.35693 16H9.6467C9.85231 16 10.025 15.856 10.0497 15.664L10.3622 13.544C10.8639 13.344 11.3245 13.072 11.7522 12.76L13.8 13.56C13.9892 13.632 14.203 13.56 14.3017 13.384L15.9466 10.616C16.0453 10.44 16.0042 10.224 15.8479 10.104L14.1126 8.784ZM8.00182 10.8C6.4145 10.8 5.12327 9.544 5.12327 8C5.12327 6.456 6.4145 5.2 8.00182 5.2C9.58913 5.2 10.8804 6.456 10.8804 8C10.8804 9.544 9.58913 10.8 8.00182 10.8Z" fill=""/>
          </svg>
        ),
        label: "Configurações Jack",
        route: "#",
        children: [
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fillRule="evenodd" clipRule="evenodd" cx="6" cy="6" r="5.5" stroke="#39474F"/>
              </svg>
            ),
            active_icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" stroke="#05B59D"/>
                <circle cx="5.9999" cy="6.00002" r="3.6" fill="#05B59D"/>
              </svg>

            ),
            label: "Campeonato",
            route: "/config/championship",
            subRoutes: [
              "/config/championship/create"
            ]
          },
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fillRule="evenodd" clipRule="evenodd" cx="6" cy="6" r="5.5" stroke="#39474F"/>
              </svg>
            ),
            active_icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" stroke="#05B59D"/>
                <circle cx="5.9999" cy="6.00002" r="3.6" fill="#05B59D"/>
              </svg>

            ),
            label: "Time",
            route: "/config/time",
            subRoutes: [
              "/config/time/create"
            ]
          },
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fillRule="evenodd" clipRule="evenodd" cx="6" cy="6" r="5.5" stroke="#39474F"/>
              </svg>
            ),
            active_icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" stroke="#05B59D"/>
                <circle cx="5.9999" cy="6.00002" r="3.6" fill="#05B59D"/>
              </svg>

            ),
            label: "Valor dos Potes",
            route: "/config/potsvalue",
            subRoutes: [
              "/config/potsvalue/create"
            ]
          },
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fillRule="evenodd" clipRule="evenodd" cx="6" cy="6" r="5.5" stroke="#39474F"/>
              </svg>
            ),
            active_icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" stroke="#05B59D"/>
                <circle cx="5.9999" cy="6.00002" r="3.6" fill="#05B59D"/>
              </svg>

            ),
            label: "Prêmios",
            route: "/config/awards",
            subRoutes: [
              "/config/awards/create"
            ]
          },
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fillRule="evenodd" clipRule="evenodd" cx="6" cy="6" r="5.5" stroke="#39474F"/>
              </svg>
            ),
            active_icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" stroke="#05B59D"/>
                <circle cx="5.9999" cy="6.00002" r="3.6" fill="#05B59D"/>
              </svg>
            ),
            label: "Perguntas",
            route: "/config/questions",
            subRoutes: [
              "/config/questions/create"
            ]
          },
        ]
      },
      {
        icon: (
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.8125 9.91319C1.5847 9.91319 2.35741 9.91319 3.12961 9.91319C3.15836 10.7735 3.20646 11.6326 3.27443 12.4885C3.30632 12.8854 3.46944 13.0829 3.75856 13.0829H4.03199C4.3211 13.0829 4.44762 12.8854 4.41782 12.4885C4.11668 8.47885 4.22072 4.39983 4.73046 0.4375H7C6.52738 4.54844 6.44529 8.78487 6.75271 12.9398C6.88446 14.6967 6.33446 15.5614 5.00024 15.5625H3.33351C2.00818 15.5614 1.18945 14.6967 1.01326 12.9398C0.916541 11.9348 0.84962 10.9248 0.8125 9.91319Z" fill=""/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.75056 0.438049H14.2158C15.6422 0.4386 16.4296 1.29612 16.5132 3.03649C16.5829 4.56385 16.6199 6.10222 16.625 7.64114C16.6278 9.41233 15.868 10.2957 14.4101 10.2957H12.3232C12.2996 12.0636 12.2485 13.8243 12.1705 15.5625H9.75C9.90107 10.5825 9.90107 5.41752 9.75 0.4375L9.75056 0.438049ZM14.1315 7.18651C14.1242 5.95857 14.1012 4.73227 14.0613 3.51204C14.0484 3.1152 13.8917 2.9176 13.5924 2.9176H12.2637C12.312 4.53138 12.3367 6.15836 12.3389 7.78534H13.6806C13.9827 7.78534 14.1332 7.58555 14.131 7.18651H14.1315Z" fill=""/>
          </svg>
        ),
        label: "Cadastro Jack",
        route: "/regist",
        subRoutes: [
          "/regist/create"
        ]
      },
      {
        icon: (
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.405474 13.1388C0.538309 13.8249 0.923432 14.4254 1.48953 14.8296L2.70562 15.6989C3.99409 16.6194 5.43291 17.2415 6.98275 17.5477L9.00968 17.9492C9.18158 17.9832 9.35528 18 9.52889 18C9.67448 18 9.81962 17.9881 9.9644 17.9642L11.9484 17.6373C14.1451 17.2754 16.1602 16.2694 17.7758 14.7285C18.185 14.3388 18.4587 13.838 18.5673 13.279L18.6221 12.9962C19.1366 10.3469 19.1255 7.66239 18.5902 5.01661L18.5617 4.87672C18.4573 4.36271 18.21 3.89361 17.8451 3.5194C17.8113 3.48452 17.7745 3.4528 17.7354 3.42361L17.4648 3.22372C15.4352 1.72434 13.0582 0.665769 10.5901 0.162783L9.97311 0.037443C9.64987 -0.0172295 9.32277 -0.0119881 9.00087 0.0528959L8.59608 0.134498C6.00045 0.656733 3.517 1.78759 1.41463 3.40391C0.897117 3.80153 0.540554 4.37419 0.409875 5.01715C-0.125598 7.66284 -0.136555 10.3474 0.377901 12.9963L0.405474 13.1388ZM3.74593 14.2251L2.5294 13.3558C2.34079 13.2213 2.21281 13.0214 2.16844 12.7928L2.14077 12.6499C1.69826 10.3713 1.69808 8.06462 2.10808 5.78582L8.60192 8.69069V16.0265L7.32925 15.7742C6.03072 15.518 4.82514 14.9964 3.74593 14.2251ZM16.8593 12.6494V12.6508L16.8045 12.9332C16.7685 13.1194 16.6773 13.2866 16.5405 13.4168C15.1867 14.7079 13.4983 15.5507 11.6582 15.8539L10.3982 16.0613V8.69132L16.8924 5.7879C17.302 8.06588 17.3016 10.3717 16.8593 12.6494ZM8.94878 1.90679L9.35268 1.82564C9.41627 1.81281 9.4803 1.80666 9.53814 1.80666C9.57802 1.80666 9.61484 1.80973 9.64646 1.81461L10.2337 1.93417C12.2178 2.33866 14.1235 3.16181 15.8113 4.29295L9.50006 7.11486L3.26255 4.32457C4.97971 3.15946 6.91862 2.31525 8.94878 1.90679Z" fill=""/>
            <path d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44772 7.55228 9 7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11Z" fill=""/>
            <path d="M9 5C9.55228 5 10 4.55228 10 4C10 3.44772 9.55228 3 9 3C8.44772 3 8 3.44772 8 4C8 4.55228 8.44772 5 9 5Z" fill=""/>
            <path d="M7 15C7.55228 15 8 14.5523 8 14C8 13.4477 7.55228 13 7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15Z" fill=""/>
            <path d="M4 13C4.55228 13 5 12.5523 5 12C5 11.4477 4.55228 11 4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13Z" fill=""/>
            <path d="M12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14Z" fill=""/>
            <path d="M15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9C14.4477 9 14 9.44772 14 10C14 10.5523 14.4477 11 15 11Z" fill=""/>
          </svg>
        ),
        label: "Cards Realizados",
        route: "/realicard",
        subRoutes: [
          "/realicard/detail",
          "/realicard/detail/user"
        ]
      },
      {
        icon: (
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" fill="" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2m0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
            <path fillRule="evenodd" clipRule="evenodd" fill="" d="M10.5 16.5c-.42 0-.82-.176-1.094-.484l-2.963-2.97c-.274-.26-.443-.653-.443-1.06 0-.405.17-.798.462-1.078.482-.513 1.557-.55 2.113.037l1.925 1.93 4.943-4.958c.52-.55 1.575-.57 2.132.02.256.242.425.634.425 1.04 0 .402-.164.79-.45 1.068l-5.993 6.012c-.238.267-.637.443-1.057.443z"/>
          </svg>
        ),
        label: "Resultados",
        route: "#",
        children: [
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fillRule="evenodd" clipRule="evenodd" cx="6" cy="6" r="5.5" stroke="#39474F"/>
              </svg>
            ),
            active_icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" stroke="#05B59D"/>
                <circle cx="5.9999" cy="6.00002" r="3.6" fill="#05B59D"/>
              </svg>

            ),
            label: "Cadastro Resultados",
            route: "/results/regist",
            subRoutes: [
              "/results/regist/create"
            ]
          },
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fillRule="evenodd" clipRule="evenodd" cx="6" cy="6" r="5.5" stroke="#39474F"/>
              </svg>
            ),
            active_icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" stroke="#05B59D"/>
                <circle cx="5.9999" cy="6.00002" r="3.6" fill="#05B59D"/>
              </svg>

            ),
            label: "Ganhadores",
            route: "/results/winners",
            subRoutes: [
              "/results/winners/detail",
              "/results/winners/detail/user"
            ]
          },
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fillRule="evenodd" clipRule="evenodd" cx="6" cy="6" r="5.5" stroke="#39474F"/>
              </svg>
            ),
            active_icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" stroke="#05B59D"/>
                <circle cx="5.9999" cy="6.00002" r="3.6" fill="#05B59D"/>
              </svg>

            ),
            label: "Potes Acumulados",
            route: "/results/accumulpots"
          },
        ],
      },
    ],
  },
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname()

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard")

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5 xl:py-10">
          <Link href="/">
            <div className="flex flex-col items-center gap-3 pt-10">
              <div className="border-[2px] py-7 px-10 rounded-[9999px]">
                <Image
                  width={0}
                  height={0}
                  src={"/images/logo/logo_jp.svg"}
                  alt="Logo"
                  priority
                  className="dark:hidden"
                  style={{ width: "120px", height: "auto" }}
                />
              </div>
              <Image
                width={70}
                height={35}
                src={"/images/logo/logo_bipfut.svg"}
                alt="Logo1"
                priority
                className="dark:hidden"
              />
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <ul className="mb-6 flex flex-col gap-1">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  )
}

export default Sidebar
