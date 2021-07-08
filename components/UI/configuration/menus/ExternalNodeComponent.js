import { DragSource } from "react-dnd";

const externalNodeType = "yourNodeType";
const externalNodeSpec = {
  beginDrag: (componentProps) => ({ node: { ...componentProps.node } }),
};
const externalNodeCollect = (connect /* , monitor */) => ({
  connectDragSource: connect.dragSource(),
});
const externalNodeBaseComponent = ({ connectDragSource, node }) => {
  return connectDragSource(
    <div
    //   style={{
    //     display: "inline-block",
    //     padding: "3px 5px",
    //     background: "blue",
    //     color: "white",
    //   }}
    >
      {node.title}
    </div>,
    { dropEffect: "copy" }
  );
};

export const ExternalNodeComponent = DragSource(
  externalNodeType,
  externalNodeSpec,
  externalNodeCollect
)(externalNodeBaseComponent);
