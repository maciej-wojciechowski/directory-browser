import React, { useState, useEffect, useLayoutEffect } from "react";
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
    console.log("fetcz");
    fetchDirectories();
  }, []);

  async function fetchDirectories(path) {
    const response = await axiosInstance.get(path);
    console.log(response.data);
    setData((prev) => [...prev, response.data]);
    if (!path) {
      // only on initial fetch
      setCurrentDirectory({
        nameArr: [response.data.name],
        pathArr: [response.data.id],
      });
    } else {
      setCurrentDirectory((prev) => ({
        nameArr: [...prev.nameArr, response.data.name],
        pathArr: [...prev.pathArr, response.data.id],
      }));
    }
    setFiles({
      files: response.data.files,
      directories: response.data.directories,
    });
  }

  function onDirectoryClick(directory) {
    fetchDirectories(`/${directory.id}`);
  }
  function onDirectoryPathClick(path, index) {
    console.log(path, index);
    if (index + 1 === currentDirectory.nameArr.length) {
      return;
    }
    const directoryData = data.find((el) => el.name === path);
    console.log(directoryData);
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
      <div>
        {files.directories.map((el) => {
          return <File onClickProps={onDirectoryClick} data={el} directory />;
        })}
        {files.files.map((el) => {
          return <File data={el} />;
        })}
      </div>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: #525659;
  color: #fff;
`;

export default Home;
