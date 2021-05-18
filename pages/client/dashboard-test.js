import { Responsive, WidthProvider } from "react-grid-layout";
import Layout from "../../components/AppLayout";
import Patient from "../../components/UI/icons/Patient";
const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardTest() {
  const layoutlg = [
    { i: "patient", x: 0, y: 0, w: 6, h: 3, static: true },
    { i: "status", x: 0, y: 0, w: 6, h: 2 },
    { i: "photo", x: 6, y: 0, w: 3, h: 2 },
    { i: "pathway", x: 6, y: 0, w: 3, h: 3 },
    { i: "alerts", x: 10, y: 0, w: 3, h: 1 },
    { i: "allergies", x: 10, y: 0, w: 3, h: 1 },
    { i: "links", x: 10, y: 0, w: 3, h: 3 },
  ];

  const layoutmd = [
    { i: "patient", x: 0, y: 0, w: 5, h: 3, static: true },
    { i: "status", x: 0, y: 0, w: 6, h: 3, static: true },
    { i: "photo", x: 10, y: 0, w: 2, h: 2, static: true },
  ];
  const layoutsm = [
    { i: "patient", x: 0, y: 0, w: 6, h: 3, static: true },
    { i: "status", x: 0, y: 0, w: 6, h: 3, static: true },
    { i: "photo", x: 10, y: 0, w: 2, h: 2, static: true },
  ];

  const layouts = { lg: layoutlg, md: layoutmd, sm: layoutsm };
  return (
    <Layout>
      <div className=" min-h-screen text-xl bg-gray-100 p-6 ">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1024, md: 768, sm: 640 }}
          cols={{ lg: 12, md: 6, sm: 1 }}
        >
          <div key="patient" className="item bg-pink-600  ">
            Patient details
          </div>

          <div key="status" className="item bg-blue-600">
            status
          </div>

          <div key="photo" className="item ">
            <Patient />
          </div>
          <div key="pathway" className="item bg-green-500">
            Current Pathway
          </div>
          <div key="alerts" className="item bg-red-600">
            Alerts
          </div>
          <div key="allergies" className="item bg-yellow-400">
            Allergies
          </div>
          <div key="links" className="item bg-purple-400">
            Quick links
          </div>
        </ResponsiveGridLayout>
      </div>
    </Layout>
  );
}
