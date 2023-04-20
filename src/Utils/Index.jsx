import { Dropdown } from "antd";
import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";

const Flex = (props) => {
  const { children, className, alignItems, justifyContent, flexDirection } =
    props;
  return (
    <div
      className={`${className} ${flexDirection ? "flex-" + flexDirection : ""
        } ${alignItems ? "align-items-" + alignItems : ""} ${justifyContent ? "justify-content-" + justifyContent : ""
        }`}
    >
      {children}
    </div>
  );
};

const EllipsisDropdown = (props) => {
  return (
    <Dropdown overlay={props.menu} placement="bottomLeft" trigger={["hover"]}>
      <div className="ellipsis-dropdown">
        <EllipsisOutlined rotate={90} style={{ fontSize: 20 }} />
      </div>
    </Dropdown>
  );
};

const antdTableSorter = (a, b, key) => {
  if (typeof a[key] === "number" && typeof b[key] === "number") {
    return a[key] - b[key];
  }
  if (typeof a[key] === "string" && typeof b[key] === "string") {
    a = a[key].toLowerCase();
    b = b[key].toLowerCase();
    return a < b ? -1 : b < a ? 1 : 0;
  }
  return;
};
export { antdTableSorter, EllipsisDropdown, Flex };
