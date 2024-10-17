import { Reviews } from "./Reviews";
import { Rate, Progress } from "antd";
function ReviewsCount(props) {
  return (
    <div className="mt-4 ">
      <p className="text-[24px] italic font-semibold">Đánh giá</p>
      <div className="flex mt-3 justify-center">
        <div className="bg-[#F5F5F7] rounded-[15%] size-[200px]">
          <p className="text-[56px] italic flex justify-center">
            {props.averagerate}
          </p>
          <p className="text-[15px] opacity-50 font-semibold italic flex justify-center mt-2">
            {props.total} lượt đánh giá
          </p>
          <Rate
            className="flex justify-center mt-4"
            allowHalf
            disabled
            defaultValue={props.averagerate}
          ></Rate>
        </div>
        <div style={{ width: "500px" }} className="mx-4 my-2 ">
          <div className="flex">
            <p className="text-[12px] w-[75px] mt-1">Rất tốt</p>
            <Progress
              percent={90}
              strokeColor="#FFB84D"
              showInfo={false}
            ></Progress>
          </div>
          <div className="flex mt-3.5">
            <p className="text-[12px] w-[75px] mt-1">Tốt</p>
            <Progress
              percent={50}
              strokeColor="#FFB84D"
              showInfo={false}
            ></Progress>
          </div>
          <div className="flex mt-3.5">
            <p className="text-[12px] w-[75px] mt-1">Trung bình </p>
            <Progress
              percent={70}
              strokeColor="#FFB84D"
              showInfo={false}
            ></Progress>
          </div>
          <div className="flex mt-3.5">
            <p className="text-[12px] w-[75px] mt-1">Tệ</p>
            <Progress
              percent={30}
              strokeColor="#FFB84D"
              showInfo={false}
            ></Progress>
          </div>
          <div className="flex mt-3.5">
            <p className="text-[12px] w-[75px] mt-1">Rất tệ</p>
            <Progress
              percent={65}
              strokeColor="#FFB84D"
              showInfo={false}
            ></Progress>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewList() {
  const totalReview = Reviews.length;
  const totalRate = Reviews.reduce((total, review) => total + review.rate, 0);
  const avRate = totalRate / Reviews.length;
  return (
    <div className="">
      <ReviewsCount
        total={totalReview}
        averagerate={avRate.toFixed(1)}
      ></ReviewsCount>
    </div>
  );
}

export default ReviewList;
