import React from "react";
import Icon from "./Icon";
function File({ onClickProps = () => null, data, directory }) {
  function getIconName() {
    if (directory) {
      return "folder";
    }
    if (data.name.match(/.jpg/)) {
        return 'image'
    }
    return 'file'
    console.log('asda',data.name.match(/.jpg/))

  }
  return (
    <div onClick={() => onClickProps(data)}>
      <Icon iconName={getIconName()} />
      <p>{data.name}</p>
    </div>
  );
}

export default File;
