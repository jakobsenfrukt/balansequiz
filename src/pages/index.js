import React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"
import { useCourseData } from "../hooks/use-course-data"

const Index = ({ data }) => {
  const { courses } = useCourseData()

  return (
    <Layout>
      <Seo title="Kursoversikt" />
      <section className="course-index">
        <h1>Kursoversikt</h1>
        <div className="course-list">
          {courses.map(course => (
            <div className="course">
              {course.toppbilde.length ? 
                <div className="course-image">
                  <img src={course.toppbilde[0].url} alt={course.toppbilde[0].title} />
                </div>
              : ''}
              <div className="course-text">
                <h2 class="course-title">
                  <Link to={course.path}>{course.title}</Link>
                </h2>
                <div class="course-meta">8 deler - ca. 2 timer</div>
                <p class="course-lead">{course.ingress}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Index
