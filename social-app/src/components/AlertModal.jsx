import { BiError } from "react-icons/bi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const successClass =
  "w-[75%] h-[70px] flex justify-center self-center items-center mt-5 rounded-xl text-xl font-semibold bg-blue-50 border-2 border-blue-300 text-[#133746]";
const failClass =
  "w-[75%] h-[70px] flex justify-center self-center items-center mt-5 rounded-xl text-xl font-semibold bg-red-50 border-2 border-red-300 text-[#370000]";

const AlertModal = ({ text, secondaryText, status }) => {
  return (
    <div className={status === "success" ? successClass : failClass}>
      <div className="flex space-x-2 items-center justify-center">
        <div>
          {status === "success" ? (
            <IoCheckmarkDoneOutline size={24} />
          ) : (
            <BiError size={24} />
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-center flex text-sm"> {text}</span>
          {secondaryText ? (
            <span className="text-center flex text-xs"> {secondaryText}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
