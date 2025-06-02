import React, { useState } from "react";
import "./IssuerProfile.scss";

const IssuerProfile = ({ setLogo }) => {
  const [profile, setProfile] = useState({
    organization: "VeriFlux Institute",
    role: "Issuer",
    motto: "Verifying Trust, Empowering Proof",
    logo: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      const file = files[0];
      setProfile({ ...profile, logo: file });
      setLogo(file);
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Saved profile:", profile);
  };

  return (
    <div className="issuer-profile-wrapper">
      <h2 className="profile-title">Issuer Profile</h2>

      {!isEditing ? (
        <div className="profile-readonly">
          <div>
            <strong>Organization:</strong> {profile.organization}
          </div>
          <div>
            <strong>Role:</strong> {profile.role}
          </div>
          <div>
            <strong>Motto:</strong> {profile.motto}
          </div>
          <div className="profile-logo">
            <strong>Logo:</strong>
            {profile.logo ? (
              <img
                src={URL.createObjectURL(profile.logo)}
                alt="Logo"
                className="logo-image"
              />
            ) : (
              <span className="no-logo-text">No logo uploaded</span>
            )}
          </div>
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-row">
            <label>Organization Name</label>
            <input
              type="text"
              name="organization"
              value={profile.organization}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Motto</label>
            <input
              type="text"
              name="motto"
              value={profile.motto}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Logo Upload</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default IssuerProfile;
