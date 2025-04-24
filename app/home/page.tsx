"use client"
import { ChartAreaInteractive } from "components/bsUi/chartArea"
import { SectionCards } from "components/bsUi/sectionCards"
import { useEffect } from "react";
import { userList } from "libs/client/apis"
// import { useSession } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession();
  useEffect(() => {
    console.log("Home page loaded");
    getUserList()
  }, []);

  const getUserList = async () => {
    const res = await userList();
    console.log(res);
  };

  return (
    <div>
      <SectionCards />
      <ChartAreaInteractive />
    </div>
  );
}