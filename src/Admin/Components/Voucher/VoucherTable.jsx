import React, { useEffect, useState } from 'react';
import { getAllVoucher, getVoucherById, saveVoucher } from '../../../Services/VoucherService';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FiLoader } from 'react-icons/fi';
import { notification } from 'antd';

function VoucherTable() {
    const [voucher, setVoucher] = useState([]);

    const [voucherId, setVoucherId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [minTotal, setMinTotal] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);

    const [loadingIcon, setLoadingIcon] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);

    // update
    const [voucherIdUpdate, setVoucherIdUpdate] = useState('');
    const [startDateUpdate, setStartDateUpdate] = useState('');
    const [endDateUpdate, setEndDateUpdate] = useState('');
    const [quantityUpdate, setQuantityUpdate] = useState('');
    const [minTotalUpdate, setMinTotalUpdate] = useState('');
    const [discountPriceUpdate, setDiscountPriceUpdate] = useState('');

    const fetchVoucher = async () => {
        try {
            const { data } = await getAllVoucher();
            setVoucher(data);
        } catch (error) {
            console.error('Lỗi khi lấy:', error);
        }
    };

    useEffect(() => {
        fetchVoucher();
    }, []);

    const fetchVoucherById = async (id) => {
        try {
            const { data } = await getVoucherById(id);
            setVoucherIdUpdate(data.id_voucher);
            setStartDateUpdate(data.start_date);
            setEndDateUpdate(data.end_date);
            setQuantityUpdate(data.quantity);
            setMinTotalUpdate(data.min_total);
            setDiscountPriceUpdate(data.discount_price);
        } catch (error) {
            console.error('Lỗi khi lấy:', error);
        }
    };
    const handleUpdateDialog = (id) => {
        setIsDialogUpdateOpen(true);
        fetchVoucherById(id);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingIcon(true);
        setLoadingScreen(true);

        const voucher = {
            id_voucher: voucherId,
            start_date: startDate,
            end_date: endDate,
            quantity: quantity,
            min_total: minTotal,
            discount_price: discountPrice,
        };

        try {
            await saveVoucher(voucher);
            resetForm();
        } catch (error) {
            console.error('Error adding the voucher:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật voucher. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Thêm voucher thành công!',
                description: 'Voucher đã được thêm.',
            });
            setIsDialogOpen(false);
            setLoadingIcon(false);
            setLoadingScreen(false);
        }
    };

    const resetForm = () => {
        setVoucherId('')
        setStartDate('')
        setEndDate('')
        setQuantity('')
        setMinTotal('')
        setDiscountPrice('')
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoadingIcon(true);
        setLoadingScreen(true);

        const voucher = {
            id_voucher: voucherIdUpdate,
            start_date: startDateUpdate,
            end_date: endDateUpdate,
            quantity: quantityUpdate,
            min_total: minTotalUpdate,
            discount_price: discountPriceUpdate,
        };
        try {
            await saveVoucher(voucher);
        } catch (error) {
            console.error('Error update the voucher:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật voucher. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Cập nhật voucher thành công!',
                description: 'Voucher đã được cập nhật.',
            });
            setIsDialogUpdateOpen(false);
            setLoadingIcon(false);
            setLoadingScreen(false);
            await fetchVoucher();
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <div className="">
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-blue-500 ml-4 rounded-md p-2 text-white flex justify-items-center items-center"
                >
                    <MdOutlineAddToPhotos className="mr-1" />
                    Thêm voucher
                </button>
            </div>
            <div className="flex flex-wrap gap-4 mx-4">
                {voucher.map((items, index) => (
                    <div
                        key={index}
                        onClick={() => handleUpdateDialog(items.id_voucher)}
                        className="w-[32%] h-[8rem] p-2 bg-[#3BB0D1] flex flex-row rounded-sm hover:cursor-pointer"
                    >
                        <div className="flex flex-col justify-center items-center w-1/2 bg-[#FEF9DC] text-[#623838] relative">
                            <div className="absolute -right-10 h-full w-20 bg-[#FEF9DC] rounded-full"></div>
                            <h1 className="font-bold italic">{items.id_voucher}</h1>
                            <h2 className="text-xs">Đơn từ {formatCurrency(items.min_total)}</h2>
                            <span className="text-xs ml-2">{items.start_date} </span>
                            <span className="text-sm ml-2">Tới {items.end_date}</span>
                        </div>

                        <div className="flex flex-row gap-3 justify-between w-1/2 h-full bg-slate-900 text-white px-5">
                            <div className="my-auto">
                                <h3 className="text-gray-400">Giá trị</h3>
                                <span className="text-xl font-bold">{formatCurrency(items.discount_price)}</span>
                            </div>
                            <div className="my-auto flex flex-col items-center">
                                <span className="text-[10px] text-gray-400">Số lượng</span>
                                <div className="flex justify-end">
                                    <div className="h-10 w-10 bg-gray-200 text-black text-center rounded-md flex items-center justify-center">
                                        <span>{items.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* thêm */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-10">
                {loadingScreen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <FiLoader className="text-white text-6xl animate-spin" />
                    </div>
                )}
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-[40rem] space-y-4 p-12 bg-[#282941] backdrop-blur-2xl rounded-xl">
                            <DialogTitle as="h3" className="text-lg font-medium leading-6 text-white">
                                Thêm voucher mới
                            </DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white">VoucherID</label>
                                        <input
                                            type="text"
                                            name="voucherid"
                                            value={voucherId}
                                            onChange={(e) => setVoucherId(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Voucher"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Ngày bắt đầu</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Ngày bắt đầu"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Ngày kết thúc</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Ngày kết thúc"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Đơn từ</label>
                                        <input
                                            type="text"
                                            name="minTotal"
                                            value={minTotal}
                                            onChange={(e) => setMinTotal(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Đơn từ"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Số lượng</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Số lượng"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Giá trị</label>
                                        <input
                                            type="text"
                                            name="discountPrice"
                                            value={discountPrice}
                                            onChange={(e) => setDiscountPrice(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Giá trị"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="bg-gray-300 text-black px-4 py-2 rounded-md"
                                    >
                                        Hủy
                                    </button>

                                    <button
                                        type="submit"
                                        className={`rounded-md text-white px-4 py-2 flex items-center justify-center space-x-2
               ${loadingIcon ? 'bg-gray-400' : 'bg-[#2563EB] hover:bg-blue-500'}`}
                                        disabled={loadingIcon ? 'true' : ''}
                                    >
                                        {loadingIcon ? <FiLoader /> : ''}
                                        <span>Xác nhận</span>
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* update */}
            <Dialog open={isDialogUpdateOpen} onClose={() => setIsDialogUpdateOpen(false)} className="relative z-10">
                {loadingScreen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <FiLoader className="text-white text-6xl animate-spin" />
                    </div>
                )}
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-[40rem] space-y-4 p-12 bg-[#282941] backdrop-blur-2xl rounded-xl">
                            <DialogTitle as="h3" className="text-lg font-medium leading-6 text-white">
                                Thêm voucher mới
                            </DialogTitle>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white">VoucherID</label>
                                        <input
                                            type="text"
                                            name="voucherid"
                                            value={voucherIdUpdate}
                                            onChange={(e) => setVoucherIdUpdate(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Voucher"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Ngày bắt đầu</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={startDateUpdate}
                                            onChange={(e) => setStartDateUpdate(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Ngày bắt đầu"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Ngày kết thúc</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={endDateUpdate}
                                            onChange={(e) => setEndDateUpdate(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Ngày kết thúc"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Đơn từ</label>
                                        <input
                                            type="text"
                                            name="minTotal"
                                            value={minTotalUpdate}
                                            onChange={(e) => setMinTotalUpdate(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Đơn từ"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Số lượng</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={quantityUpdate}
                                            onChange={(e) => setQuantityUpdate(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Số lượng"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white">Giá trị</label>
                                        <input
                                            type="text"
                                            name="discountPrice"
                                            value={discountPriceUpdate}
                                            onChange={(e) => setDiscountPriceUpdate(e.target.value)}
                                            className="ext-sm focus:outline-none border border-gray-300 mt-1 p-3 w-full rounded-md bg-[#282941] text-white"
                                            placeholder="Giá trị"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsDialogUpdateOpen(false)}
                                        className="bg-gray-300 text-black px-4 py-2 rounded-md"
                                    >
                                        Hủy
                                    </button>

                                    <button
                                        type="submit"
                                        className={`rounded-md text-white px-4 py-2 flex items-center justify-center space-x-2
               ${loadingIcon ? 'bg-gray-400' : 'bg-[#2563EB] hover:bg-blue-500'}`}
                                        disabled={loadingIcon ? true : ''}
                                    >
                                        {loadingIcon ? <FiLoader /> : ''}
                                        <span>Xác nhận</span>
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default VoucherTable;
