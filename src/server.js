const express = require('express')
const petService = express()
const port = 3000
const pets = [];
petService.use(express.json());

petService.get('/pet', (req, res) => {
    res.json(pets)
})

petService.post('/pet', (req, res) => {
    if (!req.body.name) {
        res.status(404).json(
            getErrorBody("Parameter", "Parameter 'name' not set."));
        return;
    }
    const newPet = {
        id: pets.length + 1,
        name: req.body.name,
        type: req.body.type,
        age: req.body.age
    };
    pets.push(newPet);
    res.status(201).json(newPet);
})

petService.put('/pet', (req, res) => {
    const newPet = updatePet(parseInt(req.body.id), req.body.name, req.body.type, req.body.age)
    if (!newPet) {
        res.status(404).json(
            getErrorBody("API", "Pet not found."));
        return;
    }
    res.status(200).json(newPet);
})

petService.put('/pet/:id', (req, res) => {
    const newPet = updatePet(parseInt(req.params.id), req.body.name, req.body.type, req.body.age)
    if (!newPet) {
        res.status(404).json(
            getErrorBody("API", "Pet not found."));
        return;
    }
    res.status(200).json(newPet);
})

petService.delete('/pet/:id', (req, res) => {
    const petId = parseInt(req.params.id);
    const petIndex = pets.findIndex(pet => pet.id === petId);
    if (petIndex === -1) {
        res.status(404).json(
            getErrorBody("API", `Pet with id '${petId}' was not found.`));
        return;
    }
    pets.splice(petIndex, 1);
    res.status(202).json(
        getSuccessBody(`Pet with id '${petId}' was deleted.`));
})

petService.listen(port, () => {
    console.log(`Pet API Microservice is listening on port ${port}.`)
})

// --- helper ---

const updatePet = (id, name, type, age) => {
    const pet = pets.find(pet => pet.id === id);
    if (pet) {
        pet.name = name || pet.name;
        pet.type = type || pet.type;
        pet.age = age || pet.age;
    }
    return pet;
}

const getSuccessBody = (message) => {
    return {
        type: "success",
        message: message
    };
}

const getErrorBody = (ex, message) => {
    return {
        type: `${ex} Exception`,
        errorMessage: message
    };
}