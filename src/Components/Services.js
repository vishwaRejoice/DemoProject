import React from 'react'

const Services = ({data}) => {
  return (
    <div>
       <div className='grid-container'>
                {data.map((item) => {
                    return (
                        <div className="box1">
                            <img src={item?.image} className='construction icon1' />
                            <img src={item?.images} className='line' />
                            <h2 className='services-description'>{item?.name}</h2>
                        </div>
                    )
                })
                }
            </div>
    </div>
  )
}

export default Services
