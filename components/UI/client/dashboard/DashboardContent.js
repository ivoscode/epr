import { useRouter } from "next/router";
import { Responsive, WidthProvider } from "react-grid-layout";
import useAxios from "../../../hooks/useAxios";
import ImageComp from "./ImageComp";
import LinksComp from "./LinksComp";
import TableComp from "./TableComp";

export default function DashboardContent() {
  const router = useRouter();
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const clientId = router.query.clientid;
  if (!clientId) {
    return null;
  }
  const { response } = useAxios(`/api/clientdashboard/tiles/`);

  if (!response || !clientId) {
    return null;
  }

  return (
    <div className=" min-h-screen text-xl bg-gray-100 p-6 ">
      <ResponsiveGridLayout
        className="layout"
        layouts={response.data.layouts}
        isResizable={false}
        isDraggable={false}
        breakpoints={{ lg: 1024, md: 768, sm: 640 }}
        cols={{ lg: 12, md: 6, sm: 2 }}
      >
        {response.data.tiles.map((x) => {
          switch (x.type) {
            case `TABLE`:
              return (
                <div key={x.id} className="dashboard-tile ">
                  <TableComp data={x} clientId={clientId} />
                </div>
              );
            case `IMAGE`:
              return (
                <div key={x.id} className="dashboard-tile">
                  <ImageComp data={x} clientId={clientId} />
                </div>
              );
            case `LINKS`:
              return (
                <div key={x.id} className="dashboard-tile">
                  <LinksComp data={x} clientId={clientId} />
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
