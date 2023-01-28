const getOderByUserId = ({orders,userId}) => {
    const orderList = orders?.filter((order)=> order?.user?._id === userId);
    return orderList;
}

export default getOderByUserId;