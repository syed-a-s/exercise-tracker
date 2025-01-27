import { useState, useEffect } from "react"
import api from "../api"
import Workout from "../components/Workouts"
import WorkoutForm from "../components/WorkoutForm"

function Home() {
  const [loading, setLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    getWorkouts()
  }, [])

  const getWorkouts = () => {
    api.get("api/workouts/")
    .then((res) => {
      console.log("API Response Status:", res.status)
      return res.data
    }) // returns body of response object (promise to return data to next .then())
    .then((data) => {
      console.log("API Response Data: ", data)
      setWorkouts(data)
      setLoading(false)
    }) // value of response body (the data/payload) is sent to next .then() as argument
    .catch((err) => alert(err))
  }

  return (
    loading 
    ? (
      <div>Loading...</div> 
    )
    : (
      <div>
          <Workout workouts={workouts} getWorkouts={getWorkouts}/>
          <WorkoutForm getWorkouts={getWorkouts}/>
      </div>
    )
  )
}

export default Home;