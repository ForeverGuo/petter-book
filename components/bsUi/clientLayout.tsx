"use client"

import { ThemeProvider } from "components/theme/themeProvider";
import { LoadingProvider } from "components/context/loadingContext";
import ProgressBar from "components/global/progressBar"
import { SidebarProvider } from "components/ui/sidebar"
import { AppSidebar } from "components/bsUi/appSidebar"
import { AppHeader } from "components/bsUi/appHeader"
import { usePathname } from "next/navigation"

// 创建中间客户端组件
export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <LoadingProvider>
      <ProgressBar />
      <ThemeProvider>
        <SidebarProvider>
          { 
            pathname === '/login' ? 
            (
              <>
                <main className={`w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] mx-4`}>
                  {children}
                </main>
              </>
            ) : 
            (
              <>
                <AppSidebar />
                <AppHeader />
                <main className={`w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] mt-16 md:mt-16 mx-4`}>
                  {children}
                </main>
              </>
            )
          }
          
        </SidebarProvider>
      </ThemeProvider>
    </LoadingProvider>
  );
}