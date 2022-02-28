import React from "react"
import ReactDOM from "react-dom"

const useState = React.useState
const useEffect = React.useEffect

function OurApp() {
  const [groceries, setGroceries] = useState([])
  // Only run once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem("exempleGroceryData")) {
      setGroceries(JSON.parse(localStorage.getItem("exempleGroceryData")))
    }
  }, [])

  // run every time our pet state changes
  useEffect(() => {
    localStorage.setItem("exampleGroceryData", JSON.stringify(groceries))
  }, [groceries])

  return (
    <>
      <MyHeader />
      <LikeArea />
      <TimeArea />
      <AddItemForm setGroceries={setGroceries} />
      <ul>
        {groceries.map(grocery => (
          <GroceryItens setGroceries={setGroceries} id={grocery.id} itemName={grocery.itemName} itemQuantity={grocery.itemQuantity} itemPrice={grocery.itemPrice} key={grocery.id} />
        ))}
      </ul>
      <Footer />
    </>
  )
}
function AddItemForm(props) {
  const [itemName, setItemName] = useState()
  const [itemQuantity, setItemQuantity] = useState()
  const [itemPrice, setItemPrice] = useState()

  function handleSumit(e) {
    e.preventDefault()
    props.setGroceries(prev => prev.concat({ itemName, itemQuantity, itemPrice, id: Date.now() }))
    setItemName("")
    setItemQuantity("")
    setItemPrice("")
  }
  return (
    <form onSubmit={handleSumit}>
      <fieldset>
        <legend>Add New Item</legend>
        <input value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Item Name" />
        <input value={itemQuantity} onChange={e => setItemQuantity(e.target.value)} placeholder="Item Quantity" />
        <input value={itemPrice} onChange={e => setItemPrice(e.target.value)} placeholder="Item Price" />
        <button>Add Item</button>
      </fieldset>
    </form>
  )
}

function LikeArea() {
  const [likeCount, setLikeCount] = useState(0)
  function likeHandler() {
    setLikeCount(function (prev) {
      return prev + 1
    })
  }
  function deslikeHandler() {
    setLikeCount(prev => {
      if (prev > 0) {
        return prev - 1
      }
      return 0
    })
  }
  return (
    <>
      <button onClick={likeHandler}>Like</button>
      <button onClick={deslikeHandler}>Deslike</button>
      <h2>This page has been liked {likeCount} times</h2>
    </>
  )
}

function GroceryItens(props) {
  function handleDelete() {
    props.setGroceries(prev => prev.filter(grocery => grocery.id != props.id))
  }
  return (
    <li>
      {props.itemQuantity} units of {props.itemName} for ${props.itemPrice} dollars.
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

function MyHeader() {
  return <h1 className="special">My Grocery List</h1>
}
function TimeArea() {
  const [theTime, setTheTime] = useState(new Date().toLocaleString())

  useEffect(() => {
    const interval = setInterval(() => setTheTime(new Date().toLocaleString()), 1000)

    return () => clearInterval(interval)
  }, [])

  return <p>The current time is {theTime}.</p>
}

function Footer() {
  return (
    <small>
      &copy; 2022 - Created by <a href="http://felipeguasti.com.br">Felipe Guasti</a>
    </small>
  )
}

ReactDOM.render(<OurApp />, document.querySelector("#app"))
