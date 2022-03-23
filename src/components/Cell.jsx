function Cell(props) {
  return (
    <div className={`cell ${props.cellState}`} onClick={props.click}  ></div>
  )
}

export default Cell