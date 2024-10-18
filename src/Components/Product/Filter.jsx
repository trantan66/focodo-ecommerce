import React from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Collapse, List, Typography } from 'antd';

const { Panel } = Collapse;
const { Text } = Typography;
const data = [
    {
        category: 'Bánh Huế',
        items: ['Bánh bèo', 'Bánh ép Huế', 'Bánh lọc Huế', 'Bánh kẹo Huế'],
    },
    { category: 'Khuyến mãi', items: [] },
    { category: 'Gia vị Huế', items: [] },
    { category: 'Hạt sen Huế', items: [] },
    { category: 'Mắm Huế', items: [] },
    { category: 'Mè xửng Thiên Hương', items: [] },
    { category: 'Rượu Minh Mạng', items: [] },
    { category: 'Tinh dầu Huế', items: [] },
    { category: 'Trà cung đình Huế', items: [] },
    { category: 'Nem chả Huế', items: [] },
];

function Filter() {
    return (
        <div className="">
            <p className="text-[16px] font-semibold mb-3">DANH MỤC SẢN PHẨM</p>
            <Input className="mb-3" size="large" placeholder="Tìm sản phẩm" prefix={<SearchOutlined />} />
            <Collapse accordion bordered={false} style={{ background: 'none' }}>
                {data.map((section) => (
                    <Panel header={section.category} key={section.category}>
                        {section.items.length ? (
                            <List
                                size="small"
                                dataSource={section.items}
                                renderItem={(item) => <List.Item className="hover:text-orange-500">{item}</List.Item>}
                            />
                        ) : (
                            <Text type="secondary">Không có dữ liệu</Text>
                        )}
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
}

export default Filter;
