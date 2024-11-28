import './AdminPage.css';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AdminPage() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminVerified, setAdminVerified] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);

  //Sets up selected operations and defines current operations and attributes
  const [selectedOperation, setOperation] = useState(null);
  const [selectedAttribute, setAttribute] = useState(null);
  const operations = [
    {operation: 'Insert', attributes: ['User', 'Shoe']},
    {operation: 'Delete', attributes: ['User', 'Shoe', 'Post']},
    {operation: 'Update', attributes: ['User', 'Shoe', 'Post']},
  ];

  //Gets entries of the selectedAttribute
  const [entries, setEntries] = useState([]);

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

  //Defines attributes needed for the Post payloads
  const [postID, setPostID] = useState("");
  const [caption, setCaption] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [isSelling, setIsSelling] = useState("");
  const [price, setPrice] = useState("");
  const [sellingLink, setSellingLink] = useState("");
  const [postDate, setPostDate] = useState("");

  //Navigate for metrics page.
  const navigate = useNavigate()

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

    setEntries([]);
    setDeleteID("");
    setUserID("");
    setName("");
    setPassword("");
    setDateOfBirth("");
    setHometown("");
    setShoeID("");
    setBrand("");
    setModel("");
    setYear("");
    setColor("");
    setPostID("");
    setCaption("");
    setPictureUrl("");
    setIsSelling("");
    setPrice("");
    setSellingLink("");
    setPostDate("");
  };

  const metricClick = () => {
    navigate('/metrics');
  };

  //Function to fetch entries from the selected attribute
  const fetchEntries = async (inputAttribute) => {
    try {
      if (inputAttribute) {
        const response = await axios.get(`http://127.0.0.1:8000/${inputAttribute.toLowerCase()}s`);
        setEntries(response.data);
      } else {
        const response = await axios.get(`http://127.0.0.1:8000/${selectedAttribute.toLowerCase()}s`);
        setEntries(response.data);
      }
    } catch (error) {
      console.error(`Failed to fetch ${selectedAttribute.toLowerCase()} entries.`);
    }
  };
  
    //Handles delete, insert, and update functionality.
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/${selectedAttribute.toLowerCase()}s/${deleteID}`);
      await fetchEntries();
      alert(`${selectedAttribute} with ID ${deleteID} deleted successfully.`);
    } catch (error) {
      alert(`Failed to delete ${selectedAttribute.toLowerCase()} with ID ${deleteID}.`);
    }
  };

  const handleInsert = async () => {
    let payload = null;
    
    if (selectedAttribute === "User") {
      payload = {
        name: String(name),
        password: String(password),
        date_of_birth: String(dateOfBirth),
        hometown: String(hometown),
        }
      } else if (selectedAttribute === "Shoe") {
        payload = {
          brand: String(brand),
          model: String(model),
          year: parseInt(year),
          color: String(color),
        }
      }
  
    try {
      await axios.put(`http://127.0.0.1:8000/add_${selectedAttribute.toLowerCase()}s`, payload);
      await fetchEntries();
      alert(`${selectedAttribute} inserted successfully.`);
    } catch (error) {
      alert(`Failed to insert ${selectedAttribute.toLowerCase()}.`);
    }
  };
  
  const handleUpdate = async () => {
    let payload = null;
    
    if (selectedAttribute === "User") {
      payload = {
        user_id: parseInt(userID),
        name: String(name),
        date_of_birth: String(dateOfBirth),
        home_town: String(hometown),
      }
    } else if (selectedAttribute === "Shoe") {
      payload = {
        shoe_id: parseInt(shoeID),
        brand: String(brand),
        model: String(model),
        year: parseInt(year),
        color: String(color),
      }
    } else if (selectedAttribute === "Post") {
      payload = {
        post_id: parseInt(postID),
        caption: String(caption),
        picture_url: String(pictureUrl),
        is_selling: parseInt(isSelling),
        price: parseFloat(price),
        selling_link: String(sellingLink),
        date: String(postDate),
      }
    }
  
    try {
      await axios.put(`http://127.0.0.1:8000/update_${selectedAttribute.toLowerCase()}s`, payload);
      await fetchEntries();
      alert(`${selectedAttribute} updated successfully.`);
    } catch (error) {
      alert(`Failed to update ${selectedAttribute.toLowerCase()}.`);
    }
  };

    const Table = ({title, headers, items, renderRow}) => (
        <div className="table-container">
            <h1>{title}</h1>
            <table className="item-table">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {items.map(renderRow)}
                </tbody>
            </table>
        </div>
    );

    // Renders the table of entries
    const renderEntries = () => {
        return (
            <div>
                {selectedAttribute === "User" && (
                    <Table
                        title="User List"
                        headers={["Id", "Name", "Date of Birth",]}
                        items={entries}
                        renderRow={(user) => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.name}</td>
                                <td>{user.date_of_birth}</td>
                            </tr>
                        )}
                    />
                )}
                {selectedAttribute === "Shoe" && (
                    <Table
                        title="Shoe List"
                        headers={["Id", "Brand", "Model", "Year", "Color",]}
                        items={entries}
                        renderRow={(shoe) => (
                            <tr key={shoe.shoe_id}>
                                <td>{shoe.shoe_id}</td>
                                <td>{shoe.brand}</td>
                                <td>{shoe.model}</td>
                                <td>{shoe.year}</td>
                                <td>{shoe.color}</td>
                            </tr>
                        )}
                    />
                )}
                {selectedAttribute === "Post" && (
                    <Table
                        title="Post List"
                        headers={["Caption", "Is Selling", "Price", "Date",]}
                        items={entries}
                        renderRow={(post) => (
                            <tr key={post.caption}>
                                <td>{post.caption}</td>
                                <td>{post.is_selling}</td>
                                <td>{post.price}</td>
                                <td>{post.date}</td>
                            </tr>
                        )}
                    />
                )}
            </div>
        );
    };

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
          <p>Date Of Birth: <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="Date Of Birth" /></p>
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
          <p>Date Of Birth: <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="Date Of Birth" /></p>
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
          <p>Post Date: <input type="date" value={postDate} onChange={(e) => setPostDate(e.target.value)} placeholder="Post Date" /></p>

          <div className="button">
            <button onClick={handleUpdate}>Submit</button>
            <button onClick={cancelClick}>Cancel</button>
          </div>
        </>
      );
    }

    const handleAdminLogin = async () => {
        try {
            setLoginErrorMessage(false);
            const loginResponse = await axios.put('http://localhost:8000/admin/login', {
                "username" : adminUsername,
                "password" : adminPassword
            });

            const verified = loginResponse.data.status;
            if (verified) {
                setLoginErrorMessage(false);
                setAdminVerified(true);
            } else {
                setLoginErrorMessage(true);
            }
        } catch (error) {
            console.error('Admin Login error:', error);
            setLoginErrorMessage(true);
        }
    };


    return (
        <div className="App">
            <header className="App-header">
                {adminVerified ? (
                    <>
                        {/*Loads initial screen to prompt admin to select an operation*/}
                        {!selectedOperation && (
                            <>
                                <h1>Admin Development</h1>
                                <h2>Select The Desired Operation Below:</h2>
                                <div className="button">
                                    {operations.map((operation) => (
                                        <button key={operation.operation}
                                                onClick={() => setOperation(operation.operation)}>
                                            {operation.operation}
                                        </button>
                                    ))}
                                </div>
                                <h2>Shoe Collection Metrics:</h2>
                                <div className="button">
                                  <button onClick={metricClick}>Metrics</button>
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
                                            <button key={attribute} onClick={() => {
                                                attributeClick(attribute)
                                                fetchEntries(attribute).then();
                                            }}>
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
                                {renderEntries()}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Admin Login</h2>
                        <input
                            type="text"
                            placeholder="Email"
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAdminLogin();
                                }
                            }}
                            style={{margin: '10px', padding: '10px'}}
                        />
                        <br/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAdminLogin();
                                }
                            }}
                            style={{margin: '10px', padding: '10px'}}
                        />
                        <br/>
                        <button onClick={handleAdminLogin} style={{padding: '10px 20px'}}>
                            Login
                        </button>
                        {loginErrorMessage && <p style={{color: 'red'}}>Failed to Login</p>}
                    </>)
                }
            </header>
        </div>
    );
}
