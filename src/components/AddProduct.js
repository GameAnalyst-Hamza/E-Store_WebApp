import React, { useEffect, useState, useRef } from "react";
import { Container, Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firestore, storageRef } from "../firebase";
import "../style/home.css";
import img from "../back.jpg";

export default function AddProduct() {
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState();
  const { currentUser, logout } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useHistory();

  const [orderList, setOrder] = useState([]);

  const storeNameRef = useRef();
  const tagRef = useRef();
  const titleRef = useRef();
  const desRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    console.log("useEffect");
    firestore
      .collection("products")
      .get()
      .then((res) => {
        if (!res.empty) {
          res.docs.forEach((doc) => {
            console.log("data", doc.data());
          });
        }
      });
  }, []);

  useEffect(() => {
    firestore
      .collection("orders")
      .get()
      .then((snap) => {
        const list = [];
        snap.forEach((pro) => {
          list.push({ ...pro.data() });
        });
        setOrder(list);
        console.log(list[0].Brand, "message for list");
      });
  }, []);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleOnChange(e) {
    console.log("OnChange function", e.target.files[0]);
    const file = e.target.files[0];
    setImage(file);
  }

  const guidGenerator = () => {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  function handleUpload() {
    if (!image) return;
    const file = image;
    console.log("FileName", file);
    const uploadTask = storageRef.ref("All_Files/").child(file.name).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("error:-", error);
      },
      () => {
        const uniId = guidGenerator().toString();
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          firestore
            .collection("products")
            .doc(uniId)
            .set({
              image_name: file.name.toString(),
              id: uniId,
              image_url: downloadURL.toString(),
              productPrice: priceRef.current.value,
              productName: titleRef.current.value,
              productTag: tagRef.current.value,
              productDes: desRef.current.value,
              storeName: storeNameRef.current.value,
            })
            .then((res) => {
              console.log(
                "Document successfully written!",
                res,
                priceRef.current.value
              );
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      }
    );
  }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const options = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
  ];
  return (
    <div className="back">
      <div className="home_img">
        <img src={img} />
      </div>
      <div className="head">
        <h1>Add Product</h1>
      </div>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: "80px" }}
      // style={{ minHeight: "100vh" , minWidth:'100vw'}}
      >
        <Card className="w-600 text-center d-flex align-items-center justify-content-center">
          <Card.Body
            style={{
              backgroundColor: "#30302f",
              lineHeight: "45px",
              boxShadow: "0 0 50px -3px #f199b3",
            }}
          >
            {/* <h2 className="text-center mb-4">Add Product</h2> */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group id="Store_Name" style={{ marginBottom: "25px" }}>
                <Form.Control
                  type="Store_Name"
                  placeholder="Store Name"
                  ref={storeNameRef}
                  required
                />
              </Form.Group>
              <Form.Group id="title" style={{ marginBottom: "25px" }}>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  ref={titleRef}
                  required
                />
              </Form.Group>
              <Form.Group id="tag" style={{ marginBottom: "25px" }}>
                <Form.Control
                  type="tag"
                  placeholder="Product Tag"
                  ref={tagRef}
                  required
                />
              </Form.Group>
              <Form.Group id="price" style={{ marginBottom: "25px" }}>
                <Form.Control
                  type="price"
                  placeholder="Enter price"
                  ref={priceRef}
                  required
                />
              </Form.Group>
              <Form.Group id="des" style={{ marginBottom: "25px" }}>
                <Form.Control
                  type="des"
                  placeholder="Enter Description"
                  ref={desRef}
                  required
                />
              </Form.Group>
            </Form>

            <input type="file" onChange={handleOnChange} />
            <div className="w-100 text-center mt-2">
              <Button onClick={handleUpload}>Upload</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
