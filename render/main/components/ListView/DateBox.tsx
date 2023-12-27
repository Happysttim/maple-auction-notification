import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { RecordListDispatch } from "../../contexts/RecordListContext";
import "react-datepicker/dist/react-datepicker.css";

type DateType = "START" | "END";

const Style = {
    BoxStyle: {
        display: "flex",
        margin: "auto 0",
    },

    CheckboxStyle: {
        margin: "auto 0",
        letterSpacing: "-1pt",
    },

    ButtonStyle: {
        padding: "5px 12px",
        margin: "0px 5px",
        letterSpacing: "-0.5pt",
        backgroundColor: "#CFCFCF",
        border: "none",
        fontSize: "11pt",
        borderRadius: "12px",
    },

    DateBoxStyle: {
        width: "100%",
    }
}

const DateBox = () => {

    const [ isEnable, setToggle ] = useState<boolean>(false);
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date());
    const dispatch = useContext(RecordListDispatch);

    const startRef = useRef<DatePicker | null>(null);
    const endRef = useRef<DatePicker | null>(null);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    useEffect(() => {
        if(isEnable) {
            dispatch({
                type: "FILTER",
                filter: {
                    date: {
                        startDate: startDate,
                        endDate: endDate
                    }
                }
            });
        }
    }, [ startDate, endDate ]);

    const onToggle = () => {
        if(isEnable) {
            dispatch({
                type: "FILTER",
                filter: {
                    date: {
                        startDate: undefined,
                        endDate: undefined
                    }
                }
            });
        }
        setToggle(!isEnable);
    }

    const DateButton = forwardRef((props: { value: Date, onClick: () => void }, ref: React.LegacyRef<HTMLInputElement>) => {
        return (
            <input type="button" style={Style.ButtonStyle} value={props.value.toString()} onClick={props.onClick} readOnly={isEnable} ref={ref}/>
        )
    });

    const setDate = (type: DateType, date: Date | null) => {
        switch(type) {
            case "START":
                setStartDate(date!);
                break;
            case "END":
                setEndDate(date!);
                break;
        }
    }

    return (
        <div style={Style.BoxStyle}>
            <div style={Style.CheckboxStyle}>
                <label>
                    <span>날짜 조회</span>
                    <input type="checkbox" onChange={() => onToggle()}></input>
                </label>
            </div>
            <DatePicker ref={startRef} selected={startDate} dateFormat="yyyy-MM-dd" dateFormatCalendar="yyyy-MM" timeFormat="HH:mm" onChange={(date) => setDate("START", date)} customInput={<DateButton onClick={() => { startRef.current!.setOpen(true) }} value={startDate} />} />
            <span>~</span>
            <DatePicker ref={endRef} selected={endDate} dateFormat="yyyy-MM-dd" dateFormatCalendar="yyyy-MM" timeFormat="HH:mm" onChange={(date) => setDate("END", date)} customInput={<DateButton onClick={() => { endRef.current!.setOpen(true)}} value={endDate} />} />
        </div>
    )
}

export default DateBox;