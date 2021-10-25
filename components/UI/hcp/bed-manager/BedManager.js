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
      location: "ward1",
      status: "occupied",
      patientId: 4,
      patientPic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTijV7k7S7caVTQPFJCpYNOfFMkp9D-tQ3ofQ&usqp=CAU",
      patientName: "Lisa",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "7%",
      height: "18%",
      left: "9.8%",
      top: "68%",
    },
    {
      bedId: 12,
      location: "ward1",
      status: "occupied",
      patientId: 5,
      patientPic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6jCvgyLdy-7MH5LRNaj_PaKQeD5JXwg2XA&usqp=CAU",
      patientName: "Pedro",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "7%",
      height: "18%",
      left: "36%",
      top: "68%",
    },
    {
      bedId: 13,
      location: "ward1",
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
      location: "ward1",
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
      location: "ward1",
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
      location: "ward2",
      status: "occupied",
      patientId: 6,
      patientPic:
        "data:image/jpeg;base64,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",
      patientName: "Anna",
      url: "http://www.clker.com/cliparts/a/x/3/3/E/z/bed.svg",
      width: "18%",
      height: "7%",
      left: "30%",
      top: "16%",
    },

    {
      bedId: 17,
      location: "ward2",
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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68xCJyjzwUC0J89fXPOkmIvW09vTZjHRkVg&usqp=CAU",
    },
    {
      id: 2,
      status: "awaiting placement",
      name: "Hugo",
      patientPic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLP2Yp1jbhj_MFVPoWWH4dppReQBsKeFf9-g&usqp=CAU",
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

    if ((router.query.wardid == 1) | (router.query.wardid == null)) {
      ward1 ? setBeds(ward1) : setBeds(bedsData1);

      setFloorPlan(floor1);
      setSelectedTab("Main ward");
    }
    if (router.query.wardid == 2) {
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
            location: bed.location,
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
    window.location.href = `/hcp/bedManagement?wardid=${router.query.wardid}`;
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
    window.location.href = `/hcp/bedManagement?wardid=${router.query.wardid}`;
  };

  return (
    <div className="flex">
      <div ref={drop} className="w-2/12 min-h-full  pl-5 pt-20">
        <div>
          {patients.map((patient) => {
            return <Patient key={patient.id} patient={patient} />;
          })}
        </div>
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
              window.location.href = "/hcp/bedManagement?wardid=1";
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
              window.location.href = "/hcp/bedManagement?wardid=2";
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
