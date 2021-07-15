import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import getApiData from "../components/hooks/getApiData";
export default function Test() {
  const [searchParams, setSearchParams] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  console.log(searchParams);
  console.log(searchResults);

  const resultsPerPage = 10;
  const pagesVisited = pageNumber * resultsPerPage;

  const pageCount = Math.ceil(searchResults?.length / resultsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = () => {
    getApiData("GET", `/api/gppractice/search`, { name: searchParams }).then(
      (x) => {
        if (x.data[0] == null) {
          //setNothingFound(true);
          return;
        }
        // setNothingFound(false);
        setSearchResults(x.data);
        //setShowSearchResults(true);
      }
    );
  };

  useEffect(() => {
    if (searchParams?.length > 2) {
      console.log("3 reached");
      handleSearch();
    }
  }, [searchParams]);

  const displayResults = searchResults
    ?.slice(pagesVisited, pagesVisited + resultsPerPage)
    .map((item) => {
      return (
        <div key={item.id}>
          <h1 className="border border-gray-200 p-2 m-5">{item.description}</h1>
        </div>
      );
    });

  return (
    <div>
      {/*----search box*/}
      <div className="flex items-center mt-4 ">
        <div className=" mr-5 ">
          <label className="  font-bold" htmlFor="search">
            Search
          </label>
        </div>
        <div>
          <input
            autoComplete="off"
            type="text"
            value={searchParams}
            name="search"
            onChange={(e) => {
              setSearchParams(e.target.value);
            }}
            className=" input-box "
          />
        </div>
        {searchResults && (
          <div> {`Found ${searchResults?.length} results`}</div>
        )}
      </div>

      {/*---------search results--------*/}
      {displayResults}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}
