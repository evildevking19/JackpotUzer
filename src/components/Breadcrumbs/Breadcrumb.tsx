import Link from "next/link"

interface BreadcrumbProps {
  mainPageName: string
  subPageNames?: any
}

const Breadcrumb = ({ mainPageName, subPageNames }: BreadcrumbProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav>
        <ol className="flex items-center">
          <li>
            <Link className="font-medium flex" href="/">
              {mainPageName}
            </Link>
          </li>
          {
            subPageNames && subPageNames.length !== 0 &&
              subPageNames.map((pageName: string, i: any) => 
                <li key={i}>
                  <img src="/images/icon/icon-arrow-down.svg" alt="" className="w-[15px] -rotate-90 mx-3" />
                  <Link className="font-medium flex" href="/">
                    {pageName}
                  </Link>
                </li>
              )
          }
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb
