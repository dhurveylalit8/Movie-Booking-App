const User = require('./models/user.model')
const Movie = require('./models/movie.model')
const Theatre = require('./models/theatre.model')
const constants = require('./utils/constant')
const bcrypt = require('bcryptjs')
const Booking = require('./models/booking.model')
const Payment = require('./models/payment.model')

module.exports = async ()=>{
    try{

        await User.collection.drop();
        console.log("___ User collection dropped ___");
        await Movie.collection.drop();
        console.log("____ Movie collection dropped ____");
        await Theatre.collection.drop();
        console.log("____ Theatre collection dropped ____");
        await Booking.collection.drop();
        console.log("Booking collection dropped ");
        await Payment.collection.drop();
        console.log("____ Payment collection dropped ____");

        await User.create({
            name : "Admin",
            userId : "admin",
            password : bcrypt.hashSync("Adminadmin@1",8),
            email : "admin@example.com",
            userType : constants.userType.admin
        });


        console.log("____ Admin user created ____");

        const users = [];
        users[0] = {
            name : "Customer1",
            userId : "customer1",
            password : bcrypt.hashSync("Customer@1",8),
            email : "customer1@example.com",
            userType : constants.userType.customer
        },
        users[1] = {
            name : "Theatre Owner 1",
            userId : "theatreOwner1",
            password : bcrypt.hashSync("TheatreOwner@1",8),
            email : "theatre1@example.com",
            userType : constants.userType.theatre_owner
        },
        users[2] = {
            name : "Theatre Owner 2",
            userId : "theatreOwner2",
            password : bcrypt.hashSync("TheatreOwner@2",8),
            email : "theatre2@example.com",
            userType : constants.userType.theatre_owner
        },

        usersCreated = await User.insertMany(users);

        const theatres = [];
        theatres[0] = {
            ownerId : usersCreated[1]._id,
            name : "Theatre 1",
            description : "Description for theatre 1",
            city : "Mumbai",
            pincode : 400049,
            showTypes : [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 100,
            ticketPrice : 145
        },
        theatres[1] = {
            ownerId : usersCreated[2]._id,
            name : "Theatre 2",
            description : "Description for theatre 2",
            city : "Ahmedabad",
            pincode : 380007,
            showTypes : [constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 50,
            ticketPrice : 120
        },
        theatres[2] = {
            ownerId : usersCreated[2]._id,
            name : "Theatre 3",
            description : "Description for theatre 3",
            city : "New Delhi",
            pincode : 110031,
            showTypes : [constants.theatreShows.evening],
            numberOfSeats : 75,
            ticketPrice : 235
        }

        theatresCreated = await Theatre.insertMany(theatres);
        await usersCreated[1].theatreOwned.push(theatresCreated[0]._id);
        await usersCreated[2].theatreOwned.push(theatresCreated[1]._id, theatresCreated[2]._id);
        await usersCreated[1].save();
        await usersCreated[2].save();

        const movies = [];
        movies[0] = {
            name : "Movie 1",
            description : "Description for movie 1",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["English","Hindi"],
            releaseDate : 2022-10-10,
            releaseStatuses : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        },
        movies[1] = {
            name : "Movie 2",
            description : "Description for movie 2",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["English","Hindi"],
            releaseDate : 2022-09-09,
            releaseStatuses : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        },
        movies[2] = {
        name : "Movie 3",
        description : "Description for movie 3",
        casts : ["SomeOne", "SomeOneElse"],
        trailerUrls : ["TrailerURL"],
        posterUrls : ["PosterURL"],
        languages : ["English","Hindi"],
        releaseDate : 2022-12-12,
        releaseStatuses : constants.movieReleaseStatuses.coming_soon,
        imdbRating : 8.5,
        genre : [constants.movieGenre.action]
        }

        moviesCreated = await Movie.insertMany(movies);

        await theatresCreated[0].movies.push(moviesCreated[0]._id, moviesCreated[1]._id)
        await moviesCreated[0].theatres.push(theatresCreated[0]._id)
        await moviesCreated[1].theatres.push(theatresCreated[0]._id)
    
        await theatresCreated[0].save()
        await moviesCreated[0].save()
        await moviesCreated[1].save()

        const booking = await Booking.create({
            totalCost : 200,
            theatreId : theatresCreated[0]._id,
            movieId : moviesCreated[0]._id,
            userId : usersCreated[0]._id,
            noOfSeats : 2,
            ticketBookedTime : Date.now(),
            status : constants.bookingStatuses.completed
        });
        console.log("booking: --------", booking);

        await usersCreated[0].myBookings.push(booking._id)
        await moviesCreated[0].bookings.push(booking._id)

        await usersCreated[0].save();
        await theatresCreated[0].save();
        await moviesCreated[0].save();

        const payment = await Payment.create({
            bookingId : booking._id,
            amount : 200,
            status : constants.paymentStatuses.success
        })

        await usersCreated[0].myPayments.push(payment._id);
        await usersCreated[0].save();


        console.log("____ Seed data initialized ____");
    }
    catch(err){
        console.log("____ Error in seed data initialization ____ ", err.message);
    }
}