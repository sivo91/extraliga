/* eslint-disable @next/next/no-img-element */



import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';
import { FiExternalLink } from "react-icons/fi";



const Voting = () => {

 const [teams, setTeams] = useState([])
 const [loading, setLoading] = useState(false)
 const [disable, setDisable] = useState(false)
 const [voted, setVoted] = useState(0)
 const [total, setTotal] = useState(0)



console.log(total)

 const fetchTeams = async () => {
    try {
       setLoading(true)
       const res = await axios('/api/getTeam')
       const mongo = res.data
       //console.log(mongo)
       setTeams(mongo)
       setVoted(mongo.map(item => item.vote))
       setLoading(false)
      
    } catch (error) {
       console.log(error)
       setLoading(false)
    }
  }
 

    
useEffect(() => {
 fetchTeams()
},[]) 


useEffect(() => {
 setTotal(voted[0] + voted[1])
},[voted])


 const handleUpdate = async (id) => {

  console.log(typeof id, id)

  try {
    await axios.put(`/api/team/${id}/updateVote`, {data: {id}} )
    
    setDisable(true)
     fetchTeams()

     if(id === '64474e21c50211c08c127e02'){
      toast.success('Hlas pre domacich.')
     } else if(id === '64474e53c50211c08c127e03'){
      toast.success('Hlas pre hosti.')
     }

  } catch (error) {
    console.log(error)
  }
} 

  return (
    <>
       <h1 className='text-center mt-5'>Kto postupi do Extraligy?</h1>
       <h3 className='text-center mb-5'>Hlasuj !</h3>

       <div className='box p-2'>

        {
          loading ? <p>Loading...</p> : (
            <>
             {
               teams.map(item => (
                <div  key={item.id} style={{width: '125px'}}>
                 {/*  <img src={item.img} className='img' alt={item.name} /> */}
                   
                  <button 
                    className='btn btn-primary rounded-0 w-100 shadow' 
                    disabled={disable}
                    onClick={ () => handleUpdate(item._id)}  >
                    {item.name}
                  </button>
                  <br /><br />
                
              </div>
              ))
             }
            </>
          )
         
        }
       </div>
        
        {
        loading ? <p className='text-center'>Loading...</p> :
         (
          <>
            <div className='box-percentage'>
              <h4>{ Number(voted[0] / Number(total) * 100).toFixed(2) }%</h4>
              <h4>{ Number(voted[1] / Number(total) * 100).toFixed(2) }%</h4>
            </div>
          </>
         )
        }


       <h2 className='text-center my-5'>Pocet hlasov: {voted[0] + voted[1]} </h2>
        
      <ToastContainer position='top-center' limit={1} />

      <Link href={'https://www.charismawebdevelopment.com/'} 
            style={{ textDecoration: 'none' }}>
         
         <p className='text-center link' >
          <FiExternalLink  className='icon'/>
          CharisMa web development
         </p>
      </Link>

       <style>{`
          
          .icon {
            position: relative;
            top: -3px;
            margin-right: 5px;
          }
         
          .link {
            color: black;
            font-size: 20px;
          }

         .box {
          position: relative;
          width: 350px;
          margin: 0 auto;
          
          display: flex;
          justify-content: space-around;
         }

         .box-percentage {
          position: relative;
          width: 350px;
          margin: 0 auto;
         
          display: flex;
          justify-content: space-around;
         }
       `}</style> 

    </>
  )
}

export default Voting