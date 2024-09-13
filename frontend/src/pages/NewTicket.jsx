import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton"


function NewTicket() {

  const {user} = useSelector((state) => state.auth)
  const {isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.tickets
  )
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [category, setCategory] = useState('education')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())

  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({category, description}))
  }
  
  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
     <BackButton url='/' />
      <section className="heading">
        <h1>Create New Grievance Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group" >
         <label htmlFor="name">Parent/Guardian Name</label>
         <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group" >
         <label htmlFor="email">Parent/Guardian Email</label>
         <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
         <div className="form-group">
         <label htmlFor="category">Category</label>
         <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value) }>
           <option value="education">Education</option>
           <option value="discipline">Discipline</option>
           <option value="food">Food</option>
           <option value="other">Other</option>
         </select>
         </div>
         <div className="form-group">
          <label htmlFor="description">Description of the issue</label>
          <textarea 
           name="description"
           id="description"
           className="form-control" 
           placeholder="Description" 
           value={description} 
           onChange={(e) => setDescription(e.target.value)}>
          </textarea>
         </div>
         <div className="form-group">
          <button className="btn btn-block" >Submit</button>
         </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket