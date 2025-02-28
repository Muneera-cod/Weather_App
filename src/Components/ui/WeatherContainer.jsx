import axios from 'axios'
import  { useState } from 'react'

function WeatherContainer() {

  const key = import.meta.env.VITE_API_KEY

  const [location,setLocation] = useState('')
  const [data,setData] = useState({})
  const [day,setDay] = useState('')
  const [loading,setLoading] = useState(false)
  const url =`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`
  console.log(location)
   
  const searchLocation=async()=>{
    setLoading(true)
    try{
    axios.get(url).then((response)=>{
      setData(response.data)
      console.log(response.data)
      console.log(response.data?.location?.localtime)
      let date = new Date(response.data?.location?.localtime);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options)
      console.log(formattedDate)
      setDay(formattedDate)
    })
  }
  catch(error){
    console.log("An Error ocurred")
    console.log(error)
  }
  finally{
    setLoading(false)
  }
  }


  return (
    <div className='container'>
        <div className='searchDiv'>
            <input type="text"  placeholder='Enter location' onChange={(e)=>setLocation(e.target.value)} onKeyDown={()=>searchLocation()}/>

        </div>
        {/* {loading && <p className='alignCenter'>Loading...</p>} */}
        { !data?.location && !location &&  <p className='alignCenter'>Enter the location and find weather.</p>}
        { data && data.location && location && <div className='details-container'>
        <p className='location'>{data?.location?.name}</p>

        <p className='time'><span>{day}</span></p>

          {data && data.current && <p className='tempC'>{data.current?.temp_c}<span style={{fontWeight:'bolder'}}
          >°</span>C</p>}
          <div className='condition'>
                  <p>{data?.current.condition.text}</p>
                  <img src={data?.current.condition.icon} alt="weather icon" />

          </div>
                 
        </div>}
    </div>
  )
}

export default WeatherContainer