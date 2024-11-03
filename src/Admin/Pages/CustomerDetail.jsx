import React, { useEffect, useState } from 'react';
import CustomerHeader from '../Components/CustomerDetail/CustomerHeader';
import CustomerInfo from '../Components/CustomerDetail/CustomerInfo';
import CustomerOrderedTable from '../Components/CustomerDetail/CustomerOrderedTable';
import { useParams } from 'react-router-dom';
import { fetchUserByIdFromAPI } from '../../Services/UserService';
import CustomerReviewTable from '../Components/CustomerDetail/CustomerReviewTable';

function CustomerDetail() {
    const { customerId } = useParams();

    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const { data } = await fetchUserByIdFromAPI(customerId);
                setDataUser(data);
            } catch (error) {
                console.error('Error fetching user by id', error);
            }
        };
        fetchUserById();
    }, [customerId]);
    return (
        <div className="pl-4 flex flex-col flex-1">
            <CustomerHeader customerdata={dataUser} />
            <div className="pt-3 pb-4 flex flex-row">
                <div className="flex flex-col flex-[1]">
                    <CustomerInfo customerdata={dataUser} />
                </div>
                <div className="flex flex-col flex-[2]">
                    <CustomerOrderedTable />
                    <CustomerReviewTable />
                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;
