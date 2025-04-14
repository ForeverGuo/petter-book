import { useContext } from "react";
import { useSidebar } from "components/ui/sidebar"
export const useSidebarState = () => {
  const context = useSidebar();
  return {
    state: context.state
  };
};