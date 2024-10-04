module.exports = {
  imageUrlRegEXP: new RegExp('/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g'),
  dateRegEXP: new RegExp('\d{1,2}\/\d{1,2}\/\d{2,4}'),
  matchImageUrl: (imageUrl, res) => {
    if (!imageUrl.match(this.imageUrlRegEXP)) {
      return res.status(400).send({ message: "Invalid image url" });
    }
  },
  matchDate: (date, res) => {
    if (!date.match(this.dateRegEXP)) {
      return res.status(400).send({ message: "Invalid date format" });
    }
  }
}