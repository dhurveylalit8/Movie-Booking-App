
# Movie Booking Application

This project is node.js back-end code for a movie booking application that can create various entities like users, movies, theatres, bookings and payments as well as perform various actions on them.


## Features

- Account Creation
You can create accounts for user as well as theatre owner.
If the user is a customer, the account will autometically be approved on verification.
In case of theatre owner, an admin will have to approve the account.
JSON Web Token used for authentication.cd
Users can also update some details like name, password and email.
Admin can update additional details like userType and userStatus.
User search is also available for users with proper authorization.
- Movie API
An admin can create a new movie, Edit an existing movie and delete an existing movie.
All registered users can get a list of all movies as well as a single movie using movieId.
- Theatre API
A theatre owner or an admin can create a new theatre, Edit their existing theatre and delete their existing theatre.
All registered users can get a list of all theatres as well as a single theatre using theatreId.
All registered users can get a list of all the movies released in a single theatre using theatreId.
A theatre owner or an admin can add or remove a new movie in an existing theatre.
- Booking API
All registered users can create a new booking and update their existing booking.
All registered users can get a list of all of their bookings as well as a single booking using bookingId.
An admin can get the list of all the bookings.
- Payment API
All registered users with a booking can create a payment for their booking.
All registered users can get a list of all of their payments as well as a single payment using paymentId.
An admin can get the list of all the payments.


## REST API Paths
User creation and operations
#### Sign-up

```http
  POST /mba/api/v1/auth/signup
```
Register user with name, userId, email, password and user type

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Get all users (Query params userType and userStatus supported)

```http
  GET /mba/api/v1/users/:id
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

#### Sign-in

```http
  POST /mba/api/v1/auth/signin
```
User Sign-in using userId and password.

