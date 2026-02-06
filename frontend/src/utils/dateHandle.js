function milliTOdate(milli) {
    let dateview;
    const date=new Date(milli);
    dateview=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    return dateview;
    
}
export {milliTOdate};