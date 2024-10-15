import comhen from "../image/comhen.jpg"
function Category () {
    return (
        <>
            <div className="grid grid-cols-4 grid-rows-1 grid-flow-col w-full h-[600px] mt-[200px] gap-8">
                <div>
                    <div><img src={comhen} alt="Cơm hến" class="w-full h-[330px] object-cover"/></div>
                    <p class="italic text-3xl font-normal text-left ml-[35px] mt-[20px]">Sản phẩm phổ biến</p>
                    <p class="italic text-gray-500 ml-[35px] mr-[35px] mt-[20px]">Đặc sản ẩm thực, hương vị truyền thống xứ cố đô</p>
                    <button className="w-[200px] h-[50px] bg-white ml-[35px] mt-[25px] text-black font-medium text-xl text-center rounded border border-black border-[1px]">Mua ngay</button>
                </div>
                <div style={{ backgroundColor: '#F9F9F9'}}>
                    <div><img src={comhen} alt="Cơm hến" class="w-full h-[330px] object-cover"/></div>
                    <p class="italic text-3xl font-normal text-left ml-[35px] mt-[20px]">Sản phẩm phổ biến</p>
                    <p class="italic text-gray-500 ml-[35px] mr-[35px] mt-[20px]">Đặc sản ẩm thực, hương vị truyền thống xứ cố đô</p>
                    <button className="w-[200px] h-[50px] bg-white ml-[35px] mt-[25px] text-black font-medium text-xl text-center rounded border border-black border-[1px]">Mua ngay</button>
                </div>
                <div style={{ backgroundColor: '#EAEAEA'}}>
                    <div><img src={comhen} alt="Cơm hến" class="w-full h-[330px] object-cover"/></div>
                    <p class="italic text-3xl font-normal text-left ml-[35px] mt-[20px]">Sản phẩm phổ biến</p>
                    <p class="italic text-gray-500 ml-[35px] mr-[35px] mt-[20px]">Đặc sản ẩm thực, hương vị truyền thống xứ cố đô</p>
                    <button className="w-[200px] h-[50px] bg-white ml-[35px] mt-[25px] text-black font-medium text-xl text-center rounded border border-black border-[1px]">Mua ngay</button>
                </div>
                <div style={{ backgroundColor: '#2C2C2C'}}>
                    <div><img src={comhen} alt="Cơm hến" class="w-full h-[330px] object-cover"/></div>
                    <p class="italic text-3xl font-normal text-left ml-[35px] mt-[20px] text-white">Sản phẩm phổ biến</p>
                    <p class="italic text-gray-500 ml-[35px] mr-[35px] mt-[20px]">Đặc sản ẩm thực, hương vị truyền thống xứ cố đô</p>
                    <button className="w-[200px] h-[50px] bg-white ml-[35px] mt-[25px] text-black font-medium text-xl text-center rounded border border-black border-[1px]">Mua ngay</button>
                </div>
            </div>  
        </>
    )
}

export default Category