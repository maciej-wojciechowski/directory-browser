import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { axiosInstance } from "../api";
import File from "../components/File";
import DirectoryPath from "../components/DirectoryPath";

function Home() {
  const [data, setData] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState({
    nameArr: [],
    pathArr: [],
  });
  const [files, setFiles] = useState({
    files: [],
    directories: [],
  });

  useEffect(() => {
    axiosInstance.get().then((response) => {
      setData([response.data]);
      setCurrentDirectory({
        nameArr: [response.data.name],
        pathArr: [response.data.id],
      });
      setFiles({
        files: response.data.files,
        directories: response.data.directories,
      });
    });
  }, []);

  /**
   * funkcja bierze dane ścieżki ze state-u jeżeli jej nie ma zostaje pobrana i zapisana
   */
  async function getDirectory(directory) {
    const directoryFromState = data.find(
      // tutaj id się powtarzają dla różnych podfolderów, lepiej sprawdzać obydwa warunki
      (el) => el.name === directory.name && el.id === directory.id
    );
    let newDirectory;
    if (!directoryFromState) {
      const path = "/" + directory.id;
      const response = await axiosInstance.get(path);
      newDirectory = response.data;
      setData((prev) => [...prev, newDirectory]);
    } else {
      newDirectory = directoryFromState;
    }
    setCurrentDirectory((prev) => ({
      nameArr: [...prev.nameArr, newDirectory.name],
      pathArr: [...prev.pathArr, newDirectory.id],
    }));
    setFiles({
      files: newDirectory.files,
      directories: newDirectory.directories,
    });
  }

  function onDirectoryPathClick(path, index) {
    if (index + 1 === currentDirectory.nameArr.length) {
      return;
    }
    const directoryData = data.find((el) => el.name === path);
    setFiles({
      files: directoryData.files,
      directories: directoryData.directories,
    });
    setCurrentDirectory((prev) => ({
      nameArr: prev.nameArr.slice(0, index + 1),
      pathArr: prev.pathArr.slice(0, index + 1),
    }));
  }
  return (
    <PageWrapper>
      <div>
        <DirectoryPath
          currentDirectory={currentDirectory}
          onDirectoryPathClick={onDirectoryPathClick}
        />
      </div>
      <div className="filesContainer">
        {files.directories.map((el) => {
          return (
            <File
              key={el.name + el.id}
              onClickProps={getDirectory}
              data={el}
              directory
            />
          );
        })}
        {files.files.map((el, index) => {
          return <File key={el.name + index} data={el} />;
        })}
      </div>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 90vh;
  width: 100%;
  .filesContainer {
    padding: 20px 30px;
    flex-flow: wrap;
    display: flex;
  }
`;

export default Home;
