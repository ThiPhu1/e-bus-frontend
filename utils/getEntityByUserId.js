const getEntityItemByUserId = (entityList,userId) => {
    const filteredEntityList = entityList?.filter((order)=> order?.user?._id === userId);
    return filteredEntityList;
}

export default getEntityItemByUserId;