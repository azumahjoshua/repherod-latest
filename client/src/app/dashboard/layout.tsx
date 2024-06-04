import SideNav from "@/components/dashboard/sidebar/sidenav";
import Topnav from "@/components/dashboard/topnav/topnav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex-none">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Topnav/>
        {children}
    </div>
    </div>
  );
}
