import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {useFoodData} from "./context/FoodDataProvider";

import { useAuth0 } from "@auth0/auth0-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const ModalUpdate = ({
  foodName,
  id,
  created_by,
  pointsPerGram,
}) => {
  const { user, isAuthenticated } = useAuth0();

  const [showModal, setShowModal] = useState(false);
  const [newValue, setNewValue] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [showToolTip, setShowToolTip] = useState(true);
  const {updateData, getServerData, deleteData, isAdmin } = useFoodData();

  const handleShowModal = () => {
    setShowModal(true);
    if (pointsPerGram != null) {
      setNewValue(pointsPerGram);
      setFormIsValid(true);
    } else {
      setNewValue("");
      setFormIsValid(false);
    }

    setShowToolTip(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setShowToolTip(false);
  };
  const handleUpdate = () => {
    if (formIsValid && isAuthenticated) {
      updateData({
        id: id,
        name: foodName,
        points_per_gram: parseFloat(newValue),
        created_by: user.sub,
      }, isAdmin).then(() => {
        getServerData(true);
      });
      handleCloseModal();
    } else {
      setShowToolTip(true);
    }
  };

  const handleDelete = () => {
    deleteData(id,isAdmin).then(() => {
      getServerData(true);
    });
    handleCloseModal();
  };

  const validateFormData = (event) => {
    setShowToolTip(false);
    if (event.target.value == "") {
      setNewValue("");
      setFormIsValid(false);
    } else if (parseFloat(event.target.value) != NaN) {
      let digits = 0;
      if (event.target.value.includes(".")) {
        digits = event.target.value.split(".")[1].length;
      } else {
        digits = 0;
      }
      let leadZero = true;
      if (event.target.value.includes(".")) {
        if (event.target.value.split(".")[0].length == 0) {
          leadZero = false;
        }
      }
      let string = parseFloat(event.target.value).toFixed(digits).toString();
      if (leadZero == true) {
        setNewValue(string);
      } else {
        setNewValue("." + string.split(".")[1]);
      }

      setFormIsValid(true);
    }
  };

  function deleteNoOverlay(){
    return (
      <span>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </span>
    );
  }

  function renderDeleteWithOverlay() {
    if (created_by != "admin" || isAdmin) {
      return deleteNoOverlay();
    } else {
      return (
        <OverlayTrigger
          key={"tooltip-invalid2"}
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-invalid`}>
              {
                "This button is active to allow you to test backend API endpoint protection. You don't have access and this will fail."
              }
            </Tooltip>
          }
        >
          <span>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </span>
        </OverlayTrigger>
      );
    }
  }

  function updateNoWarningOverlay(){
    return (
      <OverlayTrigger
        key={"tooltip2"}
        placement={"top"}
        show={!formIsValid}
        overlay={<Tooltip id={`tooltip-update`}>{"Invalid entry"}</Tooltip>}
      >
        <span>
          <Button onClick={handleUpdate} disabled={!formIsValid}>
            Update
          </Button>
        </span>
      </OverlayTrigger>
    );

  }

  function renderUpdateWithOverlay() {
    if (!formIsValid || isAdmin) {
      return updateNoWarningOverlay();
    } else {
      if (created_by == "admin") {
        return (
          <OverlayTrigger
            key={"tooltip-update2"}
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-update`}>
                {
                  "This button is active to allow you to test backend API endpoint protection. You don't have access and this will fail."
                }
              </Tooltip>
            }
          >
            <span>
              <Button onClick={handleUpdate} disabled={!formIsValid}>
                Update
              </Button>
            </span>
          </OverlayTrigger>
        );
      } else {
        return (
          <span>
            <Button onClick={handleUpdate} disabled={!formIsValid}>
              Update
            </Button>
          </span>
        );
      }
    }
  }

  function renderUpdateAndDeleteButton() {
    if (isAuthenticated) {
      return (
        <>
          {renderUpdateWithOverlay()} {id != null && renderDeleteWithOverlay()}
        </>
      );
    } else {
      return (
        <>
          <OverlayTrigger
            key={"tooltip2"}
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-invalid-edit`}>
                {isAuthenticated ? "" : "You must be logged in to edit"}
              </Tooltip>
            }
          >
            <span>
              <Button onClick={handleUpdate} disabled={!isAuthenticated}>
                Update
              </Button>
            </span>
          </OverlayTrigger>
          {id != null && (
            <OverlayTrigger
              key={"tooltip"}
              placement={"top"}
              // show={!isAuthenticated}
              //This show later could be based on privilidges
              overlay={
                <Tooltip id={`tooltip-invalid-delete`}>
                  {"You must be logged in to delete"}
                </Tooltip>
              }
            >
              <span>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={!isAuthenticated}
                >
                  Delete
                </Button>
              </span>
            </OverlayTrigger>
          )}
        </>
      );
    }
  }
  return (
    <Button onClick={handleShowModal} disabled={foodName == ""}>
      <div className="food-button-icon">
      {id != undefined ? <FontAwesomeIcon icon={solid("pen")} />: <FontAwesomeIcon icon={solid("pen-to-square")} />}
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{"Edit Definition: " + foodName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                handleUpdate();
              }}
            >
              <FloatingLabel label={"Points Per gram"}>
                <Form.Control
                  value={newValue}
                  placeholder="meow"
                  type="number"
                  onChange={(event) => {
                    validateFormData(event);
                  }}
                />
              </FloatingLabel>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            {renderUpdateAndDeleteButton()}
          </Modal.Footer>
        </Modal>
      </div>
    </Button>
  );
};

export default ModalUpdate;
