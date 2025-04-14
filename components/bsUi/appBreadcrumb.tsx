"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"

export function AppBreadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(p => p)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem> */}
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1

          return (
            <span key={segment} className="flex items-center">
              { index > 0 ? 
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              :
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={href}
                  className={isLast ? "text-foreground" : "text-muted-foreground"}
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              }
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
