import * as usersService from "../utilities/users-service";

function OrderHIstoryPage() {
  const handleCheckToken = async () => {
    const exDate = await usersService.checkToken();
    console.log(exDate);
  };
  return (
    <div>
      <h1> Order History Page</h1>

      <button onClick={handleCheckToken}>"Check when My Login Expired"</button>
    </div>
  );
}

export default OrderHIstoryPage;
