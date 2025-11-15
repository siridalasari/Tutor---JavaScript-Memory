const assignedAddresses = [];

const isUniqueAddress = (address) => {
    if (!assignedAddresses.includes(address)) {
        assignedAddresses.push(address);
        return true;
    }
    return false;
}

const random = () => {
    const address = (Math.floor(Math.random() * 1000) + 100) - 100;
    const uniqueAddress = isUniqueAddress(address) ? address : random();
    return uniqueAddress;
}

export const getHeapAddress = () => {
    const preAddress = '0xss';
    const address = random();
    return preAddress + address;
}
