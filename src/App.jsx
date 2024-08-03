import axios from "axios"
import { useEffect, useState } from "react"
import { multipleBase64 } from "./utils/multipleBase64"
import FileBase64 from "react-file-base64" 
import { Modal, Button } from 'react-bootstrap'

const App = () => {
    const [data, setData] = useState([])
    const [editModalShow, setEditModalShow] = useState(false)
    const [editData, setEditData] = useState({})
    const handleClose = () => setEditModalShow(false)
    const handleShow = () => setEditModalShow(true)
    async function getTodos(){
      try{
        let {data} = await axios.get("http://localhost:7777/todos")
        setData(data)
      }
      catch(error){
        console.log(error)
      }
    }
  
    async function postTodo(body){
      try{
        let { data } = await axios.post("http://localhost:7777/todos", body)
        getTodos(data)
      }
      catch(error){
        console.log(error)
      }
    }

    async function deleteTodo(id){
      try{
        let { data } = await axios.delete(`http://localhost:7777/todos/${id}`)
        getTodos(data)
      }
      catch(error){
        console.log(error)
      }
    }

    async function editTodo(body){
      try{
        let { data } = await axios.put(`http://localhost:7777/todos/${body.id}`, body)
        getTodos(data)
      }
      catch(error){
        console.log(error)
      }
    }
  
    function change(e){
      let fileBase64 = multipleBase64(e)
      postTodo({name: "Admin", email: "admin@admin.com", password: "admin", role: "admin", post: fileBase64})
    }
    useEffect(()=>{
      getTodos()
    }, [])
    return (
      <>
        <FileBase64 multiple={true} onDone={change}/>
        {data?.map((el)=>{
          return <div key={el.id}>
            <p>{el?.title}</p>
            <p>{el?.name}</p>
            <p>{el.city}</p>
            <p>{el.password}</p>
            <p>{el.role}</p>
            <button onClick={()=>{setEditData(el); handleShow()}}>Edit</button>
            <Modal show={editModalShow} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form onSubmit={(e)=>{
                e.preventDefault()
                editTodo(editData)
                handleClose()
              }}>
                <input type="text" placeholder="title" value={editData?.title} onChange={(e)=>setEditData({...editData, title: e.target.value})}/>
                <input type="text" placeholder="name" value={editData?.name} onChange={(e)=>setEditData({...editData, name: e.target.value})}/>
                <input type="text" placeholder="city" value={editData?.city} onChange={(e)=>setEditData({...editData, city: e.target.value})}/>
                <input type="password" placeholder="password" value={editData?.password} onChange={(e)=>setEditData({...editData, password: e.target.value})}/>
                <input type="text" placeholder="role" value={editData?.role} onChange={(e)=>setEditData({...editData, role: e.target.value})}/>
                <FileBase64 multiple={true} onDone={(e)=>setEditData({...editData, post: e})}/>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </form>
              </Modal.Body>
            </Modal>
            <button onClick={()=>deleteTodo(el?.id)}>Delete</button>
            <button onClick={()=>postTodo(el)}>Edit</button>
            {el?.post?.map((e, i)=>{
              return <img key={i} src={e} alt="" />
            })}
          </div>
        })}
      </>
    )
  }
export default App