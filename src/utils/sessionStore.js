const sessionIDtoUserMap = new Map();

const setUser = (id, user) => {
    sessionIDtoUserMap.set(id, user);
};

const getUser = id => {
    return sessionIDtoUserMap.get(id);
};

export { setUser, getUser };
