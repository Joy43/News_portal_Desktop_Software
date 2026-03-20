import { Link, useLocation } from 'react-router-dom'
import { Home, List, Layers, Settings, LogOut, User2 } from 'lucide-react'
import { useAppSelector } from '@renderer/redux/hook'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@renderer/redux/store'
import { logout } from '@renderer/redux/features/auth/auth.slice'
import { toast } from 'sonner'

const ServerSidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector((state) => state.auth.user)

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/' },
    { id: 'list', icon: List, label: 'List', path: '/list' },
    { id: 'gallerys', icon: Layers, label: 'gallery', path: '/gallery' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
  ]

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
  }

  return (
    <div className="flex flex-col h-full w-full justify-between items-center py-8">
      {/* ---------NAVIGATION------------ */}
      <div className="flex flex-col gap-6 w-full items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`transition-all duration-300 p-3 rounded-2xl flex items-center justify-center ${
                isActive 
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="w-6 h-6 stroke-[2]" />
            </Link>
          )
        })}
      </div>

      {/* ------- BOTTOM ICONS ------------*/}
      <div className="flex flex-col gap-6 w-full items-center mb-4">
        {!user ? (
          <Link
            to="/auth/login"
            className="p-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            aria-label="Login"
            title="Login"
          >
            <User2 className="w-6 h-6 stroke-[2]" />
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="p-3 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="w-6 h-6 stroke-[2]" />
          </button>
        )}
      </div>
    </div>
  )
}

export default ServerSidebar
