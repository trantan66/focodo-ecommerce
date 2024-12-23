import React from 'react';

function Guide() {
    const fixedDate = new Date('2024-11-17');
    return (
        <>
            <div className="w-[1000px] mx-auto space-y-10 py-4">
                <h1 className="text-2xl font-medium uppercase">Hướng dẫn thanh toán</h1>
                {/* <input
                    type="date"
                    id="date"
                    value="2024-11-17"
                    className="px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                /> */}
                <p className="italic">
                    Bài viết được <span className="text-orange-500">FOCODO - Hệ thống cửa hàng ẩm thực</span> cố đó hàng
                    đầu Việt Nam với 3 chi nhánh trên toàn quốc chia sẻ.
                </p>
                <div className="space-y-5">
                    <h1 className="text-xl font-medium">
                        1. Đối với quý khách hàng mua hàng trực tiếp tại các chi nhánh
                    </h1>
                    <p>
                        - Tất cả các chi nhánh của{' '}
                        <span className="text-orange-500">hệ thống cửa hàng ẩm thực FOCODO</span> đều chấp thuận thanh
                        toán bằng tiền mặt, chuyển khoản qua ngân hàng hoặc thanh toán qua thẻ tín dụng. Đối với thanh
                        toán qua thẻ tín dụng (FOCODO chịu phí thẻ) ở bất cứ chi nhánh nào của hệ thống cửa hàng ẩm thực
                        FOCODO.
                    </p>
                    <p>
                        - Quý khách có thể đến trực tiếp chi nhánh hoặc liên hệ qua hotline chi nhánh để biết thêm chi
                        tiết.
                    </p>
                    <p>- Quý khách vui lòng kiểm tra sản phẩm kỹ trước khi thanh toán.</p>
                </div>
                <div className="space-y-5">
                    <h1 className="text-xl font-medium">
                        2. Đối với quý khách hàng mua hàng online đặt hàng qua Website
                    </h1>
                    <p>
                        - Sau khi nhận được thông tin đặt hàng chúng tôi sẽ gọi điện để xác nhận đơn hàng trong vòng 1h
                        và phản hồi lại thông tin cho khách hàng về việc thanh toán và thời gian giao nhận.
                    </p>
                    <p>
                        - Quý khách có thể thanh toán COD - thanh toán khi nhận hàng, hoặc chuyển khoản thanh toán trước
                        qua tài khoản ngân hàng.
                    </p>
                    <p>
                        - Quý khách có thể kiểm tra hàng trước khi nhận hàng, trong trường hợp có yêu cầu đổi/trả hàng
                        hoặc vấn đề về sản phẩm, quý khách vui lòng liên hệ lại qua hotline{' '}
                        <span className="text-orange-500">0911.85.8888 | 0977.33.7979</span> để được hỗ trợ.
                    </p>
                </div>
                <div className="space-y-5">
                    <h1 className="text-xl font-medium">3. Thông tin thanh toán của các cửa hàng ẩm thực FOCODO</h1>
                    <div className="space-y-3">
                        <h1 className="font-medium">* Chi nhánh Đà Nẵng - FOCODO Đà Nẵng</h1>
                        <p>54 Nguyễn Lương Bằng, phường Hòa Khánh Bắc, quận Liên Chiểu, TP Đà Nẵng</p>
                        <p>
                            Thông tin thanh toán:{' '}
                            <span className="text-orange-500">
                                VietComBank - STK:2203222222 - Chủ TK: FOCODO-DANANG
                            </span>
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h1 className="font-medium">* Chi nhánh Huế - FOCODO Huế</h1>
                        <p>63 Phùng Hưng, Thuận Thành, Huế, Thừa Thiên Huế</p>
                        <p>
                            Thông tin thanh toán: VietComBank -{' '}
                            <span className="text-orange-500">VietComBank - STK:2203222222 - Chủ TK: FOCODO-HUE</span>
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h1 className="font-medium">* Chi nhánh TP Hồ Chí Minh - FOCODO TP Hồ Chí Minh</h1>
                        <p>78 Quang Trung, Phước Long B, Quận 9, TP Hồ Chí Minh</p>
                        <p>
                            Thông tin thanh toán:{' '}
                            <span className="text-orange-500">VietComBank - STK:2203222222 - Chủ TK: FOCODO-HCM</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Guide;
