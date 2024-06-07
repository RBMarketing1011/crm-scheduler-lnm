//dependencies

//components

//images

//icons


const SchedulerServiceQuestions = ({ data, handleClick, selected }) =>
{

  return (
    <div
      className={ `w-[100%] h-[50px] ${ selected.some(p => { return p === data }) ? 'bg-primary-300 text-white' : 'bg-white text-primary-300' } rounded-md p-3 flex justify-start items-center gap-2 hover:cursor-pointer shadow-[0_0_10px_#808080] transition-all ease-in-out` }
      onClick={ () => handleClick(data) }
    >
      <h2 className='font-bold'>
        { data }
      </h2>
    </div>
  )
}

export default SchedulerServiceQuestions