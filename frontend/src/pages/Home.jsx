import { useState, useEffect } from "react"
import api from "../api"
import Workout from "../components/Workout"

function Home() {
  const [loading, setLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])
  const [newWorkout, setNewWorkout] = useState({
    workout_name: '',
    user_exercises: [
      {
        exercise_sets: [
          {
            set_number: 1, 
            reps: 1,
            weight: 1,
          }
        ],
        exercise_name: ''
      }
    ]
  })

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

  const createWorkout = (e) => {
    e.preventDefault()
    api.post("/api/workouts/") // add data to send here
    .then((res) => {
      if (res.status === 201) {
        alert("Workout created!")
      } else {
        alert("Failed to create workout!")
      }
    })
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
          <h2>Create a Workout</h2>
          <form>
          </form>
        </div>
      </div>
    )
  )
}

export default Home