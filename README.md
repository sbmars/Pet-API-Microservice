# Pet API Microservice

A simple Express-based microservice to manage pets. This API allows you to add, update, retrieve, and delete pets.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:sbmars/Pet-API-Microservice.git
   cd pet-api
   ```
   
2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Service
Start the server:

   ```bash
   npm run -s start
   ```
The service will start and listen on port 3000 by default. You can access it at http://localhost:3000.

## API Endpoints
### Get All Pets
* Endpoint: `GET /pet`
* Description: Retrieves a list of all pets.
* Response:
  * `200 OK`: Returns an array of pet objects.

### Add a New Pet
* Endpoint: `POST /pet`
* Description: Adds a new pet to the list.
* Request Body:

   ```bash
    {
      "name": "Buddy",
      "type": "Dog",
      "age": 4
    }
   ```
* Response:
  * `201 Created`: Returns the newly created pet object.
  * `404 Not Found`: Returns an error if the name parameter is missing.

### Update a Pet by ID (Request Body)
* Endpoint: `PUT /pet`
* Description: Updates a pet's details using the ID provided in the request body.
* Request Body:
   ```bash
    {
      "id": 1,
      "name": "Buddy",
      "type": "Dog",
      "age": 5
    }
   ```
* Response:
  * `200 OK`: Returns the updated pet object.
  * `404 Not Found`: Returns an error if the pet is not found.

### Update a Pet by ID (Path Parameter)
* Endpoint: `PUT /pet/{id}`
* Description: Updates a pet's details using the ID provided in the path parameter.
* Path Parameter:
  * `id`: The ID of the pet to be updated.
* Request Body:
   ```bash
    {
      "name": "Buddy",
      "type": "Dog",
      "age": 5
    }
   ```
* Response:
  * `200 OK`: Returns the updated pet object.
  * `404 Not Found`: Returns an error if the pet is not found.

### Delete a Pet by ID
* Endpoint: `DELETE /pet/{id}`
* Description: Deletes a pet using the ID provided in the path parameter.
* Path Parameter:
  * `id`: The ID of the pet to be deleted.
* Response:
  * `204 No Content`: Confirms the pet has been deleted.
  * `404 Not Found`: Returns an error if the pet is not found.

## Error Handling
All errors are returned with a JSON response containing a type and errorMessage:

   ```bash
    {
      "type": "API Exception",
      "errorMessage": "Pet not found"
    }
   ```