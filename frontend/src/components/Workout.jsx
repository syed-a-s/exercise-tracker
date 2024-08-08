import React from "react"

function Workout({workout, onDelete}) {
  return (
    <div className="workout-container">
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
      <button className="delete-button" onClick={() => onDelete(workout.id)}>
        Delete
      </button>
    </div>
  )
}

export default Workout