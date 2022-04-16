import React from "react";
function DirectoryPath({ currentDirectory, onDirectoryPathClick }) {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        display: "flex",
      }}>
      {currentDirectory.nameArr.map((name, index) => (
        <>
          {Boolean(index) && " / "}
          <div
          onClick={() => onDirectoryPathClick(name, index)}
          >{name}</div>
        </>
      )) || "loading..."}
    </div>
  );
}

export default DirectoryPath;
