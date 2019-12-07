var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.getTickets = (callback) => {
    Models.Ticket.findAll()
        .then(result => {
          console.log("getting all tickets...");
          return callback(null, result);
        })
        .catch(err => {
          console.log("error");
          console.log(err);
          return callback(err, false);
        });
}

exports.getTicketById = (id, callback) => {
  Models.Ticket.findAll({
    // subQuery: false,
    where: {
      [Op.and]: [{ customerId: id }]
    },
    required: true,
    include: [
      {
        model: Models.Schedule,
        as: "screeningIdTicket",
        required: true,
        where: {
          screeningId: Sequelize.col('Ticket.screeningId')
        },
        include: [
          {
            model: Models.Movie,
            as: "movieIdSchedule",
            // where: {
            //   movieId: Sequelize.col('Schedule.movieId')
            // }
          }
        ]
      }
    ]
  })
  .then(result => {
    console.log("getting all tickets...");
    return callback(null, result);
  })
  .catch(err => {
    console.log("error");
    console.log(err);
    return callback(err, false);
  });
}

exports.deleteTickets = (tickets, callback) => {
  console.log(tickets)
  tickets.forEach((ticket, index) => {
    console.log(ticket)
    console.log(index)
    if (Object(tickets).length === index+1) {
      const res = {"result": "OK"}
      console.log("tickets deleted...");
      return callback(null, res);
    }
    console.log("deleting tickets...")
    Models.Ticket.destroy({
      where: {
            [Op.and]: [{id: ticket}]
          }
    }, err => {
      if (err) {
        console.log("error");
        console.log(err);
        return callback(err, false);
      }
    });
    // Models.Ticket.findAll({
    //   where: {
    //     [Op.and]: [{id: ticket}]
    //   }
    // }, result => {
    //   console.log(result)
    //   result.destroy( err => {
    //     if (err) {
    //       console.log("error");
    //       console.log(err);
    //       return callback(err, false);
    //     }
    //   });
    // });
  });
}