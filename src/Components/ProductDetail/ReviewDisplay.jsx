import { Reviews } from "./Reviews";
import { Rate } from "antd";
function Comment(props) {
  return (
    <div className="flex flex-col bg-[#FAF7F0] mb-3 rounded-md">
      <p className="ml-auto text-[12px] opacity-50 italic mr-2 mt-1">
        {props.date}
      </p>
      <div className="flex ml-2 pb-3">
        <img
          src={props.avatar}
          alt=""
          className="max-w-[56px] max-h-[56px] rounded-full"
        />
        <div className="ml-2">
          <p className="text-[17px] font-semibold italic">{props.name}</p>
          <Rate
            style={{ fontSize: 12 }}
            disabled
            defaultValue={props.rate}
          ></Rate>
          <p className="text-[15px] italic opacity-50">{props.content}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewDisplay() {
  return (
    <div className="">
      {Reviews.map((item) => (
        <Comment
          id={item.id}
          date={item.date}
          avatar={item.avatar}
          name={item.name}
          rate={item.rate}
          content={item.content}
        ></Comment>
      ))}
    </div>
  );
}
export default ReviewDisplay;
