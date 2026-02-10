import { useState } from "react";
import LocationPicker from "@/components/MapUI/LocationPicker.tsx";
import "./createcompany.css";

export default function CreateCompany() {
   type Location ={lng:number, lat:number};
  const [ownerType, setOwnerType] = useState<String>("me");
  const [location, setLocation] = useState<Location | null>(null);
  const [companyData,setcompanyData] = useState({});

  return (
    <div className="createCompany">
    <div className="company-container">
      <h1>Create Company</h1>
      <p className="subtitle">Register your business to reach nearby users</p>

      <div className="company-form">
        <div className="form-group">
          <label>Company Name *</label>
          <input type="text" placeholder="Iron Gym" required />
        </div>


        <div className="form-group">
          <label>Owner *</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="me"
                checked={ownerType === "me"}
                onChange={() => setOwnerType("me")}
              />
              It’s me
            </label>

            <label>
              <input
                type="radio"
                value="other"
                checked={ownerType === "other"}
                onChange={() => setOwnerType("other")}
              />
              Add owner name
            </label>
          </div>

          {ownerType === "other" && (
            <input type="text" placeholder="Owner full name" />
          )}
        </div>


        <div className="form-group">
          <label>Category *</label>
          <select required>
            <option value="">Select category</option>
            <option>IT</option>
            <option>GYM</option>
            <option>MARKET</option>
            <option>EDUCATION</option>
            <option>HEALTH</option>
            <option>OTHER</option>
          </select>
        </div>


        <div className="form-row flex-col sm:flex-row">
          <div className="form-group">
            <label>Company Email *</label>
            <input type="email" placeholder="info@company.com" required />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input type="tel" placeholder="+91 98765 43210" required />
          </div>
        </div>


        <div className="form-group">
          <label>Company Logo (optional)</label>
          <input type="file" accept="image/*" />
        </div>


        <div className="form-group">
          <label>About Company (optional)</label>
          <textarea rows={4} placeholder="Tell us about your company..." />
        </div>


        <div className="form-group">
          <label>Certificate (optional)</label>
          <input type="file" />
        </div>

        <div className="form-group">
          <label>Company Location *</label>
          <LocationPicker onSelect={setLocation} Selected={location}/>
          {location && (
            <p className="location-preview">
              📍 Lat: {location.lat}, Lng: {location.lng}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Website (optional)</label>
          <input type="url" placeholder="https://company.com" />
        </div>

        <button className="submit-btn">Create Company</button>
      </div>
    </div>
    </div>
  );
}
