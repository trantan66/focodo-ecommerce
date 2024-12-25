import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Collapse, List, Typography } from 'antd';
import { fetchCategoriesForProductFromAPI } from '../../Services/ProductService';

const { Panel } = Collapse;
const { Text } = Typography;

function Filter() {
    const navigate = useNavigate();
    const [categories, setCagegories] = useState([]);
    const fetchCategories = async () => {
        const response = await fetchCategoriesForProductFromAPI();
        setCagegories(response.data);
    };

    const { categoryId } = useParams();
    useEffect(() => {
        fetchCategories();
    }, []);
    const handlePanelClick = (id) => {
        console.log(id);
        navigate(`/product/${id}`);
        window.location.reload();

        // Thực hiện các hành động khác ở đây
    };
    const handleClick = (id) => {
        console.log(id);
        navigate(`/product/${id}`);
        window.location.reload();
        // Thực hiện các hành động khác ở đây
    };
    return (
        <div>
            <p className=" w-[180px] text-[14px] font-semibold mb-3">DANH MỤC SẢN PHẨM</p>

            <Collapse
                style={{
                    background: 'none',
                    height: '900px', // Giới hạn chiều cao
                    overflowY: 'auto', // Thêm cuộn dọc
                }}
                collapsible="icon"
                accordion
                bordered={false}
            >
                {categories.map((section) => (
                    <Panel
                        header={
                            <span
                                className={`${categoryId == section.id && 'text-orange-500'}`}
                                onClick={() => handlePanelClick(section.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {section.name}
                            </span>
                        }
                        key={section.name}
                    >
                        {section.subcategories.length ? (
                            <List
                                size="small"
                                dataSource={section.subcategories}
                                renderItem={(subcategories) => (
                                    <List.Item
                                        onClick={() => handleClick(subcategories.id)}
                                        className="hover:cursor-pointer hover:text-orange-500"
                                    >
                                        {subcategories.name}
                                    </List.Item>
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
