import dacsanhue from "../image/dsh.png"
function Intro() {
    return (
        <>
            <div class="grid grid-cols-2 grid-rows-1 grid-flow-col w-full h-[600px] mb-[50px]" style={{ backgroundColor: '#211C24'}}>
                <div>
                    <p class="ml-[250px] mt-[150px] text-xl text-gray-500">Welcome to</p>
                    <p class="ml-[250px] mt-[20px] text-8xl text-white font-medium">FoCoDo</p>
                    <p class="ml-[250px] mt-[20px] text-xl text-gray-500">Món ăn đặc trung mang hương vị xứ Huế</p>
                    <button className="w-[200px] h-[50px] bg-white ml-[250px] mt-[25px] text-black font-normal text-center rounded border border-black">Mua sắm nào!!</button>
                </div>
                <div class="">
                    <img src={dacsanhue} alt="Đặc sản Huế" class="w-[auto] h-[600px] object-cover ml-[200px]"/>
                </div>
            </div>
        </>
    )
}

export default Intro