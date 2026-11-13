import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import Section from './Section'
import { resetAll } from '../../../slices/Courseslice'

const AddCourse = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    dispatch(resetAll())
  }, [dispatch])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-7">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-courses")}
          className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#424854] px-3 py-2 text-sm font-medium text-gray-300 transition hover:border-amber-400 hover:text-white"
        >
          <span aria-hidden="true">←</span> Back to my courses
        </button>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
          Instructor workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Create course
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Add course details, organize lessons, and choose when students can
          enroll.
        </p>
      </header>
      <Section />
    </main>
  )
}

export default AddCourse
