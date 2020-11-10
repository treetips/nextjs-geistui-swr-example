module.exports = () => {
  const formatDate = (date) => {
    var yyyy = date.getFullYear();
    var MM = ("00" + (date.getMonth() + 1)).slice(-2);
    var dd = ("00" + date.getDate()).slice(-2);
    return `${yyyy}-${MM}-${dd}`;
  };

  const getRandomDeadline = () => {
    var d1 = new Date(formatDate(new Date()));
    var d2 = new Date(d1.setDate(d1.getDate() + 30));
    var c = (d2 - d1) / 86400000;
    var x = Math.floor(Math.random() * (c + 1));
    d1.setDate(d1.getDate() + x);
    return formatDate(d1);
  };

  const DATA_NUMBER = 16;
  const data = [];
  for (let i = 0; i < DATA_NUMBER; i++) {
    const no = i + 1;
    data.push({
      id: no,
      title: `title ${no}`,
      deadline: getRandomDeadline(),
      complete: i % 2 === 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return {
    todo: data,
  };
};
