import React, { useState, useContext } from "react";
import UserContext from "../../contexts/userContext";
import ExistingDetails from "./existing-details";
import CreateDetails from "./create-details";
import DetailsEmpty from "./details-empty/Details-empty";
import PaginationCustom from "../../components/pagination";
import BlockHeader from "../../components/block-header";

import "./Details.css";

const Details = () => {
  const { userData, setUserData } = useContext(UserContext);
//KACKEY--  const [state, changeState] = useState("list");
  const [state, changeState] = useState("details");
  const [totalDataLen, setTotalLen] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

    return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 d-flex flex-column">
        <BlockHeader
          title="Deals"
          buttonText={`${
            userData.accountLinked !== undefined &&
            userData.accountLinked === "yes"   && state === 'list'
              ? "+ Create new deal"
              : ""
          }`}
          handler={() => changeState("details")}
        />
        {state === "details" && <CreateDetails publish={changeState} />}
        {state === "list" && (
          <>
            <ExistingDetails
              setTotalLen={setTotalLen}
              currentPage={currentPage}
              isEmpty={changeState}
              pageSize={pageSize}
              createDeal={changeState}
            />{" "}
            <footer className="d-flex flex-wrap justify-content-end align-items-center  table-container__footer">
              <PaginationCustom
                totalSize={totalDataLen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
              />
            </footer>
          </>
        )}
        {state === "empty" && <DetailsEmpty createDeal={changeState} />}
      </div>
    </div>
  );
};

export default Details;
