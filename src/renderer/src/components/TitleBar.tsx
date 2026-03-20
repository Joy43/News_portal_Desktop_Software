export const TitleBar = () => {
  return (
    <div className="h-8 w-full drag-region shrink-0 flex items-center top-0 z-50">
      {/* The traffic lights on Mac are usually about 70px wide starting from the left.
          This region is strictly for window dragging. 
          Important: Clickable elements in the title bar area should have the 'no-drag' class. */}
    </div>
  )
}
