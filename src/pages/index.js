import React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"
import { useCourseData } from "../hooks/use-course-data"
import Logo from "../images/BKlogo.svg"

const Index = ({ data }) => {
  const { index, courses } = useCourseData()
  const visibleCourses = courses.filter(course => course.showInCourseIndex)

  return (
    <Layout hideFooter>
      <Seo title="Kursoversikt" />
      <section className="course-index">
        <h1>{index.overskrift}</h1>
        <p className="course-index-lead">{index.ingress}</p>
        <div className="course-list">
          {visibleCourses.map(course => (
            <div className="course">
              {course.toppbilde.length && (
                <div className="course-image">
                  <img
                    src={course.toppbilde[0].url}
                    alt={course.toppbilde[0].title}
                  />
                </div>
              )}
              <div className="course-text">
                <h2 className="course-title">{course.title}</h2>
                {course.metainfo && (
                  <div className="course-meta">{course.metainfo}</div>
                )}
                <p className="course-lead">{course.ingress}</p>
              </div>
              <Link to={course.path} class="course-link"></Link>
            </div>
          ))}
        </div>
        {visibleCourses.length === 1 && (
          <div className="course-more-incoming">Flere kurs lanseres snart!</div>
        )}
        <div
          className="course-index-body"
          dangerouslySetInnerHTML={{ __html: index.body }}
        />
        <footer className="index-footer">
          <a
            href="https://balansekunstprosjektet.no"
            target="_blank"
            rel="noreferrer"
          >
            <span>Et initiativ fra</span>
            <br />
            <img
              className="logo"
              src={Logo}
              alt="Logo for Balansekunstprosjektet"
            />
          </a>
        </footer>
      </section>
    </Layout>
  )
}

export default Index
