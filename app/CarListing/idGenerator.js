const idGenerator = (carTitle) => {
    const CarTitleWithoutspace = carTitle.replace(/\s+/g, '');
    let randomNumber = Math.floor(10000 + Math.random() * 90000);
    return CarTitleWithoutspace + randomNumber;
}

export default idGenerator;
