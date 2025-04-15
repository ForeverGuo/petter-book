"use client"
import { ChartAreaInteractive } from "components/bsUi/chartArea"
import { SectionCards } from "components/bsUi/sectionCards"
import { useEffect } from "react";
import { userList } from "libs/client/apis"
export default function Home() {
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