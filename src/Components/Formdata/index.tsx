import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Input from './Input'

type PropsType = {
    title: string;
    idUser?: string;

    selectedDate: number | null;
    name: string;
    surname: string;

    setSelectedDate: React.Dispatch<React.SetStateAction<number | null>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setSurname: React.Dispatch<React.SetStateAction<string>>;
    addData(): void
}

const Comp: React.FC<PropsType> = (
    {
        title,
        idUser,
        selectedDate,
        name,
        surname,

        setSelectedDate,
        setName,
        setSurname,
        addData
    }
) =>
{


    function handleDateChange(date: Date | null)
    {
        if (date?.getTime())
        {
            setSelectedDate(date.getTime());
        }
    };



    return (
        <div className="form-data" style={{ display: 'flex', flexDirection: 'column', margin: '20px 0' }}>

            <h1 style={{textAlign:'center'}}>{title}</h1>

            {
                (!!idUser && idUser?.length > 0) &&
                <div style={{color:'blue'}}>
                    <span>User ID : </span>
                    <span>{idUser}</span>
                </div>
            }

            <Input
                value={name}
                setValue={setName}
                label={"ชื่อ"}
                placeholder={"กรอกชื่อ"}
            />

            <Input
                value={surname}
                setValue={setSurname}
                label={"นามสกุล"}
                placeholder={"กรอกนามสกุล"}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id={`date-picker-inline-${title}`}
                    label="วันเกิด (วว/ดด/ปปปป)"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>

            <button
                className="btn btn-primary"
                onClick={() => addData()}
                style={{ maxWidth: '200px', marginTop: '20px' }}
            // disabled
            >
                บันทึกข้อมูล
            </button>
        </div>
    );
}

export default Comp;
