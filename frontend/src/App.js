import './App.css';

import axios from 'axios';
import { useState } from 'react';


export default function MyApp() {
  //Sets up selected operations and defines current operations and attributes
  const [selectedOperation, setOperation] = useState(null);
  const [selectedAttribute, setAttribute] = useState(null);
  const operations = [
    {operation: 'Insert', attributes: ['User', 'Shoe']},
    {operation: 'Delete', attributes: ['User', 'Shoe', 'Post']},
    {operation: 'Update', attributes: ['User', 'Shoe', 'Post']}
  ];

  //Defines attribute for delete functionality
  const [deleteID, setDeleteID] = useState("");
  
  //Defines attributes needed for the User payloads
  const[userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [hometown, setHometown] = useState("");

  //Defines attributes needed for the Shoe payloads
  const [shoeID, setShoeID] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [adminID, setAdminID] = useState("");

  //Defines attributes needed for the Post payloads
  const [postID, setPostID] = useState("");
  const [caption, setCaption] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [isSelling, setIsSelling] = useState("");
  const [price, setPrice] = useState("");
  const [sellingLink, setSellingLink] = useState("");
  const [postDate, setPostDate] = useState("");

  //Handles the cases that an attribute was clicked or the cancel button was clicked
  const attributeClick = (attribute) => {
    setAttribute(attribute);
  };
  const cancelClick = () => {
    if (selectedAttribute) {
      setAttribute(null);
    } else {
      setOperation(null);
    }
  };

  //Handles delete, insert, and update functionality.
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/${selectedAttribute.toLowerCase()}s/${deleteID}`);
      alert(`${selectedAttribute} with ID ${deleteID} deleted successfully.`);
      cancelClick();
    } catch (error) {
      alert(`Failed to delete ${selectedAttribute.toLowerCase()} with ID ${deleteID}.`);
    }
  };

  const handleInsert = () => {
    
  }

  const handleUpdate = () => {
    
  }

  //Sets up logic for each case that a button gets clicked
  const renderForm = () => {
    if (selectedOperation === 'Insert') {
      if (selectedAttribute === 'User') {
        return insertUser();
      } else if (selectedAttribute === 'Shoe') {
        return insertShoe();
      }
    } else if (selectedOperation === 'Delete') {
      return (
        <>
          <p>{selectedAttribute} ID To Delete: <input type="number" value={deleteID} onChange={(e) => setDeleteID(e.target.value)} placeholder="ID" /></p>
          
          <div className="button">
            <button onClick={handleDelete}>Submit</button>
            <button onClick={cancelClick}>Cancel</button>
          </div>
        </>
      );
    } else if (selectedOperation === 'Update') {
      if (selectedAttribute === 'User') {
        return updateUser();
      } else if (selectedAttribute === 'Shoe') {
        return updateShoe();
      } else if (selectedAttribute === 'Post') {
        return updatePost();
      }
    }
  };

    //All Functions to Insert, Delete, and Update Users, Shoes, and Posts are here
    
    //Inserts
    function insertUser(){
      return (
        <>
          <p>Insert New User:</p>

          <p>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /></p>
          <p>Password: <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></p>
          <p>Date Of Birth: <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="Date Of Birth" /></p>
          <p>Hometown: <input type="text" value={hometown} onChange={(e) => setHometown(e.target.value)} placeholder="Hometown" /></p>

          <div className="button">
            <button onClick={handleInsert}>Submit</button>
            <button onClick={cancelClick}>Cancel</button>
          </div>
        </>
      );
    }

    function insertShoe(){
      return (
        <>
          <p>Insert New Shoe:</p>

          <p>Brand: <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" /></p>
          <p>Model: <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" /></p>
          <p>Year: <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" /></p>
          <p>Color: <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" /></p>
          <p>Admin ID: <input type="number" value={adminID} onChange={(e) => setAdminID(e.target.value)} placeholder="Admin ID" /></p>

          <div className="button">
            <button onClick={handleInsert}>Submit</button>
            <button onClick={cancelClick}>Cancel</button>
          </div>
        </>
      );
    }

    //Updates
    function updateUser(){
      return (
        <>
          <p>Update User:</p>

          <p>ID Of User To Update: <input type="number" value={userID} onChange={(e) => setUserID(e.target.value)} placeholder="ID" /></p>
          <p>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /></p>
          <p>Date Of Birth: <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="Date Of Birth" /></p>
          <p>Hometown: <input type="text" value={hometown} onChange={(e) => setHometown(e.target.value)} placeholder="Hometown" /></p>

          <div className="button">
            <button onClick={handleUpdate}>Submit</button>
            <button onClick={cancelClick}>Cancel</button>
          </div>
        </>
      );
    }

    function updateShoe(){
      return (
        <>
          <p>Update Shoe:</p>

          <p>ID Of Shoe To Update: <input type="number" value={shoeID} onChange={(e) => setShoeID(e.target.value)} placeholder="ID" /></p>
          <p>Brand: <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" /></p>
          <p>Model: <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" /></p>
          <p>Year: <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" /></p>
          <p>Color: <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" /></p>

          <div className="button">
            <button onClick={handleUpdate}>Submit</button>
            <button onClick={cancelClick}>Cancel</button>
          </div>
        </>
      );
    }

    function updatePost(){
      return (
        <>
          <p>Update Post:</p>

          <p>ID Of Post To Update: <input type="number" value={postID} onChange={(e) => setPostID(e.target.value)} placeholder="ID" /></p>
          <p>Caption: <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption" /></p>
          <p>Picture URL: <input type="text" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} placeholder="Picture URL" /></p>
          <p>Is Selling: <input type="number" value={isSelling} onChange={(e) => setIsSelling(e.target.value)} placeholder="Is Selling" /></p>
          <p>Price: <input type="number" step={0.1} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" /></p>
          <p>Selling Link: <input type="text" value={sellingLink} onChange={(e) => setSellingLink(e.target.value)} placeholder="Selling Link" /></p>
          <p>Post Date: <input type="text" value={postDate} onChange={(e) => setPostDate(e.target.value)} placeholder="Post Date" /></p>

          <div className="button">
            <button onClick={handleUpdate}>Submit</button>
            <button onClick={cancelClick}>Cancel</button>
          </div>
        </>
      );
    }


  return (
    <div className="App">
      <header className="App-header">
        
        {/*Loads initial screen to prompt admin to select an operation*/}
        {!selectedOperation && (
          <>
            <h1>Admin Development</h1>
            <h2>Select The Desired Operation Below:</h2>
            <div className="button">
              {operations.map((operation) => (
                <button key={operation.operation} onClick={() => setOperation(operation.operation)}>
                  {operation.operation}
                </button>
              ))}
            </div>
          </>
        )}

        {/*Prompts the admin to select an attribute*/}
        {selectedOperation && !selectedAttribute && (
          <>
            <h2>Which Attribute Would You Like To {selectedOperation}:</h2>
            <div className="button">
              {operations
                .find((operation) => operation.operation === selectedOperation)
                ?.attributes.map((attribute) => (
                  <button key={attribute} onClick={() => attributeClick(attribute)}>
                    {attribute}
                  </button>
                ))}
              <button onClick={cancelClick}>Cancel</button>
            </div>
          </>
        )}

        {/*Display specific information selected operation and attribute*/}
        {selectedOperation && selectedAttribute && (
          <>
            {renderForm()}
          </>
        )}
      </header>
    </div>
  );
}
