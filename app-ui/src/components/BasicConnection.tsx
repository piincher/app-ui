import axios from "axios";
import { useState, useEffect } from "react";
import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  DiagramWidget,
} from "storm-react-diagrams";

import "./Basic.css";

export const BasicConnection = () => {
  const [nodes, setNodes] = useState([
    {
      id: "c1",
      name: "Source",
    },
    {
      id: "c2",
      name: "Destination",
    },
  ]);
  const [links, setLinks] = useState([{ start: "Node 1", end: "Node 2" }]);

  useEffect(() => {
    const run = async () => {
      const { data } = await axios.post(
        "http://localhost:4000/api/state/cache",
        {
          nodes,
          links,
        }
      );
      console.log("response from axios ", data);
    };

    run();
  }, [links, nodes]);

  //1) setup the diagram engine
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  //2) setup the diagram model
  const model = new DiagramModel();

  //3-A) create a default node
  const node1 = new DefaultNodeModel("Source", "rgb(0,192,255)");

  let port1 = node1.addOutPort(" ");
  node1.setPosition(100, 100);

  //3-B) create another default node
  const node2 = new DefaultNodeModel("Destination", "rgb(192,255,0)");
  let port2 = node2.addInPort("Model");

  node2.setPosition(400, 100);

  // link the ports
  let link1 = port1.link(port2);

  //link1.addLabel("Hello World!");

  //4) add the models to the root graph
  model.addAll(node1, node2, link1);

  //5) load model into engine
  engine.setDiagramModel(model);

  return (
    <>
      <DiagramWidget className='srd-demo-canvas' diagramEngine={engine} />;
    </>
  );
};
