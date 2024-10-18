import React from "react";
import { Tabs } from "antd";
import UserIn4 from "./UserIn4";
import { UserData } from "./UserData";


function Content() {
  const user = UserData[0];
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: (
        <UserIn4
          name={user.name}
          username={user.username}
          phonenumber={user.phoneNumber}
          email={user.email}
          birth={user.birth}
          gender={user.gender}
          img={user.avatar}
        />
      ),
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div>
      <Tabs
        className="h-[500px] mx-3 my-3"
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}

export default Content;
