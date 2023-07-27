import React from "react";
import { Dna } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className=" spinner ">
      <Dna
        visible={true}
        height="80"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
