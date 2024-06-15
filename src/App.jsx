import { useEffect, useState } from 'react'
import './App.css'
import { empData } from './employee'

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [firstName, setFisrtName] = useState('');
  const [lastName, setLastName] = useState('');
  const[isUpdate,setIsUpdate]=useState(false);

  useEffect(() => {
    setData(empData)
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt != undefined) {
      setIsUpdate(true)
      setId(id);
      setFisrtName(dt[0].firstName);
      setLastName(dt[0].lastName);
    }

  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("are you sure to delete this?")) {
        const dt = data.filter(item => item.id != id);
        setData(dt);
      }
    }
  }

  const handleSave = (e) => {
    let error='';
    if (firstName===''){
      error+="FirstName is required,  ";
    }
    if (lastName===''){
      error+="lastName is required.";
    }
    if(error===""){
    e.preventDefault();
    const dt=[...data];
    const newObject={
      id:empData.length+1,
      firstName:firstName,
      lastName:lastName
    }
    dt.push(newObject);
    setData(dt);
  }
  else{
    alert(error);
  }
}

  const handleUpdate=()=>{
    const index=data.map((item)=>{
      return item.id
    }).indexOf(id);

    const dt=[...data];
    dt[index].firstName=firstName;
    dt[index].lastName=lastName;
    setData(dt);
    handleClear();

  }

  const handleClear =()=>{
    setId(0);
    setFisrtName("");
    setLastName("");
    setIsUpdate(false);
  }
  return (
    <>
      <div className="app">
        <h1>CRUD APP</h1>
        <hr />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <label>FirstName&nbsp;
              <input type="text" placeholder='enter your firstName' onChange={(e) => setFisrtName(e.target.value)} value={firstName} />
            </label>
          </div>&nbsp;
          <div>
            <label>LastName&nbsp;
              <input type="text" placeholder='enter your lastName' onChange={(e) => setLastName(e.target.value)} value={lastName} />
            </label>
          </div>&nbsp;
          <div>
            {
              !isUpdate ?
              <button className='btn btn-success' onClick={(e) => handleSave(e)}>Save</button>
              :
              <button className='btn btn-warning' onClick={()=>handleUpdate()}>Update</button>

            }
            <button className='btn btn-danger' style={{marginLeft:"3px"}}  onClick={() => handleClear()}>Clear</button>
          </div>
        </div>
        <hr />
        <table className='table table-hover'>
          <thead>
            <tr>
              <td>Sl.No.</td>
              <td>Id</td>
              <td>FirstName</td>
              <td>LastName</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>
                      <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                      <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>delete</button>
                    </td>
                  </tr>
                )
              }
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
