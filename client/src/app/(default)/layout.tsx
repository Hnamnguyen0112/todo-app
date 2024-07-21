import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-y-hidden bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Navbar />
        {children}
        {modal}
      </div>
    </div>
  );
}
