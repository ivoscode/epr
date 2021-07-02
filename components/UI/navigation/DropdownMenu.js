import { Menu, MenuButton, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import React from "react";

export default function DropdownMenu(props) {
  const createMenu = (item) => {
    if (item.children.length === 0) {
      return (
        <MenuItem className="text-white hover:bg-gray-700" href={item.url}>
          {item.title}
        </MenuItem>
      );
    } else {
      return (
        <SubMenu className="text-white hover:bg-gray-700" label={item.title}>
          {item.children.map((x) => createMenu(x))}
        </SubMenu>
      );
    }
  };

  return (
    <div className="text-white ">
      <Menu
        menuButton={
          <MenuButton className="bg-gray-700  text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            {props.item.title}{" "}
          </MenuButton>
        }
      >
        {props.item.children.map((x) => createMenu(x))}
      </Menu>
    </div>
  );
}
