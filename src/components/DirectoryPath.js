import React from "react";
import styled from "styled-components";
function DirectoryPath({ currentDirectory, onDirectoryPathClick }) {
  return (
    <DirectoryWrapper>
      {currentDirectory.nameArr.map((name, index) => (
        <React.Fragment key={name + index}>
          {Boolean(index) && " / "}
          <div
            className="path"
            onClick={() => onDirectoryPathClick(name, index)}>
            {name}
          </div>
        </React.Fragment>
      )) || "loading..."}
    </DirectoryWrapper>
  );
}

const DirectoryWrapper = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  padding: 0 20px;
  .path {
    cursor: pointer;
    margin: 0 20px;
    font-size: 20px;
    font-weight: 600;
    :hover {
      color: var(--hover-color);
    };
  }
`;

export default DirectoryPath;
