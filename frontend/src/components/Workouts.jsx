import React from "react"
import api from "../api"

function Workouts({workouts, getWorkouts}) {
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
    <div className="workout-container">
      <h2>Workouts History</h2>
      {workouts.workouts.map((workout) => (
        <div key={workout.id}>
          <h3>{workout.workout_name} on {workout.date}</h3>
          {workout.user_exercises.map((userExercises) => (
            <div key={userExercises.id}>
              <p>{userExercises.exercise_name}</p>
                <ul className="set-list">
                  {userExercises.exercise_sets.map((set) => (
                    <li className="set-list" key={set.id}>
                      Set {set.set_number} - {set.weight} kgs for {set.reps} reps
                    </li>
                  ))}
                </ul>
            </div>
          ))}
          <button className="delete-button" onClick={() => deleteWorkout(workout.id)}>
            Delete
          </button>
        </div>
      ))}

    </div>
  )
}

export default Workouts;