import React from "react";
import AverageStars from "../Components/Review/AverageStars";
import ActiveReview from "../Components/Review/ActiveReview";
import NegativeReview from "../Components/Review/NegativeReview";
import ReviewList from "../Components/Review/ReviewList";


const data = [];
const generateRandomId = () => {
  const min = 5943 - 909;
  const max = 5943 + 909;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Hàm để tạo dữ liệu sản phẩm ngẫu nhiên
const generateRandomProduct = () => {
  const products = [
    { name: "Product 1", description: "Description for Product 1" },
    { name: "Product 2", description: "Description for Product 2" },
    { name: "Product 3", description: "Description for Product 3" },
  ];

  const randomProduct = products[Math.floor(Math.random() * products.length)];
  return {
    id: generateRandomId(),
    name: randomProduct.name,
    description: randomProduct.description,
    image_link: "https://cdn.popsww.com/blog-kids/sites/3/2021/12/Nobita-Nobi-Nobita.jpg",
  };
};

// Hàm để tạo dữ liệu khách hàng ngẫu nhiên
const generateRandomCustomer = () => {
  const customers = [
    { name: "Customer 1", email: "customer1@example.com" },
    { name: "Customer 2", email: "customer2@example.com" },
    { name: "Customer 3", email: "customer3@example.com" },
  ];

  const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
  return {
    id: generateRandomId(),
    name: randomCustomer.name,
    email: randomCustomer.email,
    image_link: "https://cdn.popsww.com/blog-kids/sites/3/2021/12/Nobita-Nobi-Nobita.jpg",
  };
};

// Hàm để tạo review ngẫu nhiên
const generateRandomReview = () => {
  const reviewContents = [
    "Great product!",
    "Not what I expected.",
    "Would buy again!",
    "Amazing quality.",
    "Could be better."
  ];

  return {
    id: generateRandomId(),
    content: reviewContents[Math.floor(Math.random() * reviewContents.length)],
    rate: Math.floor(Math.random() * 5) + 1, // Từ 1 tới 5
    product: generateRandomProduct(),
    customer: generateRandomCustomer(),
    review_datetime: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().slice(0, 19).replace('T', ' '),
  };
};

// Hàm tạo 100 review ngẫu nhiên
for (let i = 1; i <= 100; i++) {
  data.push(generateRandomReview(i));
}

const getHighestAndLowestRatedProducts = (reviews) => {
  const productRatings = {};

  // Tính toán tổng đánh giá và số lượng đánh giá cho mỗi sản phẩm
  reviews.forEach((review) => {
    const { product, rate } = review;

    if (!productRatings[product.id]) {
      productRatings[product.id] = {
        ...product,
        totalRate: 0,
        count: 0,
      };
    }

    productRatings[product.id].totalRate += rate;
    productRatings[product.id].count += 1;
  });

  // Tính điểm trung bình cho từng sản phẩm
  let highestRatedProduct = null;
  let lowestRatedProduct = null;

  for (const productId in productRatings) {
    const { totalRate, count } = productRatings[productId];
    const averageRate = totalRate / count;

    if (!highestRatedProduct || averageRate > highestRatedProduct.averageRate) {
      highestRatedProduct = {
        ...productRatings[productId],
        averageRate,
      };
    }

    if (!lowestRatedProduct || averageRate < lowestRatedProduct.averageRate) {
      lowestRatedProduct = {
        ...productRatings[productId],
        averageRate,
      };
    }
  }

  return { highestRatedProduct, lowestRatedProduct };
};



const { highestRatedProduct, lowestRatedProduct } = getHighestAndLowestRatedProducts(data);

console.log('Highest Rated Product:', highestRatedProduct);
console.log('Lowest Rated Product:', lowestRatedProduct);


function Review() {


  return (
    <div className="px-4 gap-4 flex flex-col flex-1 ">
      <div className="flex flex-row gap-x-4 ">
        <AverageStars dataReview={data}/>
        <div className="flex flex-1 gap-4">
          <ActiveReview/>
          <NegativeReview/>
        </div>
      </div>
      <ReviewList dataReview={data}/>
    </div>
  );
}

export default Review;
