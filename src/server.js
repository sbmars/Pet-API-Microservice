const express = require('express')
const petService = express()
const port = 3000
const pets = [];
petService.use(express.json());

petService.get('/pet', (req, res) => {
    res.json(pets)
})

petService.post('/pet', (req, res) => {
    if (req.body.name) {
        const newPet = {
            id: pets.length + 1,
            name: req.body.name,
            type: req.body.type,
            age: req.body.age
        };
        pets.push(newPet);
        res.status(201).json(newPet);
    } else {
        res.status(404).json({"type":"Parameter Exception", errorMessage: "Parameter name is not set "});
    }

})

petService.put('/pet', (req, res) => {
    const newPet = updatePet(parseInt(req.body.id), req.body.name, req.body.type, req.body.age)
    if (newPet) {
        res.status(200).json(newPet);
    } else {
        res.status(404).json({"type":"API Exception", errorMessage: "Pet not found"});
    }
})

petService.put('/pet/:id', (req, res) => {
    const newPet = updatePet(parseInt(req.params.id), req.body.name, req.body.type, req.body.age)
    if (newPet) {
        res.status(200).json(newPet);
    } else {
        res.status(404).json({"type":"API Exception", errorMessage: "Pet not found"});
    }
})

petService.delete('/pet/:id', (req, res) => {
    const petId = parseInt(req.params.id);
    const petIndex = pets.findIndex(pet => pet.id === petId);
    if (petIndex >= 0) {
        pets.splice(petIndex, 1);
        res.status(204).json({"type":"success", errorMessage: `Pet with id ${petId} deleted`});
    } else {
        res.status(404).json({"type":"API Exception", errorMessage: "Pet not found"});
    }
})


petService.listen(port, () => {
    console.log(`Pet API Microservice is listening on port ${port}`)
})


const updatePet = (id, name, type, age) => {
    const pet = pets.find(pet => pet.id === id);
    if (pet) {
        pet.name = name || pet.name;
        pet.type = type || pet.type;
        pet.age = age || pet.age;
    }
    return pet;
}