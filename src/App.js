import * as React from "react";
import  {useEffect, useContext} from "react";
import {
  DashboardLayoutComponent,
  PanelsDirective,
  PanelDirective,
} from "@syncfusion/ej2-react-layouts";
import "/node_modules/@syncfusion/ej2/material.css";
import { registerLicense } from "@syncfusion/ej2-base";

import PieChart from "./Charts/PieChart";
import FileContents from "./Charts/FileContents";
import FileUpload from "./Charts/FileUpload";
import FileDownload from "./Charts/FileDownload";

import "./App.css";


registerLicense(process.env.REACT_APP_SYNCFUSION_KEY);

const WebDashboard = () => {
  const onCreate = () => {
    //logic goes here
  };

  useEffect(()=>{
    const elementToRemove = document.getElementById('js-licensing');
    if (elementToRemove) {
      elementToRemove.parentNode.removeChild(elementToRemove);
    }
  }, []);

  const onPanelResize = (args) => {
    if (
      args.element &&
      args.element.querySelector(".e-panel-container .e-panel-content div div div")
    ) {
      let chartObj = args.element.querySelector(".e-panel-container .e-panel-content div div div")
        .ej2_instances[0];
      const height = args.element.querySelector(".e-panel-container .e-panel-content").clientHeight;
      chartObj.height = `${height - 20}`;
      chartObj.width = "100%";
      chartObj.refresh();
    }
  };

  return (
    <div className="control-section" id="predefine_control">
      <div className="content-wrapper" style={{ maxWidth: "100%" }}>
        <DashboardLayoutComponent
          created={onCreate}
          columns={6}
          id="predefine_dashboard"
          cellSpacing={[5, 5]}
          resizeStop={onPanelResize}
          allowResizing={true}
          allowDragging={true}
        >
          <PanelsDirective>
            <PanelDirective
              header=""
              content={FileUpload}
              sizeX={1}
              sizeY={2}
              row={0}
              col={0}
            ></PanelDirective>
            <PanelDirective
              header=""
              content={FileDownload}
              sizeX={1}
              sizeY={4}
              row={2}
              col={0}
            ></PanelDirective>
            <PanelDirective
              header=""
              content={FileContents}
              sizeX={3}
              sizeY={6}
              row={0}
              col={1}
            ></PanelDirective>
            <PanelDirective
              header=""
              content={PieChart}
              sizeX={2}
              sizeY={6}
              row={0}
              col={4}
              ></PanelDirective>
          </PanelsDirective>
        </DashboardLayoutComponent>
      </div>
    </div>
  );
};

export default WebDashboard;



