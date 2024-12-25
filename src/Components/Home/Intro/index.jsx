import dacsanhue from '../image/dsh.png';
function Intro() {
    return (
        <div className="mt-[-10px]">
            <div
                className="grid grid-cols-2 grid-rows-1 grid-flow-col w-full h-[600px] mb-[50px]"
                style={{ backgroundColor: '#211C24' }}
            >
                <div>
                    <p className="ml-[250px] mt-[150px] text-xl text-gray-500">Welcome to</p>
                    <p className="ml-[250px] mt-[20px] text-8xl text-white font-medium">FoCoDo</p>
                    <p className="ml-[250px] mt-[20px] text-xl text-gray-500">Món ăn đặc trung mang hương vị xứ Huế</p>
                    <button
                        onClick={() => (window.location.href = '/product/1')}
                        className="w-[200px] h-[50px] bg-white ml-[250px] mt-[25px] text-black font-normal text-center rounded border-black border-[1px] hover:opacity-[0.8]"
                    >
                        Mua sắm nào!!
                    </button>
                </div>
                <div className="">
                    <img src={dacsanhue} alt="Đặc sản Huế" className="w-[auto] h-[600px] object-cover ml-[200px]" />
                </div>
            </div>
        </div>
    );
}

export default Intro;
