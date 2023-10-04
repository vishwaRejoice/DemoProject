import React, { useState } from 'react'
import myImage from "../Images/Hero.png"
import '../css/Home.scss';
import icon from "../Images/Vector (5).png"
import icon1 from "../Images/icon.png"
import construction from "../Images/icon (2).png"
import renovation from "../Images/Vector (6).png"
import Consultation from "../Images/icon (5).png"
import repair from "../Images/icon (6).png"
import architectue from "../Images/icon (4).png"
import electric from "../Images/icon (7).png"
import line from "../Images/Rectangle 18.png"
import Services from './Services';

const Home = () => {
  const mainData =[
    {
      "image": "https://cdn.pixabay.com/photo/2023/05/21/16/03/mosque-8008801_1280.png",
      "name": "Cozy Cottage",
      "address": "123 Main Street",
      "type": "residential",
    },
    {
      "image": "https://c4.wallpaperflare.com/wallpaper/302/5/199/architecture-building-construction-design-wallpaper-preview.jpg",
      "name": "Luxury Villa",
      "address": "456 Elm Avenue",
      "type": "residential",
    },
    {
      "image": "https://i.pinimg.com/564x/b9/12/7b/b9127bb048b765d161aa1589d218fce1.jpg",
      "name": "Downtown Apartment",
      "address": "789 Oak Lane",
      "type": "residential",
    },
    {
      "image": "https://e1.pxfuel.com/desktop-wallpaper/574/393/desktop-wallpaper-100-duplex-home-design-duplex-house-design-for-2022-duplex.jpg",
      "name": "Lakeview Mansion",
      "address": "1010 Lakeview Drive",
      "type": "residential",
    },
    {
      "image": "https://mcdn.wallpapersafari.com/medium/10/49/fb1EPZ.jpg",
      "name": "Office Space Tower",
      "address": "1 Business Plaza",
      "type": "commercial",
    },
    {
      "image": "https://img.freepik.com/premium-photo/real-estate-image-background-beautiful-house-front-view_800563-4682.jpg?w=740",
      "name": "Shopping Mall",
      "address": "2 Retail Street",
      "type": "commercial",
    },
    {
      "image": "https://as1.ftcdn.net/v2/jpg/03/57/27/32/1000_F_357273212_T2lYQrG75sdKzYDIJN6sLyAsZ8BhsP5B.jpg",
      "name": "Industrial Warehouse",
      "address": "3 Industrial Road",
      "type": "commercial",
    },
    {
      "image": "https://img.freepik.com/premium-photo/village-house-summer-day-blue-sky-surface_266732-25264.jpg",
      "name": "Tech Office Park",
      "address": "4 Tech Avenue",
      "type": "commercial",
    },
    {
      "image": "https://img.freepik.com/premium-photo/village-house-summer-day-blue-sky-surface_266732-25264.jpg?w=826",
      "name": "Countryside Retreat",
      "address": "55 Rural Lane",
      "type": "other",
    },
    {
      "image": "https://img.freepik.com/free-photo/giant-building-with-sun_1127-400.jpg?w=826&t=st=1695384565~exp=1695385165~hmac=b400af1b206127228110b22b3ac44fd599239ba1d4184130813b2f64d8f2c058",
      "name": "Historic Mansion",
      "address": "777 Heritage Street",
      "type": "other",
    },
    {
      "image": "https://thumbs.dreamstime.com/z/two-story-commercial-building-22632819.jpg?w=992",
      "name": "Beachfront Bungalow",
      "address": "123 Sandy Beach Road",
      "type": "other",
    },
    {
      "image": "https://thumbs.dreamstime.com/z/office-building-5778468.jpg?w=992",
      "name": "Mountain View Cabin",
      "address": "456 Scenic Trail",
      "type": "other",
    }
  ]
  
  const [filterData,setFilteredData] = useState(mainData);
  const [selectedModule, setSelectedModule] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const data = [
    {
      "image": construction,
      "images": line,
      "name": "Construction",
    },
    {
      "image": renovation,
      "images": line,
      "name": "Renovation",
    },
    {
      "image": Consultation,
      "images": line,
      "name": "Consultation"
    },
    {
      "image": repair,
      "images": line,
      "name": "Repair Services",
    },
    {
      "image": architectue,
      "images": line,
      "name": "Architecture"
    },
    {
      "image": electric,
      "images": line,
      "name": "Electric"
    }
  ]
  const Reputation = [
    {
      "image": icon,
      "name": "Best Services",
      "description": "Nullam senectus porttitor in eget. Eget rutrum leo interdum."
    },
    {
      "image": icon,
      "name": "Best Teams",
      "description": "Cursus semper tellus volutpat aliquet lacus."
    },
    {
      "image": icon,
      "name": "Best Designs",
      "description": "Ultricies at ipsum nunc, tristique nam lectus."
    },
  ]
  
console.log("dssd",filterData)
  const handleFilterData = (type) => {
    setSelectedModule(type);
    console.log("fffff",type)
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
  console.log("filterdata",filterData)
  return (
    <>
      <div className='home-container'>
        <img src={myImage} />
      </div>
      <div className='reputation'>
        <div className='reputation-heading'>
          <h2>Our Reputation</h2>
        </div>
        <div className="grid-container">
          {
            Reputation.map((item) => {
              return (
                <div className="box">
                  <img src={item?.image} className="icon" />
                  <h3 className='box-heading'>{item?.name}</h3>
                  <p className='box-description'>{item?.description}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='services'>
        <div className='services-heading'>
          <h2>Services</h2>
        </div>

        <Services data={data} />
      </div>
      <div className='main-projects'>


      <div className='project-sidebar'>
        <div className='project-header'>
            <h2>Projects</h2>
        </div>

        <div className='project-list'>
          <ul>
            <li style={{cursor:"pointer"}} onClick={() => handleFilterData("All")}   className={selectedModule === "All" ? "selected" : ""}>All</li>
            <li style={{cursor:"pointer"}} onClick={() => handleFilterData("commercial")}   className={selectedModule === "commercial" ? "selected" : ""}>Commercial</li>
            <li style={{cursor:"pointer"}} onClick={() => handleFilterData("residential")}   className={selectedModule === "residential" ? "selected" : ""}><a>Residential</a></li>
            <li style={{cursor:"pointer"}} onClick={() => handleFilterData("other")}   className={selectedModule === "other" ? "selected" : ""}><a>Other</a></li>
          </ul>
        </div>
</div>
<div className='project-content'>
          
            {filterData.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage).map((item) => {
              return(
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
    <button  className='btn' onClick={handleNextPage} disabled={currentPage === Math.ceil(filterData.length / projectsPerPage)}>
            Next
          </button>
  )}
      </div>


      




  </div></>
  )
}

export default Home
