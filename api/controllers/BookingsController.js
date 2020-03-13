export default class BookingsController {

  createABooking = (req, res) => {
    var booking = req.body;
    if (booking.clientId) {
      res.status(200).json({
        booking: {}
      });
    } else {
      res.status(200).json({
        error: {
          id: 1,
          message: "Invalid client id"
        }
      });
    }
  };
}