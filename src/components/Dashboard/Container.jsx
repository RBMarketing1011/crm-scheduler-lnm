

const Container = ({ children }) =>
{
  return (
    <div className="flex flex-col gap-5 mx-auto max-w-8xl px-4 sm:px-6 lg:px-10">
      { children }
    </div>
  )
}

export default Container