/*
 * FeaturePage
 *
 * List all the features
 */
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CListGroup,
  CListGroupItem,
  CLabel,
  CInputGroupPrepend,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function Contacts({ contacts }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <CCard className="cardContainer">
        <CCardBody>
          <CCol xs="12" md="9">
          
            <CListGroup id="list-tab" role="tablist">
              {contacts.map((contact) => (
                <div key={contact.id}>
                  <CListGroupItem
                    onClick={() => setActiveTab(contact.id)}
                    action
                    active={activeTab === contact.id}
                  >
                    {" "}
                    {contact.id} {contact.name}
                   <CButton className="float-right" type="button" color="danger">
                      <CIcon name="cil-ban" />
                    </CButton>
                  </CListGroupItem>
                </div>
                
              ))}

              
            </CListGroup>
             
            
          </CCol>
        </CCardBody>
      </CCard>
    </div>
  );
}

function Items(props) {
  // Categories
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  // const [newCategoryName, setNewCategoryName] = useState("");

  const [contacts, setContacts] = useState([]);

  // Categories
  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  // const handleNewCategoryNameChange = (e) => {
  //   setNewCategoryName(e.target.value);
  // };

  // Clear form
  const handleClearCategory = () => {
    setCategoryId("");
    setCategoryName("");
  };

  // Products
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  // const [newName, setNewProductName] = useState("");

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };
  // const handleNewProductNameChange = (e) => {
  //   setNewProductName(e.target.value);
  // };

  // Clear form
  const handleClearProduct = () => {
    setProductId("");
    setProductName("");
    setProductPrice("");
  };

  // Get Message
  const handleGetAll = (e) => {
    fetch(
      //  "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories"
      "https://localhost:5001/api/categories"
    )
      .then((res) => res.json())
      .then((data) => {
        setContacts([...data]);
      })
      .catch(console.log);
  };

  // Post Message
  const handlePost = (e) => {
    fetch(
      // "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories",
      "https://localhost:5001/api/categories",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(categoryId),
          name: categoryName,
        }),
      }
    ).then(() => {
      handleGetAll();
    });

    e.preventDefault();
  };

  // Put Message
  // const handlePut = (e) => {
  //   fetch(
  //     //  "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories?newName=" + newName,
  //     "https://localhost:5001/api/categories?newName=" + newCategoryName,
  //     {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: Number(categoryId),
  //         name: categoryName,
  //       }),
  //     }
  //   ).then(() => {
  //     handleGetAll();
  //   });

  //   e.preventDefault();
  // };

  // Delete Message
  const handleDelete = (e) => {
    fetch(
      // "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories?id=" + id,
      "https://localhost:5001/api/categories?id=" + categoryId,
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

  const { auth } = props;

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  return (
    <>
      {/* <div className="Items">
        <label htmlFor="id" className="block"></label>
        <input
          type="id"
          className="my-1 p-1 w-full"
          name="id"
          value={id}
          placeholder="ID"
          id="id"
          onChange={handleIdChange}
        />
        <label htmlFor="name" className="block"></label>
        <input
          type="name"
          className="mt-1 mb-3 p-1 w-full"
          name="name"
          value={name}
          placeholder="Category Name"
          id="name"
          onChange={handleNameChange}
        />
        <Button onClick={handlePost}>Add</Button>

        <div className="Buttons">
          <Button onClick={handlePut}>Change</Button>
          <input type="text" value={newName} onChange={handleNewNameChange} />
          <Button onClick={handleDelete}>Delete</Button>
        </div>

       
      </div> */}
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Add
              <small> Categories</small>
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Id</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="id-input"
                      name="id-input"
                      placeholder="Id"
                      value={categoryId}
                      onChange={handleCategoryIdChange}
                    />
                    <CFormText>Please enter your category ID</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="category-name-input"
                      name="category-input"
                      placeholder="i.e Groceries"
                      value={categoryName}
                      onChange={handleCategoryNameChange}
                    />
                    <CFormText className="help-block">
                      Please enter your category name
                    </CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="add"
                size="sm"
                color="primary"
                onClick={handlePost}
              >
                <CIcon name="cil-scrubber" /> Add
              </CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={handleClearCategory}
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CCard>

          <div className="ItemsList">
            <Contacts contacts={contacts} />
          </div>
        </CCol>

        {/* Add Products */}
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Add
              <small> Products</small>
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Selected Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel>Selected</CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Id</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="product-id-input"
                      name="product-id-input"
                      placeholder="Id"
                      value={productId}
                      onChange={handleProductIdChange}
                    />
                    <CFormText>Please enter your Product Id</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="product-name-input"
                      name="product-input"
                      placeholder="i.e Potatoes"
                      value={productName}
                      onChange={handleProductNameChange}
                    />
                    <CFormText className="help-block">
                      Please enter your Product Name
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Price</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="product-price-input"
                      name="product-price-input"
                      placeholder="£0.0"
                      value={productPrice}
                      onChange={handleProductPriceChange}
                    />
                    <CFormText className="help-block">
                      Please enter your Product Price
                    </CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="add"
                size="sm"
                color="primary"
                onClick={handlePost}
              >
                <CIcon name="cil-scrubber" /> Add
              </CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={handleClearProduct}
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps))(Items);
