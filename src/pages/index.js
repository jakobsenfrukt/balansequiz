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
      <section className="slide">
        <div className="slide__content">
          <h1>Kursoversikt</h1>
          <div className="courses">
            {courses.map(course => (
              <div className="course">
                <h2>
                  <Link to={course.path}>{course.title}</Link>
                </h2>
                <p>{course.ingress}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Index
