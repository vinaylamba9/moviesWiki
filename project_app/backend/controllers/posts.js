const Actor = require("../models/actor");
const Movie = require("../models/movie");

exports.createActor = (req,res,next) => {
    console.log(req.body);
    const actor = new Actor({
      name: req.body.name,
      gender: req.body.gender,
      dob: req.body.dob,
      bio: req.body.bio
    });
    actor.save().then(createdActor => {
      res.status(201).json({
        message: "actor posted successfully",
        actor: {
          ...createdActor,
          id: createdActor._id
        }
      });
    }).catch(error =>{
      res.status(500).json({
        message: "creating actor failed!"
      });
    });
}

exports.getActors = (req, res, next) => {
  let fetchedActors;
  Actor.find()
    .then(documents => {
      fetchedActors = documents;
      return Actor.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Actors fetched successfully!",
        actors: fetchedActors
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching actors failed!"
      });
    });
};

exports.getActor = (req,res,next) =>{
  Actor.findById(req.params.id).then(actor =>{
    if(actor){
      res.status(200).json(actor);
    }else{
      res.status(500).json({message:"Post not found!"});
    }
  }).catch(error =>{
    res.status(500).json({
      message: "Fetching actor Failed."
    })
  })
}

exports.updateActor = (req, res, next) => {
  const actor = new Actor({
    _id: req.params.id,
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    bio: req.body.bio
  });
  Actor.updateOne({ _id: req.params.id}, actor)
    .then(result => {
      if (result) {
        res.status(200).json({ message: "Update successful!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};

exports.deleteActor = (req, res, next) => {
  Actor.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      if (result) {
        res.status(200).json({ message: "Deletion successful!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};

//Movies controllers

exports.createMovie = (req,res,next) =>{
  const movie = new Movie({
    name: req.body.name,
    year: req.body.year,
    story: req.body.story,
    cast: req.body.cast,
    poster: req.body.poster
  });
  movie.save().then(createdMovie => {
    res.status(201).json({
      message: "movie posted successfully",
      movie: {
        ...createdMovie,
        id: createdMovie._id
      }
    });
  }).catch(error =>{
    res.status(500).json({
      message: "creating movie failed!"
    });
  });
}

exports.getMovies = (req, res, next) => {
  let fetchedMovies;
  Movie.find()
    .then(documents => {
      fetchedMovies = documents;
      return Movie.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Movies fetched successfully!",
        movies: fetchedMovies
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching movies failed!"
      });
    });
};

exports.getMovie = (req,res,next) =>{
  Movie.findById(req.params.id).then(movie =>{
    if(movie){
      res.status(200).json(movie);
    }else{
      res.status(500).json({message:"Movie not found!"});
    }
  }).catch(error =>{
    res.status(500).json({
      message: "Fetching movie Failed."
    })
  })
}

exports.updateMovie = (req, res, next) => {
  const movie = new Movie({
    _id: req.params.id,
    name: req.body.name,
    year: req.body.year,
    story: req.body.story,
    cast: req.body.cast,
    poster: req.body.poster
  });
  Movie.updateOne({ _id: req.params.id}, movie)
    .then(result => {
      if (result) {
        res.status(200).json({ message: "Update successful!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate movie!"
      });
    });
};

exports.deleteMovie = (req, res, next) => {
  Movie.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      if (result) {
        res.status(200).json({ message: "Deletion successful!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};
