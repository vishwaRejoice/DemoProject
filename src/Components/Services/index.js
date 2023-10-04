import React from 'react'

const index = ({data}) => {
  return (
    <>
     <div className='services-heading'>
                    <h2>Services</h2>
                </div>
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
    </>
  )
}

export default index
