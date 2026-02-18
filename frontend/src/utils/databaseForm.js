// @ts-nocheck
const UserDataForm = (data) => {
  const collectdata = {}; //duplicate sending data and only sending edited data
  const propertyNames = Object.keys(data);

  propertyNames.forEach((proName) => {
    switch (
      proName //changing property and data
    ) {
      case "name":
        collectdata.name = data[proName];
        break;
      case "email":
        collectdata.email = data[proName];
        break;
      case "phone":
        collectdata.phone_on = data[proName];
        break;
      case "address":
        collectdata.address = data[proName];
        break;
      case "gender":
        collectdata.gender = data[proName];
        break;
      case "available":
        if (data[proName] === "Yes") {
          collectdata.available = true;
        } else {
          collectdata.available = false;
        }
        break;
      default:
        break;
    }
  });
  console.log(collectdata);
  return collectdata;
};
const DashboardDataForm = (data) => {
  const collectdata1 = {}; //main data colloction
  const collectdata2 = {}; //location data collection
  const propertyNames = Object.keys(data);

  propertyNames.forEach((proName) => {
    switch (
      proName //changing property and data
    ) {
      case "name":
        collectdata1.companyName = data[proName];
        collectdata2.companyName = data[proName];
        break;
      case "address":
        collectdata1.address = data[proName];
        collectdata2.address = data[proName];
        break;
      case "lat":
        if (data[proName] != undefined && data[proName] != null) {
          collectdata2.latitude = data[proName];
        } else {
          collectdata2.latitude = 0;
        }
        break;
      case "lng":
        if (data[proName] != undefined && data[proName] != null) {
          collectdata2.longitude = data[proName];
        } else {
          collectdata2.longitude = 0;
        }
        break;
      case "owner":
        collectdata1.owner = data[proName];
        break;
      case "category":
        collectdata1.category = data[proName];
        break;
      case "started":
        collectdata1.startedOrg = data[proName];
        break;
      case "companyEmail":
        collectdata1.companyEmail = data[proName];
        break;
      case "about":
        collectdata1.about = data[proName];
        break;
      case "address":
        collectdata1.address = data[proName];
        break;
      case "members":
        data[proName] > 0
          ? (collectdata1.employees = data[proName])
          : (collectdata1.employees = 0); // avoiding negative
        break;
      default:
        break;
    }
  });
  return { companyData: collectdata1, location: collectdata2 };
};

export { UserDataForm, DashboardDataForm };
