import { useState, useEffect } from "react"
import api from "../api"

function Home() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    getWorkouts()
  }, [])

  const getWorkouts = () => {
    api.get("api/workouts/")
    .then((res) => res.data) // returns body of response object (promise to return data to next .then())
    .then((data) => {
      setWorkouts(data)
      console.log(data)
    }) // value of response body (the data/payload) is sent to next .then() as argument
    .catch((err) => alert(err))
  }

  return (
    <div>Home</div>
  )
}

export default Home