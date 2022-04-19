import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

function File({ onClickProps = () => null, data, directory }) {
  function getIconName() {
    if (directory) {
      return "folder";
    }
    if (data.name.match(/.jpg/)) {
      return "image";
    }
    return "file";
  }
  return (
    <FileWrapper
      onClick={() => onClickProps(data)}
      directory={directory}
      tabIndex={0}>
      <Icon iconName={getIconName()} />
      <p className="name">{data.name}</p>
    </FileWrapper>
  );
}

const FileWrapper = styled.div`
  width: 80px;
  margin: 0 10px;
  :hover {
    color: var(--hover-color);
    svg {
      fill: var(--hover-color);
    }
  }
  .name {
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :focus {
    z-index: 1;
    .name {
      position: absolute;
      height: max-content;
      color: #000;
      background-color: #fff;
      overflow-wrap: break-word;
    }
  }
  ${(props) => props.directory && "cursor: pointer"}
`;

export default File;
