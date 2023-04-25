/* eslint-disable @next/next/no-img-element */



import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';



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
      toast.success('Dakujeme za tvoj hlas!')
     } else if(id === '64474e53c50211c08c127e03'){
      toast.success('Tvoj hlas si dal Tygrom')
     }

  } catch (error) {
    console.log(error)
  }
} 

  return (
    <>
       <h1 className='text-center mt-5'>Kto postupi do Extraligy?</h1>
       <h3 className='text-center mb-3'>Hlasuj !</h3>

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
                 {/*  <h1 className='text-center'>{item.vote}</h1> */}
              </div>
              ))
             }
            </>
          )
         
        }
       </div>
        
        {
        loading ? <p className='text-center'>...</p> :
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
         
         <p className='text-center link' >CharisMa web development</p>
      </Link>

       <style>{`
          .link {
            color: black;
            font-size: 20px;
          }

         .box {
          position: relative;
          width: 350px;
          margin: 0 auto;
          border: 1px solid black;
          border-bottom: none;
          display: flex;
          justify-content: space-around;
         }

         .box-percentage {
          position: relative;
          width: 350px;
          margin: 0 auto;
          border: 1px solid black;
          border-top: none;
          display: flex;
          justify-content: space-around;
         }
       `}</style> 

    </>
  )
}

export default Voting