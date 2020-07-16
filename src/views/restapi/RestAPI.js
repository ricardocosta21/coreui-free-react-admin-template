/*
 * FeaturePage
 *
 * List all the features
 */
import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {Card} from "react-bootstrap";
import styles from "./RestAPI.css";


function Contacts({ contacts }) {
  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id} >
        <center>
          <Card className="cardContainer" > 
           <Card.Body>
            <Card.Title>{contact.id} - {contact.name}</Card.Title>
           </Card.Body>
          </Card>
          </center>
        </div>
      ))}
    </div>
  );
}

function Items() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [contacts, setContacts] = useState([]);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  // Get Message
  const handleGetAll = (e) => {
    fetch(
      "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories"
    )
      .then((res) => res.json())
      .then((data) => {
        setContacts([...data]);
      })
      .catch(console.log);
    // added debug message
    //e.preventDefault();
  };

  // Post Message
  const handlePost = (e) => {
    fetch(
      "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(id),
          name: name,
        }),
      }
    ).then(() => {
      handleGetAll();
    });

    e.preventDefault();
  };

  // Put Message
  const handlePut = (e) => {
    fetch(
      "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories?newName=" +
        newName,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(id),
          name: name,
        }),
      }
    ).then(() => {
      handleGetAll();
    });

    e.preventDefault();
  };

  // Delete Message
  const handleDelete = (e) => {
    fetch(
      "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories?id=" +
        id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      handleGetAll();
    });

    e.preventDefault();
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <div className="Items">

          <form className="">
          <label htmlFor="id" className="block">
          </label>
          <input type="id" className="my-1 p-1 w-full" name="id" 
          value={id} placeholder="ID" id="id" onChange={handleIdChange} 
          />
          <label htmlFor="name" className="block">
          </label>
          <input
            type="name"
            className="mt-1 mb-3 p-1 w-full"
            name="name"
            value={name}
            placeholder="Category Name"
            id="name"
            onChange={handleNameChange} 
          form/>
          </form>

      <div className="Buttons">
        {/* <Button onClick={handleGetAll}>Get</Button> */}
        <Button onClick={handlePost}>Post</Button>
        <Button onClick={handlePut}>Put</Button>
        <input type="text" value={newName} onChange={handleNewNameChange} />
        <Button onClick={handleDelete}>Delete</Button>
      </div>

      <div className="ItemsList">
        <Contacts contacts={contacts} />
      </div>


    </div>
  );
}

export default Items;
