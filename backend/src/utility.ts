export const generateRandomId = () => {
    return Math.random().toString(16).substring(2, 8);
}

// Math.random() generates random number between 0 to 1 
// toString(16) converts the number to hexadecimal
// substring(2, 8) takes the substring starting from the 2nd index to the 8th index since the first two characters are 0 and .