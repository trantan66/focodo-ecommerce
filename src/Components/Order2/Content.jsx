import { useState } from "react";

function Content() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex-col mx-auto w-[1120px]">
      <div className="">
        <p className="text-[20px] italic font-semibold">
          Phương thức vận chuyển
        </p>
        <div
          className={`h-[72px] border rounded-xl flex items-center mt-[3rem] transition-opacity ${
            selectedOption === "free" ? "opacity-100" : "opacity-50"
          }`}
        >
          <input
            type="radio"
            className="size-5 ml-3"
            value="free"
            name="shipping"
            checked={selectedOption === "free"}
            onChange={() => handleRadioChange("free")}
          />
          <span className="ml-4 text-[16px] italic font-semibold">
            Miễn phí
          </span>
          <span className="ml-4 text-[14px] italic">Vận chuyển thường</span>
          <span className="ml-auto p-2 text-[16px] italic">
            11 tháng 10, 2024
          </span>
        </div>
        <div
          className={`h-[72px] border rounded-xl flex items-center mt-4 transition-opacity ${
            selectedOption === "express" ? "opacity-100" : "opacity-50"
          }`}
        >
          <input
            type="radio"
            className="size-5 ml-3"
            value="express"
            name="shipping"
            checked={selectedOption === "express"}
            onChange={() => handleRadioChange("express")}
          />
          <span className="ml-4 text-[16px] italic font-semibold">20000</span>
          <span className="ml-4 text-[14px] italic">Vận chuyển hỏa tốc</span>
          <span className="ml-auto p-2 text-[16px] italic">
            7 tháng 10, 2024
          </span>
        </div>
      </div>
      <div className="flex mt-[10rem] justify-end my-[6rem] ">
        <button className=" bg-[#FAF7F0] text-black border border-black w-[200px] h-[48px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 ">
          Quay lại
        </button>
        <button className="bg-black text-white w-[200px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4">
          Tiếp theo
        </button>
      </div>
    </div>
  );
}
export default Content;
