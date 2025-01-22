import { useState, useEffect } from "react"
import api from "../api"
import Workout from "../components/Workout"
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

  const deleteWorkout = (id) => {
    api.delete(`/api/workouts/delete/${id}/`)
    .then((res) => {
      if (res.status === 204) {
        alert("Workout was deleted!")
      } else {
        alert("Failed to delete note!")
      }
      getWorkouts()
    })
    .catch((err) => alert(err)) 
  }

  return (
    loading 
    ? (
      <div>Loading...</div> 
    )
    : (
      <div>
        <div>
          <h2>Workouts</h2>
          {workouts.workouts.map((workout) => (
            <Workout workout={workout} key={workout.id} onDelete={deleteWorkout}/>
          ))}
        </div>
        <div>
          <WorkoutForm />
        </div>
      </div>
    )
  )
}

export default Home