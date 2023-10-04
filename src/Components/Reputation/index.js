import React from 'react'

const index = ({Reputation}) => {
  return (
    <>
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
    </>
  )
}

export default index
