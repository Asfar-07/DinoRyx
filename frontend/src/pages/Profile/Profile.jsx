import React, { useState, useEffect } from "react";
import { handleUser } from "../../features/user/userService";
import { addUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { milliTOdate } from "../../utils/dateHandle";
import "./profile.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({joindate:""});
  const [update_profile, setUpdateprofile] = useState({});

  let navigate = useNavigate();
  const dispatch=useDispatch();

  useEffect(() => {
    handleUser
      .fetchuser()
      .then((data) => {
        dispatch(addUser(data));
        console.log(data);
        setProfile(data)
        setProfile(P=>({...P,joindate:milliTOdate(data.joindate)}))
      })
      .catch((e) => {
        e.response?.status === 401 && navigate("/login");
      });
  }, [navigate, dispatch]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setUpdateprofile({ ...update_profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Profile:", update_profile);
    handleUser
      .updateUser(update_profile)
      .then((data) => {
        setUpdateprofile({})
        dispatch(addUser(profile));
      })
      .catch((e) => {
        console.log(e.response.status);
        e.response?.status === 401 && navigate("/login");
      });
  };

  const deleteAccount= ()=>{
    handleUser.removeUser().then((data) => {

      })
      .catch((e) => {
        console.log(e.response.status);
        e.response?.status === 401 && navigate("/login");
      });
  }

  return (
    <>
      <Navbar />
       <div className="account-dashboard">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/120"
            alt="profile"
            className="profile-img"
          />
          <span className="status">● Online</span>
        </div>

        {isEditing ? (
          <div className="edit-form">
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone"
            />

            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Address"
            />

            <select
              name="available"
              value={profile.available}
              onChange={handleChange}
            >
              <option>Yes</option>
              <option>No</option>
            </select>

            <button className="btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <>
            <h3>
              {profile.name} <span className="new-badge">NEW</span>
            </h3>
            <p className="username">{profile.username}</p>

            <button className="btn-outline">
              Preview Fiverr Profile
            </button>

            <div className="profile-info">
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone === null ? "null" :profile.phone}</p>
              <p><strong>Gender:</strong> {profile.gender === null ? "null" : profile.gender}</p>
              <p><strong>Address:</strong> {profile.address === null ? "null" : profile.address}</p>
              <p><strong>Available:</strong> {profile.available === false ? "NO":"YES"}</p>
              <p><strong>Member since:</strong> {profile.joindate}</p>
            </div>

            <button
              className="btn-outline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </>
        )}

        <div className="intro-video">
          <p>
            <strong>Intro video</strong>{" "}
            <span className="beta">BETA</span>
          </p>
          <button className="btn-primary">Get started</button>
        </div>
      </div>

      <div className="gig-section">
        <h2>ACTIVE GIGS</h2>

        <div className="gig-grid">
          <div className="gig-card">
            <img
              src="https://via.placeholder.com/300x180"
              alt="gig"
              className="gig-img"
            />
            <p className="gig-title">
              I will help you design better landing pages
            </p>
            <p className="gig-price">
              STARTING AT <strong>$10</strong>
            </p>
          </div>

          <div className="gig-card create-gig">
            <div className="plus">+</div>
            <p>Create a new Gig</p>
          </div>
        </div>
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
    </>
  );
}
