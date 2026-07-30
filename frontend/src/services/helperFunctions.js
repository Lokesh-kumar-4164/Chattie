

export const pushToFront = (contacts, id, lastMessage) => {
    let idx = 0, n = contacts.length

    const newContacts = [...contacts];
    for(let i=0;i<n;i++){
        if(newContacts[i]._id === id){
            idx = i;
            newContacts[i] = { ...newContacts[i], message: lastMessage };
            break;
        }
    }
    const [movedContact] = newContacts.splice(idx, 1);
    newContacts.unshift(movedContact);
    return newContacts
}