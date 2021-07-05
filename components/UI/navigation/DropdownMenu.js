import { Menu, MenuButton, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import React from "react";

export default function DropdownMenu(props) {
  const createMenu = (item) => {
    if (item.children.length === 0) {
      return (
        <MenuItem
          className="text-white "
          href={item.url}
          key={"menu-" + item.id}
        >
          {item.title}
        </MenuItem>
      );
    } else {
      return (
        <SubMenu
          className="text-white "
          label={item.title}
          key={"submenu-" + item.id}
        >
          {item.children.map((x) => {
            return createMenu(x);
          })}
        </SubMenu>
      );
    }
  };

  return (
    <div className="text-white ">
      <Menu
        menuButton={
          <MenuButton className="bg-gray-700    px-3 py-2 rounded-md text-sm font-medium">
            {props.item.title}
          </MenuButton>
        }
      >
        {props.item.children.map((x) => createMenu(x))}
      </Menu>
    </div>
  );
}
