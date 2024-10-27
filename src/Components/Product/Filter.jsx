import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Collapse, List, Typography } from 'antd';
import { fetchCategoriesForProductFromAPI } from '../../Services/ProductService';

const { Panel } = Collapse;
const { Text } = Typography;

function Filter() {
    const [categories, setCagegories] = useState([]);
    const fetchCategories = async () => {
        const response = await fetchCategoriesForProductFromAPI();
        setCagegories(response.data);
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="">
            <p className="text-[16px] font-semibold mb-3">DANH MỤC SẢN PHẨM</p>
            <Input className="mb-3" size="large" placeholder="Tìm sản phẩm" prefix={<SearchOutlined />} />
            <Collapse accordion bordered={false} style={{ background: 'none' }}>
                {categories.map((section) => (
                    <Panel header={section.name} key={section.name}>
                        {section.subcategories.length ? (
                            <List
                                size="small"
                                dataSource={section.subcategories}
                                renderItem={(subcategories) => (
                                    <List.Item className="hover:text-orange-500">{subcategories.name}</List.Item>
                                )}
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
