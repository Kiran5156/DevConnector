import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProfile, getProfile } from "../../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
const EditProfile = () => {
  const profileData = useSelector((state) => state.profileSlice.profile);
  const isLoading = useSelector((state) => state.profileSlice.isLoading);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  useEffect(() => {
    dispatch(getProfile());
    console.log(profileData);
    if (isLoading === false) {
      setFormData({
        company: profileData.company ? profileData.company : "",
        website: profileData.website ? profileData.website : "",
        location: profileData.location ? profileData.location : "",
        status: profileData.status ? profileData.status : "",
        skills: profileData.skills ? profileData.skills : "",
        githubusername: profileData.githubusername
          ? profileData.githubusername
          : "",
        bio: profileData.bio ? profileData.bio : "",
        twitter: profileData.location ? profileData.location : "",
        facebook: profileData.location ? profileData.location : "",
        linkedin: profileData.location ? profileData.location : "",
        youtube: profileData.location ? profileData.location : "",
        instagram: profileData.location ? profileData.location : "",
      });
    }
  }, [isLoading]);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, navigate));
  };
  const onChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <React.Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select
            name="status"
            value={formData.status}
            onChange={(e) => onChange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={formData.company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={formData.website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={formData.skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={formData.githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={formData.bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            onClick={() => toggleSocialInputs((state) => !state)}
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <React.Fragment>
            <div className="form-group social-input">
              {/* <i className="fab fa-twitter fa-2x"></i> */}
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={formData.twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              {/* <i className="fab fa-facebook fa-2x"></i> */}
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={formData.facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              {/* <i className="fab fa-youtube fa-2x"></i> */}
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={formData.youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              {/* <i className="fab fa-linkedin fa-2x"></i> */}
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={formData.linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              {/* <i className="fab fa-instagram fa-2x"></i> */}
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={formData.instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </React.Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </React.Fragment>
  );
};

export default EditProfile;
