import React from "react";
import ReactDOM from "react-dom/client";

const Title = () => (
    <h1 className="head" tabIndex="5">
      Learn React
    </h1>
  );
  
  const HeadingComponent = () => (
    <>
      <div id="container">
        <Title />
        <h1 className="headidng">Functional Component</h1>
      </div>
      <div id="container-2"></div>
    </>
  );
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(<HeadingComponent/>);

//  ReactElement(Object) => HTML(Browser Understands)