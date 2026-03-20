import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home, SearchX } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0f0f11] text-white">
      {/* ------------ Animated background glow  -------------*/}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-72 w-72 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-[10%] right-[15%] h-80 w-80 animate-pulse rounded-full bg-cyan-400/10 blur-3xl [animation-delay:1s]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      {/* ----------- Floating card -----------*/}
      <div className="relative z-10 w-[92%] max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl animate-[fadeInUp_0.7s_ease-out]">
       
       

        {/*------- IcoN------- */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-inner shadow-white/5 animate-bounce">
          <SearchX className="h-11 w-11 text-cyan-400" />
        </div>

        {/*  ----------Content-------------- -*/}
        <div className="mt-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400/80">
            Error 404
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400">
            The page you are looking for may have been moved, deleted, or is
            temporarily unavailable in this desktop application.
          </p>
        </div>

        {/*------- Action button ------------ */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="group flex min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            className="group flex min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-[0_10px_30px_rgba(34,211,238,0.35)] active:scale-[0.98]"
          >
            <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Return Home
          </button>
        </div>

        {/*------- Footer text -----------*/}
        <p className="mt-6 text-center text-xs text-gray-500">
          Check the URL or return to the main dashboard.
        </p>
      </div>

      {/*-------- Custom animation -------------*/}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default NotFound