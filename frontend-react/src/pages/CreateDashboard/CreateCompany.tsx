import { useState, useEffect } from "react";
import LocationPicker from "@/components/MapUI/LocationPicker.tsx";
import "./createcompany.css";
import { handleDashboard } from "@/features/dashboard/dashboardService";
import GeneralLoader from "@/components/Loader/GeneralLoader";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CreateCompany() {
  type Location = { lng: number, lat: number };
  type FormData = {
    name?: string, address?: string,
    owner?: string,
    companyEmail?: string,
    phoneNo?: string,
    about?: string,
    started?: string,
    category?: string, members?: number, lng?: number, lat?: number
  }
  const [ownerType, setOwnerType] = useState<String>("me");
  const [location, setLocation] = useState<Location | null>(null);
  const [newDashData, setNewDashData] = useState<FormData>({
    name: '',
    address: '',
    owner: 'me',
    companyEmail: '',
    phoneNo: '',
    started: '',
    category: '',
    about: '',
    members: 0

  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate= useNavigate();

  useEffect(() => {
    setNewDashData(d => ({ ...d, lng: location?.lng, lat: location?.lat }))
  }, [location])

  const handleChange = (e: React.ChangeEvent<any>) => {
    setNewDashData({ ...newDashData, [e.target.name]: e.target.value });

  };
  const handleSubmitServer = () => {
    if (isLoading) return;
    setIsLoading(true);
    handleDashboard.createDashboard(newDashData) 
    .then((res) => {
    setNewDashData({});
    setIsLoading(false);
    navigate("/user/manage/dashboard?dbID="+res);
    }).catch((e) => {
      setIsLoading(false);
      console.log(e)
    })
  }

  return (
    <div className="createCompany">
      {isLoading && <GeneralLoader size={30} />}
      <div className="company-container">
        <h1>Create Company</h1>
        <p className="subtitle">Register your business to reach nearby users</p>

        <div className="company-form">
          <div className="form-group">
            <label>Company Name *</label>
            <input type="text" placeholder="Iron Gym" name="name" value={newDashData?.name} onChange={handleChange} required />
          </div>


          <div className="form-group">
            <label>Owner *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="owner"
                  value="me"
                  checked={ownerType === "me"}
                  onChange={(e) => {handleChange(e); setOwnerType("me")}}
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
              <input type="text" value={newDashData.owner} name="owner" onChange={handleChange}  placeholder="Owner full name" />
            )}
          </div>


          <div className="form-group">
            <label>Category *</label>
            <Select value={newDashData?.category || ""}
              onValueChange={(value) =>
                setNewDashData((prev) => ({
                  ...prev,
                  category: value,
                }))
              }>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Select Your Field" />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="gym">GYM</SelectItem>
                  <SelectItem value="shop">Shop</SelectItem>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>


          <div className="form-row flex-col sm:flex-row">
            <div className="form-group">
              <label>Company Email *</label>
              <input type="email" value={newDashData.companyEmail} name="companyEmail" onChange={handleChange} placeholder="info@company.com" required />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" value={newDashData.phoneNo} name="phoneNo" onChange={handleChange} placeholder="+91 98765 43210" required />
            </div>
          </div>

          <div className="form-row flex-col sm:flex-row">
            <div className="form-group">
              <div className="form-group">
                <label>When Started? *</label>
                <input type="date" value={newDashData.started} name="started" onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <div className="form-group">
                <label>Members </label>
                <input type="number" value={newDashData.members} name="members" onChange={handleChange} required />
              </div>
            </div>
          </div>


          <div className="form-group">
            <label>Company Logo (optional)</label>
            <input type="file" accept="image/*" />
          </div>


          <div className="form-group">
            <label>About Company (optional)</label>
            <textarea value={newDashData?.about} name="about" onChange={handleChange} placeholder="Tell us about your company..." />
          </div>


          <div className="form-group">
            <label>Certificate (optional)</label>
            <input type="file" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={newDashData?.address} onChange={handleChange} placeholder="Enter your company address" />
          </div>

          <div className="form-group">
            <label>Company Location *</label>
            <LocationPicker onSelect={setLocation} Selected={location} />
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

          <button className="submit-btn" onClick={handleSubmitServer}>Create Company</button>
        </div>
      </div>
    </div>
  );
}
