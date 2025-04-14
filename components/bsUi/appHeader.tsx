"use client"

import { SidebarTrigger, useSidebar } from "components/ui/sidebar"
import { Separator } from "components/ui/separator"
import UserMenu from "components/bsUi/appNavbar";
import { AppBreadcrumb } from "components/bsUi/appBreadcrumb";
export function AppHeader() {
  const { state } = useSidebar()
  const collapseStyle = state == "collapsed" ? "w-full" : "md:w-[calc(100%-var(--sidebar-width))]"

  const user = {
    name: "Petter guo",
    email: "810153274@qq.com",
    image: "",
  };
  return (
    <div>
      <header 
        className={`fixed top-0 dark:bg-transparent bg-white shadow-sm z-999 sm:w-full w-full ${collapseStyle}`}>
        <nav className="mx-auto">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center mx-2">
              <SidebarTrigger className="cursor-pointer" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <AppBreadcrumb />
            </div>
            {/* 右侧用户菜单 */}
            <UserMenu user={user} />
          </div>
        </nav>
      </header>
    </div>
  );
}
