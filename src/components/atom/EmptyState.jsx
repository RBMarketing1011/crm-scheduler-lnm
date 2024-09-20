import { PlusIcon } from '@heroicons/react/20/solid'

const EmptyState = ({ icon, title, desc, btn }) =>
{
  return (
    <div className="w-full mt-12 flex flex-col justify-center items-center border-dashed border-gray-500 border-[1.5px] p-5 rounded-lg bg-gray-50">
      { icon }
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        { title }
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        { desc }
      </p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
          onClick={ btn.onClick }
        >
          <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
          { btn.text }
        </button>
      </div>
    </div>
  )
}

export default EmptyState