// Updated @renderer/Layout/MainLayout.jsx (Conceptual)
import ServerSidebar from '@renderer/pages/Home/sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import { TitleBar } from '@renderer/components/TitleBar';

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-transparent">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Render the Sidebar */}
        <div className="w-16 md:w-64 border-r border-white/10 bg-black/20 backdrop-blur-2xl shrink-0 transition-all duration-300">
          <ServerSidebar />
        </div>
        
        {/* Render the Page Content */}
        <main className="flex-1 overflow-y-auto relative z-10 bg-transparent flex flex-col">
          <div className="flex-1 p-8">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};