### Deploy
dari root directory project:

    npm install
    node index.js
 
 ### Baseurl: `http://localhost:4000/api/`

### Endpoints
#### Get all transactions
> GET: /transaction
#### Get transaction transactions by id
> GET: /transaction/:id

#### Create new transaction
>POST: /transaction

Request body:

    //json
    {
			"description": "descriptionText",	//string
			"amount":1000,	//integer
			"isExpense": 0, //integer: 0 atau 1
    }
#### Update existing transaction
>PUT: /transaction/:id

Request body:

    //json
    {
	    "date":"1970-01-01", //string, Format: YYYY-MM-DD
			"description": "descriptionText",	//string
			"amount":1000,	//integer
			"isExpense": 0, //integer, 0 atau 1
    }
#### Delete existing transaction
>DELETE: /transaction/:id
