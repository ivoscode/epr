const ImageMap = require("@qiuz/react-image-map/react-image-map");
import { useDrop } from "dnd14";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTabs } from "react-headless-tabs";
import Bed from "./Bed";
import Patient from "./Patient";
import { TabSelector } from "./TabSelector";

export default function BedManager() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [beds, setBeds] = useState([]);
  const [floorPlan, setFloorPlan] = useState();
  const [myMapArea, setMyMapArea] = useState([]);
  const [selectedTab, setSelectedTab] = useTabs([
    "Main ward",
    "Floor 1",
    "Floor 2",
    "Floor 3",
  ]);

  const bedsData1 = [
    {
      bedId: 11,
      status: "occupied",
      patientId: 4,
      patientPic:
        "https://images.generated.photos/2XvEQpkKk_t2ZRuXXF5zNOPoFVMhA0Re2rsFJUs5Opw/rs:fit:256:256/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1NzAyOTYuanBn.jpg",
      patientName: "Lisa",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "7%",
      height: "18%",
      left: "9.8%",
      top: "68%",
    },
    {
      bedId: 12,
      status: "occupied",
      patientId: 5,
      patientPic:
        "https://images.generated.photos/Bd8biy6H_sY1prSbgw1rgjg47GU03sYPrYNQMljm0kA/rs:fit:256:256/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNjE0NzEuanBn.jpg",
      patientName: "Pedro",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "7%",
      height: "18%",
      left: "36%",
      top: "68%",
    },
    {
      bedId: 13,
      status: "vacant",
      patientId: null,
      patientPic: null,
      patientName: "",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "5%",
      height: "12%",
      left: "61.6%",
      top: "68%",
    },
    {
      bedId: 14,
      status: "vacant",
      patientId: null,
      patientPic: null,
      patientName: "",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "5%",
      height: "12%",
      left: "36%",
      top: "11%",
    },
    {
      bedId: 15,
      status: "vacant",
      patientId: null,
      patientPic: null,
      patientName: "",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "5%",
      height: "12%",
      left: "61.5%",
      top: "11%",
    },
  ];
  const bedsData2 = [
    {
      bedId: 16,
      status: "occupied",
      patientId: 6,
      patientPic:
        "https://images.generated.photos/xXagE9fddPHyE-BLo559SZZwkV7AJKFvzdnFEd52GzE/rs:fit:256:256/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTcwNzkuanBn.jpg",
      patientName: "Anna",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "18%",
      height: "7%",
      left: "30%",
      top: "16%",
    },

    {
      bedId: 17,
      status: "vacant",
      patientId: null,
      patientPic: null,
      patientName: "",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "5%",
      height: "12%",
      left: "30%",
      top: "60%",
    },
  ];
  const patientsData = [
    {
      id: 1,
      status: "awaiting placement",
      name: "Beth",
      patientPic:
        "https://images.generated.photos/LbsBiIMZoT40VJ2SfJFgQfD8rBHMoQd43mAFtRJxTE0/rs:fit:256:256/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNjUwNjcuanBn.jpg",
    },
    {
      id: 2,
      status: "awaiting placement",
      name: "Hugo",
      patientPic:
        "https://images.generated.photos/VLPxGToJo6mq3S6sjzXz9qV5ZXzd48unNZksi2O0gNk/rs:fit:256:256/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5NTc3NzEuanBn.jpg",
    },
  ];

  const floor1 =
    "https://www.researchgate.net/profile/Atish-Rajkomar/publication/221886132/figure/fig8/AS:669644289490962@1536667048506/ICU-Bay-Layout-The-dashed-lines-represent-bed-curtains-which-by-default-are-open-but.png";

  const floor2 =
    "https://healthandeverythingblog.files.wordpress.com/2013/11/nurses-units-image-blog-7.jpg";

  {
    /*------------fetching beds and patients from API-------------*/
  }
  useEffect(() => {
    const storagePatients = JSON.parse(
      window.sessionStorage.getItem("patients")
    );
    const ward1 = JSON.parse(window.sessionStorage.getItem("ward1"));
    const ward2 = JSON.parse(window.sessionStorage.getItem("ward2"));

    if (router.query.wardid == 1) {
      console.log("one");

      ward1 ? setBeds(ward1) : setBeds(bedsData1);

      setFloorPlan(floor1);
      setSelectedTab("Main ward");
    }
    if (router.query.wardid == 2) {
      console.log("two");
      ward2 ? setBeds(ward2) : setBeds(bedsData2);

      setFloorPlan(floor2);
      setSelectedTab("Floor 1");
    }
    storagePatients ? setPatients(storagePatients) : setPatients(patientsData);
  }, [router.query.wardid]);

  useEffect(() => {
    beds && setMyMapArea(myMapAreaObject);
  }, [beds]);
  {
    /*------submitting data on state change*/
  }
  useEffect(() => {
    submitData(patients, beds);
  }, [beds, patients]);

  {
    /*-------creating beds map object-----------------*/
  }
  const myMapAreaObject = beds.map((bed) => {
    return {
      width: "7%",
      height: "18%",
      left: bed.left,
      top: bed.top,
      render: (area, index) => (
        <Bed
          bed={{
            bedId: bed.bedId,
            status: bed.status,
            patientId: bed.patientId,
            patientPic: bed.patientPic,
            patientName: bed.patientName,
            url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
          }}
          addPatientToBed={addPatientToBed}
        />
      ),
      onMouseOver: () => console.log("map onMouseOver"),
    };
  });

  {
    /*----submit data-----------*/
  }
  const submitData = (patients, beds) => {
    console.log(patients, beds);
    sessionStorage.setItem(`patients`, JSON.stringify(patients));
    sessionStorage.setItem(`ward${router.query.wardid}`, JSON.stringify(beds));
  };

  {
    /*--------------moving patient to hold------------------*/
  }
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "patient",
    drop: (patient) => addPatientToHold(patient),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const addPatientToHold = (patient) => {
    console.log("adding to hold", patient);
    if (patient.prevBedId) {
      console.log("removing from bed", patient.prevBedId);
      setBeds((beds) => {
        const remainingBeds = beds.filter((x) => x.bedId !== patient.prevBedId);
        const bedtochange = beds.filter((x) => x.bedId == patient.prevBedId);
        const changedBed = {
          ...bedtochange[0],
          status: "vacant",
          patientId: null,
          patientName: "",
          patientPic: null,
        };
        return [...remainingBeds, changedBed];
      });
    }
    setPatients((patients) => {
      patient.status = "awaiting placement";
      return [...patients, patient];
    });
    window.location.href = `/bed-manager?wardid=${router.query.wardid}`;
  };
  {
    /*------------moving patient to bed-------------*/
  }
  const addPatientToBed = (patient, bed) => {
    console.log(beds);
    console.log(`patient ${patient.name} added to bed ${bed.bedId}`);
    if (!patient.id) {
      return;
    }

    setBeds((beds) => {
      const remainingBeds = beds.filter((x) => x.bedId !== bed.bedId);
      const bedtochange = beds.filter((x) => x.bedId == bed.bedId);

      const changedBed = {
        ...bedtochange[0],
        status: "ocupied",
        patientId: patient.id,
        patientName: patient.name,
        patientPic: patient.patientPic,
      };
      return [...remainingBeds, changedBed];
    });
    {
      /*----remove from previous bed is exists-----------*/
    }
    if (patient.prevBedId) {
      console.log("removing from bed", patient.prevBedId);
      setBeds((beds) => {
        const remainingBeds = beds.filter((x) => x.bedId !== patient.prevBedId);
        const bedtochange = beds.filter((x) => x.bedId == patient.prevBedId);
        const changedBed = {
          ...bedtochange[0],
          status: "vacant",
          patientId: null,
          patientName: "",
          patientPic: null,
        };
        return [...remainingBeds, changedBed];
      });
    }
    setPatients((patients) => {
      const remainingPatients = patients.filter((x) => x.id !== patient.id);
      return [...remainingPatients];
    });
    window.location.href = `/bed-manager?wardid=${router.query.wardid}`;
  };

  return (
    <div className="flex">
      <div ref={drop} className="w-2/12 h-full  pl-5 pt-20">
        {patients.map((patient) => {
          return <Patient key={patient.id} patient={patient} />;
        })}
      </div>
      <div className=" w-10/12  h-full ">
        <nav className="flex border-b border-gray-300">
          <TabSelector
            isActive={selectedTab === "Main ward"}
            // onClick={() => {
            //   router.push("/bed-manager?wardid=1");
            // }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/bed-manager?wardid=1";
            }}
          >
            Main ward
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Floor 1"}
            // onClick={() => {
            //   router.push("/bed-manager?wardid=2");
            // }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/bed-manager?wardid=2";
            }}
          >
            Floor 1
          </TabSelector>
          {/* <TabSelector
            isActive={selectedTab === "Floor 2"}
            onClick={() => {
              router.push("/bed-manager?wardid=3");
              setSelectedTab("Floor 2");
            }}
          >
            Floor 2
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Floor 3"}
            onClick={() => {
              setSelectedTab("Floor 3");
              router.push("/bed-manager?wardid=4");
            }}
          >
            Floor 3
          </TabSelector> */}
        </nav>
        <div className="p-4">
          {<ImageMap className="usage-map" src={floorPlan} map={myMapArea} />}
          {/*<TabPanel hidden={selectedTab !== "Main ward"}>.</TabPanel>*/}
        </div>
      </div>
    </div>
  );
}
