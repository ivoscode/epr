import dynamic from "next/dynamic";
import React from "react";

const NoServer = (props) => <React.Fragment>{props.children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NoServer), {
  ssr: false,
});
