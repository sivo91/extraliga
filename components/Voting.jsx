/* eslint-disable @next/next/no-img-element */



import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';
import { FiExternalLink } from "react-icons/fi";

//import  Chart  from "react-apexcharts";

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });




const Voting = () => {

 const [teams, setTeams] = useState([])
 const [loading, setLoading] = useState(false)
 const [disable, setDisable] = useState(true)
 const [voted, setVoted] = useState(0)
 const [total, setTotal] = useState(0)
 const [grafZA, setGrafZA] = useState([])
 const [grafHU, setGrafHU] = useState([])


const za = Number(voted[0] / Number(total) * 100).toFixed(0) 
const hu = Number(voted[1] / Number(total) * 100).toFixed(0)


console.log('za gr',grafZA)
console.log('hu gr',grafHU)

//console.log(total)

 const fetchTeams = async () => {

  const grafZ = []
  const grafH = []

    try {
       setLoading(true)
       const res = await axios('/api/getTeam')
       const mongo = res.data
       //console.log(mongo)
       setTeams(mongo)
       setVoted(mongo.map(item => item.vote))
       setLoading(false)

       for(let i = 0; i < mongo.length; i++) {
        grafZ.push(Number(mongo[i].vote))
        grafH.push(Number(mongo[i].vote))
       }

     setGrafZA(grafZ)  
     setGrafHU(grafH)
      
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

 // console.log(typeof id, id)

  try {
    await axios.put(`/api/team/${id}/updateVote`, {data: {id}} )
    
    setDisable(true)
    fetchTeams()

     if(id === '644e8f3a938c9c9f481dc46d'){
      toast.success('Domaci ziskali dalsi hlas.')
     } else if(id === '644e8f6d938c9c9f481dc46e'){
      toast.success('Hostial ziskalil dalsi hlas.')
     }

  } catch (error) {
    console.log(error)
  }
} 

  return (
    <>
       <h1 className='text-center mt-5'>Kto postupi do Extraligy?</h1>
       <h3 className='text-center text-danger my-3'>Hlasovanie skoncilo !</h3>

       <div className='box p-2'>

        {
          loading ? <p>Loading...</p> : (
            <>
             {
               teams.map(item => (
                <div  key={item._id} style={{width: '125px'}}>
                 {/*  <img src={item.img} className='img' alt={item.name} /> */}
                   
                  <button 
                    className='btn btn-primary rounded-0 w-100 shadow blocked' 
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
        loading ? <p className='text-center'>...</p> :
         (
          <>
            <div className='box-percentage'>
              <h4>{ za }%</h4>
              <h4>{ hu }%</h4>
            </div>
          </>
         )
        }



        {
        loading ? <p className='text-center'>...</p> :
         (
          <>
           <div className='box-percentage'>
            <Chart 
                type="pie"
                width={375}
                height={375}

                series={  grafHU }  // domaci , hostia              

                options={{
                        title:{ text:"Data Visualization"
                        } , 
                       noData:{text:"Empty Data"},                        
                       colors:["#4662a6","#06ba54"],
                      labels: ['Domaci', 'Hostia' ]                

                 }}   
                >           
                </Chart>
            </div>  
          </>
         )
        }




       {
        loading ? <p className='text-center'>...</p> : 
        <h2 className='text-center my-5'>Pocet hlasov: {voted[0] + voted[1]} </h2>
       }


        
      <ToastContainer position='top-center' limit={1} />

      <Link href={'https://www.charismawebdevelopment.com/' } target="_blank"
            style={{ textDecoration: 'none' }}>
         
         <p className='text-center link' >
          <FiExternalLink  className='icon'/>
          CharisMa web development
         </p>
      </Link>

      <div className='box-charisma mb-5'>
          <img src="./charisma.png" alt="charisma" />
      </div>

       <style>{`

          .box-charisma {
            position: relative;
            width: 100px;
            margin:0 auto;
          }

          .box-charisma > img {
            position: relative;
            width: 100%;
            object-fit: cover;
          }

          .graf {
            position: relative;
            margin: 0 auto;
          }
          .icon {
            position: relative;
            top: -3px;
            margin-right: 5px;
          }
         
          .link {
            color: black;
            font-size: 20px;
          }

          .blocked:hover {
            cursor: not-allowed;
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