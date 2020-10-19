import React, { useState } from 'react';
import './index.css'

type PropsType = {

    data: Value[];
    PushDataUpdate(id: string): void
}

export type Value = {
    id: string;
    name: string;
    surname: string;
    birthday: number | null;
}

const Comp: React.FC<PropsType> = (
    {
        data,
        PushDataUpdate
    }
) =>
{
    return (
        <div className="list-data">
            {
                data.map((item, index) =>
                {
                    return (
                        <div className="data" key={index}>
                            <h1>Id: {item.id}</h1>
                            <h2>ชื่อ:  {item.name}</h2>
                            <h2>นามสกุล:  {item.surname}</h2>
                            <button className="btn btn-primary" onClick={() => PushDataUpdate(item.id)}>
                                แก้ไข
                            </button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Comp;
