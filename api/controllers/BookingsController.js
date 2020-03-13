export default class BookingsController {

  createABooking = (req, res) => {
    var booking = req.body;
    if (!this.#isAValidClientId(booking.clientId)) {
      res.status(200).json({
        error: {
          id: 1,
          message: "Invalid client id"
        }
      });
    } 
  };

  #isAValidClientId(clientId) {
    return clientId && clientId > 0
  }
}