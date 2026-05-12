import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      className="h-full overflow-hidden no-scrollbar"
    >
      {children}
    </HomeLayout>
  );
}
