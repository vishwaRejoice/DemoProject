import React, { useEffect, useState } from "react";
const { v4: uuidv4 } = require("uuid");

const Vscode = () => {
  const [enteries, setEnteries] = useState([]);
  console.log("enteries: ", enteries);
  const [values, setValues] = useState("");
  const [extenstion, setExtenstion] = useState("");

  const handleOnChange = (e) => {
    setValues(e.target.value);
  };
  useEffect(() => {
    const localstorgedata = localStorage.getItem("localstorgedata");
    const storeEnteries = JSON.parse(localstorgedata);
    setEnteries(storeEnteries || []);
  }, []);

  const handleOnMakeFolder = () => {
    if (!values) {
      alert("please enter file name");
    } else {
      const newlist = {
        folder: values,
        perentid: uuidv4(),
        files: [],
        subfolders: [],
      };
      setEnteries([...enteries, newlist]);
      localStorage.setItem("localstorgedata", JSON.stringify(enteries));

      setValues("");
    }
  };
  const handleOnMakeFile = (row) => {
    if (!values) {
      alert("please enter file name");
    } else if (!extenstion) {
      alert("please enter file extenstion");
    } else {
      const list = [...enteries];
      list.find((item) => {
        if (item?.perentid === row.perentid) {
          return item.files.push({
            file: values,
            id: uuidv4(),
            extenstion: extenstion,
          });
        }
      });

      setEnteries(list);
      localStorage.setItem("localstorgedata", JSON.stringify(list));

      setValues("");
    }
  };
  const handleOnChildFile = (row, id) => {
    if (!values) {
      alert("please enter file name");
    } else if (!extenstion) {
      alert("please enter file extenstion");
    } else {
      const list = [...enteries];

      list.forEach((folder) => {
        if (folder?.perentid === id) {
          folder.subfolders.forEach((item) => {
            if (item?.id === row.id) {
              return item.subfiles.push({
                subfile: values,
                id: uuidv4(),
                extension: extenstion, // fixed typo from 'extenstion'
              });
            }
          });
        }
      });

      setEnteries(list);
      localStorage.setItem("localstorgedata", JSON.stringify(list));

      setValues("");
    }
  };
  const handleOnChildFolder = (row) => {
    if (!values) {
      alert("please enter folder name");
    } else {
      const list = [...enteries];
      list.find((item) => {
        if (item?.perentid === row.perentid) {
          return item?.subfolders?.push({
            subfolder: values,
            id: uuidv4(),
            subfiles: [],
          });
        }
      });

      setEnteries(list);
      localStorage.setItem("localstorgedata", JSON.stringify(list));

      setValues("");
    }
  };
  const handleOnFolderDelete = (id) => {
    const list = [...enteries];
    const lists =list?.filter(
              (file) => file?.perentid !== id
            );
    setEnteries(lists);
    localStorage.setItem("localstorgedata", JSON.stringify(lists));
  };
  const handleOnFolderEdit = (id) => {
    if (!values) {
      alert("please enter folder name");
    } else {
      const list = enteries.map((folder) => {
        if (folder.perentid === id) {
          return {
            ...folder,
            folder: values,
          };
        }
        return folder;
      });

      setEnteries(list);
      setValues("")
      setExtenstion("")
      localStorage.setItem("localstorgedata", JSON.stringify(list));
    }
  };

  const handleOnFileDelete = (folderid, fileid) => {
    const list = [...enteries];
    list.map((folder) => {
      if (folder.perentid === folderid) {
        folder.files.forEach((file) => {
          if (file.id === fileid) {
            folder.files.splice(fileid, 1);
          }
        });
      }
    });
    setEnteries(list);
    localStorage.setItem("localstorgedata", JSON.stringify(list));
  };
  const handleOnSubFileDelete = (folderid, subfolderid, subfileid) => {
    const list = [...enteries];
    list.forEach((folder) => {
      if (folder.perentid === folderid) {
        folder.subfolders.forEach((subfolder) => {
          if (subfolder?.id === subfolderid) {
            subfolder.subfiles = subfolder?.subfiles?.filter(
              (file) => file?.id !== subfileid
            );
          }
        });
      }
    });

    setEnteries(list);
    localStorage.setItem("localstorgedata", JSON.stringify(list));
  };

  const handleOnSubFolderDelete = (folderid, subfolderid) => {
    const list = [...enteries];

    list.forEach((folder) => {
      if (folder.perentid === folderid) {
        folder.subfolders = folder.subfolders.filter(
          (subfolder) => subfolder.id !== subfolderid
        );
      }
    });

    setEnteries(list);
    localStorage.setItem("localstorgedata", JSON.stringify(list));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        className="input"
        name="filed"
        value={values}
        onChange={handleOnChange}
      />
      extension :
      <input
        type="radio"
        id="html"
        name="fav_language"
        value="js"
        checked={extenstion === "js"}
        onChange={() => setExtenstion("js")}
      />
      <label for="html">js</label>
      <input
        type="radio"
        id="css"
        name="fav_language"
        value="css"
        checked={extenstion === "css"}
        onChange={() => setExtenstion("css")}
      />
      <label for="css">css</label>
      <input
        type="radio"
        id="javascript"
        name="fav_language"
        value="scss"
        checked={extenstion === "scss"}
        onChange={() => setExtenstion("scss")}
      />
      <label for="javascript">scss</label>{" "}
      <button onClick={() => handleOnMakeFolder()}>folder</button>
      {enteries.map((item, index) => {
        return (
          <div key={index}>
            <ul>
              <li className="folder">
                {item.folder}
                <button onClick={() => handleOnFolderDelete(item?.perentid)}>
                  {" "}
                  <i class="fa fa-trash-o"></i>
                </button>
                <button onClick={() => handleOnFolderEdit(item?.perentid)}>
                  {" "}
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>

                <button onClick={() => handleOnMakeFile(item)}>add file</button>
                <button onClick={() => handleOnChildFolder(item)}>
                  add folder
                </button>

                {item?.subfolders?.length > 0 &&
                  item.subfolders.map((subfolder, i) => {
                    return (
                      <ul key={i} className="subfolder">
                        <li>
                          subfolder: {subfolder?.subfolder}
                          <button
                            onClick={() =>
                              handleOnChildFile(subfolder, item?.perentid)
                            }
                          >
                            add sub file
                          </button>
                          <button
                            onClick={() =>
                              handleOnSubFolderDelete(
                                item?.perentid,
                                subfolder?.id
                              )
                            }
                          >
                            {" "}
                            <i class="fa fa-trash-o"></i>
                          </button>
                        </li>

                        {subfolder?.subfiles?.length > 0 &&
                          subfolder.subfiles.map((file, i) => {
                            return (
                              <ol key={i} className="subfile">
                                <li>
                                  subfile: {file?.subfile} . {file?.extension}{" "}
                                  <button
                                    onClick={() =>
                                      handleOnSubFileDelete(
                                        item?.perentid,
                                        subfolder?.id,
                                        file?.id
                                      )
                                    }
                                  >
                                    {" "}
                                    <i class="fa fa-trash-o"></i>
                                  </button>
                                </li>
                              </ol>
                            );
                          })}
                      </ul>
                    );
                  })}

                {item?.files?.length > 0 &&
                  item.files.map((file, i) => {
                    return (
                      <ol key={i} className="file">
                        <li>
                          file: {file?.file} . {file?.extenstion}{" "}
                          <button
                            onClick={() =>
                              handleOnFileDelete(item?.perentid, file?.id)
                            }
                          >
                            {" "}
                            <i class="fa fa-trash-o"></i>
                          </button>
                      
                        </li>
                      </ol>
                    );
                  })}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Vscode;
