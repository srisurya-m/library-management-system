import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
  return (
    <Layout title={"About us - LMS"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Discover our advanced Learning Management System (LMS). Effortlessly manage courses, track learner progress, and facilitate interactive discussions. Engage learners with multimedia content and assessments. With intuitive interfaces, seamless administration, and detailed analytics, our LMS transforms education into a dynamic, effective, and personalized journey for educators and learners alike.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
