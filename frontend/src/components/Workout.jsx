import React from "react"

function Workout({workout, onDelete}) {
  return (
    <div className="workout-container">
      <p>{workout.workout_name}</p>
      {workout.user_exercises.map((userExercises) => (
        <div key={userExercises.id}>
          <p>{userExercises.exercise_name}</p>
        </div>
      ))}
      <button className="delete-button" onClick={() => onDelete(workout.id)}>
        Delete
      </button>
    </div>
  )
}

export default Workout