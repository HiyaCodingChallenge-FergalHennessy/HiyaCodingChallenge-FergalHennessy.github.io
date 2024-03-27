import * as React from "react";
import { useContext } from "react";
import FileContext from "../Context/FileContext"
import { findShortCallers } from "../Util/util";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";

export let data1 = [
  { x: "Passed", y: 37, text: "37%" },
  { x: "Lints", y: 17, text: "17%" },
  { x: "Warning", y: 19, text: "19%" },
  { x: "Ignored", y: 4, text: "4%" },
  { x: "Missed", y: 11, text: "11%" },
  { x: "Error", y: 12, text: "12%" },
];

const Pie = () => {
  const pie = React.useRef();
  const { fileContent, setFileContent, fileTitle, setFileName} = useContext(FileContext);

  let data = [
    {x: "Less than 5 Seconds/Call", y:0, text: "0%"},
    {x: "At least 5 Seconds/Call", y:1, text: "100%"}
  ]
  if(fileContent){
    const callerSplit = findShortCallers(fileContent);
    const shortCallerCount = callerSplit.shortCallers.length;
    const longCallerCount = callerSplit.otherCallers.length;
    data[0]["y"] = shortCallerCount;
    data[0]["text"] = Math.round((shortCallerCount/(shortCallerCount+longCallerCount))*100) + "\%"
    data[1]["y"] = longCallerCount;
    data[1]["text"] = Math.round((longCallerCount/(shortCallerCount+longCallerCount))*100) + "\%"
  }

  return (
    <div className="control-pane">
      <div className="control-section row">
        <div className="col">
          <AccumulationChartComponent
            id="pie-chart"
            ref={pie}
            title="Long Callers vs Short Callers"
            // load={this.load.bind(this)}
            legendSettings={{ visible: false }}
            enableSmartLabels={true}
            enableAnimation={true}
            center={{ x: "50%", y: "50%" }}
            tooltip={{ enable: true, format: "${point.x} : <b>${point.y}</b>" }}
            // loaded={this.onChartLoad.bind(this)}
          >
            <Inject
              services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={data}
                name="Callers"
                xName="x"
                yName="y"
                explode={true}
                explodeOffset="10%"
                explodeIndex={0}
                dataLabel={{
                  visible: true,
                  position: "Inside",
                  name: "text",
                  font: {
                    fontWeight: "600",
                  },
                }}
                radius="90%"
              ></AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      </div>
    </div>
  );
};

export default Pie;
