import {Link} from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

function Home() {
  return (
    <>
        <section className="heading">
          <h1> B.V.P. Grievance Redressal and Management </h1>
          <p>Please choose from an option below</p>
        </section>

        <Link to='/new-ticket' className="btn btn-reverse btn-block">
          <FaQuestionCircle /> Create New Grievance Ticket
        </Link>

        <Link to='/tickets' className="btn btn-block">
          <FaTicketAlt /> View My Grievance Tickets
        </Link>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <footer>© 2024 Kislay Thakur</footer>
    </>
  )
}
export default Home