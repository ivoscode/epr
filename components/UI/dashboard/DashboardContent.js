import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import ImageComp from "./ImageComp";
import LinksComp from "./LinksComp";
import TableComp from "./TableComp";

export default function DashboardContent() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [data, setData] = useState();
  useEffect(() => {
    setTimeout(() => {
      setData(response);
    }, 2000);
  }, []);

  const response = {
    tiles: [
      {
        title: `Patient Details`,
        type: `TABLE`,
        layoutKey: "patient",
        api: `/api/client/dashboard/details/`,
      },
      {
        title: `Patient Status`,
        type: `TABLE`,
        layoutKey: "status",
      },

      {
        title: `Photo`,
        type: `IMAGE`,
        layoutKey: "photo",
        api: `/api/client/dashboard/photo/`, // { src: `path_to_image.png` }
      },
      {
        title: `Patient Pathway`,
        type: `TABLE`,
        layoutKey: "pathway",
      },
      {
        title: `Alert`,
        type: `IMAGE`,
        layoutKey: "alerts",
      },
      {
        title: `Allergies`,
        type: `IMAGE`,
        layoutKey: "allergies",
      },
      {
        title: `Links`,
        type: `LINKS`,
        layoutKey: "links",
      },
    ],

    layouts: {
      lg: [
        { i: "patient", x: 0, y: 0, w: 6, h: 3 },
        { i: "status", x: 0, y: 0, w: 6, h: 2 },
        { i: "photo", x: 6, y: 0, w: 3, h: 2 },
        { i: "pathway", x: 6, y: 0, w: 3, h: 3 },
        { i: "alerts", x: 10, y: 0, w: 3, h: 1 },
        { i: "allergies", x: 10, y: 0, w: 3, h: 1 },
        { i: "links", x: 10, y: 0, w: 3, h: 3 },
      ],
      md: [
        { i: "patient", x: 0, y: 0, w: 4, h: 4 },
        { i: "status", x: 0, y: 3, w: 3, h: 2 },
        { i: "photo", x: 4, y: 0, w: 2, h: 2 },
        { i: "pathway", x: 3, y: 4, w: 3, h: 2 },
        { i: "alerts", x: 2, y: 1, w: 2, h: 1 },
        { i: "allergies", x: 0, y: 1, w: 2, h: 1 },
        { i: "links", x: 6, y: 2, w: 2, h: 3 },
      ],
      sm: [
        { i: "patient", x: 0, y: 0, w: 2, h: 3 },
        { i: "status", x: 0, y: 0, w: 2, h: 2 },
        { i: "photo", x: 0, y: 0, w: 1, h: 2 },
        { i: "pathway", x: 1, y: 0, w: 1, h: 2 },
        { i: "alerts", x: 1, y: 0, w: 1, h: 1 },
        { i: "allergies", x: 1, y: 0, w: 1, h: 1 },
        { i: "links", x: 0, y: 0, w: 1, h: 3 },
      ],
    },
  };
  if (data == null)
    return <div className="text-green-800 text-3xl m-20">Loading data</div>;

  return (
    <div className=" min-h-screen text-xl bg-gray-100 p-6 ">
      <ResponsiveGridLayout
        className="layout"
        layouts={data.layouts}
        isResizable={false}
        isDraggable={false}
        breakpoints={{ lg: 1024, md: 768, sm: 640 }}
        cols={{ lg: 12, md: 6, sm: 2 }}
      >
        {data.tiles.map((x) => {
          switch (x.type) {
            case `TABLE`:
              return (
                <div key={x.layoutKey} className="item">
                  <TableComp data={x} />
                </div>
              );
            case `IMAGE`:
              return (
                <div key={x.layoutKey} className="item">
                  <ImageComp data={x} />
                </div>
              );
            case `LINKS`:
              return (
                <div key={x.layoutKey} className="item">
                  <LinksComp data={x} />
                </div>
              );
            default:
              return null;
          }
        })}
      </ResponsiveGridLayout>
    </div>
  );
}
