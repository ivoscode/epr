export default function TableComp(props) {
  // const data = [
  //           { rowtitle: "Name", rowcontent: "Sarah Davies" },
  //           { rowtitle: "DOB", rowcontent: "17/02/1966" },
  //           { rowtitle: "Address", rowcontent: "9 West Park Avenue" },
  //           { rowtitle: "Contact No:", rowcontent: "0744-524-7009" },
  //           { rowtitle: "Status", rowcontent: "Addmitted" },
  //         ];

  return (
    <div className="bg-blue-400 h-full ">
      <div>{props.data.title}</div>

      {props.data.tablecontent &&
        props.data.tablecontent.map((result) => {
          return (
            <ul
              className="card  mx-2  flex justify-between my-6 px-4 bg-blue-500 "
              key={result.rowtitle}
            >
              <li>{result.rowtitle}</li>

              <li>{result.rowcontent}</li>
            </ul>
          );
        })}
    </div>
  );
}
