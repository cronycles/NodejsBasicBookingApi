

export default class BookingsController {
  #bookingService;

  constructor(BookingService) {
    this.#bookingService = BookingService;
  }
  createABooking = (req, res) => {
    var booking = req.body;
    if (!this.#bookingService.isAValidClientId(booking.clientId)) {
      res.status(200).json({
        error: {
          id: 1,
          message: "Invalid client id"
        }
      });
    } 
  };

 
}