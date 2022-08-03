export const FETCH_HOUSES = "FETCH_HOUSES";
export const CREATE_HOUSES = "CREATE_HOUSES";
export const DELETE_HOUSES = "DELETE_HOUSES";
export const UPDATE_HOUSE = "UPDATE_HOUSE";

export const fectchHousesData = () => {
  return async (dispatch) => {
    const result = await fetch("http://10.0.2.2:3000/");
    const finalResult = await result.json();
    // console.log(finalResult);
    dispatch({
      type: FETCH_HOUSES,
      payload: finalResult,
    });
  };
};

export const createHouseData = ({
  title,
  image,
  homeType,
  price,
  yearBuilt,
  address,
  description,
}) => {
  return async (dispatch) => {
    const response = await fetch("http://10.0.2.2:3000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
        homeType,
        price,
        yearBuilt,
        address,
        description,
      }),
    });
    const responseData = await response.json();
    dispatch({
      type: CREATE_HOUSES,
      payload: responseData,
    });
  };
};

export const deleteHouseData = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://10.0.2.2:3000/delete/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.text();
    console.log(responseData);
    dispatch({
      type: DELETE_HOUSES,
      payload:id
    });
  };
};

export const updateHouseData=({id,title,image,homeType,price,description,address,yearBuilt})=>{
  return async (dispatch)=>{
    const response=await fetch(`http://10.0.2.2:3000/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
          title,
          image,
          homeType,
          price,
          yearBuilt,
          address,
          description,
        }),
      });
  
    const responseData=await response.json();
    //console.log("After Updating");
    //console.log(responseData);
    dispatch({
      type:UPDATE_HOUSE,
      payload:responseData
    })
  }

}