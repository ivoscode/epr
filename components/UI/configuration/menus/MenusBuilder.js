import { TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  changeNodeAtPath,
  removeNodeAtPath,
  SortableTreeWithoutDndContext as SortableTree,
} from "@nosferatu500/react-sortable-tree";
import { generateGUID } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";
import BtnMain from "../../../Shared/buttons/BtMain";
import MyDialog from "../../../Shared/MyDialog";
import AvailableScreens from "./AvailableScreens";
export default function MenusBuilder() {
  const router = useRouter();
  const [rootItem, setRootItem] = useState(null);
  const [menuItems, setMenuItems] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState(null);

  console.log(menuItems);
  {
    /*---------getting menu from API---------------*/
  }
  useEffect(() => {
    if (router.query.id) {
      getApiData("GET", `/api/menus/item?id=${router.query.id}`).then((x) => {
        console.log(x);
        setRootItem(x.data);
        setMenuItems(x.data.children);
      });
    } else {
      setRootItem({
        id: generateGUID(),
        title: "",
        children: [],
      });
      setMenuItems([]);
    }
  }, []);
  {
    /*----Saving menus---------*/
  }

  const handleMenusSubmit = () => {
    let body = rootItem;
    body.children = menuItems;

    if (body.title.length < 1) {
      setIsDialogOpen(true);
      setMessage("Please add a menus Title.");
      return;
    }

    if (body.children.length < 1) {
      setIsDialogOpen(true);
      setMessage("Please add nav element to the builder.");
      return;
    }

    getApiData("POST", `/api/menus/save/`, body).then((x) => {
      x.status == 200 && router.push("/configuration/menus/list");
    });
  };

  {
    /*-------------*/
  }
  const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
    if (nextParent?.hasOwnProperty("url")) {
      return false;
    }
    return true;
  };
  {
    /*-------------generates remove button on the node-----------------*/
  }
  const generateNodeProps = ({ node, path }) => {
    let testclass = "";

    if (node.hasOwnProperty("url")) {
      console.log("it is an endpoint");
      testclass = "bg-blue-300 text-black py-2 px-3 -ml-4 rounded-r-md";
    } else {
      console.log("it is a folder");
      testclass = "bg-gray-700 text-white py-2 px-3 -ml-4 rounded-r-md";
    }

    console.log(node);
    return {
      title: (
        <input
          className={testclass}
          value={node.title}
          onChange={(event) => {
            const title = event.target.value;
            setMenuItems(
              changeNodeAtPath({
                treeData: menuItems,
                path: path,
                getNodeKey: ({ treeIndex }) => treeIndex,
                newNode: { ...node, title },
              })
            );
          }}
        />
      ),
      buttons: [
        <button
          onClick={() => {
            setMenuItems(
              removeNodeAtPath({
                treeData: menuItems,
                path: path,
                getNodeKey: ({ treeIndex }) => treeIndex,
              })
            );
          }}
        >
          <span>
            <TrashIcon className="w-5 h-5 mt-1 mr-1 " />
          </span>
        </button>,
      ],
    };
  };

  if (menuItems === null) {
    return null;
  }

  return (
    <>
      {/*-------alert box---------*/}
      <MyDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        message={message}
      />
      <DndProvider backend={HTML5Backend}>
        {/*----------title----------*/}

        <div className="w-full flex justify-center   mt-5 ">
          <div className="flex w-5/12 ">
            <label className="text-lg mr-5 flex items-center" htmlFor="Title">
              Title
            </label>
            <input
              name="Title"
              placeholder="Please enter title"
              value={rootItem.title}
              onChange={(e) => {
                setRootItem({ ...rootItem, title: e.target.value });
              }}
              className="w-full py-1 px-3 border border-gray-500 rounded-md"
            ></input>
          </div>
        </div>

        <div className="flex mt-8">
          {/*-----screens-------*/}
          <div className="bg-blue-100 shadow-md rounded-none mr-10 p-5">
            <AvailableScreens />
          </div>
          {/*------builder--------*/}
          <div className="shadow-lg p-5 rounded-lg w-full">
            <SortableTree
              innerStyle={{ color: "red" }}
              dndType="yourNodeType"
              isVirtualized={false}
              canDrop={canDrop}
              generateNodeProps={generateNodeProps}
              treeData={menuItems}
              onChange={(data) => {
                setMenuItems(data);
              }}
            />
            {/* <button
            onClick={() =>
              setMenuItems([...menuItems, { id: generateGUID(), title: "new" }])
            }
          >
            Add more
          </button> */}
          </div>
        </div>
         <div className=" mt-20 flex justify-center">
          <BtnMain style="mx-12" onClick={handleMenusSubmit}>
            Save
          </BtnMain>
          <BtnMain
            style="mx-12"
            onClick={() => {
              router.push("/configuration/menus/list");
            }}
          >
            Close
          </BtnMain>
        </div>
        
      </DndProvider>
    </>
  );
}
