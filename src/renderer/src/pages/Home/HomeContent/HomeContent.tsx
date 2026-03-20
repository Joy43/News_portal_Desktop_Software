import HomeTopbar from './HomeTopbar'
import HomeNews from './HomeNews'

const HomeContent = () => {  
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/*------- Header -----------------*/}
      <HomeTopbar />
      
      {/* Content Section */}
      <HomeNews />
    </div>
  )
}

export default HomeContent;
