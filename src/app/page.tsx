import type { Metadata } from "next";
import MainLayout from "@/components/main-layout";

export const metadata: Metadata = {
  title: "Shreyas Gurav | Full Stack Developer",
  description:
    "Portfolio of Shreyas Gurav, a Full Stack Developer specializing in React.js, Next.js, Node.js, and more.",
};

export default function Home() {
  return <MainLayout />;
}
