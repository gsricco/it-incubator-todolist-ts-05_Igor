import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const [edit, setEdit] = useState(false);

    const EditTrueHandler = () => {
        if (newTitle.trim() !== "") {
            setEdit(!edit);
            props.callBack(newTitle);
        } else {
            setNewTitle("Title is required");
        }
    }
    return (
        edit
            ? <input onBlur={EditTrueHandler} onChange={onChangeHandler} autoFocus type={"text"} value={newTitle}/>
            : <span onDoubleClick={EditTrueHandler}>{props.title}</span>
    );
};

