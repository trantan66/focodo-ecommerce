import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Rate, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
function ProductList(props) {
    const prop = {
        name: 'file',
        multiple: true,
        accept: 'image/*',
        action: '/upload', // API endpoint cho xử lý ảnh
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                console.log(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
    };
    const [value, setValue] = useState(3);
    return (
        <div className="flex flex-col w-[60%] mx-auto p-3 my-3 border rounded-lg gap-3 bg-gray-100">
            <p className="text-[20px] font-semibold  ">Đánh giá sản phẩm</p>
            <div className="flex gap-3 p-2 rounded bg-white">
                <img src={props.img} alt="" className="w-[10%] h-[75px]" />
                <div className="w-[90%]">
                    <div className="flex">
                        <span className="text-[17px] font-semibold">{props.name}</span>
                        <span className="ml-auto mr-3 italic font-semibold text-red-500 ">{props.price}</span>
                    </div>
                    <p className="text-[12px] opacity-75 italic w-[60%]">{props.subcription}</p>
                </div>
            </div>
            <div className="flex gap-6 ">
                <span className="">Chất lượng sản phẩm</span>
                <div className="flex mt-1">
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? <span className="mx-2 text-[13px]">{desc[value - 1]}</span> : null}
                </div>
            </div>
            <p className="my-2">Bình luận</p>
            <div className="">
                <Upload {...prop} listType="picture">
                    <Button icon={<UploadOutlined />}>Nhấn để tải ảnh lên</Button>
                </Upload>
            </div>
            <div className="mb-3">
                <TextArea
                    className=""
                    showCount
                    maxLength={100}
                    placeholder="Để lại bình luận ở đây"
                    style={{
                        height: 120,
                        resize: 'none',
                    }}
                />
            </div>
        </div>
    );
}

export default ProductList;
