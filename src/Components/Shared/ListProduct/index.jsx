import { StarOutlined, StarFilled } from "@ant-design/icons"
import { Tabs } from "antd";
import banhbeo from "../image/banhbeo.jpg"
function ListProduct() {
    const items = [
        {
            key: '1',
            label: 'Bán chạy',
        },
        {
            key: '2',
            label: 'Khuyến mãi',
        }
    ];
    return (
        <>
            <div class="mt-[100px] mb-[20px] flex justify-center items-center">
                <div className="w-[1200px] h-[40px]">
                    <Tabs defaultActiveKey="1" items={items} />;
                </div>
            </div>
            <div className="w-full h-[850px] flex justify-center items-center">
                <div className="grid grid-cols-4 grid-rows-2 grid-flow-col w-[1200px] h-[850px] gap-4">
                    <div class="w-[268px] h-[408px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                        <div class="flex mt-[25px]">
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarOutlined class="text-yellow-500" />
                        </div>
                        <div class="w-[160px] h-[160px] mt-[25px]">
                            <img src={banhbeo} alt="Bánh bèo" class="w-full h-full object-cover" />
                        </div>
                        <p class="flex italic mt-[15px]">Bánh bèo Huế</p>
                        <p class="flex italic mt-[15px]">10.000đ</p>
                        <button class="flex items-center justify-center mt-[25px] w-[200px] h-[50px] bg-black text-white text-center rounded border border-black border-[1px]">Mua ngay</button>
                    </div>

                    <div class="w-[268px] h-[408px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                        <div class="flex mt-[25px]">
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarOutlined class="text-yellow-500" />
                        </div>
                        <div class="w-[160px] h-[160px] mt-[25px]">
                            <img src={banhbeo} alt="Bánh bèo" class="w-full h-full object-cover" />
                        </div>
                        <p class="flex italic mt-[15px]">Bánh bèo Huế</p>
                        <p class="flex italic mt-[15px]">10.000đ</p>
                        <button class="flex items-center justify-center mt-[25px] w-[200px] h-[50px] bg-black text-white text-center rounded border border-black border-[1px]">Mua ngay</button>
                    </div>

                    <div class="w-[268px] h-[408px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                    <div class="flex mt-[25px]">
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarOutlined class="text-yellow-500" />
                        </div>
                        <div class="w-[160px] h-[160px] mt-[25px]">
                            <img src={banhbeo} alt="Bánh bèo" class="w-full h-full object-cover" />
                        </div>
                        <p class="flex italic mt-[15px]">Bánh bèo Huế</p>
                        <p class="flex italic mt-[15px]">10.000đ</p>
                        <button class="flex items-center justify-center mt-[25px] w-[200px] h-[50px] bg-black text-white text-center rounded border border-black border-[1px]">Mua ngay</button>
                    </div>

                    <div class="w-[268px] h-[408px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                    <div class="flex mt-[25px]">
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarOutlined class="text-yellow-500" />
                        </div>
                        <div class="w-[160px] h-[160px] mt-[25px]">
                            <img src={banhbeo} alt="Bánh bèo" class="w-full h-full object-cover" />
                        </div>
                        <p class="flex italic mt-[15px]">Bánh bèo Huế</p>
                        <p class="flex italic mt-[15px]">10.000đ</p>
                        <button class="flex items-center justify-center mt-[25px] w-[200px] h-[50px] bg-black text-white text-center rounded border border-black border-[1px]">Mua ngay</button>
                    </div>

                    <div class="w-[268px] h-[408px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                    <div class="flex mt-[25px]">
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarOutlined class="text-yellow-500" />
                        </div>
                        <div class="w-[160px] h-[160px] mt-[25px]">
                            <img src={banhbeo} alt="Bánh bèo" class="w-full h-full object-cover" />
                        </div>
                        <p class="flex italic mt-[15px]">Bánh bèo Huế</p>
                        <p class="flex italic mt-[15px]">10.000đ</p>
                        <button class="flex items-center justify-center mt-[25px] w-[200px] h-[50px] bg-black text-white text-center rounded border border-black border-[1px]">Mua ngay</button>
                    </div>

                    <div class="w-[268px] h-[408px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                    <div class="flex mt-[25px]">
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarOutlined class="text-yellow-500" />
                        </div>
                        <div class="w-[160px] h-[160px] mt-[25px]">
                            <img src={banhbeo} alt="Bánh bèo" class="w-full h-full object-cover" />
                        </div>
                        <p class="flex italic mt-[15px]">Bánh bèo Huế</p>
                        <p class="flex italic mt-[15px]">10.000đ</p>
                        <button class="flex items-center justify-center mt-[25px] w-[200px] h-[50px] bg-black text-white text-center rounded border border-black border-[1px]">Mua ngay</button>
                    </div>

                    <div class="w-[268px] h-[408px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                    <div class="flex mt-[25px]">
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarOutlined class="text-yellow-500" />
                        </div>
                        <div class="w-[160px] h-[160px] mt-[25px]">
                            <img src={banhbeo} alt="Bánh bèo" class="w-full h-full object-cover" />
                        </div>
                        <p class="flex italic mt-[15px]">Bánh bèo Huế</p>
                        <p class="flex italic mt-[15px]">10.000đ</p>
                        <button class="flex items-center justify-center mt-[25px] w-[200px] h-[50px] bg-black text-white text-center rounded border border-black border-[1px]">Mua ngay</button>
                    </div>

                    <div class="w-[268px] h-[408px] bg-red-500 flex flex-col items-center" style={{ backgroundColor: '#F6F6F6' }}>
                        <div class="flex mt-[25px]">
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarFilled class="text-yellow-500" />
                            <StarOutlined class="text-yellow-500" />
                        </div>
                        <div class="w-[160px] h-[160px] mt-[25px]">
                            <img src={banhbeo} alt="Bánh bèo" class="w-full h-full object-cover" />
                        </div>
                        <p class="flex italic mt-[15px]">Bánh bèo Huế</p>
                        <p class="flex italic mt-[15px]">10.000đ</p>
                        <button class="flex items-center justify-center mt-[25px] w-[200px] h-[50px] bg-black text-white text-center rounded border border-black border-[1px]">Mua ngay</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ListProduct;
