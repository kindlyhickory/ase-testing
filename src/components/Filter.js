import React from "react";
import styles from '../styles/input.module.css';
import filterStyles from "../styles/filter.module.css";

const Filter = (props) => {

  const state = props.state;
  const setState = props.setState;

  const handleOnChange = (e) => {

    const target = e.target;
    const value = target.value;
    const name = target.name

    setState({
      ...state,
      [name]: value,
    })
    props.setDates([]);
    console.log(props.dates);

  }

  const handleChangeObject = (e) => {

    if (!props.objectList.includes(e.target.value)) {
      props.setObjectList([...props.objectList, e.target.value]);
    } else {
      const filteredObjects = props.objectList.filter(item => item !== e.target.value);
      props.setObjectList(filteredObjects);
    }
  }

  return (
    <div className={filterStyles.filter}>
      <label htmlFor="start-date">Начало периода:
        <input onChange={handleOnChange} type="date" className={styles.date} id="start-date" name="startDate" value={state.startDate}></input>
      </label>
      <label htmlFor="end-date">Конец периода:
        <input onChange={handleOnChange} type="date" className={styles.date} id="end-date" name="endDate" value={state.endDate}></input>
      </label>
      <select className={filterStyles.select} multiple={true} value={props.objectList} onChange={handleChangeObject} size="3">
        <option value={props.objects[0].id}>Объект 1</option>
        <option value={props.objects[1].id}>Объект 2</option>
        <option value={props.objects[2].id}>Объект 3</option>
      </select>

    </div>

  )
}

export default Filter;