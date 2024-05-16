

const Button = ({ text, icon }) =>
{
  return (
    <button
      type="button"
      className="inline-flex whitespace-nowrap items-center gap-x-1.5 rounded-md bg-primary-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
    >
      { icon }
      { text }
    </button>
  )
}

export default Button