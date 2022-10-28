import models from "../../models";


let users = [{
    'id': '1', 'username': 'test001'
}];

export const getAllUsers = async () => {
    return users;
}


export const saveUser = async (user) => {
    const model = new models.User(user);
    users.push(model);
    return model;
};

export const getUserById = async(id) =>{
    console.log(id, "into mockes");
    let model = users.find(item => item.id === id);
    return model
}

export const update = async (user) =>{
    users[0].username = user.username;
    return users[0];
}

export const deleteById = async(id) =>{
    users=[];
}