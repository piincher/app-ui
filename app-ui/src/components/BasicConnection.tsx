import axios from "axios";

import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  DiagramWidget,
} from "storm-react-diagrams";

import "./Basic.css";

export const BasicConnection = () => {
  //1) setup the diagram engine
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  //2) setup the diagram model
  const model = new DiagramModel();

  //3-A) create a default node
  const node1 = new DefaultNodeModel("Source", "rgb(0,192,255)");
  node1.addListener({
    selectionChanged: (e) => console.log("select node change 1", e),
  });
  //3-B) create another default node
  const node2 = new DefaultNodeModel("Destination", "rgb(192,255,0)");

  node2.addListener({
    selectionChanged: (e) => console.log("select node change 2", e),
  });

  const obj = {
    componenets: [
      { id: node1.id, name: node1.name },
      { id: node2.id, name: node2.name },
    ],
    links: [
      {
        src: node1.id,
        dest: node2.id,
      },
    ],
  };

  const run = async () => {
    const { data } = await axios.post("http://localhost:4000/api/state/cache", {
      obj,
    });

    console.log(data);
  };

  let port1 = node1.addOutPort(" ");
  node1.setPosition(100, 100);

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
      <button onClick={run}>submit</button>
      <DiagramWidget className='srd-demo-canvas' diagramEngine={engine} />;
    </>
  );
};
