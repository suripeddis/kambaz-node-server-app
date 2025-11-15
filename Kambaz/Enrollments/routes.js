/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { toggleShowAll, enroll, unenroll } from "../Enrollments/reducer";
import * as client from "../Courses/client";
import { FormControl, Button } from "react-bootstrap";
import Link from "next/link";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((s) => s.coursesReducer);
  const { currentUser } = useSelector((s) => s.accountReducer);
  const { enrollments, showAllCourses } = useSelector((s) => s.enrollmentsReducer);

  const [course, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
    } catch (error) {
      console.error(error);
    }
  };
  
  const onDeleteCourse = async (courseId) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(setCourses(courses.map((c) => (c._id === course._id ? course : c))));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await client.enrollInCourse(courseId);
      dispatch(enroll({ user: currentUser._id, course: courseId }));
      fetchCourses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      await client.unenrollFromCourse(courseId);
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
      fetchCourses();
    } catch (error) {
      console.error(error);
    }
  };

  const isEnrolled = (cid) =>
    !!currentUser &&
    enrollments.some((e) => e.user === currentUser._id && e.course === cid);

  const visibleCourses = currentUser
    ? (showAllCourses ? courses : courses.filter((c) => isEnrolled(c._id)))
    : courses;

  return (
    <div id="wd-dashboard" className="wd-main-content-offset p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title" className="mb-0">Dashboard</h1>

        <Button
          variant="primary"
          onClick={() => dispatch(toggleShowAll())}
          id="wd-enrollments-toggle"
        >
          Enrollments {showAllCourses ? "ON" : "OFF"}
        </Button>
      </div>

      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          onClick={onUpdateCourse}
        >
          Update
        </button>
      </h5>
      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      <h4 className="mb-3">Published Courses ({visibleCourses.length})</h4>

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {visibleCourses.map((c) => (
          <div key={c._id} className="col" id="wd-dashboard-course">
            <div className="card rounded-3 overflow-hidden">
              <Link href={`/Courses/${c._id}`}>
                <img src={c.image} className="card-img-top" alt={c.name} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{c.name}</h5>
                <p className="card-text">{c.description}</p>

                {currentUser && (
                  isEnrolled(c._id) ? (
                    <button
                      className="btn btn-danger me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUnenroll(c._id);
                      }}
                      id={`wd-unenroll-${c._id}`}
                    >
                      Unenroll
                    </button>
                  ) : (
                    <button
                      className="btn btn-success me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEnroll(c._id);
                      }}
                      id={`wd-enroll-${c._id}`}
                    >
                      Enroll
                    </button>
                  )
                )}

                <button
                  className="btn btn-warning me-2"
                  onClick={(e) => { e.preventDefault(); setCourse(c); }}
                  id="wd-edit-course-click"
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={(e) => { e.preventDefault(); onDeleteCourse(c._id); }}
                  id="wd-delete-course-click"
                >
                  Delete
                </button>

                <Link href={`/Courses/${c._id}`}>
                  <button className="btn btn-primary float-end">Go</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentUser && !showAllCourses && visibleCourses.length === 0 && (
        <p className="text-muted mt-3">You aren't enrolled in any courses yet.</p>
      )}
    </div>
  );
}
