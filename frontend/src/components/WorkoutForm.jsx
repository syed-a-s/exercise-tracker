import React, { useState } from "react";
import api from "../api";

const WorkoutForm = () => {
  const [newWorkout, setNewWorkout] = useState({
    workout_name: '',
    user_exercises: [
      {
        exercise_sets: [
          {
            set_number: 1, 
            reps: 0,
            weight: 0,
          }
        ],
        exercise_name: ''
      }
    ]
  })

  // update the workout name
  const updateWorkoutName = (name) => {
    setNewWorkout((prevWorkout) => ({
      ...prevWorkout,
      workout_name: name,
    }))
  }

  // update the exercise name
  const updateExerciseName = (name, exerciseIndex) => {
    const updatedExercises = [...newWorkout.user_exercises];
    updatedExercises[exerciseIndex].exercise_name = name
    setNewWorkout((prevWorkout) => ({
      ...prevWorkout,
      user_exercises: updatedExercises
    }))
  }

  // add exercise to newWorkout's user_exercise's object array
  const addExercise = () => {
    setNewWorkout((prevWorkout) => ({
      ...prevWorkout,
      user_exercises: [
        ...prevWorkout.user_exercises,
        {
          exercise_sets: [
            {
              set_number: 1,
              reps: 0,
              weight: 0,
            }
          ],
          exercise_name: '',
        }
      ]
    }))
  }

  // add set to specific exercise in the workout
  const addSetToExercise = (exerciseIndex) => {
    const updatedExercises = [...newWorkout.user_exercises]; // get current exercises
    updatedExercises[exerciseIndex].exercise_sets.push( // for this exercise, add another set (object)
      {
        set_number: updatedExercises[exerciseIndex].exercise_sets.length + 1,
        reps: 0,
        weight: 0
      }
    )

    // replace old exercise data with new exercise data containing a new extra set 
    setNewWorkout((prevWorkout) => ({
        ...prevWorkout,
        user_exercises: updatedExercises
    }))
  }

  // update specfic set details (reps or weight)
  // need the exercise index (current exercise)
  // need the set index (the set for the exercise)
  const updateSet = (exerciseIndex, setIndex, reps, weight) => {
    const updatedExercises = [...newWorkout.user_exercises];
    updatedExercises[exerciseIndex].exercise_sets[setIndex] = {
      ...updatedExercises[exerciseIndex].exercise_sets[setIndex],
      reps: reps,
      weight: weight
    }

    setNewWorkout((prevWorkout) => ({
      ...prevWorkout,
      user_exercises: updatedExercises
    }))
  }

  const postWorkout = (e) => {
    e.preventDefault();

    api.post("/api/workouts/", newWorkout)
    .then((res) => {
      if (res.status === 201) {
        alert("Workout created!");
      } else {
        alert("Failed to create workout!")
      }
    })
    .catch((err) => alert(err));
  }

  return (
    <div className="workout-form-container">
    <h2>Create a Workout</h2>
    <button onClick={postWorkout}>Test</button>
      <form>
        <div>
          <label>Workout Name:</label>
          <input 
            type="text" 
            placeholder="Name Your Workout"
            value={newWorkout.workout_name}
            onChange={(e) => updateWorkoutName(e.target.value)}
          />
          {/* Button to add new exercise */}
          <button 
            type="button"
            onClick={addExercise}
          >
            Add Exercise
          </button>

          {newWorkout.user_exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex}> 
              <label>Exercise Name:</label>
              <input 
                type="text" 
                placeholder="Exercise"
                value={newWorkout.user_exercises[exerciseIndex].exercise_name}
                onChange={(e) => updateExerciseName(e.target.value, exerciseIndex)}
              />
              {/* Button to add new set */}
              <button 
                type="button"
                onClick={() => addSetToExercise(exerciseIndex)}
              >
                Add Set
              </button>

              <div>
                {exercise.exercise_sets.map((set, setIndex) => (
                  <div key={setIndex}>
                    <label>Set Number:</label>
                    <input type="number" value={set.set_number} readOnly />

                    <label>Weight:</label>
                    <input 
                      type="number" 
                      value={set.weight}
                      placeholder="Weight"
                      onChange={(e) => updateSet(exerciseIndex, setIndex, set.reps, e.target.value)}
                    />

                    <label>Reps:</label>
                    <input 
                      type="number" 
                      value={set.reps}
                      placeholder="# of reps"
                      onChange={(e) => updateSet(exerciseIndex, setIndex, e.target.value, set.weight)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* button to post data to backend for this user */}
          <button 
            type="Submit" 
            onClick={postWorkout}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default WorkoutForm