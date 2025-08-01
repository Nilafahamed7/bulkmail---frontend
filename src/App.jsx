import { useState } from "react"
import axios from "axios"
import * as XLSX from "xlsx"

function App() {

  const [input,setinput] = useState("")
  const [status,setstatus] = useState(false)
  const [EmailList,setEmailList] = useState([])

  const handlebutton=()=>{
    setstatus(true)
    axios.post("https://bulkmail-backend-1-osr5.onrender.com/sendmail",{input:input,EmailList:EmailList})
    .then((data)=>{
      if(data.data === true){
        alert("email sent successfully")
        setstatus(false)
      }
      else{
        alert("email sent failed")
      }
    })
  }

  const handleEmail=(e)=>{
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (e)=>{
      const data = e.target.result
      const workbook = XLSX.read(data,{type:"binary"})
      const SheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[SheetName]
      const emaillist = XLSX.utils.sheet_to_json(worksheet,{header:"A"})
      const totalemail = emaillist.map((item)=>{
        return item.A
      })
      setEmailList(totalemail)
    }
    reader.readAsBinaryString(file)
  }

  return ( 
    <>
    <div className="bg-gray-900 text-white text-center p-4">
      <h1 className="text-2xl font-medium">BulkMail</h1>
    </div>

    <div className="bg-gray-800 text-white text-center p-4">
      <h1 className="text-2xl font-medium">Streamline your communication — send multiple emails at once to boost your business efficiency.</h1>
    </div>

    <div className="bg-gray-700 text-white text-center p-4">
      <h1 className="text-2xl font-medium">Drag and Drop</h1>
    </div>

    <div className="bg-gray-500 flex flex-col items-center justify-center p-4">
      <textarea onChange={(e)=>{
        setinput(e.target.value)
      }} className="w-[80%] h-40" placeholder="Type your email"></textarea>

      <input onChange={handleEmail} className="mt-4 text-white border-4 border-dashed p-4" type="file" />
      <p className="mt-3 text-white text-xl">Total no of emails in the selected file : {EmailList.length}</p>
      <button onClick={handlebutton} className="bg-gray-950 text-white px-2 py-1 rounded-md mt-2">{status? "sending":"send"}</button>
    </div>

    <div className="bg-gray-400 p-20"></div>
    <div className="bg-gray-200 p-20"></div>
      
    </>
  )
}

export default App
