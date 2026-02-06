const UserDataForm = (data) => {

  const collectdata = {}; //duplicate sending data and only sending edited data
  const propertyNames = Object.keys(data);

  propertyNames.forEach((proName) => {

    switch (proName) { //changing property and data
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
        if(data[proName] === "Yes"){
            collectdata.available = true;
        }else{
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

export { UserDataForm };
