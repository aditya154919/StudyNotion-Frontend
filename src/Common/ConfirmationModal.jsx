import IconBtn from "./IconBtn"

const ConfirmationModal=({ modelData }) =>{
  return (
    <div className="fixed inset-0 z-1000 mt-0! grid place-items-center overflow-auto  bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-87.5 rounded-lg border border-[#6E727F] bg-[#161D29] p-6">
        <p className="text-2xl font-semibold text-[#F1F2FF]">
          {modelData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-[#999DAA]">
          {modelData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modelData?.btn1Handler}
            text={modelData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-[#999DAA] py-2 px-5 font-semibold text-[#000814]"
            onClick={modelData?.btn2Handler}
          >
            {modelData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal