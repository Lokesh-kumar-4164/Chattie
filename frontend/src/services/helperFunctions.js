

export const pushToFront = (contacts, id, lastMessage) => {
    let idx = 0, n = contacts.length

    for(let i=0;i<n;i++){
        if(contacts[i]._id === id){
            idx = i;
            contacts[i].message = lastMessage
            break;
        }
    }
    
    const newContacts = [...contacts];
    newContacts.splice(idx, 1);
    newContacts.unshift(contacts[idx]);
    return newContacts
}