import React, { useState } from 'react';

const Index = ({ mainData }) => {
    const [filterData, setFilteredData] = useState(mainData);
    const [selectedModule, setSelectedModule] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 4;
    const handleFilterData = (type) => {
        setSelectedModule(type);
        if (type === "All") {
            setFilteredData(mainData);
        } else {
            setFilteredData(mainData.filter(item => item.type === type));
        }
    };
    const handleNextPage = () => {
        if (currentPage < Math.ceil(filterData.length / projectsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className='project-sidebar'>
                <div className='project-header'>
                    <h2>Projects</h2>
                </div>

                <div className='project-list'>
                    <ul>
                        <li style={{ cursor: "pointer" }} onClick={() => handleFilterData("All")} className={selectedModule === "All" ? "selected" : ""}>All</li>
                        <li style={{ cursor: "pointer" }} onClick={() => handleFilterData("commercial")} className={selectedModule === "commercial" ? "selected" : ""}>Commercial</li>
                        <li style={{ cursor: "pointer" }} onClick={() => handleFilterData("residential")} className={selectedModule === "residential" ? "selected" : ""}><a>Residential</a></li>
                        <li style={{ cursor: "pointer" }} onClick={() => handleFilterData("other")} className={selectedModule === "other" ? "selected" : ""}><a>Other</a></li>
                    </ul>
                </div>
            </div>
            <div className='project-content'>

                {filterData?.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage).map((item) => {
                    return (
                        <div className="box2">
                            <div className='image'>
                                <img src={item?.image} />
                            </div>
                            <div className='main-container'>
                                <h3 className='project-main-heading'>{item?.name}</h3>
                                <h3 className='project-main-description'>{item?.address}</h3>
                            </div>
                        </div>
                    )
                })
                }
            </div>

            <div className="pagination-buttons">
                {selectedModule === "All" && (
                    <button className='btn' onClick={handlePrevPage} disabled={currentPage === 1} >
                        Back
                    </button>
                )}

                {selectedModule === "All" && (
                    <button className='btn' onClick={handleNextPage} disabled={currentPage === Math.ceil(filterData.length / projectsPerPage)}>
                        Next
                    </button>
                )}
            </div>
        </>
    )
}

export default Index
