/* eslint-disable @next/next/no-img-element */

"use strict"
'use client'

import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const Voting = () => {

 const [teams, setTeams] = useState([])
 const [loading, setLoading] = useState(false)
 const [disable, setDisable] = useState(false)
 const [voted, setVoted] = useState(0)



 const fetchTeams = async () => {
    try {
       setLoading(true)
       const res = await axios('/api/getTeam')
       console.log(res.data)
       setTeams(res.data)

       setLoading(false)
      
    } catch (error) {
       console.log(error)
       setLoading(false)
    }
  }
 
    
useEffect(() => {
 fetchTeams()
},[])     


 const handleUpdate = async (id) => {

  console.log(id)

  try {
    await axios.put(`/api/team/${id}/updateVote`, {data: {id}}   )
    setDisable(true)
     fetchTeams()

  } catch (error) {
    console.log(error)
  }
} 

  return (
    <>
       <h1 className='text-center my-5'>Ktory team postupi do Extraligy?</h1>

       <div className='box p-2'>

        {
          loading ? <p>Loading...</p> : (
            <>
             {
               teams.map(item => (
                <div  key={item.id} style={{width: '125px'}}>
                  <img src={item.img} alt={item.name} />
                   
                  <button 
                    className='btn btn-primary rounded-0 shadow' 
                    disabled={disable}
                    onClick={ () => handleUpdate(item._id)}  >
                    {item.name}
                  </button>
                  <br /><br /><br />
                  <h3 className='mt-2'></h3>
                  <h1 className='text-center'>{item.vote}</h1>

              </div>
              ))
             }
            </>
          )
         
        }

       </div>


       <h2 className='text-center my-5'>Hlasovalo: </h2>
        
      <ToastContainer position='top-center' limit={1} />

       <style>{`
         .box {
          position: relative;
          width: 350px;
          margin: 0 auto;
          border: 1px solid black;
          display: flex;
          justify-content: space-around;
         }
       `}</style> 

    </>
  )
}

export default Voting