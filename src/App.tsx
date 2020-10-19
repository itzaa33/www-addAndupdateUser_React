import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import axios from 'axios'
import { v1 as uuidv1 } from 'uuid'

import Formdata from './Components/Formdata'
import Listsdata from './Components/Listsdata'
import * as TypeListsdata from './Components/Listsdata'

import 'App.css'

const App: React.FC = () =>
{
  const [data, setData] = useState<TypeListsdata.Value[]>([])

  // add data
  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getTime())
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')

  // update data
  const [updateId, setUpdateId] = useState<string>('')
  const [updateSelectedDate, setUpdateSelectedDate] = useState<number | null>(null)
  const [updateName, setUpdateName] = useState<string>('')
  const [updateSurname, setUpdateSurname] = useState<string>('')

  function saveJson(data: TypeListsdata.Value[])
  {
    const url = "http://localhost:5000/write"

    axios.post(url, data)
      .then(res =>
      {
        console.log(res)
      })
      .catch(error =>
      {
        console.log(error)
      })
  }

  function addData()
  {
    let obj = {
      id: uuidv1(),
      name: name,
      surname: surname,
      birthday: selectedDate
    }

    let sumData = [...data, obj]

    setData(sumData)
    //clear
    setSelectedDate(new Date().getTime())
    setName('')
    setSurname('')

    saveJson(sumData)
  }

  function updateData()
  {
    let obj: TypeListsdata.Value = {
      id: updateId,
      name: updateName,
      surname: updateSurname,
      birthday: updateSelectedDate
    }

    let item = data.filter(item => item.id !== obj.id);
    let sumData = [...item, obj]

    setData(sumData)
    //clear
    setUpdateId('')
    setUpdateSelectedDate(null)
    setUpdateName('')
    setUpdateSurname('')

    saveJson(sumData)
  }

  function PushDataUpdate(id: string)
  {
    let item = data.filter(item => item.id === id);

    if (item.length > 0)
    {
      setUpdateId(item[0].id)
      setUpdateSelectedDate(item[0].birthday)
      setUpdateName(item[0].name)
      setUpdateSurname(item[0].surname)
    }
  }

  useEffect(() =>
  {
    const url = "http://localhost:5000/read"

    axios.get(url)
      .then(res =>
      {
        if (!!res.data)
        {
          console.log(res.data)
          setData(res.data)
        }
      })
      .catch(error =>
      {
        console.log(error)
      })
  }, [])

  return (
    <div className="App">
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Helmet>
      <div className="container">

        <Formdata
          title={"บันทึกข้อมูล"}
          selectedDate={selectedDate}
          name={name}
          surname={surname}

          setSelectedDate={setSelectedDate}
          setName={setName}
          setSurname={setSurname}
          addData={addData}
        />

        {
          (updateId.length > 0) &&
          <Formdata
            title={"อัพเดตข้อมูล"}
            idUser={updateId}
            selectedDate={updateSelectedDate}
            name={updateName}
            surname={updateSurname}

            setSelectedDate={setUpdateSelectedDate}
            setName={setUpdateName}
            setSurname={setUpdateSurname}
            addData={updateData}
          />
        }

        <Listsdata
          data={data}
          PushDataUpdate={PushDataUpdate}
        />
      </div>
    </div>
  );
}

export default App;
