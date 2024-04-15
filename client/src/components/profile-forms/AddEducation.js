import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEducation } from "../../redux/profileSlice";
import { Link, useNavigate } from "react-router-dom";

export const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const onChange = (e) => {
    setFormData((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addEducation(formData, navigate));
  };
  return (
    <React.Fragment>
      <h1 class="large text-primary">Add Your Education</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree"
            name="degree"
            value={formData.degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={formData.school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={formData.fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={formData.from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={formData.current}
              checked={formData.current}
              onChange={(e) => {
                setFormData((state) => {
                  return { ...state, current: !state.current };
                });
              }}
            />{" "}
            Current Job
          </p>
        </div>
        {!formData.current && (
          <div class="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={(e) => onChange(e)}
            />
          </div>
        )}
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={formData.description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </React.Fragment>
  );
};

export default AddEducation;
